export default class ModalBtn {
  dataQueue = [];
  dataWatch = [];
  modalBtnClick(currentBtnClass, film) {
    if (currentBtnClass === '.queue-js') {
      this.addToStorage('queue', this.dataQueue, film);
  }
    
    if (currentBtnClass === '.watch-js') {
      this.addToStorage('watch', this.dataWatch, film);
    }
  }
  addToStorage(keyName, dataName, currentFilm) {
    const currentFilms = {};
    currentFilms.id = film.id;
    currentFilms.poster_path = currentFilm.poster_path;
    currentFilms.original_title = currentFilm.original_title;
    currentFilms.vote_average = currentFilm.vote_average.toFixed(1);
    // currentFilms.date = currentFilm.date.dateFormat('YYYY');
  // формируем свойства объекта
    
  //сделать невозможным повторное нажатие кнопки
  dataName.push(currentFilms); 

  this.setFilms(keyName, value);
  }
  removeFromStorage(btnClass, filmRemove, keyName) {
    if (btnClass === '.remove-watch-js') {
    const newWatch = this.dataWatch.filter(film => !filmRemove.id);
      this.setFilms(keyName, newWatch);
    }
    if (btnClass === '.remove-queue-js') {
    const newQueue = this.dataQueue.filter(film => !filmRemove.id);
      this.setFilms(keyName, newQueue);
    }
  }
  setFilms(keyName, value) {
    localStorage.setItem(keyName, JSON.stringify(value));
  }
}