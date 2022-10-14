import '../utils/handlebars-helpers';
import LocalStorage from './LocalStorage';
import '../teamAccordion';

import Pagination from './Pagination';
import template from '../../templates/movieCard.hbs';
import { containerGallery, containerPag } from '../utils/refs';
const pagination = new Pagination(containerPag);

export default class Library {
  currentPage = 1;
  localStArray = this.loadLocalStArray('watch');

  loadLocalStArray(key) {
    try {
      const serializedState = localStorage.getItem(key);
      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }
  currentPageRender(localStArray, currentPage) {
    const moviesPars = [];
    for (let index = currentPage * 20 - 20; index < currentPage * 20; index++) {
      if (localStArray[index] !== undefined) {
        moviesPars.push(localStArray[index]);
      }
    }
    this.tempRenderCards(moviesPars, localStArray, currentPage);
  }

  tempRenderCards(movies, localStArray, currentPage) {
    // console.log(movies);
    if (movies !== undefined) {
      containerGallery.innerHTML = template({ movies, library: true });

      pagination.updateTotalItems(localStArray.length);
      // console.log("asfdafsasf",currentPage);
      pagination.goToPage(currentPage);
      pagination.render();
    } else {
      containerGallery.innerHTML = '';
    }
    pagination.on('aftermove', event => {
      // console.log(event.page);
      currentPage = event.page;
      this.currentPageRender(localStArray, currentPage);
    });
  }
  updateCardsWatch() {
    if (
      window.location.pathname === '/myLibrary.html' ||
      (window.location.pathname === '/filmoteka-group-project/myLibrary.html' &&
        document
          .querySelector('.header-buttons')
          .firstElementChild.classList.contains('button--active'))
    ) {
      this.currentPageRender(this.loadLocalStArray('watch'), this.currentPage);
    }
  }

  updateCardsQueue() {
    if (
      window.location.pathname === '/myLibrary.html' ||
      (window.location.pathname === '/filmoteka-group-project/myLibrary.html' &&
        document
          .querySelector('.header-buttons')
          .lastElementChild.classList.contains('button--active'))
    ) {
      this.currentPageRender(this.loadLocalStArray('queue'), this.currentPage);
    }
  }
}
