// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const page = 1
// Define a service using a base URL and expected endpoints
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  prepareHeaders: () => {
    const API_KEY = process.env.REACT_APP_TMDBKEY;
    // If we have a token set in state, let's assume that we should be passing it.
    const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
    return headers
  },
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: (name) => `popular?language=en-US&page=${page}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMovies } = tmdbApi