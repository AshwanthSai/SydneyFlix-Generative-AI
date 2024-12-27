import React, { useContext, useEffect, useState } from "react";
import {AppBar, IconButton, Toolbar, Drawer, Button, Avatar, Box, styled} from "@mui/material"
import {Menu, AccountCircle, Brightness4, Brightness7} from "@mui/icons-material"
import {Link} from "react-router-dom"
import useStyles from "./NavBarStyle"
import useMediaQuery from '@mui/material/useMediaQuery';
import Sidebar from "../SideBar/SideBar.jsx"
import useTheme from "@mui/material/styles/useTheme";
import {Search} from ".."
import { fetchSessionID, fetchToken, moviesApi } from "../../utils/fetchToken.js";
import { useDispatch, useSelector } from "react-redux";
import { setUserData} from "../../features/auth.js";
import {userSelector} from "../../features/auth.js";
import {ColorModeContext} from "../../utils/ToggleColorMode"
import { useAppDispatch, useAppSelector } from "../../app/hooks.js";
/* 
  Nav Bar
    > Tool Bar
    > Side Bar
*/

const NavBar = () => {
  const {toggleColorMode} = useContext(ColorModeContext);
  const classes = useStyles();
  /* Anything above 600px is not Mobile */
  const isMobile = useMediaQuery('(max-width:600px)');
  /* For Left Nav Bar */
  const [mobileOpen, setMobileOpen] = useState(false)
  /* Used for Toggle */
  const theme = useTheme();
  const token = localStorage.getItem("token")
  const sessionIdFromLocalStorage = localStorage.getItem("session_id"); 
  const {genreIdOrCategoryName} = useSelector(store => store.currentGenreOrCategory)
  // const {genreIdOrCategoryName} = useAppSelector(store => store.currentGenreOrCategory)
  const dispatch = useDispatch();
  // const dispatch = useAppDispatch();
  /* Aux for login button, User.id to redirect to profile page. */
  const {isAuthenticated, user} = useSelector(userSelector)
  // const {isAuthenticated, user} = useAppSelector(userSelector)
  /* 
    If token exists and sessionIdFromLocalStorage
      - then request for User Data
    Else fetch Session ID
      - then request for User Data
  */
  useEffect(() => {
      const loginUser = async () => {
        try {
          if (token) {
            if (sessionIdFromLocalStorage) {
              /* 
               Once session is stored, since it is dependency for Use Effect.
               Component, re-renders and enters branch 2 
              */
              const { data} = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);
              dispatch(setUserData(data))
            } else {
              const session_id = await fetchSessionID(); 
              console.log(session_id)
              const {data} = await moviesApi.get(`/account?session_id=${session_id}`);
              dispatch(setUserData(data))
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      loginUser();
    }, [token, sessionIdFromLocalStorage]); 

  // onSmaller Screens, if we click on Genre or User, Side Bar should be closed
  useEffect(()=> {
    setMobileOpen(false)
  }, [user, genreIdOrCategoryName])

  return (
    <>
    {/* 
      For Tool Bar on Top
      App Bar is just a parent to Toolbar
    */}    
      <AppBar position="fixed">
      {/* Toolbar is the Blue Ribbon with Buttons */}
          <Toolbar className = {classes.toolbar}>
            {/*  Hamburger Menu  */}
            {isMobile &&
              <IconButton
                color = "inherit"
                edge = "start"
                style = {{outline : "none"}}
                onClick = {() => setMobileOpen((previousMobileState) => (!previousMobileState))}
                className = {classes.menuButton}
              >
                <Menu/>
              </IconButton>
            }
            {/* Dark Mode && Light Mode Switch */}
            <IconButton data-testid="color-switch" color="inherit" sx={{ml:1}}
             onClick = {toggleColorMode}>
             {/* Brightness4 & Brightness 7 are Buttons */}
              {theme.palette.mode === "dark" ? <Brightness4/> : <Brightness7 /> }
             </IconButton>
             {/* If not mobile, search in center or at last. */}
             {!isMobile && <Search/>}
              <div>
              {/*
                If not authenticated
                Show login button
                Else show
                My Movies and a Profile Link
              */}
                {!isAuthenticated ? (
                    <Button
                      color = "inherit"
                      onClick = {() => fetchToken()}
                      data-testid="profile-avatar"
                    >
                      Login &nbsp; <AccountCircle data-testid="login-button"/>
                    </Button>
                   )
                  : (
                    <Button
                      color = "inherit"
                      // Note the button is a Link
                      component = {Link}
                      to = {`/profile/${user.id}`}
                      className = {classes.linkButton}
                      onClick = {() => {}}
                    >
                    {!isMobile && <> My Movies &nbsp;</>}
                      <Avatar
                        sx = {{width : 30, height : 30, objectFit : "cover"}}
                        alt = "Profile"
                        src = {`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`}
                        data-testid="profile-avatar"
                      />
                    </Button>
                  )}
              </div>
              {/* If mobile, then render search last, in that case it will pop up to next line. */}
              {isMobile && <Search/>}
          </Toolbar>
      </AppBar>
      {/* For Side Bar */}
      <div>
      <Toolbar/>
        {/* Semantic Tag, we will use sidebar for navigation */}
          <nav className = {classes.drawer}>
          { isMobile ?
            (
              <Drawer
                variant = "temporary" // It should hide automatically
                anchor = "right" // It should open from right
                open = {mobileOpen} // State
                classes = {{paper : classes.drawerPaper}}
                // Model is always mounted to the DOM
                ModalProps = {{keepMounted:true}}
                // Internally manages, closing of the Side Bar
                onClose = {() => setMobileOpen((previousState) => !previousState)
                }
              >
                {/* Callback setMobileOpen passed to close inside */}
            <Sidebar setMobileOpen={setMobileOpen} />
              </Drawer>
            ) : (
              <Drawer
               // We are overriding the default width of the Sidebar.
               classes={{paper : classes.drawerPaper}}
               variant = "permanent"
               open
              >
                <Sidebar setMobileOpen={setMobileOpen}/>
              </Drawer>
            )}
          </nav>
      </div>
    </>
  )
};

export default NavBar;
