module.exports = {
  protectRunts: (str) => {
    if (!str) { return; }
    let title = str.replace(/((.*)\s(.*))$/g, "$2&nbsp;$3");
    return title.replace(/"(.*)"/g, '\\"$1\\"');
  },
}
