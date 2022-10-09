// import Pagination from './classes/pagination';
import ApiService from './classes/ApiService';

import Spinner from './classes/spinner';
// + import GAllery
import GalleryHandler from './classes/GalleryHandler';
const galleryHandler = new GalleryHandler();
galleryHandler.addGalleryHandler();
const apiService = new ApiService();

// const container = document.querySelector('.pag');
// const pagination = new Pagination(container);

const spinner = new Spinner();

// export { galleryHandler };
