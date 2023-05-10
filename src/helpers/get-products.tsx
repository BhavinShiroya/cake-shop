export async function getProducts() {
  if (
    !(
      process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL &&
      process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY &&
      process.env.NEXT_PUBLIC_GOOGLE_SPREADSHEET_ID_PRODUCT
    )
  ) {
    throw new Error(
      "GOOGLE credentials must be set as env vars `NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL` ,`NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` and `NEXT_PUBLIC_GOOGLE_SPREADSHEET_ID_PRODUCT`."
    );
  }
  const { GoogleSpreadsheet } = require("google-spreadsheet");
  const doc = new GoogleSpreadsheet(process.env.NEXT_PUBLIC_GOOGLE_SPREADSHEET_ID_PRODUCT);
  await doc.useServiceAccountAuth({
    client_email: process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
    private_key: process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(
      /\\n/gm,
      "\n"
    ),
  });
  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
  // read rows
  const rows = await sheet.getRows(); // can pass in { limit, offset }
  const products = rows?.map(({ _sheet, _rowNumber, _rawData, ...fields }) => ({
    ...fields,
  }));
  return JSON.parse(JSON.stringify(products));
}
