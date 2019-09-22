import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast?';
const API_KEY = publicRuntimeConfig.weatherApiKey;

interface ForecastProps {
  [index: number]: number | string;
}

const WeatherForecast = (lon: number, lat: number) => {
  const url = `${BASE_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  return new Promise<ForecastProps>((resolve, reject) => {
    axios
      .post(url)
      .then(res => {
        if (res && res.status === 200) {
          const resMap = res.data.list
            .map(e => {
              return [new Date(e.dt * 1000), e.main.temp, e.weather[0].id];
            })
            .slice(0, 6)
            .map(e => {
              const currentHour = new Date(e[0]).getHours();
              const getWeatherIcon = id => {
                switch (e[2] > 0) {
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
                  case id === 800 && currentHour >= 9 && currentHour < 21:
                    return '800d.svg';
                  case id === 800:
                    return '800n.svg';
                  case id === 801 && currentHour >= 9 && currentHour < 21:
                    return '801d.svg';
                  case id === 801:
                    return '801n.svg';
                  case id >= 802 && id <= 804:
                    return '802-804.svg';
                  default:
                    return 'White.jpg';
                }
              };
              const getAmPm = hours => {
                if (hours === 0) return 12 + ' am';
                return hours >= 12 ? hours - 12 + ' pm' : hours + ' am';
              };
              return [
                getAmPm(currentHour),
                Math.round(e[1] - 273.15),
                getWeatherIcon(e[2]),
              ];
            });
          resolve(resMap);
        } else {
          reject('Unable to retrieve current location');
        }
      })
      .catch(error => {
        console.log(error);
      });
  });
};

export default WeatherForecast;
