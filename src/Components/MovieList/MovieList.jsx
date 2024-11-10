import React from "react";
import { Grid, Toolbar } from "@mui/material";
import useStyles from "./styles";
import Movie from "../Movie/Movie";

const MovieList = ({ movies }) => {
    const classes = useStyles()
    return (
        <>
            <Toolbar/>
             {/* MUI Toolbar Bug - Empty toolbar to start rendering after toolbar */}
            <Grid spacing={2.5} className={classes.moviesContainer}>
            {/* For Categories */}
                {movies.results && (movies.results.map((movie,i) => (
                    <Movie key={i} movie={movie} i={i} /> 
                )))}
            </Grid>
        </>
    );
};

export default MovieList;