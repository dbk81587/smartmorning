import InvertColors from '@material-ui/icons/InvertColors';
import getConfig from 'next/config';
import { useEffect, useState } from 'react';
import GetWeatherIcon from '../utils/GetWeatherIcon';
import HoursForecast from './HoursForecast';
const { publicRuntimeConfig } = getConfig();
import axios from 'axios';

const currentWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?';

interface WeatherData {
  weatherIcon: string;
  temp: number;
  humidity: number;
  sunrise: number;
  sunset: number;
}

const CurrentWeather = ({ lon, lat, city }) => {
  const [weatherData, setWeather] = useState<WeatherData>({
    weatherIcon: 'White.jpg',
    temp: null,
    humidity: null,
    sunrise: null,
    sunset: null,
  });
  useEffect(() => {
    const getWeatherAPI = async () => {
      const res = await axios.get(
        `${currentWeatherURL}lon=${lon}&lat=${lat}&appid=${publicRuntimeConfig.weatherApiKey}`,
      );
      const { weather, main, sys } = res.data;
      setWeather({
        weatherIcon: GetWeatherIcon(
          weather[0].id,
          new Date().getHours(),
          sys.sunrise,
          sys.sunset,
        ),
        temp: Math.round(main.temp - 273.15),
        humidity: main.humidity,
        sunrise: sys.sunrise,
        sunset: sys.sunset,
      });
    };
    getWeatherAPI();
  }, []);
  return (
    <div className="weather-wrapper">
      <div className="weather-card">
        <div className="weather-icon">
          <img
            src={`/static/weathericons/${weatherData.weatherIcon}`}
            height="100"
            width="100"
          />
        </div>
        <div>
          <h1>{weatherData.temp}°</h1>
          <p id="maxmin">
            <InvertColors />
            {weatherData.humidity}%
          </p>
          <p>{city}</p>
        </div>
      </div>
      <div className="hours-data-map">
        <HoursForecast
          sunrise={weatherData.sunrise}
          sunset={weatherData.sunset}
          lat={lat}
          lon={lon}
        />
      </div>
    </div>
  );
};
export default CurrentWeather;
