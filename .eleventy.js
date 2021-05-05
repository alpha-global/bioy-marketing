module.exports = function(eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addPassthroughCopy('src/assets/icon');
  eleventyConfig.addPassthroughCopy('src/admin/config.yml');

  eleventyConfig.addWatchTarget('./src/admin/config.yml');
  // eleventyConfig.addWatchTarget('./src/assets/css/app.css');

  eleventyConfig.addLayoutAlias("default", "layouts/base.njk");
  eleventyConfig.addLayoutAlias("page", "layouts/page.njk");
  eleventyConfig.addLayoutAlias("commentary", "layouts/commentary.njk");

  const MarkdownIt = require("markdown-it");
  const mdRender = new MarkdownIt();

  // this thing breaks EVERYTHING:
  eleventyConfig.addFilter("markdown", function (rawString) {
    const rendered = mdRender.render(rawString);
    // return eleventyConfig.getFilter("safe")(rendered);  // not sure why this is not working for us
    return rendered;
  });

   eleventyConfig.addFilter("debugger", (...args) => {
    console.log(...args)
    debugger;
  })


  return {
    dir: {
      includes: "_includes",
      data: "_data",
      input: 'src',
      output: 'build'
    },
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md"],
    passthroughFileCopy: true,
  };
};
