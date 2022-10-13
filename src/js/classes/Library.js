// import '../utils/handlebars-helpers';
// import '../modal';
// import '../teamAccordion';
// import '../changeTheme';
// import Pagination from './Pagination';
// import GalleryHandler from './js/classes/GalleryHandler';
// import template from '../../templates/movieCard.hbs';
// import { localStorageFilms } from './js/classes/ModalBtn';
// import Gallery from './Gallery';
// localStorage.clear();
// const containerPag = document.querySelector('.pag');
// const pagination = new Pagination(containerPag);

// const containerGallery = document.querySelector('.gallery__list');
// const gallery = new Gallery(containerGallery, template);


export default class Library {

loadLocalStArrey(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
	};
	
}