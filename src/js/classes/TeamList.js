import { accordionRef } from '../utils/refs';

export default class TeamList {
  #accordionRef = accordionRef;

  addHandler() {
    this.#accordionRef.addEventListener('click', this.onBtnClick);
  }

  onBtnClick(event) {
    // open current item
    if (
      event.target.nodeName === 'BUTTON' ||
      event.target.closest('[data-accordion-btn]')
    ) {
      const toggledBtnRef = event.target.closest('[data-accordion-btn]');

      const attributeToSet =
        toggledBtnRef.getAttribute('aria-expanded') === 'false'
          ? 'true'
          : 'false';

      toggledBtnRef.setAttribute('aria-expanded', `${attributeToSet}`);
      event.target.closest('li').classList.toggle('is-shown');
    }
  }
}
