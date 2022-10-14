import Library from './Library';
import LocalStorage from './LocalStorage';
const library = new Library();

export const localStorageFilms = new LocalStorage();

export default class ModalBtn {
  onModalBtnClick(btn) {
    //add method
    if (
      btn.classList.contains('queue-js') ||
      btn.classList.contains('watched-js')
    ) {
      let currentArray = null;
      let currentKey = null;
      if (btn.classList.contains('queue-js')) {
        currentArray = localStorageFilms.queueItems;
        currentKey = localStorageFilms.LOCAL_STORAGE_KEYS.queue;
        localStorageFilms.changeAddBtn('queue', btn, 'remove');
      } else {
        currentArray = localStorageFilms.watchedItems;
        currentKey = localStorageFilms.LOCAL_STORAGE_KEYS.watch;
        localStorageFilms.changeAddBtn('watched', btn, 'remove');
      }

      localStorageFilms.addItemToKeyStorage(currentKey, currentArray); //записываем в LS фильм под нужным ключем
      library.updateCards(currentKey);
      return;
    }
    //remove method
    if (
      btn.classList.contains('remove-watched-js') ||
      btn.classList.contains('remove-queue-js')
    ) {
      if (btn.classList.contains('remove-watched-js')) {
        localStorageFilms.removeItemFromKeyStorage(btn);
        localStorageFilms.changeAddBtn('watched', btn, 'add');
        library.updateCardsWatch();
        return;
      }
      localStorageFilms.removeItemFromKeyStorage(btn);
      localStorageFilms.changeAddBtn('queue', btn, 'add');
      library.updateCardsQueue();
    }
  }
}
