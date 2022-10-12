const refs = {
  gallery: document.querySelector('.gallery__item'),
  body: document.querySelector('body'),
  button: document.querySelector('.theme-btn'),
};
console.log(refs.gallery);
refs.button.addEventListener('click', changeTheme);

function changeTheme(event) {
  refs.body.classList.toggle('dark-bg');
  //   refs.galleryItems.classList.toggle('dark-gallery');
}
