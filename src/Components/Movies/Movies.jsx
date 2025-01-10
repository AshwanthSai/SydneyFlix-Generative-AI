import React, { useState } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography, Toolbar } from '@mui/material';
import { useSelector } from 'react-redux';
import useStyles from "./style"
import { MovieList, Pagination, FeaturedMovie } from '../index';
import { useGetMoviesQuery } from '../../services/TMDB';

function Movies() {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });

  const xl = useMediaQuery((theme) => theme.breakpoints.up('xl'));
  // const numberOfMovies = xl ? 15 : 16 ;
  const numberOfMovies = xl ? 13 : 18 ;

  if (isFetching) {
    return (
      <Box className = {classes.centerScreen}>
        <CircularProgress size="7rem" />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt="20px">
        <Typography variant="h4">
        <Toolbar/>{/* MUI Toolbar Bug */}
          No movies that match that name.
          <br />
          Please Search for something else.
        </Typography>
      </Box>
    );
  }

  if (error) return 'An error has occured.';

  return (
    <div>
      <FeaturedMovie movie={data.results[0]} />
      <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
    </div>
  );
}

export default Movies;