import Modal from './classes/Modal';

const movieCardModal = new Modal({
  closeModalBtn: '[data-modal-close]',
  modal: '[data-modal]',
});

const teamModal = new Modal({
  openModalBtn: '[data-team-modal-open]',
  closeModalBtn: '[data-team-modal-close]',
  modal: '[data-team-modal]',
});

// const authModal = new Modal({
//   openModalBtn: '[data-auth-modal-open]',
//   closeModalBtn: '[data-auth-modal-close]',
//   modal: '[data-auth-modal]',
// });

movieCardModal.addHandler();
teamModal.addHandler();
// authModal.addHandler();

export { movieCardModal };
