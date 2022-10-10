const axios = require('axios').default;

export default class ApiService {
  #API_KEY = '1351fe1fee33f4dc7ca86c3a4fb4a61c';
  //змінити базовий юрл
  #BASE_GENRES_URL = 'https://api.themoviedb.org/3/genre/movie/list';
  #BASE_TRENDS_URL = 'https://api.themoviedb.org/3/trending/movie/day';
  #BASE_BY_NAME_URL = 'https://api.themoviedb.org/3/search/movie';
 
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
  constructor() {}

  async fetchGenres() {
    try {
      const response = await axios.get(
        this.#BASE_GENRES_URL,
        this.#genresSearchParams
      );
      const genres = response.data.genres;
      return genres;
      // for (const genre of genres) {
      //   console.log(genre.id);
      //   console.log(genre.name);
      //   localStorage.setItem(genre.id, genre.name);
      // }
    } catch (error) {
      console.error(error);
    }
  }

  async fetchTrendingMovies(page =1) {
    const  popularMoviesSearchParams = {
      params: { api_key: this.#API_KEY, page },
    };
    try {
      const response = await axios.get(
        this.#BASE_TRENDS_URL,
        popularMoviesSearchParams
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async fetchMoviesByName() {
    try {
      const response = await axios.get(
        this.#BASE_BY_NAME_URL,
        this.#moviesByNameSearchParams
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  // async getPopularMovies() {
  //   try {
  //     const response = await this.fetchTrendingMovies();
  //     return response.data;
  //   }
  //   catch (error) {
  //     console.error(error);
  //   }
  // }

  async getMoviesByName(query) {
    if (query) {
      this.#moviesByNameSearchParams.query = query;
      this.#moviesByNameSearchParams.page = 1;
    }
    const response = await this.fetchMoviesByName();
    return response.data.results;
  }

}
