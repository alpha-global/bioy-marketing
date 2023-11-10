const marked = require('marked');

const walkTokens = (token) => {
  if (token.type === 'heading') {
    token.depth += 2;
  }
};

const toHtml = (markdown) => {
  if (!markdown) return '';
  let tokens = marked.lexer(markdown);
  tokens.forEach(walkTokens);
  return marked.parser(tokens);

  // let rendered = marked
  //   .marked(markdown)
  //   .replaceAll(/<code>/gm, '<sup>')
  //   .replaceAll(/<\/code>/gm, '</sup>')
  //   .replaceAll('|', '&nbsp;');
  // return rendered;
};

module.exports = {
  toHtml,
};
