import 'alpinejs';
const data = require("../../help.11tydata.json");
const { locales } = require("../../_data/globals");

// Redirect base URL
var currentPath = window.location.pathname;
if (!currentPath || currentPath === '/') {
  const lang = navigator.language.split('-')[0];

  if (locales.includes(lang)) {
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

window.store = function() {
  return {
    query: null,
    show: false,
    helpItems: [],
    init() {
      this.helpItems = data["en"].helpItems;

      document.querySelector('.filter').classList.remove('hidden')
    },

    filteredItems() {
      if (!this.query) return [];
      return this.helpItems.filter((helpItem) => {
        if (helpItem.title.toLowerCase().includes(this.query.toLowerCase())) {
          return true;
        }

        if (helpItem.shortAnswer.toLowerCase().includes(this.query.toLowerCase())) {
          return true;
        }

        if (helpItem.category.toLowerCase().includes(this.query.toLowerCase())) {
          return true;
        }

        return false;

      })
    }
  }
}
