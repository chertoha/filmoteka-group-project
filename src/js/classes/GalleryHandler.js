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
      movieCardModal.openModal();
    }
  };

  findClickedItem(id) {
    const allCurrentItemsOnPage = localStorageFilms.getItemFromKeyStorage(
      localStorageFilms.LOCAL_STORAGE_KEYS.itemsOnCurrentPage
    );
    const itemToFind = allCurrentItemsOnPage.find(item => item.id === +id);
    localStorageFilms.currentFilm = itemToFind;

    console.log('itemToFind', itemToFind.genres);
    return itemToFind;
  }

  renderMovieCard(movie) {
    // checkMovies.update(movie, this.genres);
    checkMovies.checkMoviePoster(movie);
    console.log('movie.genres', movie.genres);

    this.#modalContent.innerHTML = modalMovieDetailsTemplate(movie);
  }
}
