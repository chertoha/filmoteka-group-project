//Anton's temporary code
// const axios = require('axios').default;
// import '../utils/handlebars-helpers';
// import movieCardTemplate from '../../templates/movieCard.hbs';

// const API_KEY_TEST = '1936ce94882661ecfd75d2c22e8905aa';
// const url_trendings = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY_TEST}`;
// const url_genres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY_TEST}`;

// testMovieCardsTemplate();
// async function testMovieCardsTemplate() {
//   try {
//     //Get genres
//     const response = await axios.get(url_genres);
//     const genres = response.data.genres;
//     console.log(genres);

//     //Get movies list
//     const trendings = await axios.get(url_trendings);
//     const movies = trendings.data.results;
//     console.log(movies);

//     //Update movies genres_id with genres_name
//     addGenreNamesToMovies(genres, movies);

//     //Render template
//     tempRenderCards(movies);
//   } catch (error) {
//     console.error(error);
//   }
// }

// ////////////////=============IMPORTANT CODE PART================/////////////////////////////

// function tempRenderCards(movies) {
//   const container = document.querySelector('.gallery__list');
//   container.innerHTML = movieCardTemplate(movies);
// }

// function addGenreNamesToMovies(genres, movies) {
//   movies.forEach(movie => {
//     movie.genre_ids.forEach((val, i) => {
//       movie.genre_ids[i] = getGenreNameById(genres, val);
//     });
//   });
// }

// function getGenreNameById(genres, genreId) {
//   return genres.find(genre => genre.id === genreId).name;
// }
////////////////////=============IMPORTANT CODE================/////////////////////////////
