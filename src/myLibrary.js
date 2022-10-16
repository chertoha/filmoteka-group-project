import './js/utils/handlebars-helpers';
import './js/buttonUp';
import './js/modal';
import './js/teamAccordion';
import './js/changeTheme';
import { headerButtonsContainerRef, headerButtonsRef } from'./js/utils/refs'
import GalleryHandler from './js/classes/GalleryHandler';
import { localStorageFilms } from './js/classes/ModalBtn';
import Library from './js/classes/Library';

localStorageFilms.saveItemsForArrayAfterReload();

const galleryHandler = new GalleryHandler();
galleryHandler.addGalleryHandler();

const library = new Library();
library.currentPageRenderWatch();

headerButtonsContainerRef.addEventListener('click', selectBtn);

function selectBtn(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }

  headerButtonsRef.forEach(function (button) {
    button.classList.remove('button--active');
  });

  if (event.target === headerButtonsContainerRef.firstElementChild) {
    event.target.classList.add('button--active');
    library.currentPageRenderWatch();
  } else if (event.target === headerButtonsContainerRef.lastElementChild) {
    event.target.classList.add('button--active');
    library.currentPageRenderQueue();
  }
}
