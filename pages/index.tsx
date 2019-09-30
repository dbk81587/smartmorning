import axios from 'axios';
import getConfig from 'next/config';
import CurrentWeather from './components/CurrentWeather';
import Newsfeed from './components/Newsfeed';
const { publicRuntimeConfig } = getConfig();
const newsfeedURL =
  'https://newsapi.org/v2/top-headlines?country=ca&apiKey=' +
  publicRuntimeConfig.newsfeedApiKey;
const geolocationURL =
  'https://api.ipgeolocation.io/ipgeo?apiKey=' +
  publicRuntimeConfig.geoLocationApiKey;
import './styles/style.scss';

const Index = ({ geoData }) => (
  <div>
    <CurrentWeather lon={geoData.lon} lat={geoData.lat} city={geoData.city} />
    <Newsfeed newsfeedData={geoData.articles} />
  </div>
);

Index.getInitialProps = async ({ req }) => {
  const geoLocation = () => axios.get(geolocationURL);
  const newsfeed = () => axios.get(newsfeedURL);
  const [geoData, newsData] = await axios.all([geoLocation(), newsfeed()]);
  const { longitude, latitude, city } = await geoData.data;
  const { articles } = await newsData.data;
  return {
    geoData: {
      lon: longitude,
      lat: latitude,
      city: city,
      articles: articles.slice(0, 9),
    },
  };
};

export default Index;
