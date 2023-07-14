import React from 'react'
import { useEffect, useState } from "react";
import { Routes, Route, useParams } from 'react-router-dom';

//ui 
import { Container } from '@mui/system';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Attraction() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState({});

 
   let  {id} = useParams();

   useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var graphql = JSON.stringify({
        query:`
        query ($attractionId: Int!)  {
            attraction(id: $attractionId) {
              id
              name
              detail
              coverimage
              latitude
              longitude
            }
          }`,
        variables: {"attractionId":parseInt(id)}
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
          setItems([result.data.attraction]);
          console.log(result);
          console.log(items);
        },
      
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [id])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
        <Container maxWidth="lg">
    
          {items?.map(item => (
     

              <Card key={item.id}>
                <CardMedia
                  component="img"
                  image={item.coverimage}
                  title={item.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" >
                  {item.detail}
                  </Typography>
                </CardContent>
                <CardActions>

                  <a href={"/"}>
                  <Button size="back">back</Button>
                  </a>
                  
                  {/* <Button size="small">Learn More</Button> */}
                </CardActions>
                </Card>

         
          ))}

      </Container>
    );
  }
  
}

export default Attraction
