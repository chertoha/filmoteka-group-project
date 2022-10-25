import ApiService from './ApiService';
import GenreTemplate from '../../templates/genre.hbs';
import YearTemplate from '../../templates/year.hbs';
import { gallery } from '../gallery';
const api = new ApiService();
const genreSelectRef = document.querySelector('#genre');
const yearSelectRef = document.querySelector('#year');

export default class Filter {
  async renderFilter() {
    const genres = await api.fetchGenres();
    genreSelectRef.insertAdjacentHTML('beforeend', GenreTemplate(genres));

    const years = [];
    for (let year = 1970; year <= 2022; year += 1) {
      years.push(year);
    }
    yearSelectRef.insertAdjacentHTML('beforeend', YearTemplate(years));
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
