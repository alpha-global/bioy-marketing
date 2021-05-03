const { locales } = require("../../_data/site");

// Redirect base URL
var currentPath = window.location.pathname;
if (!currentPath || currentPath === '/') {
  const lang = navigator.language.split('-', '_')[0];
  const l = ['en', 'es'];

  if (l.includes(lang)) {
    window.location = `/${lang}/`
  }
}

const todayBlock = document.querySelector('.js-today');
if (todayBlock) {
  const readLink = todayBlock.querySelector('a');

  // Todo: Extract, Tidy and cater for leap year
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);

  const url = `/${todayBlock.dataset.locale}/${todayBlock.dataset.variant}/${day}`;

  readLink.href = url;
}
