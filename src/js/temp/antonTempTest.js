//Anton's temporary code
const axios = require('axios').default;
// import '../utils/handlebars-helpers';
import movieCardTemplate from '../../templates/movieCard.hbs';
import modalMovieDetailsTemplate from '../../templates/modalMovieCard.hbs';

import { localStorageFilms } from '../classes/ModalBtn';

import CheckMovies from '../classes/CheckMovies';

//Pagination init---------------------------------------------
// import Pagination from '../classes/Pagination';
// const container = document.querySelector('.pag');
// const pagination = new Pagination(container);
// pagination.on('aftermove', event => {
//   console.log('page after move:', event.page);
//   //here could be your code - api fetch movie with chosern page
//   testApiPopMovies(event.page);
// });
// pagination.on('beforemove', event => {
//   console.log('page before move:', event.page);
// });
//Pagination init---------------------------------------------

//--Variables-------------------------------------------------------
const API_KEY_TEST = '1936ce94882661ecfd75d2c22e8905aa';
const url_trendings = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY_TEST}&language=en-US`;
const url_genres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY_TEST}`;
const url_movie_details = `https://api.themoviedb.org/3/movie`;

//--Variables-------------------------------------------------------

const checkMovies = new CheckMovies();

// testApiPopMovies();

//Test API----------------------------------------------------------

// async function testApiPopMovies(page = 1) {
//   try {
//     //Get genres
//     const response = await axios.get(url_genres);
//     const genres = response.data.genres;
//     // console.log(genres);

//     //Add genres to temp LocalStorage
//     // localStorage.setItem(GENRES_TEMP, JSON.stringify(genres));

//     //Get movies list
//     const trendings = await axios.get(url_trendings + '&page=' + page);
//     const movies = trendings.data.results;
//     const totalMovies = trendings.data.total_results;
//     console.log(trendings.data);

//     //Update movies genres_id with genres_name
//     // moviesDataUpdate(genres, movies);

//     checkMovies.update(movies, genres);

//     //Render template
//     tempRenderCards(movies);

//     localStorageFilms.addItemsOnCurrentPage('itemsOnCurrentPage', movies);

//     //Render Pagination
//     pagination.updateTotalItems(totalMovies);
//     pagination.render();
//   } catch (error) {
//     console.error(error);
//   }
// }

//Test API----------------------------------------------------------

// function tempRenderCards(movies) {
//   const container = document.querySelector('.gallery__list');

//   //library = false if render gallery
//   //library = true if render library
//   container.innerHTML = movieCardTemplate({ movies, library: true });
// }

////////////////////============Modal window movie card==============/////////////////////
const modalMovieDetails = document.querySelector('.backdrop');
const galleryRef = document.querySelector('.gallery');

galleryRef.addEventListener('click', onGalleryClickTest);

function onGalleryClickTest(e) {
  e.preventDefault();

  const cardRef = e.target.closest('.movie-card__link');
  if (!cardRef) {
    return;
  }

  const movieId = cardRef.dataset.movieId;

  testApiMovieDetails(movieId);
}

async function testApiMovieDetails(movieId) {
  const url = url_movie_details + '/' + movieId + '?api_key=' + API_KEY_TEST;
  console.log(url);
  const response = await axios.get(url);

  // console.log(response.data);

  renderMovieDetailsModal(response.data);
}

function renderMovieDetailsModal(movie) {
  modalMovieDetails.classList.toggle('is-hidden', false);

  //Check Poster Image
  // checkMoviePoster(movie);
  checkMovies.checkMoviePoster(movie);

  //Check genres
  // const genres = localStorage.getItem(GENRES_TEMP);
  // checkGenres(movie, genres, 3);

  const modalContent = modalMovieDetails.querySelector('.finfo-moviecard');
  modalContent.innerHTML = modalMovieDetailsTemplate(movie);
}
////////////////////============Modal window movie card==============/////////////////////
