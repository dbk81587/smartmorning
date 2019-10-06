import { useEffect, useState } from 'react';
import GetWeatherIcon from '../utils/GetWeatherIcon';

const HoursForecast = ({ forecastData, sunrise, sunset }) => {
  const [forecastList, setForecastList] = useState([]);
  useEffect(() => {
    setForecastList(forecastData);
  });
  return (
    <div>
      {forecastList
        .slice(0, 6)
        .reverse()
        .map((e, i) => {
          const { dt, main, weather } = e;
          const currentHour: number = new Date(dt * 1000).getHours();
          const getAmPm = hours => {
            if (hours === 0) return 12 + ' am';
            if (hours === 12) return 12 + ' pm';
            return hours > 12 ? hours - 12 + ' pm' : hours + ' am';
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
                <h1>{Math.round(main.temp - 273.15)}°</h1>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default HoursForecast;
