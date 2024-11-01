import React from "react";
import { useGetMoviesQuery } from "../../services/TMDB";
import MovieList from "../MovieList/MovieList";

const Movies = () => {
  const { data, error, isLoading } = useGetMoviesQuery();
  return (
    <MovieList movies ={data}/>
  )
};

export default Movies;