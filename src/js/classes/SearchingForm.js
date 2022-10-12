// const axios = require('axios').default;

// export default class SearchingForm {
//   #API_KEY = '1351fe1fee33f4dc7ca86c3a4fb4a61c';
//   #BASE_URL = 'https://api.themoviedb.org/3/search/movie';
//   #searchParams = {
//     params: {
//       api_key: this.#API_KEY,
//       query: '',
//       // page: 1,
//       include_adult: false,
//     },
//   };
//   constructor() {}

//   async searchMovies(query) {
//     try {
//       const response = await axios.get(this.#BASE_URL, this.#searchParams);
//       return response;
//     } catch (error) {
//       // console.error(error);
//     }
//   }

//   async getMovies(query, page) {
//     if (query) {
//       this.#searchParams.params.query = query;
//       this.#searchParams.params.page = page;
//     }
//     const response = await this.searchMovies();
//     console.log(response);
//     return response;
//   }
// }
