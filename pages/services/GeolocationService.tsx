import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const BASE_URL = 'https://api.ipgeolocation.io/ipgeo';
const API_KEY = publicRuntimeConfig.apiKey;

class GeolocationService {
  public getCurrentPosition() {
    const url = `${BASE_URL}?apiKey=${API_KEY}`;
    return new Promise<string>((resolve, reject) => {
      axios
        .get(url)
        .then(res => {
          if (res && res.status === 200) {
            resolve(res.data.city);
          } else {
            reject('Unable to retrieve current location');
          }
        })
        .catch(error => {
          console.log(error);
        });
    });
  }
}

export default GeolocationService;
