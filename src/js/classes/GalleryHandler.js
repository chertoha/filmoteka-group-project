import { localStorageFilms } from './ModalBtn';
import { movieCardModal } from '../modal';
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
      // console.log(event.target.closest('a'));
      const itemToFindId = event.target.closest('a').dataset.movieId;
      // console.log('itemToFindId', itemToFindId);

      const itemToFind = localStorageFilms.itemsOnCurrentPage.find(
        item => item.id === +itemToFindId
      );
      this.currentFilmOpened = itemToFind;
      console.log('itemToFind', this.currentFilmOpened);
      // modalButtons.currentyOpenedMovie = this.currentFilmOpened;

      movieCardModal.openModal();
      // movieCardModal.refs.modal.addEventListener('click', event =>
      //   modalButtons.onModalBtnClick(event.target, this.currentFilmOpened)
      // );
    }
  };
}
