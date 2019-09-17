import { useEffect, useState } from 'react';
import GeolocationService from '../services/GeolocationService';

const geolocationService = new GeolocationService();

const Weather = () => {
  const [location, setLocation] = useState('Canada');
  useEffect(() => {
    geolocationService
      .getCurrentPosition()
      .then(e => setLocation(e))
      .catch(error => console.log(error));
  });
  return (
    <div className="weather-wrapper">
      <div className="weather-card madrid">
        <div className="weather-icon">
          <img
            src="/static/weathericons/rainy-1.svg"
            height="100"
            width="100"
          />
        </div>
        <h1>26° {process.env.customKey}</h1>
        <p>{location}</p>
      </div>
    </div>
  );
};
export default Weather;
