import { localStorageFilms } from './ModalBtn';
import { movieCardModal } from '../modal';
import modalMovieDetailsTemplate from '../../templates/modalMovieCard.hbs';

export default class GalleryHandler {
  #galleryRef = document.querySelector('#gallery');
  #modalContent = document.querySelector('.js-movie-card');

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
      this.renderMovieCard(this.findClickedItem(itemIdToFind));

      localStorageFilms.onModalQueueBtnChange(
        this.#modalContent.querySelector('.queue-js')
      );
      localStorageFilms.onModalWatchedBtnChange(
        this.#modalContent.querySelector('.watch-js')
      );
      movieCardModal.openModal();
    }
  };

  findClickedItem(id) {
    const allCurrentItemsOnPage = localStorageFilms.getItemFromKeyStorage(
      localStorageFilms.LOCAL_STORAGE_KEYS.itemsOnCurrentPage
    );
    const itemToFind = allCurrentItemsOnPage.find(item => item.id === +id);
    localStorageFilms.currentFilm = itemToFind;

    return itemToFind;
  }

  renderMovieCard(movie) {
    this.#modalContent.innerHTML = modalMovieDetailsTemplate(movie);
  }
  1;
}
