let mix = require('laravel-mix');

mix
  .js('src/assets/js/app.js', './build/assets/js/app.js')
  .postCss('src/assets/css/app.css', './build/assets/css/app.css', [
      require('tailwindcss'),
  ]);
