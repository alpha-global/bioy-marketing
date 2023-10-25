const dayjs = require('dayjs');
const { today }= require('../src/_data/globals');

module.exports = {
  protectRunts: (str) => {
    if (!str) { return; }
    if (str.search("<br>") === -1) {
      let title = str.replace(/((.*)\s(.*))$/g, "$2&nbsp;$3");
      return title.replace(/"(.*)"/g, '\\"$1\\"');
    }
    else {
      let phrase = str.split("<br>");
      let first = phrase[0]
        .trimEnd()
        .replace(/((.*)\s(.*))$/g, "$2&nbsp;$3")
        .replace(/"(.*)"/g, '\\"$1\\"');
      let last = phrase[1].trim();
      let title = first.concat(" <br>", last);
      return title
    }
  },

  htmlDateString: (dateObj) => {
    return dayjs(dateObj).format('YYYY-MM-DD');
  },

  devotionList: (devotions, locale, variant) => {
    return devotions.filter((devo) => {
      return devo.locale == locale && devo.variant == variant && devo.number <= today
    });
  }
}
