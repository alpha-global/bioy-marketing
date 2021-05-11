const Image = require("@11ty/eleventy-img");

module.exports = {

  // Usage: {% svgSprite name="icon" %}
  svgSprite: (svgSprite) => {
    return `<svg class="${svgSprite.class}" role="img" aria-hidden="true">
              <use xlink:href="/assets/svg/sprite.svg#${svgSprite.name}"></use>
            </svg>`;
  },


  blockImage: (src, alt, sizes = "100vw", classes = "w-full") => {

    const options = {
      widths: [320, 640, 800, 1200],
      formats: ['webp', 'jpeg'],
      urlPath: "/assets/img/",
      outputDir: "./build/assets/img"
    };
    
    const imageAttributes = {
      class: classes,
      alt: alt,
      sizes: sizes,
      loading: "lazy",
      decoding: "async"
    };

    return imageGen(src, options, imageAttributes);
  }
  
  
}

function imageGen(src, options, attributes) {
  Image(src, options);
  metadata = Image.statsSync(src, options);
  return Image.generateHTML(metadata, attributes);
}
