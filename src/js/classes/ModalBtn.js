import LocalStorage from './LocalStorage';
export const localStorageFilms = new LocalStorage();


export default class ModalBtn {
  onModalBtnClick(btn) {
    //add method
    if (
      btn.classList.contains('queue-js') ||
      btn.classList.contains('watch-js')
    ) {
      let currentArray = null;
      let currentKey = null;
      if (btn.classList.contains('queue-js')) {
        currentArray = localStorageFilms.queueItems;
        currentKey = localStorageFilms.LOCAL_STORAGE_KEYS.queue;
        btn.textContent = 'Remove from Queue';
        btn.classList.remove('queue-js');
        btn.classList.add('remove-queue-js');
      }

      if (btn.classList.contains('watch-js')) {
        currentArray = localStorageFilms.watchedItems;
        currentKey = localStorageFilms.LOCAL_STORAGE_KEYS.watch;
        btn.textContent = 'Remove from Watched';
        btn.classList.remove('watch-js');
        btn.classList.add('remove-watch-js');
      }
      
      localStorageFilms.addItemToKeyStorage(currentKey, currentArray);     
      return;
      
    }
    if (
      btn.classList.contains('remove-watch-js') ||
      btn.classList.contains('remove-queue-js')
    ) {
      if (btn.classList.contains('remove-watch-js')) {
        btn.textContent = 'Add to Watched';
        localStorageFilms.removeItemFromKeyStorage(btn);
        btn.classList.remove('remove-watch-js');
        btn.classList.add('watch-js');
        
      }
      if (btn.classList.contains('remove-queue-js')) {
        btn.textContent = 'Add to Queue';
        localStorageFilms.removeItemFromKeyStorage(btn);
        btn.classList.remove('remove-queue-js');
        btn.classList.add('queue-js');
      }
    }
  }
}
