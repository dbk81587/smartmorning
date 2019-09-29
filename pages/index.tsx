import axios from 'axios';
import getConfig from 'next/config';
import { CurrentWeather, Newsfeed } from './components';
const { publicRuntimeConfig } = getConfig();
const newsfeedURL =
  'https://newsapi.org/v2/top-headlines?country=ca&apiKey=' +
  publicRuntimeConfig.newsfeedApiKey;
const geolocationURL =
  'https://api.ipgeolocation.io/ipgeo?apiKey=' +
  publicRuntimeConfig.geoLocationApiKey;
import './styles/style.scss';

const Index = ({ geoLocation, newsfeedData }) => (
  <div>
    <CurrentWeather geoLocation={geoLocation} />
    <Newsfeed newsfeedData={newsfeedData} />
  </div>
);

Index.getInitialProps = async ({ req }) => {
  const geoLocation = () => axios.get(geolocationURL);
  const newsfeed = () => axios.get(newsfeedURL);
  const [geoData, newsData] = await axios.all([geoLocation(), newsfeed()]);
  const { longitude, latitude, city } = geoData.data;
  const { articles } = newsData.data;
  return {
    geoLocation: {
      lon: longitude,
      lat: latitude,
      city: city,
    },
    newsfeedData: articles,
  };
};

export default Index;
