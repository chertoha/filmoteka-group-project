const refs = {
  //   gallery: document.querySelector('.gallery__item'),
  //   body: document.querySelector('body'),
  button: document.querySelector('.theme-btn'),
};

console.log('body', document.body);
refs.button.addEventListener('click', changeTheme);

function changeTheme(event) {
  document.body.classList.toggle('dark-theme');
  //   refs.galleryItems.classList.toggle('dark-gallery');
}
