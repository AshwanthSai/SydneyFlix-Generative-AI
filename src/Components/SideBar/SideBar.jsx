import React from "react";
import {Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress} from "@mui/material"
import {Link} from  "react-router-dom"
import useStyles from "./Sidebar"
import useTheme from "@mui/material/styles/useTheme";
import Blue from "../../Assets/Blue.png"
import Red from "../../Assets/Red.png"
import { useGetGenresQuery } from "../../services/TMDB";
import {selectGenreOrCategory} from "../../features/currentGenreOrCategory"
import genreIcons from "../../Assets/genres"; 
import { useDispatch} from "react-redux";

const categories = [
  /* Value to send to API */
  {label:"Popular", value : "popular"},
  {label:"Top Rated", value : "top_rated"},
  {label:"Upcoming", value : "upcoming"},
]

const SideBar = ({setMobileOpen}) => {
  const theme = useTheme();
  const classes = useStyles()
  const {data, isFetching} = useGetGenresQuery()
  const dispatch = useDispatch()

  return (
    <>
      {/* Logo Link*/}
      <Link to="/" onClick = {() => {dispatch(selectGenreOrCategory(""))}} className = {classes.imageLink}>
        <img 
          alt="logo"
          className={classes.image}
          src={theme.palette.mode === "light" ? Blue : Red}     
        />
      </Link>
      <Divider/>
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
              <Link to="/" key={value} className={classes.links}>
                <ListItem onClick={() => {
                    dispatch(selectGenreOrCategory(value))
                }}>
                  <ListItemIcon>
                    <img src={genreIcons[label.toLowerCase()]} className={classes.genreImages} height={30}/>
                  </ListItemIcon>
                    <ListItemText primary={label} />
                </ListItem>
              </Link>
        ))}
      </List>
      <Divider/>
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size="4rem" />
          </Box>
        )
          : data?.genres?.map(({ name, id }) => (
            <Link key={name} className={classes.links} to="/">
              <ListItem button onClick={() => {
                dispatch(selectGenreOrCategory(id))
                }
              }>
                <ListItemIcon>
                  <img src={genreIcons[name.toLowerCase()]} className={classes.genreImages} height={30} />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))}
      </List>
    </>
  )
};

export default SideBar;
