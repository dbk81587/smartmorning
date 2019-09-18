const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
require('dotenv').config();

module.exports = withCss(
  withSass({
    publicRuntimeConfig: {
      geoLocationApiKey: process.env.IP_GEOLOCATION_API_KEY,
      weatherApiKey: process.env.OPEN_WEATHER_API_KEY,
    },
  }),
);
