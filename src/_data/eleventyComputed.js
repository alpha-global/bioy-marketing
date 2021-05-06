
module.exports = {
  label: data => data.labels[data.locale],
  block: data => data[data.locale]
};