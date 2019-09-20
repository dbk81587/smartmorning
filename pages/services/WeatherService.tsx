import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const API_KEY = publicRuntimeConfig.weatherApiKey;

interface WeatherProps {
  weatherIcon: string;
  temp: number;
}

const WeatherService = (lon, lat) => {
  const url = `${BASE_URL}lon=${lon}&lat=${lat}&appid=${API_KEY}`;
  return new Promise<WeatherProps>((resolve, reject) => {
    axios
      .get(url)
      .then(res => {
        if (res && res.status === 200) {
          const { weather, main, sys } = res.data;
          const sunrise = new Date(sys.sunrise).getHours();
          const sunset = new Date(sys.sunset).getHours();
          const currentHour = new Date().getHours();
          const getWeatherIcon = id => {
            switch (weather[0].id > 0) {
              case id >= 200 && id <= 232:
                return '200-232.svg';
              case id >= 300 && id <= 321:
                return '300-321.svg';
              case id >= 500 && id <= 504:
                return '500-504.svg';
              case id === 511:
                return '511.svg';
              case id >= 520 && id <= 531:
                return '520-531.svg';
              case id >= 600 && id <= 622:
                return '600-622.svg';
              case id >= 701 && id <= 781:
                return '701-781.svg';
              case id === 800 && currentHour >= sunrise && currentHour < sunset:
                return '800d.svg';
              case id === 800:
                return '800n.svg';
              case id === 801 && currentHour >= sunrise && currentHour < sunset:
                return '801d.svg';
              case id === 801:
                return '801n.svg';
              case id >= 802 && id <= 804:
                return '802-804.svg';
              default:
                return '';
            }
          };

          resolve({
            weatherIcon: getWeatherIcon(weather[0].id),
            temp: Math.round(main.temp - 273.15),
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
