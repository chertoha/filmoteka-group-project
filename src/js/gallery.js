import ApiService from './classes/ApiService';
import Gallery from './classes/Gallery';
import GalleryHandler from './classes/GalleryHandler';
import { localStorageFilms } from './classes/ModalBtn';
import Pagination from './classes/Pagination';
import Spinner from './classes/spinner';
import template from '../templates/movieCard.hbs';
import { NOTIFY_UNCORRECT_SEARCH } from './utils/config';
import { containerGallery, containerPag, searchFormRef } from './utils/refs';
import Notify from './classes/Notify';
import Filter from './classes/Filter';

const apiService = new ApiService();
const galleryHandler = new GalleryHandler();
galleryHandler.addGalleryHandler();

const gallery = new Gallery(containerGallery, template);
const pagination = new Pagination(containerPag);
const spinner = new Spinner();

const notify = new Notify();
const genreFilter = new Filter();
genreFilter.renderFilter();
genreFilter.addHandler();

searchFormRef.addEventListener('submit', onSearchFormSubmit);

pagination.on('aftermove', event => {
  if (!gallery.currentQuery) {
    fetchMovies(event.page);
  } else {
    searchMovies(gallery.currentQuery, event.page);
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

export { apiService, gallery };
