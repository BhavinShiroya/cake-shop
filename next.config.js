/** @type {import('next').NextConfig} */

function getConfig(config) {
  return config;
}

module.exports = getConfig({
  images: {
    domains: [
      "s3.amazonaws.com",
      "scontent.cdninstagram.com",
      "www.google.com",
      "cdn.pixabay.com",
      "media.istockphoto.com",
      "media.bakingo.com",
    ],
  },
});
