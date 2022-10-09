import Modal from './classes/Modal';

const movieCardModal = new Modal({
  closeModalBtn: '[data-modal-close]',
  modal: '[data-modal]',
});

const teamModal = new Modal({
  openModalBtn: '[data-team-modal-open]',
  closeModalBtn: '[data-team-modal-close]',
  modal: '[data-team-modal-modal]',
});

movieCardModal.addHandler();
teamModal.addHandler();

export { movieCardModal };
