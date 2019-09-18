import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const API_KEY = publicRuntimeConfig.weatherApiKey;

interface WeatherProps {
  status: string;
  temp: number;
}

const WeatherService = (lon, lat) => {
  const url = `${BASE_URL}lon=${lon}&lat=${lat}&appid=${API_KEY}`;
  return new Promise<WeatherProps>((resolve, reject) => {
    axios
      .get(url)
      .then(res => {
        if (res && res.status === 200) {
          const { weather, main } = res.data;
          resolve({
            status: weather.main,
            temp: main.temp,
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

export default WeatherService;
