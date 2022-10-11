export default class Spinner {
  constructor(selector) {
    this.buttonRef = document.querySelector(selector);
    this.hidden = true;
  }

  hide() {
    this.buttonRef.classList.add('is-hidden');
    this.hidden = true;
  }

  show() {
    this.buttonRef.classList.remove('is-hidden');
    this.hidden = false;
  }
}
