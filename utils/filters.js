const dayjs = require('dayjs');
const { today }= require('../src/_data/globals');

module.exports = {
  protectRunts: (str) => {
    if (!str) { return; }
    let title = str.replace(/((.*)\s(.*))$/g, "$2&nbsp;$3");
    return title.replace(/"(.*)"/g, '\\"$1\\"');
  },

  htmlDateString: (dateObj) => {
    return dayjs(dateObj).format('YYYY-MM-DD');
  },

  devotionList: (devotions, locale, variant) => {
    return devotions.filter((devo) => {
      return devo.locale == locale && devo.variant == variant && devo.devotionId <= today
    });
  }
}
