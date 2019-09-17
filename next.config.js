const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
require('dotenv').config();

module.exports = withCss(
  withSass({
    publicRuntimeConfig: {
      apiKey: process.env.IP_GEOLOCATION_API_KEY,
    },
  }),
);
