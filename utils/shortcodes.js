module.exports = {

  // Usage: {% svgSprite name="icon" %}
  svgSprite:  (svgSprite) => {
    return `<svg class="${svgSprite.class}" role="img" aria-hidden="true">
              <use xlink:href="/assets/svg/sprite.svg#${svgSprite.name}"></use>
            </svg>`;
  },
  devotionSection: (devotionSection) => {
    return `
    <section>
    <div class="p-4 bg-red">
      <div class="font-extrabold text-4xl text-white">${devotionSection.title}</div>
    </div>
    <div class="p-4">
      <h2>${devotionSection.reference}</h1>
        <div class="font-scripture">
          ${devotionSection.text}
        </div>
        <h2>Commentary</h2>
        ${devotionSection.comment}


        <h2>Prayer</h2>
        <div class="border-l-4 pl-4 border-red font-scripture">
          ${devotionSection.prayer}
        </div>
    </div>
  </section>
    `
  }
}
