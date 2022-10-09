  const refs = {
    closeModalBtn: document.querySelector('[data-question-form-modal-close]'),
    modal: document.querySelector("[data-modal]"),
  };

  refs.closeModalBtn.addEventListener("click", onBtnClick);
  refs.modal.addEventListener("click", onBackdropClick)

  function onBtnClick() {
    document.body.classList.remove("modal-open");
    refs.modal.classList.add("is-hidden");
    document.removeEventListener('keydown', onEscKeyDown);
  }

  // onEscKeyDown(closeModal) {
  //   return event => {
  //     if (event.code !== 'Escape') {
  //       return;
  //     }
  //     closeModal();
  //   };
  // }
