const axios = require('axios').default;

export default class ApiService {
  #API_KEY = '1351fe1fee33f4dc7ca86c3a4fb4a61c';
  //змінити базовий юрл
  #BASE_URL = 'https://api.themoviedb.org/3/';
  #GENRES_PATH_URL = 'genre/movie/list';
  #TRENDINGS_PATH_URL = 'trending/movie/day';
  #SEARCH_PATH_URL = 'search/movie';
  #GET_MOVIE_DETAILS_PATH_URL = 'movie/';

  #moviesByNameSearchParams = {
    params: {
      api_key: this.#API_KEY,
      query: '',
      page: 1,
      include_adult: false,
    },
  };
  #genresSearchParams = {
    params: {
      api_key: this.#API_KEY,
    },
  };

  #getMovieDetailsSearchParams = {
    params: {
      api_key: this.#API_KEY,
    },
  };
  constructor() {}

  async fetchGenres() {
    const url = this.#BASE_URL + this.#GENRES_PATH_URL;
    try {
      const response = await axios.get(url, this.#genresSearchParams);
      const genres = response.data.genres;
      return genres;
    } catch (error) {
      console.error(error);
    }
  }

  async fetchTrendingMovies(page = 1) {
    const url = this.#BASE_URL + this.#TRENDINGS_PATH_URL;
    const popularMoviesSearchParams = {
      params: { api_key: this.#API_KEY, page },
    };
    try {
      const response = await axios.get(url, popularMoviesSearchParams);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async fetchMoviesByName() {
    const url = this.#BASE_URL + this.#SEARCH_PATH_URL;
    try {
      const response = await axios.get(url, this.#moviesByNameSearchParams);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async getMoviesByName(query, page = 1) {
    this.#moviesByNameSearchParams.params.query = query;
    this.#moviesByNameSearchParams.params.page = page;
    const url = this.#BASE_URL + this.#SEARCH_PATH_URL;
    console.log('query', query);
    console.log(url, this.#moviesByNameSearchParams);
    const response = await axios.get(url, this.#moviesByNameSearchParams);
    return response.data;
  }
  catch(error) {
    console.error(error);
  }

  async fetchMoviesByID(id) {
    const url = this.#BASE_URL + this.#GET_MOVIE_DETAILS_PATH_URL + id;
    try {
      const response = await axios.get(url, this.#getMovieDetailsSearchParams);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
