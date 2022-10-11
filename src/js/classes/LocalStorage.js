export default class LocalStorage {
  constructor() {
    this.watchedItems = [];
    this.queueItems = [];
    this.itemsOnCurrentPage = [];
    this.currentFilm = null;
    this.LOCAL_STORAGE_KEYS = {
      itemsOnCurrentPage: 'itemsOnCurrentPage',
      watch: 'watch',
      queue: 'queue',
    };
  }
  addItemToKeyStorage(keyName, dataName) {
    //dataName- массив, куда нужно пушить объект с фильмом
    dataName.push(this.currentFilm);
    this.setFilms(keyName, dataName);
  }
  getItemFromKeyStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  saveItemsForArrayAfterReload() {
    console.log('this is saveItemsForArrayAfterReload');
    //метод должен вызываться при загрузке страницы
    if (JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEYS.watch))) {
      this.watchedItems = JSON.parse(
        localStorage.getItem(this.LOCAL_STORAGE_KEYS.watch)
      );
    }
    if (JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEYS.queue))) {
      this.queueItems = JSON.parse(
        localStorage.getItem(this.LOCAL_STORAGE_KEYS.queue)
      );
    }
  }
  removeItemFromKeyStorage(btn) {
    let currentArray = null;
    let currentRemoveKey = null;
    if (btn.classList.contains('remove-watch-js')) {
      currentArray = this.watchedItems;
      currentRemoveKey = this.LOCAL_STORAGE_KEYS.watch;
    }
    if (btn.classList.contains('remove-queue-js')) {
      currentArray = this.queueItems;
      currentRemoveKey = this.LOCAL_STORAGE_KEYS.queue;
    }
    currentArray = currentArray.filter(film => film.id !== this.currentFilm.id);
    this.setFilms(currentRemoveKey, currentArray);
    currentArray = null;
  }
  setFilms(keyName, values) {
    localStorage.removeItem(keyName);
    let uniqueArray = [];
    let uniqueId = [];
    values.forEach((value) => {
      // console.log(!acc.includes(value.id));
      if (!uniqueId.includes(value.id)) {
        uniqueId.push(value.id);
        uniqueArray.push(value);
      }
    });
    localStorage.setItem(keyName, JSON.stringify(uniqueArray));
    uniqueArray = [];
    uniqueId = [];
  }

  addItemsOnCurrentPage(films) {
    this.itemsOnCurrentPage = [...films];
    this.setFilms(this.LOCAL_STORAGE_KEYS.itemsOnCurrentPage, this.itemsOnCurrentPage);
  }
  onModalWatchedBtnChange(btn) {
    const onTrue = this.watchedItems.some(item => this.currentFilm.id === item.id);
    if (onTrue) {
      btn.textContent = 'Remove from Watch';
      btn.classList.remove('watch-js');
      btn.classList.add('remove-watch-js');
    }
  }
  onModalQueueBtnChange(btn) {
    const onTrue = this.queueItems.some(item => this.currentFilm.id === item.id);
    if (onTrue) {
      btn.textContent = 'Remove from Queue';
      btn.classList.remove('queue-js');
      btn.classList.add('remove-queue-js');
    }
}
}


