// import { sendMail } from 'helpers/nodemailer';
async function createOrder(data) {
  if (
    !(
      process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL &&
      process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY &&
      process.env.NEXT_PUBLIC_GOOGLE_SPREADSHEET_ID_ORDER
    )
  ) {
    throw new Error(
      "GOOGLE credentials must be set as env vars `NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL` ,`NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` and `NEXT_PUBLIC_GOOGLE_SPREADSHEET_ID_ORDER`."
    );
  }

  const { GoogleSpreadsheet } = require("google-spreadsheet");
  const doc = new GoogleSpreadsheet(process.env.NEXT_PUBLIC_GOOGLE_SPREADSHEET_ID_ORDER);
  await doc.useServiceAccountAuth({
    client_email: process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
    private_key: process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
  });
  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]

  // append rows
  await sheet.addRow(data);
}
const order = async (req, res) => {
  const { method } = req;
  if (method === "POST") {
    const { items, email, bill_amount, address, phone_number } = req.body;
    console.log("🚀 ~ phone_number:", phone_number);
    try {
      await createOrder({
        items: items
          .map((item) => `${item.name} - ${item.quantity}`)
          .toString(),
        address,
        phone_number,
        email,
        bill_amount,
      });
      // await sendMail('support@redq.io', email, 'Order Received By Medsy', {
      //   items,
      //   bill_amount,
      // });
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
    return res.status(200).json({ message: `successfully added new order` });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
};
export default order;
