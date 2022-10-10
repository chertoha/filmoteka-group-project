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
  }
  setFilms(keyName, value) {
    localStorage.removeItem(keyName);
    localStorage.setItem(keyName, JSON.stringify(value));
  }

  addItemsOnCurrentPage(films) {
    this.itemsOnCurrentPage = [...films];
    this.setFilms(
      this.LOCAL_STORAGE_KEYS.itemsOnCurrentPage,
      this.itemsOnCurrentPage
    );
  }
}
