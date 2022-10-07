const axios = require('axios').default;

export default class ApiService {
  #API_KEY = '1351fe1fee33f4dc7ca86c3a4fb4a61c';
  //змінити базовий юрл
  #BASE_URL = 'https://api.themoviedb.org/3/trending/movie/day';
  #BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';
  #popularMoviesSearchParams = {
    page: 1,
  };
  #moviesByNameSearchParams = {
    query: '',
    page: 1,
  };

  constructor() { }
  
  //в залежності від типу запиту змінювати остаточний вигляд посилання
  //можна зробити через тернарний оператор

  async fetchMovies() {
    /*
    Подумати як реалізувати фетч по імені та
    фетч популярних фільмів по умові
    */
    
    //фетч популярних фільмів
    const response = await axios.get(
      `${this.#BASE_URL}?api_key=${this.#API_KEY}&page=${
        this.#popularMoviesSearchParams.page
      }`
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.statusText);
    }
  }

  async getPopularMovies() {
    const response = await this.fetchMovies();
    return response;
  }

  async getMoviesByName(query) {
    if (query) {
      this.#moviesByNameSearchParams.query = query;
      this.#moviesByNameSearchParams.page = 1;
    }
    const response = await this.fetchMovies();
    return response;
  }

  async getPopularMoviesByPage() {}

  async getMoviesByNameByPage() {}
}
