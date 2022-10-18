import ApiService from './ApiService';
import GenreTemplate from '../../templates/genre.hbs';
import { gallery } from '../gallery';
const api = new ApiService();
const genreSelectRef = document.querySelector('#genre');

export default class GenreFilter {
  async renderFilter() {
    const genres = await api.fetchGenres();
    genreSelectRef.insertAdjacentHTML('beforeend', GenreTemplate(genres));
  }

  addHandler() {
    genreSelectRef.addEventListener('change', this.onChange);
  }

  onChange = event => {
    event.preventDefault();
    this.renderMoviesByChosenGenre(+event.target.value);
  };

  async renderMoviesByChosenGenre(genreId) {
    const moviesByGenre = await api.fetchDiscoverMovies(genreId);
    gallery.renderCards(moviesByGenre.results);
  }
}
