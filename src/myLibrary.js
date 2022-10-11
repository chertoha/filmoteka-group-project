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

console.log('this is inside Library');
console.log('pagination', pagination);
console.log('template', template);
console.log('galleryHandler', galleryHandler);
