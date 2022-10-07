import Swiper, { Pagination, Autoplay, EffectCoverflow } from 'swiper';
import 'swiper/swiper-bundle.min.css';

const gallerySlider = document.querySelector('.js-gallery-swiper');

const sliderParams = {
  modules: [Pagination, Autoplay, EffectCoverflow],

  loop: true,
  effect: 'coverflow',
  grabCursor: true,
  lazy: true,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
};

const swiper = new Swiper(teamSlider, sliderParams);
