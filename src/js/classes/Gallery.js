import ApiService from './ApiService';
import CheckMovies from './CheckMovies';
// import movieCardTemplate from '../../templates/movieCard.hbs';
import { localStorageFilms } from './ModalBtn';

const api = new ApiService();
const checkMovies = new CheckMovies();

export default class Gallery {
  #galleryContainer;
  #cardsTemplate;

  constructor(container, template) {
    this.#galleryContainer = container;
    this.#cardsTemplate = template;
    this.currentQuery = '';
    this.genres = null;
  }

  // render на головну сторінку
  // render на кожну наступну сторінку

  async getPopularMovies(page) {
    this.genres = await api.fetchGenres();
    const response = await api.fetchTrendingMovies(page);

    return response.data;
  }

  // moviesDataUpdate(genres, movies) {
  //   movies.forEach(movie => {
  //     //Movies genres check
  //     movie.genres = [];
  //     for (let i = 0; i < movie.genre_ids.length; i++) {
  //       if (i === 3) {
  //         movie.genres[i - 1] = 'Others';
  //         break;
  //       }
  //       movie.genres.push(getGenreNameById(genres, movie.genre_ids[i]));
  //     }

  //     //Year check
  //     if (movie.release_date) {
  //       movie.date = movie.release_date;
  //     }

  //     //Images check
  //     if (movie.poster_path && movie.poster_path !== '') {
  //       const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  //       movie.poster_path = imageBaseUrl + movie.poster_path;
  //     }
  //     else {
  //       const imgUrl = new URL(
  //         '../../images/movie-card-plug.jpg',
  //         import.meta.url
  //       );
  //       movie.poster_path = imgUrl;
  //     }
  //   });
  // }

  // getGenreNameById(genres, genreId) {
  //   return genres.find(genre => genre.id === genreId).name;
  // }

  renderCards(movies) {
    checkMovies.update(movies, this.genres);
    this.#galleryContainer.innerHTML = this.#cardsTemplate({
      movies,
      library: false,
    });
    localStorageFilms.addItemsOnCurrentPage(movies);
  }
}
