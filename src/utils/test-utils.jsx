import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import {act} from 'react';
import { tmdbApi } from "../services/TMDB";
/* Object below contains all our Reducers */
import genreOrCategoryReducer from '../features/currentGenreOrCategory';
import userReducer from '../features/auth';
import ToggleColorMode from "./ToggleColorMode.jsx";
import { setupStore } from "../app/store.js";


export function renderWithProviders(ui, extendedRenderOptions = {}) {
  const {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions

  const Wrapper = ({ children }) => {
    return(
      <>
        <Provider store={store}>
          <ToggleColorMode>
              <BrowserRouter>
                { children }
              </BrowserRouter>
          </ToggleColorMode>
        </Provider>
    </>)
  }

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  }
}