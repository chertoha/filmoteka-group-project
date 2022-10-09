import LocalStorage from './LocalStorage';
export const localStorageFilms = new LocalStorage();

export default class ModalBtn {
  onModalBtnClick(btn, film) {
    if (
      !btn.classList.contains('queue-js') &&
      !btn.classList.contains('watch-js')
    ) {
      return;
    }
    let currentArray = null;
    let currentKey = null;
    if (btn.classList.contains('queue-js')) {
      currentArray = localStorageFilms.queueItems;
      currentKey = 'queue';
    }

    if (btn.classList.contains('watch-js')) {
      currentArray = localStorageFilms.watchedItems;
      currentKey = 'watch';
    }
    localStorageFilms.addItemToKeyStorage(currentKey, currentArray, film);
  }
}
