import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { tmdbApi } from "../services/TMDB";
/* Object below contains all our Reducers */
import genreOrCategoryReducer from '../features/currentGenreOrCategory';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    /* Slice Name : Reducer Object with All Reducers */
    currentGenreOrCategory : genreOrCategoryReducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

// Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);