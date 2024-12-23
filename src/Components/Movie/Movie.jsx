import { Grid, Grow, Rating, Tooltip, Typography } from "@mui/material";
import React from "react";
import useStyles from "./style"
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Movie = ({movie,i}) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
    {/*  Notice how the time out is higher for each successive card = Slow pop up kind of animation */}
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Link id = {movie.title.toLowerCase()} className={classes.links} to={`/movie/${movie.id}`} >
          <img 
            alt={movie.title}
            className = {classes.image}
            src = {movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : `` }
          />
          { /* Dynamically Rendering a Movie Poster or Dummy Poster within src of Image */}
          <Typography className={classes.title} variant="h5">{movie.title}</Typography>
          <Tooltip title={`${movie.vote_average.toFixed(2)} / 10`} disableInteractive>
            {/* Movie Averages are on a Scale of 10 */}
             <div>
               <Rating readOnly value={movie.vote_average/2}  precision={0.1} />
             </div>
          </Tooltip>
        </Link>
      </Grow> 
    </Grid>
  )
};

export default Movie;
