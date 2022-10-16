import Library from './Library';
import LocalStorage from './LocalStorage';
const library = new Library();

export const localStorageFilms = new LocalStorage();

export default class ModalBtn {
  onModalBtnClick(btn) {
    //add method
    if (
      btn.classList.contains(localStorageFilms.keyClasses.addQueue) ||
      btn.classList.contains(localStorageFilms.keyClasses.addWatched)
    ) {
      let currentArray = null;
      let currentKey = null;
      if (btn.classList.contains(localStorageFilms.keyClasses.addQueue)) {
        currentArray = localStorageFilms.queueItems;
        currentKey = localStorageFilms.LOCAL_STORAGE_KEYS.queue;
        localStorageFilms.changeAddBtn(localStorageFilms.keyWords.queue, btn, localStorageFilms.keyWords.remove);
      } else {
        currentArray = localStorageFilms.watchedItems;
        currentKey = localStorageFilms.LOCAL_STORAGE_KEYS.watch;
        localStorageFilms.changeAddBtn(localStorageFilms.keyWords.watched, btn, localStorageFilms.keyWords.remove);
      }

      localStorageFilms.addItemToKeyStorage(currentKey, currentArray); //записываем в LS фильм под нужным ключем
      library.updateCards(currentKey);
      return;
    }
    //remove method
    if (
      btn.classList.contains(localStorageFilms.keyClasses.removeWatched) ||
      btn.classList.contains(localStorageFilms.keyClasses.removeQueue)
    ) {
      if (btn.classList.contains(localStorageFilms.keyClasses.removeWatched)) {
        localStorageFilms.removeItemFromKeyStorage(btn);
        localStorageFilms.changeAddBtn(localStorageFilms.keyWords.watched, btn, localStorageFilms.keyWords.add);
        library.updateCardsWatch();
        return;
      }
      localStorageFilms.removeItemFromKeyStorage(btn);
      localStorageFilms.changeAddBtn(localStorageFilms.keyWords.queue, btn, localStorageFilms.keyWords.add);
      library.updateCardsQueue();
    }
  }
}
