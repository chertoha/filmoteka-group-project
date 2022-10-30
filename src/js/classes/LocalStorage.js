import { create } from 'handlebars';

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
      theme: 'theme',
      currentPageValue: 'currentPageValue',
      genres: 'genres',
    };
    this.keyWords = {
      remove: 'remove',
      add: 'add',
      queue: 'queue',
      watched: 'watched',
    };
    this.keyClasses = {
      removeQueue: 'remove-queue-js',
      removeWatched: 'remove-watched-js',
      addQueue: 'queue-js',
      addWatched: 'watched-js',
    };
  }
  addItemToKeyStorage(keyName, dataName) {
    //dataName- массив, куда нужно пушить объект с фильмом
    dataName.unshift(this.currentFilm);
    this.setFilms(keyName, dataName);
  }
  getItemFromKeyStorage(key) {
    try {
      const getItem = localStorage.getItem(key);
      return getItem === null ? undefined : JSON.parse(getItem);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
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
    if (btn.classList.contains(this.keyClasses.removeWatched)) {
      currentArray = 'watchedItems';
      currentRemoveKey = this.LOCAL_STORAGE_KEYS.watch;
    }
    if (btn.classList.contains(this.keyClasses.removeQueue)) {
      currentArray = 'queueItems';
      currentRemoveKey = this.LOCAL_STORAGE_KEYS.queue;
    }
    const newArray = this[currentArray].filter(
      item => item.id !== this.currentFilm.id
    );
    this.setFilms(currentRemoveKey, newArray);
    this[currentArray] = newArray;
  }
  setFilms(keyName, values) {
    localStorage.removeItem(keyName);
    let uniqueId = [];
    const uniqueArray = values.filter(value => {
      if (!uniqueId.includes(value.id)) {
        uniqueId.push(value.id);
        return value;
      }
    });
    localStorage.setItem(keyName, JSON.stringify(uniqueArray));
  }
  addItemsOnCurrentPage(films) {
    this.itemsOnCurrentPage = [
      ...films,
      ...this.watchedItems,
      ...this.queueItems,
    ];
    this.setFilms(
      this.LOCAL_STORAGE_KEYS.itemsOnCurrentPage,
      this.itemsOnCurrentPage
    );
  }
  onModalWatchedBtnChange(btn) {
    if (this.watchedItems.some(item => this.currentFilm.id === item.id)) {
      this.changeAddBtn(this.keyWords.watched, btn, this.keyWords.remove);
    }
  }
  onModalQueueBtnChange(btn) {
    if (this.queueItems.some(item => this.currentFilm.id === item.id)) {
      this.changeAddBtn(this.keyWords.queue, btn, this.keyWords.remove);
    }
  }
  changeAddBtn(name, btn, event) {
    if (event === this.keyWords.remove) {
      btn.textContent = `Remove from ${name}`;
      btn.classList.remove(`${name}-js`);
      btn.classList.add(`remove-${name}-js`);
      return;
    }
    btn.textContent = `Add to ${name}`;
    btn.classList.remove(`remove-${name}-js`);
    btn.classList.add(`${name}-js`);
  }

  addThemeToLocalStorage(currentTheme) {
    localStorage.setItem(
      this.LOCAL_STORAGE_KEYS.theme,
      JSON.stringify(currentTheme)
    );
  }

  removeThemeFromLocalStorage() {
    localStorage.removeItem(this.LOCAL_STORAGE_KEYS.theme);
  }

  addCurrentPageValue(value) {
    localStorage.setItem(this.LOCAL_STORAGE_KEYS.currentPageValue, value);
  }

  getCurrentPageValue() {
    const serializedState = localStorage.getItem(
      this.LOCAL_STORAGE_KEYS.currentPageValue
    );
    return serializedState;
  }

  addGenres(genres) {
    localStorage.setItem(
      this.LOCAL_STORAGE_KEYS.genres,
      JSON.stringify(genres)
    );
  }
}
