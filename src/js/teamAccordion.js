const accordionRef = document.querySelector('#accordion');

accordionRef.addEventListener('click', onBtnClick);

function onBtnClick(event) {
  // close previous item automatically
  // перевірити роботу відкриття-закриття
  // коли повторно нажимати на ту ж кнопку - не закривається

  // Array.from(accordionRef.children).forEach(item => {
  //   // if (item.classList.contains('is-shown')) {
  //   //   item.classList.remove('is-shown');
  //   //   item.childNodes[1].setAttribute('aria-expanded', 'false');
  //   // }
  //   item.classList.remove('is-shown');
  //   item.childNodes[1].setAttribute('aria-expanded', 'false');
  // });

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
