import { Box, Button, CircularProgress, Grid, Toolbar, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useStyles from "./styles"
import { useGetActorDetailsQuery, useGetMoviesByActorQuery } from "../../services/TMDB";
import { ArrowBack } from "@mui/icons-material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from "react-router-dom";
import MovieList from "../MovieList/MovieList";
import Pagination from "../Pagination/Pagination";
import { useTheme } from "@emotion/react";

const Actors = () => {
  const classes = useStyles()
  const {id} = useParams();
  const [page, setPage] = useState(1)
  const {data, error, isLoading} = useGetActorDetailsQuery(id);
  const theme = useTheme();
  const {data : actorMovies, error : actorMoviesError, isLoading :actorMoviesIsLoading} = useGetMoviesByActorQuery({actor_id:id,page: page.toString()});
  let history = useHistory();
  const xl = useMediaQuery((theme) => theme.breakpoints.up('xl'));
  const numberOfMovies = xl ? 14 : 15 ;

  if(isLoading) {
    return(
      <Box  className={classes.centerScreen}>
          {/* To handle MUI Toolbar Bug */}
        <CircularProgress size =
         "8rem"/>
      </Box>
    )
  }

  if(!data){
    return(
    /* 
      Place item within Div at Center of Y axis with a Margin top of 20px
    */
   
    <Box display = "flex" alignItems = "center"  justifyContent="center" mt="30vh">
      <Toolbar/>
      <Typography variant = "h4" align="center">
       {` Oops! We could not retrieve the details for ${id}.`}
       {<br /> }
       {`Please check your internet connection and try again.`}
       {<br /> }
       {`If the problem persists, feel free to contact support.`}
      </Typography>
    </Box>
    )
  }
  
  if (error) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <Button startIcon={<ArrowBack />} onClick={() => history.goBack()} color="primary">
          Go Back
        </Button>
      </Box>
    );
  }
  
  return (<>
      <Toolbar/> 
      <Grid container spacing={3}
        className = {classes.containerSpaceAround}
      >   {/* Left Grid Item */}
          {/* 5 Columns in Large Screen, 4 Columns in Extra Large Screens */}
         <Grid item lg={5} xl={4}>
          <img 
            className = {classes.poster}
            src={`https://image.tmdb.org/t/p/w300/${data.profile_path}`}
            alt={data?.name}
          />
        </Grid>
        {/* Actor Information Grid  */}
        <Grid className = {classes.ActorInformation} item container direction="column" lg={7} xl={8}>
          <Typography variant="h2" gutterBottom>
                {`${data?.name}`}
          </Typography>
          <Typography variant="h5" gutterBottom>
                Born : {new Date(data?.birthday).toDateString()} 
          </Typography>
          {/* Inline Style beacause MUI Style is interfering  */}
          <Typography sx={{marginRight: "10%"}} paragraph variant="body1" gutterBottom align="justify">
            {data?.biography || 'Sorry, no biography yet...'}
          </Typography>
          {/* IMDB and Back Button */}
          {/* Everything does not have to be Container, It could be an item with 2 elements */}
          <Grid item className = {classes.buttonsContainer}>
            <Button id= "IMDB" variant="contained" target = "_blank" rel="noopener noreferrer" href={`https://www.imdb.com/name/${data?.imdb_id}/`}>
                IMDB
            </Button>
            <Button color="primary" onClick = {() => history.goBack()} startIcon={<ArrowBackIcon />}>
                Back
            </Button>
          </Grid>
        </Grid>
    </Grid>
    {/* Recommended Movies of Actor */}
    <Box marginTop = "2rem 0" width= "100%">
      <Typography variant="h2" gutterBottom align="center">Movies</Typography>
      <div>
            {actorMovies && !actorMoviesIsLoading ?
             <MovieList movies ={actorMovies} numberOfMovies={numberOfMovies} /> : 
             (
              <Box>
                No Recommended Movies Found
              </Box>
             )
            }
            <Pagination currentPage={page} setPage={setPage} totalPages = {actorMovies?.total_pages}/>
          </div>
    </Box>
  </>)
};

export default Actors;
