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
      //query: (movie_id, page) => `movie/${movie_id}/recommendations?language=en-US&page=${page}`, //1
      query: ({movie_id, page}) => {
        return `movie/${movie_id}/recommendations?include_adult=false&language=en-US&page=${page}`}, // 2
    }),

    getActorDetails: builder.query({
      query: (actor_id)=> `/person/${actor_id}'`,
    }),

    getMoviesByActor: builder.query({
      query: ({actor_id, page})=> {
        return `discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_cast=${actor_id}`
      }
    }),

    getWatchListedMovies: builder.query({
      query: ({userID, page, session_id}) => {
        return `account/${userID}/watchlist/movies?language=en-US&page=${page}&session_id=${session_id}&sort_by=created_at.asc`;
      }
    }),

    getFavoriteMovies: builder.query({
      query: ({userID, page, session_id})=> {
        return `account/${userID}/favorite/movies?language=en-US&page=${page}&session_id=${session_id}&sort_by=created_at.asc`;
      }
    }),

  }),
});

// Export hooks for usage in functional components
export const { useGetMoviesQuery, useGetGenresQuery,
               useGetMovieDetailsQuery, useGetMovieRecommendationsQuery,
               useGetActorDetailsQuery, useGetMoviesByActorQuery,
               useGetWatchListedMoviesQuery, useGetFavoriteMoviesQuery
} = tmdbApi;