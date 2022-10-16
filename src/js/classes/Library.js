import '../utils/handlebars-helpers';
import {headerButtonsContainerRef} from'../utils/refs';
import LocalStorage from './LocalStorage';
import Pagination from './Pagination';
import template from '../../templates/movieCard.hbs';
import { containerGallery, containerPag, headerRef } from '../utils/refs';
const pagination = new Pagination(containerPag);
const localSt = new LocalStorage();

export default class Library {
  currentPage = 1;
  localStArrayWatch = localSt.getItemFromKeyStorage(localSt.LOCAL_STORAGE_KEYS.watch);
  localStArrayQueue = localSt.getItemFromKeyStorage(localSt.LOCAL_STORAGE_KEYS.queue);

  updateVar(value) {
    if (value === localSt.LOCAL_STORAGE_KEYS.watch) {
      return this.localStArrayWatch = localSt.getItemFromKeyStorage(localSt.LOCAL_STORAGE_KEYS.watch);
    } else if (value === localSt.LOCAL_STORAGE_KEYS.queue) {
return  this.localStArrayQueue = localSt.getItemFromKeyStorage(localSt.LOCAL_STORAGE_KEYS.queue);
    }
   
  }

  currentPageRenderQueue() {
    this.updateVar(localSt.LOCAL_STORAGE_KEYS.queue)
    if (this.localStArrayQueue) {
      this.currentPageRender(
        this.localStArrayQueue,
        this.currentPage
      );
    } else {
      this.tempRenderCards(null);
    }
  }

  currentPageRenderWatch() {
    this.updateVar(localSt.LOCAL_STORAGE_KEYS.watch)
    if (this.localStArrayWatch) {
      
      this.currentPageRender(
        this.localStArrayWatch,
        this.currentPage
      );
    } else {
      this.tempRenderCards(null);
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
    if (movies) {
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
  updateCards(currentKey) {
    if (currentKey === localSt.LOCAL_STORAGE_KEYS.watch) {
      this.updateCardsWatch();
    } else if (currentKey === localSt.LOCAL_STORAGE_KEYS.queue) {
      this.updateCardsQueue();
    }
  }
  windowLocationLibrary = window.location.pathname === '/myLibrary.html';
  windowLocationFilmoteka = window.location.pathname ===
    '/filmoteka-group-project/myLibrary.html';
  
  updateCardsWatch() {

    if (
      (this.windowLocationLibrary ||
        this.windowLocationFilmoteka) &&
      headerButtonsContainerRef.firstElementChild.classList.contains('button--active')
    ) {
      
      this.currentPageRenderWatch();
    }
  }

  updateCardsQueue() {
    if (
      (this.windowLocationLibrary ||
        this.windowLocationFilmoteka) &&
      headerButtonsContainerRef.lastElementChild.classList.contains('button--active')
    ) {
     
      this.currentPageRenderQueue();
    }
  }
}
