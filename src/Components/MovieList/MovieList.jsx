import React from "react";
import { Grid, Toolbar } from "@mui/material";
import useStyles from "./styles";
import Movie from "../Movie/Movie";


const MovieList = ({ movies, numberOfMovies, excludeFirst }) => {
    /* Exclude 1 as it is same as Featured Movie */
    const start = excludeFirst ? 1 : 0
    const classes = useStyles()
    return (
        <>
             {/* MUI Toolbar Bug - Empty toolbar to start rendering after toolbar */}
            <Grid data-testid = "movieList" container spacing={2} className={classes.moviesContainer}>
            {/* For Categories */}
                {movies.results && (movies.results.slice(start,numberOfMovies).map((movie,i) => (
                    <Movie key={i} movie={movie} i={i} /> 
                )))}
            </Grid>
        </>
    );
};

export default MovieList;