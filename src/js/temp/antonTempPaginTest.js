import Pagination from '../classes/pagination';

const container = document.querySelector('.pag');
const pagination = new Pagination(container);

pagination.pageChangeHandler(event => {
  console.log(event.page);
});

// console.log(pagination);

pagination.updateTotalItems(19981);
pagination.goToPage(4);

pagination.render();

// let pageClickEvent = new Event('pageclick');

// console.log(pageClickEvent);

// const tempHeader = document.querySelector('.header');

// tempHeader.addEventListener('click', () => {
//   window.dispatchEvent(pageClickEvent);
// });

// window.addEventListener('pageclick', e => {
//   console.log(e, 'window pageclick event');
// });

// pagination.on('pageclick', e => {
//   console.log('on->', e.page);
// });

// pagination.on2(e => {
//   console.log(e.page);
//   console.log(e);
// });
