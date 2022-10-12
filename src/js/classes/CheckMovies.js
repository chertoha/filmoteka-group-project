import { BASE_IMAGE_URL } from '../utils/config';

export default class CheckMovies {
  #genres;
  #movies;

  constructor() {
    this.maxGenres = 3;
  }

  ///-------------------------------------------------
  update(movies, genres) {
    this.#movies = movies;
    this.#genres = genres;

    movies.forEach(movie => {
      //Add genres names

      this.#updateGenres(movie);

      //Year check
      if (movie.release_date) {
        movie.date = movie.release_date;
      }

      //Images check
      this.checkMoviePoster(movie);
    });
  }
  ///-------------------------------------------------

  #updateGenres(movie) {
    movie.genres = [];
    // console.log(movie);
    for (let i = 0; i < movie.genre_ids.length; i++) {
      if (i === this.maxGenres) {
        movie.genres[i - 1] = 'Others';
        break;
      }
      movie.genres.push(this.#getGenreNameById(movie.genre_ids[i]));
    }
  }

  #getGenreNameById(genreId) {
    return this.#genres.find(genre => genre.id === genreId).name;
  }

  checkMoviePoster(movie) {
    console.log('test storage, movie obj:', movie);
    if (movie.poster_path) {
      movie.poster_path = BASE_IMAGE_URL + movie.poster_path;
    } else {
      const imgUrl = new URL(
        '../../images/movie-card-plug.jpg',
        import.meta.url
      );
      movie.poster_path = imgUrl;
    }
  }
}
