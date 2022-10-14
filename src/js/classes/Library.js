import '../utils/handlebars-helpers';

import '../teamAccordion';

import Pagination from './Pagination';

import template from '../../templates/movieCard.hbs';

const containerPag = document.querySelector('.pag');
const pagination = new Pagination(containerPag);

export default class Library {
  currentPage = 1;
  localStArrey = this.loadLocalStArrey('watch');

  loadLocalStArrey(key) {
    try {
      const serializedState = localStorage.getItem(key);
      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }
  currentPageRender(localStArrey, currentPage) {
    const moviesPars = [];
    for (let index = currentPage * 20 - 20; index < currentPage * 20; index++) {
      if (localStArrey[index] !== undefined) {
        moviesPars.push(localStArrey[index]);
      }
    }
    this.tempRenderCards(moviesPars, localStArrey, currentPage);
  }

  tempRenderCards(movies, localStArrey, currentPage) {
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
    pagination.on('aftermove', event => {
      // console.log(event.page);
      currentPage = event.page;
      this.currentPageRender(localStArrey, currentPage);
    });
  }
  updateCardsWatch(watch) {
    if (
      window.location.pathname === './myLibrary.html' &&
      document
        .querySelector('.header-buttons')
        .firstElementChild.classList.contains('button--active')
    ) {
      this.currentPageRender(
        this.loadLocalStArrey(`${watch}`),
        this.currentPage
      );
    }
  }

  updateCardsQueue(queue) {
    if (
      window.location.pathname === './myLibrary.html' &&
      document
        .querySelector('.header-buttons')
        .lastElementChild.classList.contains('button--active')
    ) {
      this.currentPageRender(
        this.loadLocalStArrey(`${queue}`),
        this.currentPage
      );
    }
  }
}
