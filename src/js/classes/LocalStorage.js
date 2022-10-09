export default class LocalStorage {
  constructor() {
    this.watchedItems = [];
    this.queueItems = [];
    this.itemsOnCurrentPage = [];
  }
  addItemToKeyStorage(keyName, dataName, film) {//dataName- массив, куда нужно пушить объект с фильмом
    dataName.push(film);
    this.setFilms(keyName, dataName);
  }
  getItemFromKeyStorage(key) {
    return localStorage.getItem(JSON.parse(key));
  }
  removeItemFromKeyStorage(btn, filmRemove) {
    let currentArray = null;
    let currentRemoveKey = null;
    if (btn.classList.contain('remove-watch-js')) {
      currentArray = 'watchedItems';
      currentRemoveKey = 'watch';
    }
    if (btn.classList.contain('remove-queue-js')) {
      currentArray = 'queueItems';
      currentRemoveKey = 'queue';
    }
      const newArray = this[currentArray] = this[currentArray].filter(film => film.id !== filmRemove.id);
      this.setFilms(currentRemoveKey, newArray);
  }
  setFilms(keyName, value) {
    localStorage.setItem(keyName, JSON.stringify(value));
  }
}
