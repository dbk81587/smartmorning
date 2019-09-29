import axios from 'axios';
import getConfig from 'next/config';
import { useEffect, useState } from 'react';
import GetWeatherIcon from '../utils/GetWeatherIcon';
import WeatherHours from './WeatherHours';

const { publicRuntimeConfig } = getConfig();

const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast?';
const API_KEY = publicRuntimeConfig.weatherApiKey;

interface GeoLocation {
  lon: number;
  lat: number;
  city: string;
}

const HoursForecast = (geoLocation, sunrise, sunset) => {
  const [{ lon, lat, city }, setLocation] = useState<GeoLocation>(geoLocation);
  const url: string = `${BASE_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const [resMap, setResList] = useState<object>();
  useEffect(() => {
    const getHourlyForecast = async () => {
      const res = await axios.get(url);
      const resList = res.data.list
        .slice(0, 6)
        .reverse()
        .map((e, i) => {
          const { dt, main, weather } = e;
          const currentHour: number = new Date(dt * 1000).getHours();
          const getAmPm = hours => {
            if (hours === 0) return 12 + ' am';
            return hours >= 12 ? hours - 12 + ' pm' : hours + ' am';
          };
          return (
            <div className="weather-card-half" key={i}>
              <div className="time">{getAmPm(currentHour)}</div>
              <div className="weather-icon">
                <img
                  src={`/static/weathericons/${GetWeatherIcon(
                    weather[0].id,
                    currentHour,
                    sunrise,
                    sunset,
                  )}`}
                  height="50"
                  width="50"
                />
              </div>
              <div>
                <h1>{Math.round(main.temp - 273.15)}</h1>
              </div>
            </div>
          );
        });
      setResList(resList);
    };
    getHourlyForecast();
  }, []);
  return <div>{resMap ? resMap : <WeatherHours />}</div>;
};

export default HoursForecast;
