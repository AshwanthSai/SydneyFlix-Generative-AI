import { Box, CircularProgress, Grid, Rating, Toolbar, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useGetMovieDetailsQuery } from "../../services/TMDB";
import useStyles from "./styles"

const Movie = () => {
  const classes = useStyles()
  const {id} = useParams(); 
  const{data, error, isLoading} = useGetMovieDetailsQuery(id);
  console.log(data)

  if(isLoading) {
    return(
      <Box className={classes.centerScreen}>
          {/* To handle MUI Toolbar Bug */}
        <Toolbar/>
        <CircularProgress size = "7rem"/>
      </Box>
    )
  }

  if(!data){
    return(
    /* 
      Place item within Div at Center of Y axis with a Margin top of 20px
    */
   
    <Box display = "flex" alignItems = "center" mt="100px">
      <Toolbar/>
      <Typography variant = "h4">
       {` Oops! We could not retrieve the details for ${id}.
       Please check your internet connection and try again. 
       If the problem persists, feel free to contact support.`}
      </Typography>
    </Box>
    )
  }

  if(error) return "An error has occurred"

  return (
     <> 
     {/* MUI Toolbar Bug - Empty toolbar to start rendering after toolbar */}
      <Toolbar/>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} 
        className={classes.containerSpaceAround}
      >
      {/* sm, lg are all essentially proportionality in the screen*/}
        <Grid item sm={12} lg={4}>
          <img 
            className = {classes.poster}
            src={`https://image.tmdb.org/t/p/w300/${data.poster_path}`}
            alt={data?.title}
          />
        </Grid>
        <Grid item container direction="column" sm={12} lg={6}>
          <Typography variant="h3" gutterBottom>
            {`${data?.title} (${data?.release_date.split("-")[0]})`}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {data?.tagline ? (data?.tagline) : " "}
          </Typography>
          <Grid item className ={classes.containerSpaceAround}>
            <Box display ="flex" align="center">
              <Rating name="read-only" value={data?.vote_average ? data.vote_average / 2 : 0} readOnly />
              <Typography variant="subtitle_1" gutterBottom>
                  {data?.vote_average} / 10
              </Typography>
            </Box>
            <Typography variant="h6" gutterBottom>
                  {data?.runtime ? data?.runtime : ""}min / {data?.spoken_languages ? data?.spoken_languages[0].name : ""}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
     </>
  )};

export default Movie;
