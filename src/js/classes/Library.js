import '../utils/handlebars-helpers';
import LocalStorage from './LocalStorage';
import Pagination from './Pagination';
import template from '../../templates/movieCard.hbs';
import {
  containerGallery,
  containerPag,
  headerRef,
  headerButtonsContainerRef,
} from '../utils/refs';
const pagination = new Pagination(containerPag);
const localSt = new LocalStorage();

export default class Library {
  currentPage = 1;
  watchKey = localSt.LOCAL_STORAGE_KEYS.watch;
  queueKey = localSt.LOCAL_STORAGE_KEYS.queue;
  localStArrayWatch = localSt.getItemFromKeyStorage(this.watchKey);
  localStArrayQueue = localSt.getItemFromKeyStorage(this.queueKey);
  isWindowLocationLibrary = window.location.pathname === '/myLibrary.html';
  isWindowLocationFilmoteka =
    window.location.pathname === '/filmoteka-group-project/myLibrary.html';
  isLibraryPage =
    this.isWindowLocationLibrary || this.isWindowLocationFilmoteka;

  updateVar(value) {
    if (value === this.watchKey) {
      return (this.localStArrayWatch = localSt.getItemFromKeyStorage(
        this.watchKey
      ));
    } else if (value === this.queueKey) {
      return (this.localStArrayQueue = localSt.getItemFromKeyStorage(
        this.queueKey
      ));
    }
  }

  currentPageRenderQueue() {
    this.updateVar(this.queueKey);
    if (this.localStArrayQueue) {
      this.currentPageRender(this.localStArrayQueue, this.currentPage);
    } else {
      this.tempRenderCards(null);
    }
  }

  currentPageRenderWatch() {
    this.updateVar(this.watchKey);
    if (this.localStArrayWatch) {
      this.currentPageRender(this.localStArrayWatch, this.currentPage);
    } else {
      this.tempRenderCards(null);
    }
  }

  currentPageRender(localStArray, currentPage) {
    const moviesPars = [];
    for (let index = currentPage * 20 - 20; index < currentPage * 20; index++) {
      if (localStArray[index]) moviesPars.push(localStArray[index]);
    }

    this.tempRenderCards(moviesPars, localStArray, currentPage);
  }

  tempRenderCards(movies, localStArray, currentPage) {
    if (movies) {
      if (!movies.length) {
        containerGallery.innerHTML = `<li>There is nothing added to storage</li>`;
      } else {
        containerGallery.innerHTML = template({ movies, library: true });
      }

      pagination.updateTotalItems(localStArray.length);
      pagination.goToPage(currentPage);
      pagination.render();
    } else {
      containerGallery.innerHTML = `<li>There is nothing added to storage</li>`;
    }
    pagination.on('aftermove', event => {
      headerRef.scrollIntoView(top);
      currentPage = event.page;
      this.currentPageRender(localStArray, currentPage);
    });
  }
  updateCards(currentKey) {
    if (currentKey === this.watchKey) {
      this.updateCardsWatch();
      return;
    }
    if (currentKey === this.queueKey) {
      this.updateCardsQueue();
      return;
    }
  }

  updateCardsWatch() {
    this.isBtnWatchActive =
      headerButtonsContainerRef?.firstElementChild.classList.contains(
        'button--active'
      );
    if (this.isLibraryPage && this.isBtnWatchActive)
      this.currentPageRenderWatch();
  }

  updateCardsQueue() {
    this.isBtnQueueActive =
      headerButtonsContainerRef?.lastElementChild.classList.contains(
        'button--active'
      );
    if (this.isLibraryPage && this.isBtnQueueActive)
      this.currentPageRenderQueue();
  }
}
