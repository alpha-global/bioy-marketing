
module.exports = {
  site: data => data.siteLocal[data.locale],
  lang: data => data[data.locale]
};