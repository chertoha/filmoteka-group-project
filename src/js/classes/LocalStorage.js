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
    let newArray = [];
    if (btn.classList.contains('remove-watched-js')) {
      currentArray = 'watchedItems';
      currentRemoveKey = this.LOCAL_STORAGE_KEYS.watch;
    }
    if (btn.classList.contains('remove-queue-js')) {
      currentArray = 'queueItems';
      currentRemoveKey = this.LOCAL_STORAGE_KEYS.queue;
    }
    this[currentArray].forEach(item => {
      if (item.id !== this.currentFilm.id) {
        newArray.push(item);
      }
    });
    this.setFilms(currentRemoveKey, newArray);
    this[currentArray] = newArray;
    newArray = [];
  }
  setFilms(keyName, values) {
    localStorage.removeItem(keyName);
    let uniqueArray = [];
    let uniqueId = [];
    values.forEach(value => {
      if (!uniqueId.includes(value.id)) {
        uniqueId.push(value.id);
        uniqueArray.push(value);
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
      this.changeAddBtn('watched', btn, 'remove');
    }
  }
  onModalQueueBtnChange(btn) {
    if (this.queueItems.some(item => this.currentFilm.id === item.id)) {
      this.changeAddBtn('queue', btn, 'remove');
    }
  }
  changeAddBtn(name, btn, event) {
    if (event === 'remove') {
      btn.textContent = `Remove from ${name}`;
      btn.classList.remove(`${name}-js`);
      btn.classList.add(`remove-${name}-js`);
      return;
    }
    btn.textContent = `Add to ${name}`;
    btn.classList.remove(`remove-${name}-js`);
    btn.classList.add(`${name}-js`);
  }
  // set themeBody(currentTheme) {
  //   localStorage.setItem(
  //     this.LOCAL_STORAGE_KEYS.theme,
  //     JSON.stringify(currentTheme)
  //   );
  // }

  addThemeToLocalStorage(currentTheme) {
    localStorage.setItem(
      this.LOCAL_STORAGE_KEYS.theme,
      JSON.stringify(currentTheme)
    );
  }

  removeThemeFromLocalStorage() {
    localStorage.removeItem(this.LOCAL_STORAGE_KEYS.theme);
  }
}
