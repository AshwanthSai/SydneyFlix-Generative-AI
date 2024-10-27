import React from "react";
import {Divider, List, ListItem,ListItemButton, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress} from "@mui/material"
import {Link} from  "react-router-dom"
import useStyles from "./Sidebar"
import useTheme from "@mui/material/styles/useTheme";
import Blue from "../../Assets/Blue.png"
import Red from "../../Assets/Red.png"

const categories = [
  /* Value to send to API */
  {label:"Popular", value : "popular"},
  {label:"Top Rated", value : "top_rated"},
  {label:"Upcoming", value : "upcoming"},
]

const genres = [
  {label:"Comedy", value : "comedy"},
  {label:"Action", value : "action"},
  {label:"Horror", value : "horror"},
  {label:"Animation", value : "animation"}
]

const SideBar = ({setMobileOpen}) => {
  const theme = useTheme();
  const classes = useStyles();
  
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
                            src = {Red}     
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
      {genres.map(({label, value}) => {
          return (<ListItem onClick = {() => {}} key ={value}>
                    <ListItemButton component="a" href="#simple-list">
                        <ListItemIcon>
                        <img 
                            className={classes.genreImages}
                            src = {Red}      
                            style={{ height: "20px", width: "20px" }} // Corrected style prop
                        />
                        </ListItemIcon>
                      <ListItemText primary={label} />
                    </ListItemButton>
                  </ListItem>)
      })}
      </List>
    </>
  )
};

export default SideBar;
