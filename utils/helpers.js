const marked = require('marked');

const toHtml = (markdown) => {
  if (!markdown) return '';
  let rendered = marked
    .marked(markdown)
    .replaceAll(/<code>/gm, '<sup>')
    .replaceAll(/<\/code>/gm, '</sup>')
    .replaceAll('|', '&nbsp;');
  return rendered;
};

module.exports = {
  toHtml,
};
