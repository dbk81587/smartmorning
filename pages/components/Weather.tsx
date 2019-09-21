import { useCallback, useEffect, useState } from 'react';
import GeolocationService from '../services/GeolocationService';
import WeatherForecast from '../services/WeatherForecast';
import WeatherService from '../services/WeatherService';

const Weather = () => {
  const [{ lon, lat, city }, setLocation] = useState({
    lon: null,
    lat: null,
    city: '',
  });
  useEffect(() => {
    GeolocationService()
      .then(e => setLocation(e))
      .catch(error => console.log(error));
  }, []);
  const [{ weatherIcon, temp, temp_max, temp_min }, setWeather] = useState({
    weatherIcon: 'White.jpg',
    temp: null,
    temp_max: null,
    temp_min: null,
  });
  useEffect(() => {
    if (typeof lon === 'object') return;
    WeatherService(lon, lat)
      .then(e => setWeather(e))
      .catch(error => console.log(error));
  }, [lon]);
  useEffect(() => {
    if (typeof lon === 'object') return;
    WeatherForecast(lon, lat)
      .then(e => console.log(e))
      .catch(error => console.log(error));
  }, [lon]);

  return (
    <div className="weather-wrapper">
      <div className="weather-card">
        <div className="weather-icon">
          <img
            src={`/static/weathericons/${weatherIcon}`}
            height="100"
            width="100"
          />
        </div>
        <div>
          <h1>{temp}°</h1>
          <p id="maxmin">
            {temp_max}° / {temp_min}°
          </p>
          <p>{city}</p>
        </div>
      </div>
      <div className="weather-card-half">
        <div className="time">2 p.m</div>
        <div className="weather-icon">
          <img
            src={`/static/weathericons/${weatherIcon}`}
            height="50"
            width="50"
          />
        </div>
        <div>
          <h1>{temp}°</h1>
        </div>
      </div>
    </div>
  );
};
export default Weather;
