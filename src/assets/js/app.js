import Alpine from 'alpinejs';
import intersect from '@alpinejs/intersect'
import audioPlayer from './audioPlayerModel.js';
import baseView from './baseViewModel.js';
import errorPageView from './errorPageViewModel.js';
import faqsView from './faqsViewModel.js';
import mediumView from './mediumViewModel.js';
import promo from './promo.js';
import testimonialsSlider from './testimonialsSliderModel.js';
import videoHero from './videoHeroModel.js';

import langSwitcher from './langSwitcher.js';

Alpine.data('audioPlayer', audioPlayer);
Alpine.data('baseView', baseView);
Alpine.data('faqsView', faqsView);
Alpine.data('errorPageView', errorPageView);
Alpine.data('mediumView', mediumView);
Alpine.data('promo', promo);
Alpine.data('langSwitcher', langSwitcher);
Alpine.data('testimonialsSlider', testimonialsSlider);
Alpine.data('videoHero', videoHero);
Alpine.plugin(intersect)
Alpine.start();
