import React, { useState } from "react";
import {AppBar, IconButton, Toolbar, Drawer, Button, Avatar} from "@mui/material"
import {Menu, AccountCircle, Brightness4, Brightness7} from "@mui/icons-material"
import {Link} from "react-router-dom"
import useStyles from "./NavBarStyle"
import useMediaQuery from '@mui/material/useMediaQuery';
import Sidebar from "../SideBar/SideBar.jsx"
import useTheme from "@mui/material/styles/useTheme";

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
  /* Aux for Fire Base */
  const [authenticated, isAuthenticated] = useState(true)

  const theme = useTheme();
  return (
    <>
    {/* 
      For Tool Bar on Top
      App Bar is just a parent to Toolbar
    */}    
      <AppBar position = "fixed">
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
           {!isMobile && "Search..."}
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
                    onClick = {() => {}}
                  >
                    Login &nbsp; <AccountCircle/>
                  </Button>  
                 )
                : (
                  <Button
                    color = "inherit"
                    // Note the button is a Link
                    component = {Link}
                    to = "/profile/:id"
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
            {isMobile && "Search..."}
        </Toolbar>
      </AppBar>
      {/* For Side Bar */}
      <div>
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
