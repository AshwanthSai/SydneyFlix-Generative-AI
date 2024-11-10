import React from "react";
import { userSelector } from "../../features/auth";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Button from '@mui/material/Button';

const favouriteMovies = [
  {
      title: "The Great Adventure",
      year: 2021,
      genre: "Action",
      rating: 8.5,
  },
  {
      title: "Love in the Time of Quarantine",
      year: 2020,
      genre: "Romantic Comedy",
      rating: 7.2,
  },
  {
      title: "Mystery of the Lost Artifact",
      year: 2019,
      genre: "Mystery",
      rating: 6.8,
  },
  {
      title: "The Last Stand",
      year: 2022,
      genre: "Thriller",
      rating: 9.0,
  },
  {
      title: "Space Odyssey",
      year: 2023,
      genre: "Sci-Fi",
      rating: 8.0,
  },
  {
      title: "The Chef's Secret",
      year: 2021,
      genre: "Drama",
      rating: 7.5,
  },
  {
      title: "Underwater Explorers",
      year: 2020,
      genre: "Documentary",
      rating: 8.3,
  },
  {
      title: "The Enchanted Forest",
      year: 2018,
      genre: "Fantasy",
      rating: 7.9,
  },
  {
      title: "A Day in Paradise",
      year: 2022,
      genre: "Adventure",
      rating: 8.1,
  },
  {
      title: "Ghosts of the Past",
      year: 2021,
      genre: "Horror",
      rating: 6.5,
  },
];

const Profile = () => {
  const {user :{username}} = useSelector(userSelector);
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
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToAppIcon/>
        </Button>
      </Box>   
        {
          !favouriteMovies.length ? (<Typography variant="h5">
            Add Favorites or watch list some movies to see them here !
           </Typography>) : (
            <Box> FAVORITE MOVIES </Box>
           )
        }
    </Box>
  </>
  )
};

export default Profile;
