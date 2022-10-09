class LocalStorage {
  constructor() {
    this.watchedItems = [];
    this.queueItems = [];
    this.itemsOnCurrentPage = [];
  }
  addItemToKeyStorage(keyName, dataName, film) {//dataName- массив, куда нужно пушить объект с фильмом
    //сделать невозможным повторное нажатие кнопки
    dataName.push(film);
    this.setFilms(keyName, dataName);
  }
  getItemFromKeyStorage(key) {
    return localStorage.getItem(JSON.parse(key));
  }
  removeItemFromKeyStorage(btnClass, filmRemove, keyName) {
    if (btnClass === '.remove-watch-js') {
    const newWatch = this.watchedItems = this.watchedItems.filter(film => film.id !== filmRemove.id);
      this.setFilms(keyName, newWatch);
    }
    if (btnClass === '.remove-queue-js') {
    const newQueue = this.queueItems = this.queueItems.filter(film => film.id !== filmRemove.id);
      this.setFilms(keyName, newQueue);
    }
  }
  setFilms(keyName, value) {
    localStorage.setItem(keyName, JSON.stringify(value));
  }
}
