import Pagination from './classes/Pagination';
import ApiService from './classes/ApiService';
import GalleryHandler from './classes/GalleryHandler';
import Spinner from './classes/spinner';
import Gallery from './classes/Gallery';
import template from '../templates/movieCard.hbs';

const apiService = new ApiService();
const galleryHandler = new GalleryHandler();
galleryHandler.addGalleryHandler();

const containerGallery = document.querySelector('.gallery__list');
const gallery = new Gallery(containerGallery, template);

const containerPag = document.querySelector('.pag');
const pagination = new Pagination(containerPag);
const spinner = new Spinner('.js-spinner');

// render library according to the window
// if (window.location.pathname === '/index.html')
// if (window.location.pathname === '/myLibrary.html')

if (window.location.pathname === '/index.html') {
  console.log('inside index.html');

  pagination.on('aftermove', event => {
    console.log(event.page);

    fetchMovies(event.page);
  });

  fetchMovies();

  async function fetchMovies(page = 1) {
    spinner.show();
    try {
      const movies = await gallery.getPopularMovies(page);
      spinner.hide();
      console.log(movies);
      gallery.renderCards(movies.results);

      pagination.updateTotalItems(movies.total_results);
      pagination.render();
    } catch (error) {
      console.error(error);
    }
  }
}

export { apiService, gallery };
