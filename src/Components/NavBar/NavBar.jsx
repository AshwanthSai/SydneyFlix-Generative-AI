import React, { useEffect, useState } from "react";
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

/* 
  Nav Bar
    > Tool Bar
    > Side Bar
*/

const NavBar = () => {
  const classes = useStyles();
  /* Anything above 600px is not Mobile */
  const isMobile = useMediaQuery('(max-width:600px)');
  /* For Left Nav Bar */
  const [mobileOpen, setMobileOpen] = useState(false)
  /* Used for Toggle */
  const theme = useTheme();
  const token = localStorage.getItem("token")
  const sessionIdFromLocalStorage = localStorage.getItem("session_id"); 
  const dispatch = useDispatch();
  /* Aux for login button, User.id to redirect to profile page. */
  const {isAuthenticated, user} = useSelector(userSelector)
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
            <IconButton color="inherit" sx={{ml:1}}
             onClick = {() => {}}>
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
                    >
                      Login &nbsp; <AccountCircle/>
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
                        style = {{width : 30, height : 30}}
                        alt = "Profile"
                        src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_kSSoomJ9hiFXmiF2RdZlwx72Y23XsT6iwQ&s"
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
