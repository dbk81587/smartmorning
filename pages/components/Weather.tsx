import InvertColors from '@material-ui/icons/InvertColors';
import { useEffect, useState } from 'react';
import GeolocationService from '../services/GeolocationService';
import WeatherForecast from '../services/WeatherForecast';
import WeatherService from '../services/WeatherService';
import WeatherHours from './WeatherHours';

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
  const [{ weatherIcon, temp, humidity }, setWeather] = useState({
    weatherIcon: 'White.jpg',
    temp: null,
    humidity: null,
  });
  useEffect(() => {
    if (typeof lon === 'object') return;
    WeatherService(lon, lat)
      .then(e => setWeather(e))
      .catch(error => console.log(error));
  }, [lon]);
  const [hoursData, setHoursData] = useState();
  useEffect(() => {
    if (typeof lon === 'object') return;
    WeatherForecast(lon, lat)
      .then(e => setHoursData(e))
      .catch(error => console.log(error));
  }, [lon]);
  const [hoursDataMap, setHoursDataMap] = useState();
  useEffect(() => {
    if (typeof hoursData === 'undefined') return;
    setHoursDataMap(
      hoursData.map(e => {
        return (
          <div className="weather-card-half" key={e[0]}>
            <div className="time">{e[0]}</div>
            <div className="weather-icon">
              <img
                src={`/static/weathericons/${e[2]}`}
                height="50"
                width="50"
              />
            </div>
            <div>
              <h1>{e[1]}°</h1>
            </div>
          </div>
        );
      }),
    );
  }, [hoursData]);

  return (
    <div className="weather-wrapper">
      <div
        className="weather-card"
        style={{ visibility: hoursDataMap ? 'visible' : 'hidden' }}
      >
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
            <InvertColors />
            {humidity}%
          </p>
          <p>{city}</p>
        </div>
      </div>
      <div className="hours-data-map">
        {hoursData ? hoursDataMap : <WeatherHours />}
      </div>
    </div>
  );
};
export default Weather;
