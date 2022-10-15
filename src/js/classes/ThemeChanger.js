import LocalStorage from './LocalStorage';
const localStorageTheme = new LocalStorage();

export default class ThemeChanger {
  refs = {
    button: document.querySelector('.toggle-track'),
    label: document.querySelector('.theme-btn'),
    header: document.querySelector('header'),
    input: document.querySelector('.toggle__input'),
  };

  addHandler() {
    this.refs.button.addEventListener('click', this.changeTheme.bind(this));
    this.refs.label.addEventListener('click', this.changeTheme.bind(this));
  }

  updatePage(themeValue) {
    if (themeValue === 'dark-theme') {
      this.onDarkTheme();
      this.refs.input.setAttribute('checked', true);
    }
  }

  onDarkTheme() {
    document.body.classList.toggle('dark-theme');
    this.refs.header.classList.toggle('dark-image');
  }

  changeTheme() {
    if (!document.body.classList.contains('dark-theme')) {
      localStorageTheme.addThemeToLocalStorage('dark-theme');
    } else {
      localStorage.removeItem(localStorageTheme.LOCAL_STORAGE_KEYS.theme);
    }
    this.onDarkTheme();
  }

  getThemeValueFromLocalStorage() {
    return localStorageTheme.getItemFromKeyStorage(
      localStorageTheme.LOCAL_STORAGE_KEYS.theme
    );
  }
}
