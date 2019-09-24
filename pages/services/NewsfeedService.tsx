import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const BASE_URL = 'https://newsapi.org/v2/top-headlines?country=ca&apiKey=';
const API_KEY = publicRuntimeConfig.newsfeedApiKey;

const NewsfeedService = () => {
  const urlApi = `${BASE_URL}${API_KEY}`;
  return new Promise((resolve, reject) => {
    axios
      .get(urlApi)
      .then(res => {
        if (res && res.status === 200) {
          const { articles } = res.data;
          resolve(
            articles.slice(0, 9).map(e => {
              const date = new Date(e.publishedAt).getTime();
              const hour = new Date(date).getHours();
              const min =
                new Date(date).getMinutes() < 10
                  ? `0${new Date(date).getMinutes()}`
                  : new Date(date).getMinutes();
              const publishedTime = `${hour} : ${min}`;
              return [
                e.title,
                e.description,
                e.url,
                e.urlToImage,
                publishedTime,
              ];
            }),
          );
        } else {
          reject('Unable to retrieve feeds');
        }
      })
      .catch(error => console.log(error));
  });
};

export default NewsfeedService;
