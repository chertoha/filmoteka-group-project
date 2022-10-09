//Anton's temporary code
const axios = require('axios').default;
// import '../utils/handlebars-helpers';
import movieCardTemplate from '../../templates/movieCard.hbs';
import modalMovieDetailsTemplate from '../../templates/modalMovieCard.hbs';

import { localStorageFilms } from '../classes/ModalBtn';

//Pagination init---------------------------------------------
import Pagination from '../classes/Pagination';
const container = document.querySelector('.pag');
const pagination = new Pagination(container);
pagination.on('aftermove', event => {
  console.log('page after move:', event.page);
  //here could be your code - api fetch movie with chosern page
  testApiPopMovies(event.page);
});
pagination.on('beforemove', event => {
  console.log('page before move:', event.page);
});
//Pagination init---------------------------------------------

//--Variables-------------------------------------------------------
const API_KEY_TEST = '1936ce94882661ecfd75d2c22e8905aa';
const url_trendings = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY_TEST}&language=en-US`;
const url_genres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY_TEST}`;
const url_movie_details = `https://api.themoviedb.org/3/movie`;

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

// const GENRES_TEMP = 'genres_temp';
//--Variables-------------------------------------------------------

testApiPopMovies();

//Test API----------------------------------------------------------
async function testApiPopMovies(page = 1) {
  try {
    //Get genres
    const response = await axios.get(url_genres);
    const genres = response.data.genres;
    // console.log(genres);

    //Add genres to temp LocalStorage
    // localStorage.setItem(GENRES_TEMP, JSON.stringify(genres));

    //Get movies list
    const trendings = await axios.get(url_trendings + '&page=' + page);
    const movies = trendings.data.results;
    const totalMovies = trendings.data.total_results;
    console.log(trendings.data);

    //Update movies genres_id with genres_name
    moviesDataUpdate(genres, movies);

    //Render template
    tempRenderCards(movies);

    localStorageFilms.addItemsOnCurrentPage('itemsOnCurrentPage', movies);

    //Render Pagination
    pagination.updateTotalItems(totalMovies);
    pagination.render();
  } catch (error) {
    console.error(error);
  }
}
//Test API----------------------------------------------------------

////////////////=============IMPORTANT CODE PART================/////////////////////////////

function tempRenderCards(movies) {
  const container = document.querySelector('.gallery__list');

  //library = false if render gallery
  //library = true if render library
  container.innerHTML = movieCardTemplate({ movies, library: true });
}

function moviesDataUpdate(genres, movies) {
  movies.forEach(movie => {
    checkGenres(movie, genres, 3);

    //Year check
    if (movie.release_date) {
      movie.date = movie.release_date;
    }

    //Images check
    checkMoviePoster(movie);
  });
}

function checkGenres(movie, genres, maxGenres = 3) {
  movie.genres = [];
  for (let i = 0; i < movie.genre_ids.length; i++) {
    if (i === maxGenres) {
      movie.genres[i - 1] = 'Others';
      break;
    }
    movie.genres.push(getGenreNameById(genres, movie.genre_ids[i]));
  }
}

function checkMoviePoster(movie) {
  if (movie.poster_path && movie.poster_path !== '') {
    movie.poster_path = BASE_IMAGE_URL + movie.poster_path;
  } else {
    const imgUrl = new URL('../../images/movie-card-plug.jpg', import.meta.url);
    movie.poster_path = imgUrl;
  }
}

function getGenreNameById(genres, genreId) {
  return genres.find(genre => genre.id === genreId).name;
}
////////////////////=============IMPORTANT CODE================/////////////////////////////

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

  console.log(response.data);

  renderMovieDetailsModal(response.data);
}

function renderMovieDetailsModal(movie) {
  modalMovieDetails.classList.toggle('is-hidden', false);

  //Check Poster Image
  checkMoviePoster(movie);

  //Check genres
  // const genres = localStorage.getItem(GENRES_TEMP);
  // checkGenres(movie, genres, 3);

  const modalContent = modalMovieDetails.querySelector('.finfo-moviecard');
  modalContent.innerHTML = modalMovieDetailsTemplate(movie);
}
////////////////////============Modal window movie card==============/////////////////////
