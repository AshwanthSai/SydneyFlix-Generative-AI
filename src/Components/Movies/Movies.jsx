import React, { useEffect, useState } from "react";
import { useGetMoviesQuery } from "../../services/TMDB";
import MovieList from "../MovieList/MovieList";
import { Box, CircularProgress,Toolbar,Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import useStyles from "./style.js"
import Pagination from "../Pagination/Pagination.jsx";
import { useTheme } from "@emotion/react";
import FeaturedMovie from "../FeaturedMovie/FeaturedMovie.jsx";

const Movies = () => {
  const [page, setPage] = useState(1)
  const classes = useStyles();
  const theme = useTheme();
  /* Slicing number of movies depending on screen size to prevent gap within list. */
  const isXl = useMediaQuery(theme.breakpoints.up("xl")); // 1920px and up
  const isL = useMediaQuery(theme.breakpoints.up("lg"));  // 1280px and up
  const isMd = useMediaQuery(theme.breakpoints.up("md"));  // 960px and up
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));   // 600px and up
  const isXs = useMediaQuery(theme.breakpoints.up("xs"));   // 0px and up
  
  let numberOfMovies = 10; // Default value for extra small screens
  
  if (isXl) {
    numberOfMovies = 12; // For extra large screens
  } else if (isL) {
    numberOfMovies = 12; // For large screens
  } else if (isMd) {
    numberOfMovies = 12; // For medium screens
  } else if (isSm) {
    numberOfMovies = 10;  // For small screens
  } else if (isXs) {
    numberOfMovies = 8;  // For extra small screens
  }


  /* 
      UseSelector - Returns Entire State Object.
      Fetching just our needed slice from Store.
  */
  const {genreIdOrCategoryName, searchQuery} = useSelector((state) => state.currentGenreOrCategory)
  const { data, error, isLoading } = useGetMoviesQuery({genreIdOrCategoryName, page, searchQuery});

  if(isLoading) {
    return(
      <Box className={classes.centerScreen}>
        <CircularProgress size = "4rem"/>
      </Box>
    )
  }

  if(!data?.results?.length){
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

  if(error) return "An error has occured"
  
  return (
    <div className={classes.parentdiv}>
      {/* <Toolbar/>  Fixes MUI Toolbar Bug */}
      <FeaturedMovie className = {classes.childElement} movie={data.results[0]} />
      <MovieList className = {classes.childElement} movies ={data} numberOfMovies = {numberOfMovies}/>
      {/* Page to read values, setPage to write values. */}
      <Pagination className = {classes.childElement} currentPage={page} setPage={setPage} totalPages = {data?.total_pages}/>
    </div>
  )
};

export default Movies;