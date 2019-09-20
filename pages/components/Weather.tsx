import { useEffect, useState } from 'react';
import GeolocationService from '../services/GeolocationService';
import WeatherService from '../services/WeatherService';

const Weather = () => {
  const [{ lon, lat, city }, setLocation] = useState({
    lon: 0,
    lat: 0,
    city: '',
  });
  useEffect(() => {
    GeolocationService()
      .then(e => setLocation(e))
      .catch(error => console.log(error));
  }, []);
  const [{ weatherIcon, temp }, setWeather] = useState({
    weatherIcon: '',
    temp: 0,
  });
  useEffect(() => {
    WeatherService(lon, lat)
      .then(e => setWeather(e))
      .catch(error => console.log(error));
  }, [lon, lat]);

  return (
    <div className="weather-wrapper">
      <div className="weather-card madrid">
        <div className="weather-icon">
          <img
            src={`/static/weathericons/${weatherIcon}`}
            height="100"
            width="100"
          />
        </div>
        <h1>{temp}°</h1>
        <p>{city}</p>
      </div>
    </div>
  );
};
export default Weather;
