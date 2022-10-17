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
  currentPageKey = localSt.LOCAL_STORAGE_KEYS.currentPageValue;
  localStArrayWatch = localSt.getItemFromKeyStorage(this.watchKey);
  localStArrayQueue = localSt.getItemFromKeyStorage(this.queueKey);
  isLibraryPage =
    window.location.pathname === '/myLibrary.html' ||
    window.location.pathname === '/filmoteka-group-project/myLibrary.html';

  updateVar(value) {
    if (value === this.watchKey) {
      return (this.localStArrayWatch = localSt.getItemFromKeyStorage(
        this.watchKey
      ));
    }
    if (value === this.queueKey) {
      return (this.localStArrayQueue = localSt.getItemFromKeyStorage(
        this.queueKey
      ));
    }
    if (value === this.currentPageKey) {
      return localSt.getCurrentPageValue(this.currentPageKey);
    }
  }

  currentPageRenderQueue() {
    localSt.addCurrentPageValue(this.currentPageKey, 1)
    this.updateVar(this.queueKey);
    if (this.localStArrayQueue) {
      this.currentPageRender(this.localStArrayQueue, this.currentPage);
      return;
    }
    this.tempRenderCards(null);
  }

  currentPageRenderWatch() {
    localSt.addCurrentPageValue(this.currentPageKey, 1)
    this.updateVar(this.watchKey);
    if (this.localStArrayWatch) {
      this.currentPageRender(this.localStArrayWatch, this.currentPage);
      return;
    }
    this.tempRenderCards(null);
  }

  currentPageRenderQueueUpdate() {
    this.updateVar(this.queueKey);
    if (this.localStArrayQueue) {
      let currentPage = this.updateVar(this.currentPageKey);
      let moviesPars = this.currentPageRenderValue(
        this.localStArrayQueue,
        currentPage
      );
      if (!moviesPars.length) {
        currentPage -= 1;
      }
      if (this.localStArrayQueue.length <= 20) {
        currentPage = 1;
      }
      this.currentPageRender(this.localStArrayQueue, currentPage);
      return;
    }
    this.tempRenderCards(null);
  }

  currentPageRenderWatchUpdate() {
    this.updateVar(this.watchKey);
    if (this.localStArrayWatch) {
      let currentPage = this.updateVar(this.currentPageKey);
      let moviesPars = this.currentPageRenderValue(
        this.localStArrayWatch,
        currentPage
      );
      if (!moviesPars.length) {
        currentPage -= 1;
      }
      if (this.localStArrayWatch.length <= 20) {
        currentPage = 1;
      }
      this.currentPageRender(this.localStArrayWatch, currentPage);
      return;
    }
    this.tempRenderCards(null);
  }

  currentPageRenderValue(localStArray, currentPage) {
    const moviesPars = [];
    for (let index = currentPage * 20 - 20; index < currentPage * 20; index++) {
      if (localStArray[index]) moviesPars.push(localStArray[index]);
    }
    return moviesPars;
  }

  currentPageRender(localStArray, currentPage) {
    const moviesPars = [];
    for (let index = currentPage * 20 - 20; index < currentPage * 20; index++) {
      if (localStArray[index]) moviesPars.push(localStArray[index]);
    }
    this.tempRenderCards(moviesPars, localStArray, currentPage);
  }

  tempRenderCards(movies, localStArray, currentPage) {
    if (!Array.isArray(movies)) {
      containerGallery.innerHTML = `<li>There is nothing added to storage</li>`;
      pagination.updateTotalItems(0);
      pagination.render();
      // return;
    }
    if (movies) {
      if (!movies.length) {
        containerGallery.innerHTML = `<li>There is nothing added to storage</li>`;
      } else {
        containerGallery.innerHTML = template({ movies, library: true });
      }

      pagination.updateTotalItems(localStArray.length);
      pagination.goToPage(currentPage);
      pagination.render();
    }

    pagination.on('aftermove', event => {
      headerRef.scrollIntoView(top);
      currentPage = event.page;
      localSt.addCurrentPageValue(this.currentPageKey, currentPage);
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
    if (this.isLibraryPage) {
      const isBtnWatchActive =
        headerButtonsContainerRef.firstElementChild.classList.contains(
          'button--active'
        );
      if (isBtnWatchActive) this.currentPageRenderWatchUpdate();
    }
  }
  updateCardsQueue() {
    if (this.isLibraryPage) {
      const isBtnQueueActive =
        headerButtonsContainerRef.lastElementChild.classList.contains(
          'button--active'
        );
      if (isBtnQueueActive) this.currentPageRenderQueueUpdate();
    }
  }
}
