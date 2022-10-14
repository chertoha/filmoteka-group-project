import '../utils/handlebars-helpers';
import LocalStorage from './LocalStorage';
import Pagination from './Pagination';
import template from '../../templates/movieCard.hbs';
import { containerGallery, containerPag, headerRef } from '../utils/refs';
const pagination = new Pagination(containerPag);
const localSt = new LocalStorage;

export default class Library {

  
  currentPage = 1;
  // localStArray = localSt.getItemFromKeyStorage(localSt.LOCAL_STORAGE_KEYS.watch);

  currentPageRenderQueue() {
    if (localSt.getItemFromKeyStorage(localSt.LOCAL_STORAGE_KEYS.queue) !== undefined) {
    this.currentPageRender(localSt.getItemFromKeyStorage(localSt.LOCAL_STORAGE_KEYS.queue), this.currentPage);
  } else {this.tempRenderCards(undefined)}
  };

    currentPageRenderWatch() { 
      if (localSt.getItemFromKeyStorage(localSt.LOCAL_STORAGE_KEYS.watch) !== undefined) {
          this.currentPageRender(localSt.getItemFromKeyStorage(localSt.LOCAL_STORAGE_KEYS.watch), this.currentPage);
      } else {
        this.tempRenderCards(undefined)
       }
   
  };

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
      headerRef.scrollIntoView(top);

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
    if ((window.location.pathname === '/myLibrary.html' || window.location.pathname === '/filmoteka-group-project/myLibrary.html') && document
          .querySelector('.header-buttons')
        .firstElementChild.classList.contains('button--active')) {
        this.currentPageRenderWatch()
    }
  }

  updateCardsQueue() {
    if ((window.location.pathname === '/myLibrary.html' || window.location.pathname === '/filmoteka-group-project/myLibrary.html') && document
          .querySelector('.header-buttons')
        .lastElementChild.classList.contains('button--active')) {
      this.currentPageRenderQueue()
      
    }
  }
}
