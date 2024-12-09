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
          return `discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genre}`;
        }

        /* For Home Page*/
        return `movie/popular?language=en-US&page=${page}`
      },
    }),
    
    getGenres: builder.query({
      query: () => `genre/movie/list?language=en`,
    }),

    getMovieDetails: builder.query({
      query: (id)=> `movie/${id}?language=en-US&append_to_response=videos,credits`,
    }),

    getMovieRecommendations: builder.query({
      query: (movie_id)=> `/movie/${movie_id}/recommendations`,
    }),

    getActorDetails: builder.query({
      query: (actor_id)=> `/person/${actor_id}`,
    }),

    getMoviesByActor: builder.query({
      query: (actor_id)=> `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_cast=${actor_id}`,
    }),

  }),
});

// Export hooks for usage in functional components
export const { useGetMoviesQuery, useGetGenresQuery,
               useGetMovieDetailsQuery, useGetMovieRecommendationsQuery,
               useGetActorDetailsQuery, useGetMoviesByActorQuery
} = tmdbApi;