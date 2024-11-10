import React from "react";
import { Grid } from "@mui/material";
import useStyles from "./styles";
import Movie from "../Movie/Movie";

const MovieList = ({ movies }) => {
    const classes = useStyles()
    return (
        /* For some reason, Grid internally has -20px, left and top margin */
        <Grid container sx ={{margin:"10px", marginTop: "40px"}} spacing={2.5} className={classes.moviesContainer}>
           {/* For Categories */}
            {movies.results && (movies.results.map((movie,i) => (
                <Movie key={i} movie={movie} i={i} /> 
            )))}
        </Grid>
    );
};

export default MovieList;