import ApiService from './ApiService';
import {
  filterFormRef,
  genreSelectRef,
  yearSelectRef,
  containerPag,
} from '../utils/refs';
import GenreTemplate from '../../templates/genre.hbs';
import { localStorageFilms } from './ModalBtn';
import Pagination from './Pagination';
import YearTemplate from '../../templates/year.hbs';

const api = new ApiService();
export const filterPagination = new Pagination(containerPag);

export class Filter {
  constructor() {
    this.isEmpty = true;
    this.genreId = null;
    this.year = null;
  }

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

    this.isEmpty = false;
  }

  addHandler(handler) {
    filterFormRef.addEventListener('change', handler);
  }
}
