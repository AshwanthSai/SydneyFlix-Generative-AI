import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import useStyles from "./style"

const FeaturedMovie = ({movie}) => {
  const classes = useStyles()
  //If no movie, do not render
  if(!movie) return null
  return (
    <Box id ={movie.title.toLowerCase()} component={Link} to={`/movie/${movie.id}`} className={classes.featuredCardContainer}>
      {/* Flex-end */}
      <Card className={classes.card} classes={{ root: classes.cardRoot }}>
        <CardMedia
          media="picture"
          alt={movie.title}
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          title={movie.title}
          className={classes.cardMedia}
        />
       <Box padding="20px">
          <CardContent className={classes.cardContent} classes={{ root: classes.cardContentRoot }}>
            <Typography id ="featuredMovieContent" variant="h5" gutterBottom>{movie.title}</Typography>
            <Typography variant="body2">{movie.overview}</Typography>
          </CardContent>
        </Box> 
      </Card>
  </Box>
  )
};

export default FeaturedMovie;
