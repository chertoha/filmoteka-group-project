import { localStorageFilms } from './ModalBtn';
import { movieCardModal } from '../modal';

export default class GalleryHandler {
  #galleryRef = document.querySelector('#gallery');

  addGalleryHandler() {
    this.#galleryRef.addEventListener('click', this.onMovieCardClick);
  }

  onMovieCardClick = event => {
    event.preventDefault();

    if (
      event.target?.hasAttribute('data-movie-id') ||
      event.target?.closest('a')?.hasAttribute('data-movie-id')
    ) {
      const itemIdToFind = event.target.closest('a').dataset.movieId;
      const allCurrentItemsOnPage = localStorageFilms.getItemFromKeyStorage(
        localStorageFilms.LOCAL_STORAGE_KEYS.itemsOnCurrentPage
      );
      const itemToFind = allCurrentItemsOnPage.find(
        item => item.id === +itemIdToFind
      );
      this.currentFilmOpened = itemToFind;
      localStorageFilms.currentFilm = itemToFind;
      movieCardModal.openModal();
    }
  };
}
