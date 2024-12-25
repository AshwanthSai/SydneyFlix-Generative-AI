import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { tmdbApi } from "../services/TMDB";
/* Object below contains all our Reducers */
import genreOrCategoryReducer from '../features/currentGenreOrCategory';
import userReducer from '../features/auth';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    /* Slice Name : Reducer Object with All Reducers */
    currentGenreOrCategory : genreOrCategoryReducer,
    // Slice for managing user authentication
    user : userReducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

// Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

/* Aux for Making Dummy Store while testing */
import { combineReducers } from '@reduxjs/toolkit'

// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
  user: userReducer
})

export function setupStore(preloadedState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}