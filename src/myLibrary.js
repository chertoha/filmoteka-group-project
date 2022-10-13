import './js/utils/handlebars-helpers';
import './js/modal';
import './js/teamAccordion';
import './js/changeTheme';
import Pagination from './js/classes/Pagination';
import GalleryHandler from './js/classes/GalleryHandler';
import template from './templates/movieCard.hbs';
import { localStorageFilms } from './js/classes/ModalBtn';
import Gallery from './js/classes/Gallery';
import Library from './js/classes/Library';
// localStorage.clear();

localStorageFilms.saveItemsForArrayAfterReload();

const galleryHandler = new GalleryHandler();
galleryHandler.addGalleryHandler();

const containerGallery = document.querySelector('.gallery__list');
const gallery = new Gallery(containerGallery, template);

const containerPag = document.querySelector('.pag');
const pagination = new Pagination(containerPag);

const library = new Library();

let currentPage = 1;
// let btnStorage = "watch";
// localStorage.setItem("btnStorage", "watch");
let localStArrey = library.loadLocalStArrey('watch');

pagination.on('aftermove', event => {
  // console.log(event.page);
  currentPage = event.page;
  currentPageRender(localStArrey, currentPage);
});

function tempRenderCards(movies) {
  const container = document.querySelector('.gallery__list');
  // console.log(movies);
  if (movies !== undefined) {
    container.innerHTML = template({ movies, library: true });

    pagination.updateTotalItems(localStArrey.length);
    // console.log("asfdafsasf",currentPage);
    pagination.goToPage(currentPage);
    pagination.render();
  } else {
    container.innerHTML = '';
  }
}

function localStAudit(localStArrey, currentPage) {
  if (localStArrey.length <= 20) {
    tempRenderCards(localStArrey);
  } else if (localStArrey.length > 20) {
    currentPageRender(localStArrey, currentPage);
  }
}

function currentPageRender(localStArrey, currentPage) {
  // console.log(currentPage);
  const moviesPars = [];
  for (let index = currentPage * 20 - 20; index < currentPage * 20; index++) {
    if (localStArrey[index] !== undefined) {
      moviesPars.push(localStArrey[index]);
    }
  }
  tempRenderCards(moviesPars);
}

if (localStArrey !== undefined) {
  localStAudit(localStArrey, currentPage);
}

// КНОПКИ
const btn = document.querySelector('.header-buttons');
const btnWatch = btn.querySelectorAll('.button--dark-mode');
// КНОПКИ
btn.addEventListener('click', selectBtn);

function selectBtn(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }

  btnWatch.forEach(function (button) {
    button.classList.remove('button--active');
  });

  if (event.target === btn.firstElementChild) {
    // console.log("watched")
    event.target.classList.add('button--active');
    localStArrey = library.loadLocalStArrey('watch');
    currentPage = 1;
    if (localStArrey !== undefined) {
      localStAudit(localStArrey, currentPage);
    }
    if (localStArrey === undefined) {
      tempRenderCards(localStArrey, currentPage);
    }
    // console.log(currentPage)
  } else if (event.target === btn.lastElementChild) {
    // console.log("queue");
    event.target.classList.add('button--active');
    localStArrey = library.loadLocalStArrey('queue');
    currentPage = 1;

    if (localStArrey !== undefined) {
      localStAudit(localStArrey, currentPage);
    }
    if (localStArrey === undefined) {
      tempRenderCards(localStArrey, currentPage);
    }
  }
}
