import './js/utils/handlebars-helpers';
import './js/buttonUp';
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
library.currentPageRenderWatch();
// if (library.localStArray !== undefined) {
//   library.currentPageRenderWatch();
// }

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
    library.currentPageRenderWatch();
    // if (library.localStArray !== undefined) {
    //   library.currentPageRender(library.localStArray, library.currentPage);
    // }
    // if (library.localStArray === undefined) {
    //   library.tempRenderCards(undefined);
    // }
  } else if (event.target === btn.lastElementChild) {
    event.target.classList.add('button--active');
    library.currentPageRenderQueue();
    // if (library.localStArray !== undefined) {
    //   library.currentPageRenderQueue(library.localStArray, library.currentPage);
    // }
    // if (library.localStArray === undefined) {
    //   library.tempRenderCards(undefined);
    // }
  }
}

// library.updateCards()
//  updateCardsWatch() {
//     if (window.location.pathname === '/myLibrary.html' || window.location.pathname === '/filmoteka-group-project/myLibrary.html') {
//       if (document.querySelector('.header-buttons')
//         .firstElementChild.classList.contains('button--active')) { this.currentPageRenderWatch() }
//     };
// console.log(document
//           .querySelector('.header-buttons')
//         .firstElementChild.textContent)
