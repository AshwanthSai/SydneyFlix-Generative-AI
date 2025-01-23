import alanBtn from '@alan-ai/alan-sdk-web';
import React, { useContext, useEffect, useState } from "react";
import { ColorModeContext } from '../utils/ToggleColorMode';
import { fetchToken, logOut } from '../utils/fetchToken';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { selectGenreOrCategory, setSearchQuery } from '../features/currentGenreOrCategory';

/* 
  Component which Manages Alan AI
  Text/Voice Logic in Client App
*/

const useAlan = () => {
    const {mode, setMode} = useContext(ColorModeContext);
    const history = useHistory();
    const dispatch = useDispatch();
    const accountID = localStorage.getItem("account_id")
    useEffect(() => {
      
        var alanBtnInstance = alanBtn({
            key: process.env.REACT_APP_ALAN_KEY,
            host: 'v1.alan.app',
            onConnectionStatus: function(status, ) {
              console.log("The status is " + status);
            },     
            onButtonState: async function(status) {
              if (status === 'ONLINE') {
                if (!this.greetingWasSaid) {
                  await alanBtnInstance.activate();
                  alanBtnInstance.playText("Hello! I'm Sai. Your Personal Assistant, How can I help you?");
                  this.greetingWasSaid = true
                }
              }
            },     
            onCommand: function({command, cMode, genres, genreOrCategory, searchQuery, route, actorName, movieName, page}){
              if(command === 'chooseGenre') {
                const foundGenre = genres.find((g) => g.name.toLowerCase() == genreOrCategory.toLowerCase());
                // Genre
                if(foundGenre){
                  dispatch(selectGenreOrCategory(foundGenre.id))
                  history.push("/")
                } else {
                 // Category
                 const category = genreOrCategory.startsWith("top") ? "top_rated" : genreOrCategory
                 dispatch(selectGenreOrCategory(category))
                 history.push("/")
                }
              } else if(command == 'searchMode') {
                dispatch(setSearchQuery(searchQuery))
              } else if(command == 'OpenMovie') {
                // Fetch a piece of the Movie Name
                let prefix = movieName.toLowerCase().split(" ")[0]
                // Fetch all DOM nodes with Movie Name included in Title
                // If a user writes in lower case, you do not want the search to fail.
                const similarItems = document.querySelectorAll(`[id*="${prefix}"]`);
                // If there are a lot of movies with similiar names, ask the user to refine his search
                if(similarItems.length > 0){
                  similarItems[0].click()
                  // Scroll to the top of the page
                  window.scrollTo(0, 0);
                } else {
                  sendText("Sorry, I could not find that on screen, Please refine your search")
                }
              } else if(command == 'OpenActor') {
                let prefix = actorName.toLowerCase().split(" ")[0]
                // Fetch all DOM nodes with Movie Name included in Title
                // If a user writes in lower case, you do not want the search to fail.
                const similarItems = document.querySelectorAll(`[id*="${prefix}"]`);
                // If there are a lot of movies with similiar names, ask the user to refine his search
                if(similarItems.length == 1){
                  similarItems[0].click()
                  // Scroll to the top of the page
                  window.scrollTo(0, 0);
                } else {
                  sendText("Sorry, I could not find that on screen, Please refine your search")
                }
              } else if (command === 'changeMode') {
                if(cMode == "light") {
                  setMode(prevMode => (prevMode = 'light' ));
                } else {
                  setMode(prevMode => (prevMode = 'dark' ));
                }
              } else if(command === 'login') {
                  fetchToken()
              } else if(command === 'logout') {
                  logOut()
              } else if(command === "navigation"){
                if(route == "favorites") {
                  history.push(`/profile/${accountID}`)
                } else if(route == "home"){
                  dispatch(selectGenreOrCategory(""))
                  history.push("/")
                }
              } else if(command === "MoviePage") {
                 let webPageButton = document.getElementById("webPageButton")
                 webPageButton.click()
              } else if(command === "TrailerPage") {
                let trailerButton = document.getElementById("trailer")
                trailerButton.click()
              } else if(command === "IMDB") {
                let IMDBButton = document.getElementById("IMDB")
                IMDBButton.click()
              } else if(command == "ToggleFavourite") {
                let FavoriteOrUnFavoriteButton = document.getElementById("FavoriteOrUnFavoriteButton")
                FavoriteOrUnFavoriteButton.click()
              } else if(command == "ToggleWatchlist") {
                let FavoriteOrUnWatchlistButton = document.getElementById("WatchListOrUnWatchlistButton")
                FavoriteOrUnWatchlistButton.click()
             }  else if(command == "GoBack") {
                history.goBack()
                window.scrollTo(0, 0);
            } else if(command == "GoFront") {
                history.goForward()
                window.scrollTo(0, 0);
            } 
          }, 
            onEvent: function (e) {
                switch (e.name) {
                  case "recognized":
                    console.info('Interim results:', e);
                    break;
                  case "parsed":
                    console.info('Final result:', e);
                    break;
                  case "text":
                    console.info('Alan AI reponse:', e);
                    break;
                  default:
                    console.info('Unknown event');
                }
            },
            });
      function sendText(message) {
          // alanBtnInstance.sendText(message);
          alanBtnInstance.playText(message);
      }
      }, []);
};

export default useAlan;
