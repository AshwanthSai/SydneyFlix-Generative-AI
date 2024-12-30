import React, { useEffect } from "react";
import { userSelector } from "../../features/auth";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Button from '@mui/material/Button';
import { useGetFavoriteMoviesQuery, useGetWatchListedMoviesQuery } from "../../services/TMDB";
import RatedCards from "../RatedCards/RatedCards";

const Profile = () => {
  const {user :{username}} = useSelector(userSelector)
  const accountID = localStorage.getItem("account_id")
  const sessionID = localStorage.getItem("session_id")
  
  /* Pagination and API calls */
  const{data: watchListMovies, refetch: refetchWatchListMovies, error:watchListMoviesError, isLoading:watchListMoviesLoading} = useGetWatchListedMoviesQuery(({userID: accountID, page: 1, session_id : sessionID}));
  const{data: favouriteMovies, refetch: refetchFavouriteMovies, error:favouriteMoviesError, isLoading:favouriteMoviesLoading} = useGetFavoriteMoviesQuery(({userID: accountID, page: 1, session_id : sessionID}));

 useEffect(() => {
    /* Refetch on Component Mount */
    refetchWatchListMovies()
    refetchFavouriteMovies()
  }, [watchListMovies, favouriteMovies]) 

  const logout = () => {
    localStorage.clear();
    window.location.href = "/"
  }

  return (
    <>
    {/* 
      For Grouping (Banner and Icon +  Favorite Movies)
      Box by default will take 100% of width (Block Element)
    */}
    {/* sx to handle toolbar bug in MUI */}
    <Box sx={{margin:"20px", marginTop: "90px"}}>
      {/* For Banner and Icon */}
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>My Profile</Typography>
        <Button color="inherit" onClick={logout} data-testid = "logout-button">
          Logout &nbsp; <ExitToAppIcon/>
        </Button>
      </Box>   
           {(favouriteMoviesLoading && !favouriteMovies?.results?.length) ? (
              <Typography variant = "h5">Add favorite movies to see them here!</Typography>
            ) : (
              <>
                <Box display="flex" flexWrap = "wrap" flexDirection = "column">
                  <RatedCards title= "Favorite Movies" movies = {favouriteMovies}/>
                </Box>
              </>
            )
            } 
            {(watchListMoviesLoading) ? (
              <Typography variant = "h5">Watchlist movies to see them here!</Typography>
            ) : (
              <>
                <Box display="flex" flexWrap = "wrap" flexDirection = "column">
                  <RatedCards title= "Watchlist Movies" movies = {watchListMovies}/>
                </Box>
              </>
            )
            } 
      </Box>
    </>
  )
};

export default Profile;
