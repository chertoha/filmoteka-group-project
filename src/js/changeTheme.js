const refs = {
  button: document.querySelector('.theme-btn'),
  header: document.querySelector('header'),
};

refs.button.addEventListener('click', changeTheme);

function changeTheme(event) {
  document.body.classList.toggle('dark-theme');
  refs.header.classList.toggle('dark-image');
  //   refs.header.classList.toggle('dark-image-lib');
}
