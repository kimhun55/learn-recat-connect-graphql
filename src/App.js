
import { useEffect, useState } from "react";

//ui
import { Container } from '@mui/system';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState({});


  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
      query: `
      query  {
        attractions {
          id
          name
          detail
          coverimage
          latitude
          longitude
        }
      }`,
      variables: {}
    })
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow'
    };

    fetch("http://localhost:4000", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data.attractions);
          console.log(result)
          console.log(items)
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {items?.map(item => (
            <Grid key={item.id} xs={4} md={4}>

              <Card>
                <CardMedia
                  sx={{ height: 140 }}
                  image={item.coverimage}
                  title={item.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap={true}>
                  {item.detail}
                  </Typography>
                </CardContent>
                <CardActions>

                  <a href={"/id/"+item.id}>
                  <Button size="small">More</Button>
                  </a>
                  
                  {/* <Button size="small">Learn More</Button> */}
                </CardActions>
              </Card>

            </Grid>
          ))}
        </Grid>

      </Container>

    )
  }
}

export default App;
