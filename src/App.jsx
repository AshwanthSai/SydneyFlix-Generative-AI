import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import {Switch,Route,Link} from "react-router-dom";
import {Actors, Movies, MoviesInformation, NavBar, Profile} from "./Components/index.js"
import useStyles from "./styles"

export const App = () => {
  const classes = useStyles();
  
  return (
    <React.Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <header>
          <NavBar/>
        </header>
        <main className={classes.content}>
          <div className={classes.toolbar}>
            <Switch>
                <Route exact path="/movie/:id">
                  <MoviesInformation/>
                </Route>
                <Route exact path="/actors/:id">
                  <Actors/>
                </Route>
                <Route exact path="/">
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
