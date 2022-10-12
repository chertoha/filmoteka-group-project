import debounce from 'lodash.debounce';

const buttonUpRef = document.querySelector('.button--up');
window.addEventListener('scroll', debounce(onWindowScroll, 500));

function onWindowScroll() {
  console.log(window.pageYOffset);

  if (window.pageYOffset >= 1000) {
    buttonUpRef.classList.toggle('hidden', false);
  } else {
    buttonUpRef.classList.toggle('hidden', true);
  }
}
