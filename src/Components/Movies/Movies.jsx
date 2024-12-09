import React, { useEffect, useState } from "react";
import { useGetMoviesQuery } from "../../services/TMDB";
import MovieList from "../MovieList/MovieList";
import { Box, CircularProgress,Typography } from "@mui/material";
import { useSelector } from "react-redux";
import useStyles from "./style.js"
import Pagination from "../Pagination/Pagination.jsx";

const Movies = () => {
  const [page, setPage] = useState(1)
  const classes = useStyles();
  /* 
    UseSelector - Returns Entire State Object.
          Fetching just our needed slice from Store.
  */
  const {genreIdOrCategoryName, searchQuery} = useSelector((state) => state.currentGenreOrCategory)
  const { data, error, isLoading } = useGetMoviesQuery(({genreIdOrCategoryName, page, searchQuery}));
  if(isLoading) {
    return(
      <Box className={classes.centerScreen}>
        <CircularProgress size = "7rem"/>
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

  if(error) return "An error has occurred"
  
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <MovieList movies ={data}/>
      {/* Page to read values, setPage to write values. */}
      <Pagination currentPage={page} setPage={setPage} totalPages = {data?.total_pages}/>
    </Box>
  )
};

export default Movies;