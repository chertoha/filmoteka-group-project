import LocalStorage from "./LocalStorage";
const localStorageFilms = new LocalStorage();

export default class ModalBtn {
  onModalBtnClick(btn, film) {
    let currentBtn = null;
    let currentKey = null;
    if (btn.classList.contain('queue-js')) {
      currentBtn = 'queueItems';
      currentKey = 'queue';
    }
    
    if (btn.classList.contain('watch-js')) {
      currentBtn = 'watchedItems';
      currentKey = 'watch';
  }
  localStorageFilms.addItemToKeyStorage(currentKey, localStorageFilms[currentBtn], film);
    }
}