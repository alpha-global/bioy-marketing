const marked = require('marked');

const walkTokens = (token) => {
  if (token.type === 'heading' && token.depth <= 2 ) {
    token.depth = token.depth + 2;
  }
  if (token.children) {
    token.children.forEach((child) => {
      walkTokens(child);
    });
  }
};

const normalizeHeadings = (rawString) => {
  let tokens = marked.lexer(rawString);
  tokens.forEach(walkTokens);
  return marked.parser(tokens);  
};

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
  normalizeHeadings,
};
