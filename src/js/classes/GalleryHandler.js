class GalleryHandler {
  galleryRef = document.querySelector('#gallery');

  addGalleryHandler() {
    this.galleryRef.addEventListener('click', this.onMovieCardClick);
  }

  onMovieCardClick = event => {
    if (event.target.hasAttribute('data-movie-id')) event.preventDefault();

    if (
      event.target.hasAttribute('data-movie-id') ||
      event.target.closest('a').hasAttribute('data-movie-id')
    ) {
      console.log(event.target.closest('a'));
      const itemToFindId = event.target.closest('a').dataset.movieId;
      console.log('itemToFindId', itemToFindId);

      // render картки по id із localStorage.itemsOnCurrentPage.
      // modal.openModal();
    }
  };
}

const galleryHandler = new GalleryHandler();
galleryHandler.addGalleryHandler();
