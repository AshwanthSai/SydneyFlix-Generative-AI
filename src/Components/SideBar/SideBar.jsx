import React from "react";
import {Divider, List, ListItem,ListItemButton, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress} from "@mui/material"
import {Link} from  "react-router-dom"
import useStyles from "./Sidebar"
import useTheme from "@mui/material/styles/useTheme";
import Blue from "../../assets/Blue.png"
import Red from "../../assets/Red.png"
import { useGetGenresQuery } from "../../services/TMDB";
/* 
  If you do this, it automatically pulls from index.js
  an Object in this case.
*/
import genreIcons from "../../assets/genres"; 

const categories = [
  /* Value to send to API */
  {label:"Popular", value : "popular"},
  {label:"Top Rated", value : "top rated"},
  {label:"Upcoming", value : "upcoming"},
]

const genres = [
  {id:"Comedy", name : "comedy"},
  {id:"Action", name : "action"},
  {id:"Horror", name : "horror"},
  {id:"Animation", name : "animation"}
]

const SideBar = ({setMobileOpen}) => {
  const theme = useTheme();
  const classes = useStyles();
  const {data, isFetching} = useGetGenresQuery()

  return (
    <>
      {/* Logo Link*/}
      <Link to="/" className = {classes.imageLink}>
        <img 
          className={classes.image}
          src={theme.palette.mode === "light" ? Blue : Red}     
        />
      </Link>
      <Divider/>
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Categories
          </ListSubheader>
        }
      >
        {categories.map(({label, value}) => {
          return (<ListItem disablePadding key ={value}>
                    <ListItemButton component="a" href="#simple-list">
                        <ListItemIcon>
                        <img 
                            className={classes.image}
                            src = {genreIcons[value.toLowerCase()]}     
                            style={{ height: "20px", width: "20px" }} // Corrected style prop
                        />
                        </ListItemIcon>
                      <ListItemText primary={label} />
                    </ListItemButton>
                  </ListItem>)
        })}
      </List>
      <Divider/>
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Genres
          </ListSubheader>
        }
      >
      {isFetching ? (
        <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
        </Box>
      ) : 
        (data.genres.map(({id, name}) => {
          return (
            <ListItem id onClick = {() => {}} key ={id}>
                    <ListItemButton component="a" href="#simple-list">
                        <ListItemIcon>
                        <img 
                            className={classes.genreImages}
                            src = {genreIcons[name.toLowerCase()]}      
                            style={{ height: "20px", width: "20px" }} // Corrected style prop
                        />
                        </ListItemIcon>
                      <ListItemText primary={name} />
                    </ListItemButton>
            </ListItem>
          )
        }))
      }
      </List>
    </>
  )
};

export default SideBar;
