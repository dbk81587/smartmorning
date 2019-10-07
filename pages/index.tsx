import axios from 'axios';
import { useEffect, useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import Newsfeed from './components/Newsfeed';
const geoLocationURL =
  'https://api.ipgeolocation.io/ipgeo?apiKey=' +
  process.env.NEXT_SERVER_IP_GEOLOCATION_API_KEY;
const newsfeedURL =
  'https://newsapi.org/v2/top-headlines?country=ca&apiKey=' +
  process.env.NEXT_SERVER_NEWSFEED_API_KEY;
const weatherAPI = process.env.NEXT_SERVER_OPEN_WEATHER_API_KEY;
const currentWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?';
const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?';
import './styles/style.scss';

interface GeoData {
  lon: number;
  lat: number;
  city: string;
}

const Index = ({ newsData, apis }) => {
  const [geoData, setGeoData] = useState<GeoData>({
    lon: null,
    lat: null,
    city: '',
  });
  useEffect(() => {
    const getGeoData = async () => {
      const geoDat = await axios.get(apis.geoURL);
      const { longitude, latitude, city } = await geoDat.data;
      setGeoData({ lon: longitude, lat: latitude, city: city });
    };
    getGeoData();
  }, []);
  const [currentWeatherData, setCurrentWeatherData] = useState({
    id: null,
    sunrise: null,
    sunset: null,
    temp: null,
    humidity: null,
  });
  const [forecastData, setForecastData] = useState([]);
  useEffect(() => {
    if (geoData.lon === null) return;
    const getWeatherData = async () => {
      const currentWeather = () =>
        axios.get(
          `${currentWeatherURL}lon=${geoData.lon}&lat=${geoData.lat}&appid=${apis.weatherAPIkey}`,
        );
      const forecast = () =>
        axios.get(
          `${forecastURL}lat=${geoData.lat}&lon=${geoData.lon}&appid=${apis.weatherAPIkey}`,
        );
      const [getCurrentWeatherData, getForecastData] = await axios.all([
        currentWeather(),
        forecast(),
      ]);
      const { weather, main, sys } = await getCurrentWeatherData.data;
      setCurrentWeatherData({
        id: weather[0].id,
        sunrise: sys.sunrise,
        sunset: sys.sunset,
        temp: main.temp,
        humidity: main.humidity,
      });
      const forecastList = await getForecastData.data.list;
      setForecastData(forecastList);
    };
    getWeatherData();
  }, [geoData.lon]);
  const { id, sunrise, sunset, temp, humidity } = currentWeatherData;
  return (
    <div>
      <CurrentWeather
        city={geoData.city}
        id={id}
        sunrise={sunrise}
        sunset={sunset}
        temp={temp}
        humidity={humidity}
        forecastData={forecastData}
      />
      <Newsfeed newsfeedData={newsData.articles} />
    </div>
  );
};

Index.getInitialProps = async ({ req }) => {
  const newsfeed = await axios.get(newsfeedURL);
  const { articles } = newsfeed.data;
  const geoURL = geoLocationURL;
  const weatherAPIkey = weatherAPI;
  return {
    newsData: {
      articles: articles.slice(0, 9),
    },
    apis: {
      geoURL: geoURL,
      weatherAPIkey: weatherAPIkey,
    },
  };
};

export default Index;
