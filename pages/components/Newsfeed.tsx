import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { useEffect, useState } from 'react';

const Newsfeed = ({ newsfeedData }) => {
  const [newsMap, setNewsMap] = useState<object>();
  useEffect(() => {
    const newsMapping = newsfeedData.map((e, i) => {
      const date: number = new Date(e.publishedAt).getTime();
      const hour: number = new Date(date).getHours();
      const min =
        new Date(date).getMinutes() < 10
          ? `0${new Date(date).getMinutes()}`
          : new Date(date).getMinutes();
      const publishedTime: string = `${hour} : ${min}`;
      return (
        <Card style={{ width: 360, height: 500 }} className="news-card" key={i}>
          <CardActionArea style={{ height: 500 }}>
            <a href={e.url} target="_blank" style={{ textDecoration: 'none' }}>
              <CardMedia component="img" image={e.urlToImage} height="220" />
              <CardContent style={{ height: 250 }}>
                <Typography
                  color="textPrimary"
                  style={{ lineHeight: '25px' }}
                  gutterBottom={true}
                  className="card-title"
                >
                  {e.title}
                </Typography>
                <hr />
                <Typography
                  className="article-content-text"
                  variant="body2"
                  color="textSecondary"
                >
                  {e.description}
                </Typography>
                <Typography
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '20px',
                    color: 'blueGrey',
                  }}
                >
                  {publishedTime}
                </Typography>
              </CardContent>
            </a>
          </CardActionArea>
        </Card>
      );
    });
    setNewsMap(newsMapping);
  }, []);
  return (
    <Container>
      <div className="newsfeed-wrapper">{newsMap}</div>
    </Container>
  );
};

export default Newsfeed;
