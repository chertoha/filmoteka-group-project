const galleryRef = document.querySelector('#gallery');

galleryRef.addEventListener('click', onMovieCardClick);

function onMovieCardClick(event) {
  if (event.target.hasAttribute('data-movie-id')) event.preventDefault();

  if (
    event.target.hasAttribute('data-movie-id') ||
    event.target.closest('a').hasAttribute('data-movie-id')
  ) {
    console.log(event.target.closest('a'));
    // const itemToFindId = event.target.closest('a').id;

    // modal.openModal();
  }
}
