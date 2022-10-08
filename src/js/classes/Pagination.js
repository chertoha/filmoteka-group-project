// import paginationTemplate from '../../templates/pagination.hbs';

export default class Pagination {
  // #pageChangeHadler;
  // #handler;
  #handlerBeforeMove;
  #handlerAfterMove;
  #page;
  #totalItems;
  #perPage;

  constructor(container) {
    this.refs = {
      container: container,
      // prevBtn: document.querySelector('.pag__btn--prev'),
      // nextBtn: document.querySelector('.pag__btn--next'),
      // prevDots: document.querySelector('.pag__btn--dots-prev'),
      // nextDots: document.querySelector('.pag__btn--dots-next'),
    };

    this.#totalItems = 1;
    this.#perPage = 20;
    this.#page = 1;

    // this.#handler = null;

    this.refs.container.addEventListener('click', this.#onPageClick.bind(this));
  }

  #onPageClick(e) {
    e.preventDefault();

    if (!e.target.classList.contains('pag__page')) {
      return;
    }

    // if (!this.#handler) {
    //   return;
    // }

    const newPage = e.target.dataset.value;
    if (this.#page == newPage) {
      return;
    }

    if (this.#handlerBeforeMove) {
      this.#handlerBeforeMove({ page: this.#page });
    }

    this.goToPage(newPage);

    this.render();

    if (this.#handlerAfterMove) {
      this.#handlerAfterMove({ page: this.#page });
    }

    // if (this.#handler) {
    //   this.#handler({ page: this.#page });
    // }
    // this.#handler({ page: this.#page });
  }

  // pageChangeHandler(handler) {
  //   //Throw error if not function here
  //   this.#handler = handler;
  // }

  on(type, handler) {
    if (type === 'beforemove') {
      this.#handlerBeforeMove = handler;
      return;
    }

    if (type === 'aftermove') {
      this.#handlerAfterMove = handler;
      return;
    }

    throw new Error(
      'Event type is not correct (must be "beforemove" of "aftermove")'
    );
  }

  render() {
    // console.log(paginationTemplate());
    const currentPage = Number(this.#page);
    const lastPageNumber = this.getLastPageNumber();

    let string = '';
    const end = lastPageNumber;

    if (currentPage > 4) {
      string += `<a class="pag__page pag__btn pag__btn--prev" href="#" data-value="${
        currentPage - 1
      }"></a>`;
    }

    for (let i = 1; i <= end; i++) {
      if (i === currentPage) {
        string += `<a class="pag__page pag__page--current-number" href="#" data-value="${currentPage}">${currentPage}</a>`;
        continue;
      }

      if (i > 1 && i < currentPage - 2) {
        string += `<a class="pag__page pag__page--dots pag__btn--dots-prev" href="#" data-value="${
          currentPage - 4
        }"></a>`;

        i = currentPage - 3;
        continue;
      }

      if (i > currentPage + 2 && i <= end - 1) {
        string += `<a class="pag__page pag__page--dots pag__btn--dots-next" href="#" data-value="${
          currentPage + 4
        }"></a>`;

        i = end - 1;
        continue;
      }

      string += `<a class="pag__page" href="#" data-value="${i}">${i}</a>`;
    }

    if (currentPage <= end - 4) {
      string += `<a class="pag__page pag__btn pag__btn--next" href="#" data-value="${
        currentPage + 1
      }"></a>`;
    }

    // console.log(string);
    this.refs.container.innerHTML = string;
    // this.refs.container.innerHTML = paginationTemplate(data);
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
