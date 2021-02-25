module.exports = function(eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);

  // eleventyConfig.addPassthroughCopy('src/admin/config.yml');

  // eleventyConfig.addWatchTarget('./src/admin/config.yml');
  // eleventyConfig.addWatchTarget('./src/assets/css/tailwind.css');

  return {
    dir: {
      includes: "_includes",
      data: "_data",
      input: 'src',
      output: 'build'
    },
    markdownTemplateEngine: "njk"
  };
};
