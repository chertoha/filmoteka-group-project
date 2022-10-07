const accordionRef = document.querySelector('#accordion');

accordionRef.addEventListener('click', onBtnClick);

console.log(accordionRef);

function onBtnClick(event) {
  Array.from(accordionRef.children).forEach(item => {
    console.log(item);
    // item.setAttribute('aria-expanded', 'false');

    if (item !== event.target.closest('li')) {
      item.classList.remove('is-shown');
      item.setAttribute('aria-expanded', 'false');
    }
  });

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
