module.exports = {

  // Usage: {% svgSprite name="icon" %}
  svgSprite:  (svgSprite) => {
    return `<svg class="${svgSprite.class}" role="img" aria-hidden="true">
              <use xlink:href="/assets/svg/sprite.svg#${svgSprite.name}"></use>
            </svg>`;
  }
}
