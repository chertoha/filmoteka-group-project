import ApiService from './ApiService';
import { containerGallery, movieCardModalRef } from '../utils/refs';
import { localStorageFilms } from './ModalBtn';
import { movieCardModal } from '../modal';
import modalMovieDetailsTemplate from '../../templates/modalMovieCard.hbs';
import modalMovieDetailsBackSide from '../../templates/backsideModalMovieCard.hbs';
import CheckMovies from './CheckMovies';

const checkMovieData = new CheckMovies();
const apiService = new ApiService();

export default class GalleryHandler {
  #galleryRef = containerGallery;
  #modalContent = movieCardModalRef;

  addGalleryHandler() {
    this.#galleryRef.addEventListener('click', event =>
      this.onMovieCardClick(event)
    );
  }

  async onMovieCardClick(event) {
    event.preventDefault();

    if (
      event.target?.hasAttribute('data-movie-id') ||
      event.target?.closest('a')?.hasAttribute('data-movie-id')
    ) {
      const itemIdToFind = event.target.closest('a').dataset.movieId;
      this.renderMovieCard(this.findClickedItem(itemIdToFind));
      this.getModalsButtons();
      this.FlipImgHandler();
      movieCardModal.openModal();

      try {
        const movieDetails = await apiService.fetchMoviesByID(itemIdToFind);
        checkMovieData.fixLargeNumbers(movieDetails);
        this.renderBackSide(movieDetails);
      } catch (error) {
        console.log(error);
      }
    }
  }

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

  getModalsButtons() {
    localStorageFilms.onModalQueueBtnChange(
      this.#modalContent.querySelector('.queue-js')
    );
    localStorageFilms.onModalWatchedBtnChange(
      this.#modalContent.querySelector('.watched-js')
    );
  }

  FlipImgHandler() {
    const flipCard = document.querySelector('#flip-wrapper');
    flipCard.addEventListener('click', event =>
      event.currentTarget.classList.toggle('is-flipped')
    );
  }

  renderBackSide(movieDetailedData) {
    const flipBackSide = document.querySelector('#flip-back-side');
    flipBackSide.innerHTML = modalMovieDetailsBackSide(movieDetailedData);
  }
}
