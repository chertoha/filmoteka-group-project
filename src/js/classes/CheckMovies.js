import { urls } from '../utils/config';

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
    if (!movie) {
      throw new Error('Object movie is undefined, null, empty string etc...');
      return;
    }

    if (movie.poster_path) {
      movie.poster_path = urls.BASE_IMAGE_URL + movie.poster_path;
    } else {
      const imgUrl = new URL(
        '../../images/movie-card-plug.jpg',
        import.meta.url
      );
      movie.poster_path = imgUrl;
    }
  }

  fixLargeNumbers(movie) {
    const thousand = 1000;
    const million = 1000000;

    if (movie.budget > thousand && movie.budget < million)
      movie.budget = (movie.budget / thousand).toFixed(1) + ` K`;
    if (movie.revenue > thousand && movie.revenue < million)
      movie.revenue = (movie.revenue / thousand).toFixed(1) + ` K`;

    if (movie.budget > million)
      movie.budget = (movie.budget / million).toFixed(1) + ` M`;
    if (movie.revenue > million)
      movie.revenue = (movie.revenue / million).toFixed(1) + ` M`;
  }
}
