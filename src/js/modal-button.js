const refs = {
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
};
console.log(refs.modal);
console.log(refs.closeModalBtn);

refs.closeModalBtn.addEventListener('click', onBtnClick);
// refs.modal.addEventListener('click', onBackdropClick);

function onBtnClick() {
  document.body.classList.remove('modal-open');
  refs.modal.classList.add('is-hidden');
  // document.removeEventListener('keydown', onEscKeyDown);
}

// onEscKeyDown(closeModal) {
//   return event => {
//     if (event.code !== 'Escape') {
//       return;
//     }
//     closeModal();
//   };
// }
