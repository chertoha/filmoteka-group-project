import paginationTemplate from '../../templates/pagination.hbs';

export default class Pagination {
  #pageChangeHadler;
  #handler;
  #page;
  #totalItems;
  #perPage;

  constructor(container) {
    this.refs = {
      container: container,
      prevBtn: document.querySelector('.pag__btn--prev'),
      nextBtn: document.querySelector('.pag__btn--next'),
      prevDots: document.querySelector('.pag__btn--dots-prev'),
      nextDots: document.querySelector('.pag__btn--dots-next'),
    };

    this.#totalItems = 1;
    this.#perPage = 20;
    this.#page = 1;

    this.#handler = null;

    this.refs.container.addEventListener('click', this.#onPageClick.bind(this));
  }

  #onPageClick(e) {
    e.preventDefault();

    if (!e.target.classList.contains('pag__page')) {
      return;
    }

    if (!this.#handler) {
      return;
    }

    const newPage = e.target.dataset.value;
    if (this.#page == newPage) {
      return;
    }

    this.goToPage(newPage);
    this.render();
    this.#handler({ page: this.#page });
  }

  pageChangeHandler(handler) {
    //Throw error if not function here
    this.#handler = handler;
  }

  render() {
    // console.log(paginationTemplate());
    const currentPage = Number(this.#page);
    const lastPageNumber = this.getLastPageNumber();
    const data = {
      prevBtnPage: currentPage - 1,
      nextBtnPage: currentPage + 1,
      firstPage: 1,
      lastPage: lastPageNumber,
      currentPage: currentPage,
      preCurPage: currentPage - 1,
      preCurPage2: currentPage - 2,
      afterCurPage: currentPage + 1,
      afterCurPage2: currentPage + 2,
      dotsPrev: currentPage - 4,
      dotsNext: currentPage + 4,
    };

    if (currentPage === 4) {
      data.prevBtnPage = 0;
      data.dotsPrev = 0;
    }

    if (currentPage < 4) {
      data.prevBtnPage = 0;
      data.dotsPrev = 0;
      data.firstPage = 0;
    }

    if (currentPage === 1) {
      data.preCurPage2 = 0;
    }

    //--------------

    if (currentPage === lastPageNumber - 3) {
      data.nextBtnPage = 0;
      data.dotsNext = 0;
    }

    if (currentPage > lastPageNumber - 3) {
      data.nextBtnPage = 0;
      data.dotsNext = 0;
      data.lastPage = 0;
    }

    if (currentPage > lastPageNumber - 2) {
      data.afterCurPage2 = 0;
    }

    if (currentPage === lastPageNumber) {
      data.afterCurPage = 0;
      // data.afterCurPage2 = 0;
    }

    this.refs.container.innerHTML = paginationTemplate(data);
  }

  goToPage(page) {
    //Check if page is integer Number here,

    if (page < 1 || page > this.getLastPageNumber()) {
      return;
    }
    this.#page = page;
  }

  getCurrentPage() {
    return this.#page;
  }

  updateTotalItems(totalItems) {
    this.#totalItems = totalItems;
  }

  getLastPageNumber() {
    return Math.ceil(Number(this.#totalItems) / Number(this.#perPage));
  }

  // #checkPaginationRender(page) {
  //   const { prevBtn, nextBtn, prevDots, nextDots } = this.refs;

  //   console.log(prevDots);
  //   if (page === 4) {
  //   }
  // }
}
