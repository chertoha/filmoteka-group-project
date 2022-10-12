const refs = {
  //   gallery: document.querySelector('.gallery__item'),
  //   body: document.querySelector('body'),
  button: document.querySelector('.theme-btn'),
  header: document.querySelector('header'),
};

console.log(header);
refs.button.addEventListener('click', changeTheme);

function changeTheme(event) {
  document.body.classList.toggle('dark-theme');
  refs.header.classList.toggle('dark-image');
}
