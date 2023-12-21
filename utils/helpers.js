const marked = require('marked');

const walkTokens = (token) => {
  if (token.type === 'heading' && token.depth <= 2) {
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

const calculateDateRange = (currentDate) => {
  const startDayOffset = 4;
  const endDayOffset = 3;

  const start = new Date(currentDate.getFullYear(), 0, 0);
  const diff = currentDate - start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  let startDay, endDay;

  if (dayOfYear <= 5) {
    startDay = 1;
    endDay = 8;
    return { startDay, endDay };
  }

  if (dayOfYear >= 360 && dayOfYear <= 365) {
    startDay = dayOfYear - startDayOffset;
    endDay = 365;
  } else if (dayOfYear === 366) {
    startDay = 361;
    endDay = 366;
  } else {
    startDay = dayOfYear - startDayOffset;
    endDay = dayOfYear + endDayOffset;
  }
  return { startDay, endDay };
};

module.exports = {
  toHtml,
  normalizeHeadings,
  calculateDateRange,
};
