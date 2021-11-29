const Image = require("@11ty/eleventy-img");
const { cacheBuster } = require("../src/_data/globals");

module.exports = {
  // Usage: {% svgSprite name="icon" %}
  svgSprite: (svgSprite) => {
    return `<svg class="${svgSprite.class}" role="img" aria-hidden="true">
              <use xlink:href="/assets/svg/sprite.svg?${cacheBuster}#${svgSprite.name}"></use>
            </svg>`;
  },

  devotionSection: (devotionSection) => {
    return `
    <section class="prose lg:prose-xl mb-8 mx-10">
    <div class="p-4 bg-red rounded">
      <div class="font-bold text-4xl text-white">${devotionSection.title}</div>
    </div>
    <div class="py-4">
      <h2>${devotionSection.reference}</h1>
        <div class="font-scripture">
          ${devotionSection.text}
        </div>
        <h2>${devotionSection.commentary}</h2>
        ${devotionSection.comment}

        ${
          devotionSection.prayer != null
            ? `<h2>${devotionSection.prayerTitle}</h2><div class="border-l-4 pl-4 border-red font-scripture">${devotionSection.prayer}</div>`
            : ""
        }
    </div>
  </section>
    `;
  },

  blockImage: (src, alt, sizes = "100vw", classes = "w-full") => {
    if (!src) {
      return;
    }

    src = `./src${src}`;

    const options = {
      widths: [320, 640, 800, 1200],
      formats: ["webp", "jpeg"],
      urlPath: "/assets/img/",
      outputDir: "./build/assets/img",
    };

    const imageAttributes = {
      class: classes,
      alt: alt || "",
      sizes: sizes,
      loading: "lazy",
      decoding: "async",
    };

    return imageGen(src, options, imageAttributes);
  },
};

function imageGen(src, options, attributes) {
  Image(src, options);
  metadata = Image.statsSync(src, options);
  return Image.generateHTML(metadata, attributes);
}
