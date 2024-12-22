import React, { useRef } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import {Switch,Route,Link} from "react-router-dom";
import {Movies, NavBar} from "./Components/index.js"
import useStyles from "./styles"
import useAlan from "./Components/Alan.jsx";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min.js";
import { Box, CircularProgress } from "@mui/material";

// Lazy Loading Components
const Actors = React.lazy(() => import("./Components/Actors/Actors.jsx"))
const MoviesInformation = React.lazy(() => import("./Components/MovieInformation/MoviesInformation.jsx"))
const Profile = React.lazy(() => import("./Components/Profile/Profile.jsx"))


export const App = () => {
  /* Returns an Object with Classnames as key and properties as values. */
  const classes = useStyles();
  const alanBtnContainer = useRef(); //* Creating a Ref 
  // Aux for Lazy Loading
  const LoadingFallback = () => (
    <Box className={classes.centerScreen}>
      <CircularProgress size="7rem" />
    </Box>
  );
  
  //Runs the useEffect hook within the useAlan hook on App Mount
  useAlan();
  return (
    <React.Fragment>
    {/* Attaching class from classes object */}
      <div className={classes.root}>
        {/* Adds MUI Baseline Styles to Entire App */}
        <CssBaseline />
        <header>
        {/* Holds Both Side Bar and Tool Bar */}
          <NavBar/>
        </header>
        {/* All Content Component is Wrapped in a Main Div */}
        <main className={classes.content}>
          <div className={classes.toolbar}>
            <Switch>
                <Route exact path={"/"}>
                  <Movies/>
                </Route>
                <Route exact path="/movie/:id">
                    <React.Suspense fallback={<LoadingFallback/>}>
                        <MoviesInformation/>
                    </React.Suspense>
                </Route>
                <Route exact path="/actors/:id">
                    <React.Suspense fallback={<LoadingFallback/>}>
                          <Actors/>
                    </React.Suspense>
                </Route>
                <Route exact path="/profile/:id">
                   <React.Suspense fallback={<LoadingFallback/>}>
                          <Profile/>   
                    </React.Suspense>
                </Route>
                <Redirect to="/" />
            </Switch>
          </div>
        </main>
        {/* Renderind Alan Button into Empty div */}
        <div ref ={alanBtnContainer} /> 
      </div>
    </React.Fragment>
  )
};
