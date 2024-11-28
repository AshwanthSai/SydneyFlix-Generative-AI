import { Box, Button, ButtonGroup, CircularProgress, Grid, Rating, Toolbar, Tooltip, Typography } from "@mui/material";
import Modal from '@mui/material/Modal';
import {Link} from  "react-router-dom"
import React, { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useGetMovieDetailsQuery } from "../../services/TMDB";
import useStyles from "./styles"
import genreIcons from "../../assets/genres"; 
import { useDispatch } from "react-redux";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import LanguageIcon from '@mui/icons-material/Language';
import MovieIcon from '@mui/icons-material/Movie';
import TheatersIcon from '@mui/icons-material/Theaters';
import { TrendingUpOutlined } from "@mui/icons-material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Movie = () => {
  const classes = useStyles()
  const {id} = useParams(); 
  const{data, error, isLoading} = useGetMovieDetailsQuery(id);
  const dispatch = useDispatch()
  /* Modal, Youtube Video */
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  /* Favorite or Un-favourited Icon & Text for Button */
  const isMovieFavorited = false;
  const isMovieWatchlisted = false;
  
  const addToFavorites = () => {

  } 
  const addToWatchlist = () => {

  }

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
        <Grid item sm={12} lg={4} align="center">
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
              <Typography gutterBottom variant="h5" align="center">
                  {data?.runtime} min / {data?.spoken_languages[0].name}
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
                    <Modal
                        keepMounted
                        open={open}
                        onClose={handleClose}
                    >
                      <p style={{align:"center"}}>
                      <iframe width="560" height="315" 
                        src="https://www.youtube.com/embed/cKlsejIDcA8?si=uf8W4C5MzD_-LZMT"></iframe> 
                      </p>
                    </Modal>
                  </ButtonGroup>
                </Grid>
                <Grid item xs={12} sm={6} className = {classes.buttonsContainer}>
                  <ButtonGroup size="small" variant="outlined">
                    <Button target = "_blank" onClick = {addToFavorites} endIcon={isMovieFavorited ? <FavoriteIcon/> : <FavoriteBorderIcon/>}>
                      {isMovieFavorited ? "Favorite" : "Unfavorite"}
                    </Button>
                    <Button target = "_blank" onClick = {addToWatchlist} endIcon={isMovieWatchlisted ? <PlusOneIcon/> : null}>
                      {isMovieWatchlisted ? "Watchlist" : "Unwatchlist"}
                    </Button>
                    <Button target = "_blank" onClick = {addToWatchlist} endIcon={<ArrowBackIcon/>}>
                        <Typography variant="subtitle2" component={Link} to="/" color="inherit" sx={{ textDecoration: 'none' }}>
                          Back
                        </Typography>
                    </Button>
                  </ButtonGroup>
                </Grid>
              </div>
            </Grid>
        </Grid>
      </Grid>
     </>
  )};

export default Movie;
