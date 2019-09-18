import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const BASE_URL = 'https://api.ipgeolocation.io/ipgeo';
const API_KEY = publicRuntimeConfig.geoLocationApiKey;

interface GeoProp {
  lon: number;
  lat: number;
  city: string;
}

const GeolocationService = () => {
  const url = `${BASE_URL}?apiKey=${API_KEY}`;
  return new Promise<GeoProp>((resolve, reject) => {
    axios
      .get(url)
      .then(res => {
        if (res && res.status === 200) {
          const { longitude, latitude, city } = res.data;
          resolve({
            lon: longitude,
            lat: latitude,
            city: city,
          });
        } else {
          reject('Unable to retrieve current location');
        }
      })
      .catch(error => {
        console.log(error);
      });
  });
};

export default GeolocationService;
