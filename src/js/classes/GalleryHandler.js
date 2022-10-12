import { localStorageFilms } from './ModalBtn';
import { movieCardModal } from '../modal';
import modalMovieDetailsTemplate from '../../templates/modalMovieCard.hbs';
import { checkMovies } from './Gallery';

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
      const watchBtn = document.querySelector('.watch-js');
      const queueBtn = document.querySelector('.queue-js');
      localStorageFilms.onModalQueueBtnChange(queueBtn);
      localStorageFilms.onModalWatchedBtnChange(watchBtn);
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
    console.log('movie', movie);
    checkMovies.checkMoviePoster(movie);
    this.#modalContent.innerHTML = modalMovieDetailsTemplate(movie);
  }
  1;
}
