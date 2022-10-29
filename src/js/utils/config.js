const urls = {
  BASE_URL: 'https://api.themoviedb.org/3/',
  GENRES_PATH_URL: 'genre/movie/list',
  TRENDINGS_PATH_URL: 'trending/movie/day',
  SEARCH_PATH_URL: 'search/movie',
  BASE_IMAGE_URL: 'https://image.tmdb.org/t/p/w500',
  GET_MOVIE_DETAILS_PATH_URL: 'movie/',
  GET_MOVIE_DISCOVER_URL: 'discover/movie',
};

const API_KEY = '1351fe1fee33f4dc7ca86c3a4fb4a61c';

const NOTIFY_UNCORRECT_SEARCH =
  'Search result is unsuccessful. Enter the correct movie name and try again!';

export { urls, API_KEY, NOTIFY_UNCORRECT_SEARCH };
