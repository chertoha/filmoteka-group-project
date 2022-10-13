import './js/utils/handlebars-helpers';
import './js/modal';
import './js/teamAccordion';
import './js/changeTheme';
import Pagination from './js/classes/Pagination';
import GalleryHandler from './js/classes/GalleryHandler';
import template from './templates/movieCard.hbs';
import { localStorageFilms } from './js/classes/ModalBtn';
import Gallery from './js/classes/Gallery';
// localStorage.clear();

localStorageFilms.saveItemsForArrayAfterReload();

const galleryHandler = new GalleryHandler();
galleryHandler.addGalleryHandler();

const containerGallery = document.querySelector('.gallery__list');
const gallery = new Gallery(containerGallery, template);

const containerPag = document.querySelector('.pag');
const pagination = new Pagination(containerPag);

let currentPage = 1;
// let btnStorage = "watch";
// localStorage.setItem("btnStorage", "watch");
let total_results = load('watch');

pagination.on('aftermove', event => {
  // console.log(event.page);
  currentPage = event.page;
  pageValue(total_results, currentPage);
});

function tempRenderCards(movies) {
  const container = document.querySelector('.gallery__list');
  // console.log(movies);
  if (movies !== undefined) {
    container.innerHTML = template({ movies, library: true });

    pagination.updateTotalItems(total_results.length);
    // console.log("asfdafsasf",currentPage);
    pagination.goToPage(currentPage);
    pagination.render();
  } else {
    container.innerHTML = '';
  }
}

function load(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

function audit(total_results, currentPage) {
  if (total_results.length <= 20) {
    tempRenderCards(total_results);
  } else if (total_results.length > 20) {
    pageValue(total_results, currentPage);
  }
}

function pageValue(total_results, currentPage) {
  // console.log(currentPage);
  const lastMovie = currentPage * 20;
  const firstMovie = lastMovie - 20;
  const moviesPars = [];
  for (let index = firstMovie; index < lastMovie; index++) {
    if (total_results[index] !== undefined) {
      moviesPars.push(total_results[index]);
    }
  }
  tempRenderCards(moviesPars);
}

if (total_results !== undefined) {
  audit(total_results, currentPage);
}

// КНОПКИ
const btn = document.querySelector('.header');
const btnWatch = btn.querySelectorAll('.button--dark-mode');
// console.log(btnWatch);

// КНОПКИ
btn.addEventListener('click', selectBtn);

function selectBtn(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  btnWatch.forEach(function (button) {
    button.classList.remove('button--active');
  });

  if (event.target.textContent === 'watched') {
    // console.log("watched")
    event.target.classList.add('button--active');
    total_results = load('watch');
    currentPage = 1;
    if (total_results !== undefined) {
      audit(total_results, currentPage);
    }
    if (total_results === undefined) {
      tempRenderCards(total_results, currentPage);
    }
    // console.log(currentPage)
  } else if (event.target.textContent === 'queue') {
    // console.log("queue");
    event.target.classList.add('button--active');
    total_results = load('queue');
    currentPage = 1;

    if (total_results !== undefined) {
      audit(total_results, currentPage);
    }
    if (total_results === undefined) {
      tempRenderCards(total_results, currentPage);
    }

    // location.reload()
    // console.log(currentPage)
  }
}
