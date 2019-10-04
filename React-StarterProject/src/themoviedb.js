import axios from 'axios';

const artWorkBaseURL_200 = "https://image.tmdb.org/t/p/w200";

const themoviedbAPIKey = "d2557258feaca2d559f3f4f494a70d3e";

/**
 * Get a full URL for some path to an image on The Movie DB
 * @param path relative path to the image
 * @return the full URL as a String
 */
export function getTheMovieDBImageURL(path) {
  return artWorkBaseURL_200+path;
}

/**
 * Get TheMovieDB artwork for a movie
 * @param tconst the IMDB ID for the movie (of the form "tt0000000")
 * @return a Promise of TheMovieDB response from its find API;
 *        see https://developers.themoviedb.org/3/find/find-by-id for details
 */
export function getArtworkFromTheMovieDB(tconst) {
  return axios.get(`https://api.themoviedb.org/3/find/${tconst}`, {
     params: {
       api_key: themoviedbAPIKey,
       language: 'en-US',
       external_source:'imdb_id'
    }
  });
}

/**
 * Get credits information for a movie from The Movie DB
 * @param movieDBId The Movie DB ID for a movie
 * @return a Promise of TheMovieDB response from its credits API;
 *        see https://developers.themoviedb.org/3/movies/get-movie-credits
 */
export function getCreditsFromTheMovieDB(movieDBId) {
  return axios.get(`https://api.themoviedb.org/3/movie/${movieDBId}/credits`, {
    params: {
      /* Todo3: pass the TheMovieDB API key you stored in themoviedbAPIKey as the
         api_key parameter
      */
    }
  });
}
