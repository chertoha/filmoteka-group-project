  const refs = {
    modal: document.querySelector("[data-modal]"),
    closeModalBtn: document.querySelector('[data-question-form-modal-close]'),
  };

  refs.closeModalBtn.addEventListener("click", onBtnClick);

  function onBtnClick() {
    document.body.classList.toggle("modal-open")
    refs.modal.classList.toggle("is-hidden");
  }



