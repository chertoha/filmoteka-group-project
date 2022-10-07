import Swiper, { Pagination, EffectCoverflow, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';

const teamSlider = document.querySelector('.js-gallery-swiper');

const sliderParams = {
  modules: [Pagination, Navigation, EffectCoverflow],

  loop: true,
  effect: 'coverflow',
  grabCursor: true,
  lazy: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
};

const swiper = new Swiper(teamSlider, sliderParams);
