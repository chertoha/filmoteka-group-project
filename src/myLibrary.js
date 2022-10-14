import './js/utils/handlebars-helpers';
import './js/modal';
import './js/teamAccordion';
import './js/changeTheme';
import GalleryHandler from './js/classes/GalleryHandler';
import { localStorageFilms } from './js/classes/ModalBtn';
import Library from './js/classes/Library';

localStorageFilms.saveItemsForArrayAfterReload();

const galleryHandler = new GalleryHandler();
galleryHandler.addGalleryHandler();

const library = new Library();
let currentPage = library.currentPage;
let localStArrey = library.localStArrey;

if (localStArrey !== undefined) {
  library.currentPageRender(localStArrey, currentPage);
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
    event.target.classList.add('button--active');
    localStArrey = library.loadLocalStArrey('watch');
    currentPage = 1;
    if (localStArrey !== undefined) {
      library.currentPageRender(localStArrey, currentPage);
    }
    if (localStArrey === undefined) {
      library.tempRenderCards(localStArrey, currentPage);
    }
  } else if (event.target === btn.lastElementChild) {
    event.target.classList.add('button--active');
    localStArrey = library.loadLocalStArrey('queue');
    currentPage = 1;

    if (localStArrey !== undefined) {
      library.currentPageRender(localStArrey, currentPage);
    }
    if (localStArrey === undefined) {
      library.tempRenderCards(localStArrey, currentPage);
    }
  }
}

// library.updateCards()
