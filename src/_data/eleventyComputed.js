
module.exports = {
  label: data => data.labels[data.locale],
  site: data => data.siteLocal[data.locale],
  lang: data => data[data.locale],
  blocks: data => data.blocks[data.locale]
};