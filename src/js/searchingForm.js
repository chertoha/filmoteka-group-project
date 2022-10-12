// import SearchingForm from './classes/SearchingForm';

// const searchingFormRef = document.querySelector('.search-form');
// const inputRef = document.querySelector('.search-input');

// searchingFormRef.addEventListener('submit', onSearchSubmit);

// const formSearch = new SearchingForm();

// function onSearchSubmit(event) {
//   event.preventDefault();

//   let searchValue = inputRef.value;
//   searchValue.trim();

//   formSearch.searchMovies('Killer');
//   if (searchValue == '') {
//     searchingFormRef.dataset.message =
//       'Search attempt not successful. Please, enter movie name.';
//     //

//     setTimeout(() => {
//       searchingFormRef.dataset.message = '';
//     }, 5500);
//     return;
//   }

//   formSearch.getMovies(searchValue, 1);
// }
