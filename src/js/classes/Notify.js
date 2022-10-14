export default class Notify {
  #MessageSuccess = 'Search result successfull!';
  #MessageFailure =
    'Search result not successfull. Enter the movie name and try again!';

  constructor() {}

  notifyFailure() {
    if (!document.querySelector('.failure')) {
      const notify = document.createElement('aside');
      notify.classList.add('failure');
      notify.innerHTML = `${this.#MessageFailure}`;

      document.body.appendChild(notify);

      setTimeout(() => {
        document.body.removeChild(notify);
      }, 4000);
    }
  }

  notifySuccess() {
    if (!document.querySelector('.success')) {
      const notify = document.createElement('aside');
      notify.classList.add('success');
      notify.innerHTML = `${this.#MessageSuccess}`;

      document.body.appendChild(notify);

      setTimeout(() => {
        document.body.removeChild(notify);
      }, 4000);
    }
  }
}
