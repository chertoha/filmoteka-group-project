export default class Notify {
  #MessageSuccess = 'Search result is successful!';
  #MessageFailure =
    'Search result is unsuccessful. Enter the movie name and try again!';
  note = document.querySelector('.notify');
  #checkerFail = true;
  #checkerSuccess = true;

  constructor() {}

  notifyFailure(message = this.#MessageFailure) {
    if (this.#checkerFail) {
      this.#checkerFail = false;
      this.note.classList.add('failure');
      this.note.classList.remove('invisible', 'success');
      this.note.innerHTML = `${message}`;

      setTimeout(() => {
        if (this.#checkerSuccess) {
          this.note.classList.add('invisible');
        }
      }, 3000);
      setTimeout(() => {
        this.#checkerFail = true;
        if (this.#checkerSuccess) {
          this.note.classList.remove('failure');
          this.note.innerHTML = '';
        }
      }, 4000);
    }
  }

  notifySuccess() {
    if (this.#checkerSuccess) {
      this.#checkerSuccess = false;
      this.note.classList.add('success');
      this.note.classList.remove('invisible', 'failure');
      this.note.innerHTML = `${this.#MessageSuccess}`;

      setTimeout(() => {
        if (this.#checkerFail) {
          this.note.classList.add('invisible');
        }
      }, 3000);
      setTimeout(() => {
        this.#checkerSuccess = true;
        if (this.#checkerFail) {
          this.note.classList.remove('success');
          this.note.innerHTML = '';
        }
      }, 4000);
    }
  }
}
