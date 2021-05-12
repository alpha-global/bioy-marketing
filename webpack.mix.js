let mix = require('laravel-mix');

require('@ayctor/laravel-mix-svg-sprite');

mix
  .js('src/assets/js/app.js', './build/assets/js/app.js')
  .postCss('src/assets/css/app.css', './build/assets/css/app.css', [
      require('tailwindcss'),
  ]);

mix.svgSprite('src/assets/icons/*.svg', {
  output: {
    filename: './build/assets/svg/sprite.svg'
  }
});
