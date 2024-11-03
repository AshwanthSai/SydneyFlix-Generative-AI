import React from "react";
import { useGetMoviesQuery } from "../../services/TMDB";
import MovieList from "../MovieList/MovieList";
import { Box, CircularProgress, Typography } from "@mui/material";

const Movies = () => {
  const { data, error, isLoading } = useGetMoviesQuery();

  if(isLoading) {
    return(
      <Box display = "flex" justifyContent = "center">
        <CircularProgress size = "4rem"/>
      </Box>
    )
  }

  if(!data.results.length){
    return(
    /* 
      Place item within Div at Center of Y axis with a Margin top of 20px
    */
    <Box display = "flex" alignItems = "center" mt="20px">
      <Typography variant = "h4">
        No Movies that match that name.
        <br/>
        Please search for something else.
      </Typography>
    </Box>
    )
  }

  if(error) return "An error has occurred"
  
  return (
    <div>
      <MovieList movies ={data}/>
    </div>
  )
};

export default Movies;