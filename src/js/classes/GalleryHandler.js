import { localStorageFilms } from './ModalBtn';
import ModalBtn from './ModalBtn';

const modalButtons = new ModalBtn();

export default class GalleryHandler {
  galleryRef = document.querySelector('#gallery');
  currentFilmOpened = {};

  addGalleryHandler() {
    this.galleryRef.addEventListener('click', this.onMovieCardClick);
  }

  onMovieCardClick = event => {
    event.preventDefault();

    if (
      event.target?.hasAttribute('data-movie-id') ||
      event.target?.closest('a')?.hasAttribute('data-movie-id')
    ) {
      console.log(event.target.closest('a'));
      const itemToFindId = event.target.closest('a').dataset.movieId;
      console.log('itemToFindId', itemToFindId);

      const itemToFind = localStorageFilms.itemsOnCurrentPage.find(
        item => item.id === +itemToFindId
      );
      this.currentFilmOpened = itemToFind;
      console.log('itemToFind', this.currentFilmOpened);

      // render картки по id із localStorage.itemsOnCurrentPage.
      // modalBtn.modalBtnClick(currentBtnClass, film)
      // передать modalBtn.modalBtnClick('.queue-js', this.currentOpenedModalFilm)
      // modal.openModal();

      document.querySelector('[data-modal]').classList.remove('is-hidden');
      document
        .querySelector('[data-modal]')
        .addEventListener('click', event =>
          modalButtons.onModalBtnClick(event.target, this.currentFilmOpened)
        );
    }
  };
}
