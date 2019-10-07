import InvertColors from '@material-ui/icons/InvertColors';
import GetWeatherIcon from '../utils/GetWeatherIcon';
import HoursForecast from './HoursForecast';
import WeatherHours from './WeatherHours';

const CurrentWeather = ({
  city,
  id,
  sunrise,
  sunset,
  temp,
  humidity,
  forecastData,
}) => {
  return (
    <div className="weather-wrapper">
      <div
        className="weather-card"
        style={{ visibility: typeof temp === 'object' ? 'hidden' : 'visible' }}
      >
        <div className="weather-icon">
          <img
            src={`/static/weathericons/${GetWeatherIcon(
              id,
              new Date().getHours,
              sunrise,
              sunset,
            )}`}
            height="100"
            width="100"
          />
        </div>
        <div>
          <h1>{Math.round(temp - 273.15)}°</h1>
          <p id="maxmin">
            <InvertColors />
            {humidity}%
          </p>
          <p>{city}</p>
        </div>
      </div>
      <div className="hours-data-map">
        <HoursForecast
          forecastData={forecastData}
          sunrise={sunrise}
          sunset={sunset}
        />
      </div>
    </div>
  );
};
export default CurrentWeather;
