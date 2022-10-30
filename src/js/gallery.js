import ApiService from './classes/ApiService';
import {
  containerGallery,
  containerPag,
  searchFormRef,
  genreSelectRef,
  yearSelectRef,
} from './utils/refs';
import { Filter } from './classes/Filter';
import Gallery from './classes/Gallery';
import GalleryHandler from './classes/GalleryHandler';
import { localStorageFilms } from './classes/ModalBtn';
import { NOTIFY_UNCORRECT_SEARCH } from './utils/config';
import Notify from './classes/Notify';
import Pagination from './classes/Pagination';
import Spinner from './classes/spinner';
import template from '../templates/movieCard.hbs';

const apiService = new ApiService();
const galleryHandler = new GalleryHandler();
galleryHandler.addGalleryHandler();

const gallery = new Gallery(containerGallery, template);
const pagination = new Pagination(containerPag);
const spinner = new Spinner();

const notify = new Notify();
const filter = new Filter();
filter.addHandler(discoverMoviesByFilter);

searchFormRef.addEventListener('submit', onSearchFormSubmit);

pagination.on('aftermove', event => {
  if (!gallery.currentQuery && !gallery.filterIsComplete) {
    fetchMovies(event.page);
  }
  if (gallery.currentQuery) searchMovies(gallery.currentQuery, event.page);
  if (gallery.filterIsComplete) {
    renderMoviesByChosenFilter(event.page);
  }
});

localStorageFilms.saveItemsForArrayAfterReload();

fetchMovies();

async function fetchMovies(page = 1) {
  spinner.show();
  try {
    const movies = await gallery.getPopularMovies(page);
    spinner.hide();
    // console.log('Popular Movies:', movies);
    gallery.renderCards(movies.results);

    pagination.updateTotalItems(movies.total_results);
    pagination.goToPage(page);
    pagination.render();
    if (filter.isEmpty) filter.renderFilter();
  } catch (error) {
    console.error(error);
  }
}

function onSearchFormSubmit(e) {
  e.preventDefault();

  const searchValue = e.target.elements.search.value.trim();
  if (searchMovies(searchValue)) {
    //Search form input clear
    this.reset();
  }
  // clear filter
  genreSelectRef.value = 0;
  yearSelectRef.value = 0;
  gallery.filterIsComplete = false;
}

async function searchMovies(query, page = 1) {
  try {
    const searchedMovies = await gallery.getQueryMovies(query, page);

    if (!searchedMovies || !searchedMovies.total_results) {
      searchNotification(NOTIFY_UNCORRECT_SEARCH);
      fetchMovies();
      return;
    }

    // console.log('Searched Movies:', searchedMovies);
    notify.notifySuccess();
    gallery.renderCards(searchedMovies.results);

    pagination.updateTotalItems(searchedMovies.total_results);
    pagination.goToPage(page);
    pagination.render();
  } catch (error) {
    console.log(error);
  }
}

function searchNotification(message) {
  searchFormRef.dataset.message = message;
  notify.notifyFailure();

  setTimeout(() => {
    searchFormRef.dataset.message = '';
  }, 4000);
}

function discoverMoviesByFilter(event) {
  event.preventDefault();
  gallery.currentQuery = '';
  const { genre, year } = event.currentTarget.elements;
  filter.genreId = +genre.value;
  filter.year = +year.value;

  if (filter.genreId !== 0 || filter.year !== 0) {
    gallery.filterIsComplete = true;
    renderMoviesByChosenFilter(1);
  }

  if (!filter.genreId && !filter.year) {
    gallery.filterIsComplete = false;
    fetchMovies();
    return;
  }
}

async function renderMoviesByChosenFilter(page) {
  const moviesByFilter = await apiService.fetchDiscoverMovies(
    filter.genreId,
    filter.year,
    page
  );
  gallery.renderCards(moviesByFilter.results);

  pagination.updateTotalItems(moviesByFilter.total_results);
  pagination.goToPage(page);
  pagination.render();
}

export { apiService, gallery };
