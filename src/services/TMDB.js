import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = process.env.REACT_APP_TMDBKEY; 

//* Basic Input -> Out
/* Aux Explanations */
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
     baseUrl: 'https://api.themoviedb.org/3/',
     headers: {Authorization: `Bearer ${API_KEY}`}
  }),

  endpoints: (builder) => ({
    /* 
      Get Movies - depending on category or genre 
      Default Popular Movies for Home Page 
    */
    getMovies: builder.query({
      query: ({genreIdOrCategoryName, page, searchQuery}) => {
        const genre = genreIdOrCategoryName;

        /* For Search Query */
        if(searchQuery){
          return `search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=${page}`;
        }
        /* 
          For Movie Lists -> Upcoming, Top Rated or Popular
         */
        if(genre && typeof(genre)===  "string") {
          console.log("Called")
          return `movie/${genre}?language=en-US&page=${page}`
        }
        /* 
          For Movie Lists on the basis of Genre
        */
        if(genre && typeof(genre) === "number") {
          console.log("Called")
          return `discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genre}`;
        }

        /* For Home Page*/
        return `movie/popular?language=en-US&page=${page}`
      },
    }),
    getGenres: builder.query({
      query: () => `genre/movie/list?language=en`,
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetMoviesQuery, useGetGenresQuery} = tmdbApi;