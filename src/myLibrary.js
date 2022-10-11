// do not write code here
// only import can be inserted
import './js/utils/handlebars-helpers';

//Anton's temporary test code----------------------------
// import './js/temp/antonTempTest';
//Anton's temporary test code----------------------------

import './js/classes/HeaderBtnHandler';
import './js/modal';
import './js/teamAccordion';

import Pagination from './js/classes/Pagination';
import GalleryHandler from './js/classes/GalleryHandler';
import template from './templates/movieCard.hbs';
import { localStorageFilms } from './js/classes/ModalBtn';

const galleryHandler = new GalleryHandler();
galleryHandler.addGalleryHandler();

const containerPag = document.querySelector('.pag');
const pagination = new Pagination(containerPag);

let currentPage = 1;
let currentMovies = [];


pagination.on('aftermove', event => {
  console.log(event.page);
  currentPage = event.page;

});


// console.log('this is inside Library');
// console.log('pagination', pagination);
// console.log('template', template);
// console.log('galleryHandler', galleryHandler);

localStorageFilms.saveItemsForArrayAfterReload();

import Spinner from './js/classes/spinner';
import Gallery from './js/classes/Gallery';


const containerGallery = document.querySelector('.gallery__list');
const gallery = new Gallery(containerGallery, template);

const keyOne = load('watch');
const keyTwo = load('queue');
let pageKeyOne;
let pageKeyTwo;
console.log(keyOne);

// const containerPag = document.querySelector('.pag');
// const pagination = new Pagination(containerPag);
const spinner = new Spinner('.js-spinner');
const perPage = 20;
// ф-ция взять из локал стор
export default function load(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
    // 1 * 20 = 20
    // 2 * 20 = 40
    // 7 * 20 = 140
    // if (page === 1) {return serializedState === null ? undefined : JSON.parse(serializedState)};
    // if (page === 2) {return serializedState === null ? undefined : JSON.parse(serializedState) };
    // serializedState === null ? undefined : JSON.parse(serializedState);

  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

// localStorage.clear();



// console.log(keyOne)

if (keyOne !== undefined) {
  if (keyOne.length > 0) {
    tempRenderCards(keyOne);
    pageKeyOne = keyOne.length;
    if (pageKeyOne > 20) {
      
      pagination.containerGallery
      //  console.log(pageKeyOne);
  //     pagination.on('beforemove', event => {
  // console.log(event);

  // tempRenderCards(keyOne);
  //     })
        ;

    }
    // tempRenderCards(keyOne);
  }
};
if (keyTwo !== undefined) {
  if (keyTwo.length > 0) {
    pageKeyTwo = keyTwo.length;
  }
}
// console.log(pageKeyOne)
// console.log(pageKeyTwo)
const btn = document.querySelector('.header');
const btnWatch = btn.querySelectorAll('.button--dark-mode');
console.log(btnWatch);




btn.addEventListener("click", selectBtn);


function selectBtn(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  btnWatch.forEach(function (button) {
    button.classList.remove('button--active');
  });

  if (event.target.textContent === 'watched') {
    // console.log("watched")
    event.target.classList.add('button--active');

    tempRenderCards(keyOne);
  } else if (event.target.textContent === 'queue') {
    // console.log("queue");
    event.target.classList.add('button--active');
    tempRenderCards(keyTwo);
  }
}

function tempRenderCards(movies) {
  const lastMovie = currentPage * 20;
   const firstMovie = lastMovie - 20;
  const container = document.querySelector('.gallery__list');
  const moviesPars = [];
for (let index = firstMovie; index < lastMovie; index++) {

  moviesPars.push(movies[index]);
  
}
  console.log(moviesPars);
  container.innerHTML = template({ movies, library: true });

  // проверка на 20 
  pagination.updateTotalItems(movies.length);
  pagination.render();
}


// pagination.on('aftermove', event => {
//   console.log(event);

//   // fetchMovies(event);
// });


// fetchMovies();
// function fetchMovies(page = 1) {
//   // spinner.show();
  
//     // const movies = gallery.tempRenderCards(page);
//     // // spinner.hide();
//     // console.log(movies);
//     // gallery.renderCards(movies.results);

//     // pagination.updateTotalItems(movies.total_results);
//     // pagination.render();
// }

// export { apiService, gallery };

