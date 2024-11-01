import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const page = 1;
const API_KEY = process.env.REACT_APP_TMDBKEY; // Ensure this is defined in your .env file

// Define a service using a base URL and expected endpoints
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
     baseUrl: 'https://api.themoviedb.org/3/',
     headers: {Authorization: `Bearer ${API_KEY}`}
  }),
  endpoints: (builder) => ({
    // Get Popular Movies 
    getMovies: builder.query({
      query: () => `movie/popular?language=en-US&page=${page}`,
       // Ensure the endpoint is correct
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetMoviesQuery  } = tmdbApi;