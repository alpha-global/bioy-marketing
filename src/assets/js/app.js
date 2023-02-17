import Alpine from 'alpinejs';

import audioPlayer from './audioPlayerModel.js';
import baseView from './baseViewModel.js';
import devotionBanner from './devotionBannerModel.js';
import errorPageView from './errorPageViewModel.js';
import faqsView from './faqsViewModel.js';
import mediumView from './mediumViewModel.js';
import promo from './promo.js';
import testimonialsSlider from './testimonialsSliderModel.js';

Alpine.data('audioPlayer', audioPlayer);
Alpine.data('baseView', baseView);
Alpine.data('devotionBanner', devotionBanner);
Alpine.data('faqsView', faqsView);
Alpine.data('errorPageView', errorPageView);
Alpine.data('mediumView', mediumView);
Alpine.data('promo', promo);
Alpine.data('testimonialsSlider', testimonialsSlider);
Alpine.start();
