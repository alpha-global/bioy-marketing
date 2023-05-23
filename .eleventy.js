const markdownIt = require('markdown-it');

const filters = require('./utils/filters.js');
const shortcodes = require('./utils/shortcodes.js');
const collections = require('./utils/collections.js');

module.exports = function (eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);

  // Filters
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  // Shortcodes
  Object.keys(shortcodes).forEach((shortcodeName) => {
    eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName]);
  });

  // Collections
  Object.keys(collections).forEach((collectionName) => {
    eleventyConfig.addCollection(collectionName, collections[collectionName]);
  });

  eleventyConfig.addPassthroughCopy('src/assets/icon');
  eleventyConfig.addPassthroughCopy('src/assets/img');
  eleventyConfig.addPassthroughCopy('src/assets/fonts');
  eleventyConfig.addPassthroughCopy('src/admin/config.yml');

  eleventyConfig.addWatchTarget('./src/admin/config.yml');
  eleventyConfig.addWatchTarget('./src/assets/img');
  eleventyConfig.addWatchTarget('./utils');
  // eleventyConfig.addWatchTarget('./src/assets/css/app.css');

  eleventyConfig.addLayoutAlias('default', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('landing', 'layouts/landing.njk');
  eleventyConfig.addLayoutAlias('editionLanding', 'layouts/editionLanding.njk');
  eleventyConfig.addLayoutAlias('page', 'layouts/page.njk');
  eleventyConfig.addLayoutAlias('dynamicPage', 'layouts/dynamicPage.njk');

  eleventyConfig.addFilter('markdown', (rawString) => {
    const mdRender = new markdownIt({ html: true });
    const rendered = mdRender.render(rawString);
    // return eleventyConfig.getFilter("safe")(rendered);  // not sure why this is not working for us
    return rendered;
  });

  eleventyConfig.addFilter('debugger', (...args) => {
    console.log(...args);
    debugger;
  });

  return {
    dir: {
      includes: '_includes',
      data: '_data',
      input: 'src',
      output: 'build',
    },
    markdownTemplateEngine: 'njk',
    templateFormats: ['html', 'njk', 'md'],
    passthroughFileCopy: true,
  };
};
