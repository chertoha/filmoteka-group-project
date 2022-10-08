// class ModalBtn {

// }
const  btnQueue = document.querySelector('.modal-btn__queue');
const btnWatch = document.querySelector('.modal-btn__watch');


btnQueue.addEventListener('click', onBtnQueueClick);
btnWatch.addEventListener('click', onBtnWatchClick);

function onBtnWatchClick(e) {
  const dataWatch = [
    // добавляем объекты с выбранными фильмами
  ];
  const currentFilms = {};
  // формируем свойства объекта
  //сделать невозможным повторное нажатие кнопки
  dataWatch.push(currentFilms); 

  const dataWatchSet = localStorage.setItem('watch', JSON.stringify(dataWatch));
}

function onBtnQueueClick(e) {
  const dataQueue = [
        // добавляем объекты с выбранными фильмами
  ];
  const currentFilms = {};
  // формируем свойства объекта
  //сделать невозможным повторное нажатие кнопки
  dataWatch.push(currentFilms);
  const dataQueueSet = localStorage.setItem('queue', JSON.stringify(dataQueue));
}