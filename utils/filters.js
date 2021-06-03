const dayjs = require('dayjs');

module.exports = {
  protectRunts: (str) => {
    if (!str) { return; }
    let title = str.replace(/((.*)\s(.*))$/g, "$2&nbsp;$3");
    return title.replace(/"(.*)"/g, '\\"$1\\"');
  },

  htmlDateString: (dateObj) => {
    return dayjs(dateObj).format('YYYY-MM-DD');
  },
}
