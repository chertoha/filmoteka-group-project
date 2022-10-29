const axios = require('axios').default;
import { urls, API_KEY } from '../utils/config';

export default class ApiService {
  #moviesByNameSearchParams = {
    params: {
      api_key: API_KEY,
      query: '',
      page: 1,
      include_adult: false,
    },
  };
  #genresSearchParams = {
    params: {
      api_key: API_KEY,
    },
  };

  #getMovieDetailsSearchParams = {
    params: {
      api_key: API_KEY,
    },
  };

  #moviesSearchParams = {
    params: {
      api_key: API_KEY,
      page: 1,
      include_adult: false,
      // with_genres: '',
    },
  };

  constructor() {}

  async fetchGenres() {
    const url = urls.BASE_URL + urls.GENRES_PATH_URL;
    try {
      const response = await axios.get(url, this.#genresSearchParams);
      const genres = response.data.genres;
      return genres;
    } catch (error) {
      console.error(error);
    }
  }

  async fetchTrendingMovies(page = 1) {
    const url = urls.BASE_URL + urls.TRENDINGS_PATH_URL;
    const popularMoviesSearchParams = {
      params: { api_key: API_KEY, page },
    };
    try {
      const response = await axios.get(url, popularMoviesSearchParams);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async fetchMoviesByName() {
    const url = urls.BASE_URL + urls.SEARCH_PATH_URL;
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
    const url = urls.BASE_URL + urls.SEARCH_PATH_URL;
    const response = await axios.get(url, this.#moviesByNameSearchParams);
    return response.data;
  }
  catch(error) {
    console.error(error);
  }

  async fetchMoviesByID(id) {
    const url = urls.BASE_URL + urls.GET_MOVIE_DETAILS_PATH_URL + id;
    try {
      const response = await axios.get(url, this.#getMovieDetailsSearchParams);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async fetchDiscoverMovies(genreId, year) {
    const url = urls.BASE_URL + urls.GET_MOVIE_DISCOVER_URL;

    if (genreId) this.#moviesSearchParams.params.with_genres = genreId;
    if (year) this.#moviesSearchParams.params.primary_release_year = year;

    if (!genreId) delete this.#moviesSearchParams.params.with_genres;
    if (!year) delete this.#moviesSearchParams.params.primary_release_year;

    try {
      const response = await axios.get(url, this.#moviesSearchParams);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
