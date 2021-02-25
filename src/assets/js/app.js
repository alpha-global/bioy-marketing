const { locales } = require("../../_data/site");

// Redirect base URL
var currentPath = window.location.pathname;
if (!currentPath || currentPath === '/') {
  const lang = navigator.language.replace('-', '_').toLowerCase();
  const l = ['en_gb', 'es'];

  if (l.includes(lang)) {
    window.location = `/${lang}/`
  }
}
