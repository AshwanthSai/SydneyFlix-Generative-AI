import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import {Switch,Route,Link} from "react-router-dom";
import {Actors, Movies, MoviesInformation, NavBar, Profile} from "./Components/index.js"
import useStyles from "./styles"
import { Provider } from 'react-redux'

export const App = () => {
  /* Returns an Object with Classnames as key and properties as values. */
  const classes = useStyles();
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
                <Route exact path="/movie/:id">
                  <MoviesInformation/>
                </Route>
                <Route exact path="/actors/:id">
                  <Actors/>
                </Route>
                <Route exact path={["/", "/approved"]}>
                  <Movies/>
                </Route>
                <Route exact path="/profile/:id">
                  <Profile/>
                </Route>
            </Switch>
          </div>
        </main>
      </div>
    </React.Fragment>
  )
};
