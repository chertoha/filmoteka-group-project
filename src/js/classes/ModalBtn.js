export default class ModalBtn {

  modalBtnClick(currentBtnClass, film) {
    if (currentBtnClass === '.queue-js') {
      LocalStorage.addItemToKeyStorage('queue', LocalStorage.dataQueue, film);
    }
    
    if (currentBtnClass === '.watch-js') {
      LocalStorage.addItemToKeyStorage('watch', LocalStorage.dataWatch, film);
    }
  }

}