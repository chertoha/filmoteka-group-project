import ApiService from './ApiService';
import CheckMovies from './CheckMovies';
import { localStorageFilms } from './ModalBtn';
import { headerRef } from '../utils/refs';

const api = new ApiService();
const checkMovies = new CheckMovies();

export default class Gallery {
  #galleryContainer;
  #cardsTemplate;

  constructor(container, template) {
    this.#galleryContainer = container;
    this.#cardsTemplate = template;
    this.currentQuery = '';
    this.genres = null;
    this.filterIsComplete = false;
  }

  async getPopularMovies(page) {
    if (!this.genres) {
      this.genres = await api.fetchGenres();
      localStorageFilms.addGenres(this.genres);
    }

    const response = await api.fetchTrendingMovies(page);
    return response.data;
  }

  renderCards(movies) {
    checkMovies.update(movies, this.genres);
    this.#galleryContainer.innerHTML = this.#cardsTemplate({
      movies,
      library: false,
    });
    headerRef.scrollIntoView(top);
    localStorageFilms.addItemsOnCurrentPage(movies);
  }

  async getQueryMovies(query, page = 1) {
    this.currentQuery = query;

    if (!query) return;

    const response = await api.getMoviesByName(query, page);
    return response;
  }

  async getMovieDetails(id) {
    if (!id) return;

    const response = await api.fetchMoviesByID(id);
    return response;
  }
}

export { checkMovies };
