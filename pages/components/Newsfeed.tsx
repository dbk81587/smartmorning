import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import NewsfeedService from '../services/NewsfeedService';

const Newsfeed = () => {
  const [newsData, setNewsData] = useState();
  useEffect(() => {
    NewsfeedService()
      .then(e => setNewsData(e))
      .catch(error => console.log(error));
  }, []);
  const [newsDataMapping, setNewsDataMapping] = useState();
  useEffect(() => {
    if (typeof newsData === 'undefined') return;
    setNewsDataMapping(
      newsData.map((e, i) => {
        return (
          <Card
            style={{ width: 360, height: 500 }}
            className="news-card"
            key={i}
          >
            <CardActionArea style={{ height: 500 }}>
              <CardMedia component="img" image={e[3]} height="220" />
              <CardContent style={{ height: 250 }}>
                <Typography
                  color="textPrimary"
                  style={{ lineHeight: '25px' }}
                  gutterBottom={true}
                  className="card-title"
                >
                  {e[0]}
                </Typography>
                <hr />
                <Typography
                  className="article-content-text"
                  variant="body2"
                  color="textSecondary"
                >
                  {e[1]}
                </Typography>
                <Typography
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '20px',
                    color: 'blueGrey',
                  }}
                >
                  {e[4]}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      }),
    );
  }, [newsData]);
  return (
    <Container>
      <div className="newsfeed-wrapper">{newsDataMapping}</div>
    </Container>
  );
};

export default Newsfeed;
