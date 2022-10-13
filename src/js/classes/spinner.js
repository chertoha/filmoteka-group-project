import { spinnerRef } from '../utils/refs';

export default class Spinner {
  constructor() {
    this.spinnerRef = spinnerRef;
    this.hidden = true;
  }

  hide() {
    this.spinnerRef.classList.add('is-hidden');
    this.hidden = true;
  }

  show() {
    this.spinnerRef.classList.remove('is-hidden');
    this.hidden = false;
  }
}
