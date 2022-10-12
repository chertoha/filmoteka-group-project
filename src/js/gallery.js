import Pagination from './classes/Pagination';
import ApiService from './classes/ApiService';
import GalleryHandler from './classes/GalleryHandler';
import Spinner from './classes/spinner';
import Gallery from './classes/Gallery';
import template from '../templates/movieCard.hbs';
import { localStorageFilms } from './classes/ModalBtn';

//ANTON"S CODE=======================================
import { NOTIFY_UNCORRECT_SEARCH } from './utils/config';
//ANTON"S CODE=======================================

const apiService = new ApiService();
const galleryHandler = new GalleryHandler();
galleryHandler.addGalleryHandler();

const containerGallery = document.querySelector('.js-gallery');
const gallery = new Gallery(containerGallery, template);

const containerPag = document.querySelector('.pag');
const pagination = new Pagination(containerPag);
const spinner = new Spinner('.js-spinner');

//NEW CODE=============================================
const searchFormRef = document.querySelector('.search-form');
searchFormRef.addEventListener('submit', onSearchFormSubmit);

pagination.on('aftermove', event => {
  if (!gallery.currentQuery) {
    fetchMovies(event.page);
  } else {
    searchMovies(gallery.currentQuery, event.page);
  }
});
//NEW CODE=============================================

localStorageFilms.saveItemsForArrayAfterReload();

// pagination.on('aftermove', event => {
//   console.log(event.page);
//   fetchMovies(event.page);
// });

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

/*
      NEW CODE =============================================
*/

function onSearchFormSubmit(e) {
  e.preventDefault();

  const searchValue = e.target.elements.search.value.trim();
  if (searchMovies(searchValue)) {
    //Search form input clear
    this.reset();
  }
}

//------------------------------------------------------------------

async function searchMovies(query, page = 1) {
  try {
    const searchedMovies = await gallery.getQueryMovies(query, page);

    if (!searchedMovies) {
      searchNotification(NOTIFY_UNCORRECT_SEARCH);
      fetchMovies();
      return;
    }

    if (searchedMovies.total_results === 0) {
      searchNotification(NOTIFY_UNCORRECT_SEARCH);
      fetchMovies();
      return;
    }

    console.log('Searched Movies:', searchedMovies);
    gallery.renderCards(searchedMovies.results);

    pagination.updateTotalItems(searchedMovies.total_results);
    pagination.goToPage(page);
    pagination.render();
  } catch (error) {
    console.log(error);
  }
}

//------------------------------------------------------------------

function searchNotification(message) {
  searchFormRef.dataset.message = message;

  setTimeout(() => {
    searchFormRef.dataset.message = '';
  }, 4000);
}

/*
      NEW CODE =============================================
*/

export { apiService, gallery };
