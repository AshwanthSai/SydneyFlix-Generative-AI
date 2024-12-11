import { Box, Button, ButtonGroup, CircularProgress, Grid, Rating, Toolbar, Tooltip, Typography, useMediaQuery } from "@mui/material";
import Modal from '@mui/material/Modal';
import {Link} from  "react-router-dom"
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useGetFavoriteMoviesQuery, useGetMovieDetailsQuery, useGetMovieRecommendationsQuery, useGetWatchListedMoviesQuery} from "../../services/TMDB";
import useStyles from "./styles"
import genreIcons from "../../assets/genres"; 
import { useDispatch } from "react-redux";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import LanguageIcon from '@mui/icons-material/Language';
import MovieIcon from '@mui/icons-material/Movie';
import TheatersIcon from '@mui/icons-material/Theaters';
import { MovieTwoTone, TrendingUpOutlined } from "@mui/icons-material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RemoveIcon from '@mui/icons-material/Remove';
import MovieList from "../MovieList/MovieList";
import Pagination from "../Pagination/Pagination";
import { useTheme } from "@emotion/react";
import axios from "axios";

const Movie = () => {
  const classes = useStyles()
  const dispatch = useDispatch();
  const {id} = useParams(); 
  const [page, setPage] = useState(1)
  const{data, error, isLoading} = useGetMovieDetailsQuery(id);
  const{data: recommendations, error:recommendationsFetchingError, isLoading:isRecommendationsLoading} = useGetMovieRecommendationsQuery(({movie_id: id, page: page.toString()}));
  const theme = useTheme();
  let history = useHistory();
  /* Slicing number of movies depending on screen size to prevent gap within list. */
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isL = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  let numberOfMovies = 10; // Default value
  if (isXl) {
    numberOfMovies = 14;
  } else if (isL) {
    numberOfMovies = 12;
  } else if (isMd) {
    numberOfMovies = 12;
  } else if(isSm) {
    numberOfMovies = 10;
  } 
  /* Modal, Youtube Video */
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  /* Favorite or Un-favorite Icon & Text for Button */  
  const [isMovieFavorited, setIsMovieFavorite] = useState("false");
  const [isMovieWatchlisted,setIsMovieWatchlisted] = useState("false");
  const accountID = localStorage.getItem("account_id")
  const sessionID = localStorage.getItem("session_id")
  const{data: watchListMovies, error:watchListMoviesError, isLoading:watchListMoviesLoading} = useGetWatchListedMoviesQuery(({userID: accountID, page: 1, session_id : sessionID}));
  const{data: favouriteMovies, error:favouriteMoviesError, isLoading:favouriteMoviesLoading} = useGetFavoriteMoviesQuery(({userID: accountID, page: 1, session_id : sessionID}));

  console.log(favouriteMovies)

  useEffect(() => {
    setIsMovieFavorite(!!favouriteMovies?.results?.find((movie) => movie?.id == id));
  }, [favouriteMovies, id]);

  useEffect(() => {
    setIsMovieWatchlisted(!!watchListMovies?.results?.find((movie) => movie?.id == id));
  }, [watchListMovies, id]);

  let config = {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      // eslint-disable-next-line max-len
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDk3ODY1MTkyMDI2N2IzNTFhMzNiNWQ1NTEzMWU2NSIsIm5iZiI6MTcyMzEyNTAzNi4yODE5OTk4LCJzdWIiOiI2NmI0Y2QyYzJkYzI4ZTQzNTk3YTlkYjAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-iLsD84ilg-j9ZYCXC1TNF-EdFcQ1LYUysE_dok5uCM'
    }
  }

  const addToFavorites = async () => {
    try {
      const response = await axios.post(`https://api.themoviedb.org/3/account/${accountID}/favorite?api_key=${process.env.REACT_APP_TMDBKEY}&session_id=${sessionID}`, {
          "media_type": "movie",
          "media_id": `${id}`,
          "favorite": true
      },config);

      if (response.data.success === true) {
        console.log('Successfully added to favorites:', response.data);
      } else {
        console.error('Failed to add to favorites:', response.data);
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
    setIsMovieFavorite((prev) => !prev)
  };
  
  const addToWatchlist = async() => {
    try {
      const response = await axios.post(`https://api.themoviedb.org/3/account/${accountID}/watchlist?api_key=${process.env.REACT_APP_TMDBKEY}&session_id=${sessionID}`, {
          "media_type": "movie",
          "media_id": `${id}`,
          "watchlist": true
      },config);

      if (response.data.success === true) {
        console.log('Successfully added to watchlist:', response.data);
      } else {
        console.error('Failed to add to watchlist:', response.data);
      }
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
    setIsMovieWatchlisted((prev) => !prev)
  }

  if(isLoading) {
    return(
      <Box className={classes.centerScreen}>
          {/* To handle MUI Toolbar Bug */}
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

      {/* 
        Grid 
          Specify the proportion of each item. xs = 4, md = 5
          each row on the grid can accommodate at max 12 cells. 
          The rest is pushed down.
        Sometimes you create a nested grid (item container) to group items together.
        Like cast photos.
      */}

      <Grid container 
        className={classes.containerSpaceAround}
      >
      {/* sm, lg are all essentially proportionality in the screen*/}
        <Grid item sm={12} lg={4} align="center" style={{display:"flex", marginBottom:"30px"}}>
          <img 
            className = {classes.poster}
            src={`https://image.tmdb.org/t/p/w300/${data.poster_path}`}
            alt={data?.title}
          />
        </Grid> 
        <Grid item container direction="column" lg={7}>
          <Typography variant="h3" align="center" gutterBottom>
            {`${data?.title} (${data?.release_date.split("-")[0]})`}
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            {data?.tagline}
          </Typography>
            <Grid item className ={classes.containerSpaceAround}>
              <Box display ="flex" align="center">
                <Rating name="read-only" value={data?.vote_average ? data.vote_average / 2 : 0} readOnly />
                <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '10px' }}>
                    {data?.vote_average} / 10
                </Typography>
              </Box>
              <Typography gutterBottom variant="h6" align="center" >
                {data?.runtime} min | Language: {data?.spoken_languages[0].name}
              </Typography>
            </Grid>
            <Grid item className={classes.genresContainer}>
                {/* 
                  We are adding, display flex to Link
                  So that the Image and Label are spaced apart
                */}
              {data?.genres?.map((genre) => (
                <Link className={classes.links} key={genre.name} to="/" onClick={() => dispatch(selectGenreOrCategory(genre.id))}>
                  {/* 
                    Pattern we used in Sidebar, we are fetching src from an Object
                    that is looking for a key
                    */}
                  <img src={genreIcons[genre.name.toLowerCase()]} 
                    className={classes.genreImage} height={30} />
                  <Typography color="textPrimary" variant="subtitle1">
                    {genre?.name}
                  </Typography>
                </Link>
              ))}
            </Grid>
            <Grid item>
              <Typography variant="h5" gutterBottom style={{marginTop : "10px"}}>
                Overview
              </Typography>
              <Typography style={{marginBottom:"2rem"}}>
                {data?.overview}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" gutterBottom>
                Top Cast
              </Typography> 
            </Grid>
            {/* For Cast Photos */}
            <Grid item container spacing={2}>
            {data && data?.credits?.cast?.slice(0, 6).map((character, i) => (
              character.profile_path && (
                <Grid key={i} item xs={4} md={2} 
                 // The component internally is a Link
                 component={Link} 
                 to={`/actors/${character.id}`}
                 // To prevent the link from being underlined
                 style={{ textDecoration: 'none' }}>
                  <img
                    className={classes.castImage}
                    src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                    alt={character.name}
                  />
                  {/* Text Primary - Black */}
                  <Typography color="textPrimary" align="center">{character?.name}</Typography>
                  {/* Text Secondary - Grey */}
                  <Typography color="textSecondary" align="center">
                    {character.character.split('/')[0]}
                  </Typography>
                </Grid>)
             ))}
            </Grid>
            <Grid item container style ={{marginTop: "2rem"}}>
              {/* Segregate into Groups of 2 (3 x 2 = 6)*/}
              <div className = {classes.buttonsContainer}>
                {/* Each Group */}
                <Grid item xs={12} sm={6} className = {classes.buttonsContainer}>
                  <ButtonGroup size="small" variant="outlined">
                  {/* If you {} a text attribute, it returns a text attribute */}
                  <Button target = "_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<LanguageIcon/>}>Website</Button>
                  <Button target = "_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data.imdb_id}/`} endIcon={<MovieIcon/>}>IMDB</Button>
                  <Button target = "_blank" rel="noopener noreferrer" href="" endIcon={<TheatersIcon/>} onClick = {handleOpen}> Trailer</Button>
                  </ButtonGroup>
                </Grid>
                <Grid item xs={12} sm={6} className = {classes.buttonsContainer}>
                  <ButtonGroup size="small" variant="outlined">
                    <Button target = "_blank" onClick = {addToFavorites} endIcon={isMovieFavorited ? <FavoriteIcon/> : <FavoriteBorderIcon/>}>
                      {isMovieFavorited ? "Favorite" : "Unfavorite"}
                    </Button>
                    <Button target = "_blank" onClick = {addToWatchlist} endIcon={isMovieWatchlisted ? <PlusOneIcon/> : <RemoveIcon/>}>
                      {isMovieWatchlisted ? "Watchlist" : "Unwatchlist"}
                    </Button>
                    <Button target = "_blank" onClick = {addToWatchlist} endIcon={<ArrowBackIcon/>}>
                        <Typography variant="subtitle2" onClick = {() => history.goBack()} color="inherit" sx={{ textDecoration: 'none' }}>
                          Back
                        </Typography>
                    </Button>
                  </ButtonGroup>
                </Grid>
              </div>
            </Grid>
        </Grid>
      </Grid>
      {/* Box == Div that is easy to style */}
      <Box marginTop = "5rem" width= "100%">
          <Typography variant="h3" gutterBottom align="center">You might also like</Typography>
          <div>
            {recommendations && !isRecommendationsLoading ?
             <MovieList movies ={recommendations} numberOfMovies={numberOfMovies} /> : 
             (
              <Box>
                No Recommended Movies Found
              </Box>
             )
            }
            <Pagination currentPage={page} setPage={setPage} totalPages={recommendations?.total_pages}/>
          </div>
      </Box>
 {/*      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            className={classes.video}
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoplay"
          />
        )}
      </Modal> */}
     </>
  )};

export default Movie;
