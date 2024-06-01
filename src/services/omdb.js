import axios from 'axios';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = (query) => {
  return axios.get(`${BASE_URL}?t=${query}&apikey=${API_KEY}`);
};

export const getMovieDetails = (id) => {
  return axios.get(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
};
