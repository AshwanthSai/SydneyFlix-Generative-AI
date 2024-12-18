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
    // useEffect(() => {console.log(command)}, [command])
    useEffect(() => {
        alanBtn({
            key: process.env.REACT_APP_ALAN_KEY,
            host: 'v1.alan.app',
            onConnectionStatus: function(status) {
              console.log("The status is " + status);
            },          
            onCommand: function({command, genres, genreOrCategory, searchQuery}){
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
              }
               else if (command === 'changeMode') {
                  if(mode == "dark"){
                    if(mode != "dark") setMode("dark")
                  } else {
                    setMode("light")
                  }
              } else if(command === 'login') {
                  fetchToken()
              } else if(command === 'logout') {
                  logOut()
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
      }, []);
};

export default useAlan;
