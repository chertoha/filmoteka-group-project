import ApiService from './ApiService';
import GenreTemplate from '../../templates/genre.hbs';
import YearTemplate from '../../templates/year.hbs';
import { gallery } from '../gallery';
import { filterFormRef, genreSelectRef, yearSelectRef } from '../utils/refs';
import { localStorageFilms } from './ModalBtn';
const api = new ApiService();

export default class Filter {
  renderFilter() {
    const genres = localStorageFilms.getItemFromKeyStorage(
      localStorageFilms.LOCAL_STORAGE_KEYS.genres
    );
    genreSelectRef.insertAdjacentHTML('beforeend', GenreTemplate(genres));

    const years = [];
    for (let year = 2022; year >= 1980; year -= 1) {
      years.push(year);
    }
    yearSelectRef.insertAdjacentHTML('beforeend', YearTemplate(years));
  }

  addHandler() {
    filterFormRef.addEventListener('change', this.onChange);
  }

  onChange = event => {
    event.preventDefault();
    const { genre, year } = event.currentTarget.elements;
    this.renderMoviesByChosenGenre(+genre.value, +year.value);
  };

  async renderMoviesByChosenGenre(genreId, year) {
    const moviesByFilter = await api.fetchDiscoverMovies(genreId, year);
    gallery.renderCards(moviesByFilter.results);
  }
}
