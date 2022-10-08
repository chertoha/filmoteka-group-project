// import Pagination from './classes/pagination';
// import ApiService from './classes/ApiService';
import GalleryHandler from './classes/GalleryHandler';
import Spinner from './classes/spinner';
// + import GAllery

// const ApiService = new ApiService();
const galleryHandler = new GalleryHandler();
galleryHandler.addGalleryHandler();

// const container = document.querySelector('.pag');
// const pagination = new Pagination(container);

const spinner = new Spinner();
