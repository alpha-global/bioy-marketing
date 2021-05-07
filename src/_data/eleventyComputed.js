
module.exports = {
  label: data => data.labels[data.locale],
  page: data => data[data.locale]
};