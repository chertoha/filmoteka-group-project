import ThemeChanger from './classes/ThemeChanger';
const themeChanger = new ThemeChanger();

themeChanger.addHandler();
themeChanger.updatePage(themeChanger.getThemeValueFromLocalStorage());
