// do not write code here
// only import can be inserted
import './js/utils/handlebars-helpers';

//Anton's temporary test code----------------------------
import './js/temp/antonTempTest';
//Anton's temporary test code----------------------------

import './js/classes/HeaderBtnHandler';
import './js/modal';
import './js/teamAccordion';

import Pagination from './js/classes/Pagination';
import GalleryHandler from './js/classes/GalleryHandler';
import template from './templates/movieCard.hbs';

const galleryHandler = new GalleryHandler();
galleryHandler.addGalleryHandler();

const containerPag = document.querySelector('.pag');
const pagination = new Pagination(containerPag);

// console.log('this is inside Library');
// console.log('pagination', pagination);
// console.log('template', template);
// console.log('galleryHandler', galleryHandler);



// import './js/utils/handlebars-helpers';
// import movieCardTemplate from './templates/movieCard.hbs';
// import localStorageFilms from './js/classes/ModalBtn';

// import Pagination from './classes/Pagination';
// import ApiService from './classes/ApiService';
// import GalleryHandler from './classes/GalleryHandler';
import Spinner from './js/classes/spinner';
import Gallery from './js/classes/Gallery';
// import template from '../templates/movieCard.hbs';

const containerGallery = document.querySelector('.gallery__list');
const gallery = new Gallery(containerGallery, template);

// const containerPag = document.querySelector('.pag');
// const pagination = new Pagination(containerPag);
const spinner = new Spinner('.js-spinner');


// ф-ция взять из локал стор
export default function load(key){
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

// localStorage.clear();

const keyOne = load("watch");
const keyTwo = load("queue");

// console.log(keyOne)

if (keyOne !== undefined) {
  if (keyOne.length > 0) {
    tempRenderCards(keyOne);
  }; 
}


const btn = document.querySelector(".header");
const btnWatch = btn.querySelectorAll(".button--dark-mode");
// console.log(btnWatch)

btn.addEventListener("click", selectBtn);

function selectBtn(event) {
  if (event.target.nodeName !== "BUTTON") {
    return;
  };
  btnWatch.forEach(function (button) {
    button.classList.remove("button--active");
})
  
	if (event.target.textContent === "watched") {
    // console.log("watched")
    event.target.classList.add("button--active");

tempRenderCards(keyOne)
 
	}
	else if (event.target.textContent === "queue") {
    // console.log("queue");
    event.target.classList.add("button--active");
    tempRenderCards(keyTwo)
	}
}

  function tempRenderCards(movies) {
  const container = document.querySelector('.gallery__list');
  container.innerHTML = template({ movies, library: true });
}

pagination.on('aftermove', event => {
  console.log(event);

  // fetchMovies(event);
});

fetchMovies();
function fetchMovies(page = 1) {
  // spinner.show();
  
    // const movies = gallery.tempRenderCards(page);
    // // spinner.hide();
    // console.log(movies);
    // gallery.renderCards(movies.results);

    // pagination.updateTotalItems(movies.total_results);
    // pagination.render();
}

// export { apiService, gallery };
