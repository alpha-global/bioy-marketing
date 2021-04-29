
const Cache = require("@11ty/eleventy-cache-assets");


/**
 * Fetch devotion range
 * @param {Number} from 
 * @param {Number} to 
 * @param {String} locale 
 * @param {String} variant 
 * @returns {Promise<Array>}
 */
async function fetchDevotionRange(from = 1, to = 365, locale = 'en_GB', variant = 'classic') {
  const url = `https://api.bioydata.com/api/v1/devotion/from/${from}/to/${to}?locale=${locale}&variant=${variant}`;
  let devotions = await _fetchDevotionRangeFromUrl(url, []);
  devotions.forEach((_, index) => {
    // To build the pages and cool URIs later we'll need lto keep hold of
    // the locale and variant…
    devotions[index]['locale'] = locale.toLowerCase();
    devotions[index]['variant'] = variant;
    devotions[index]['url'] = `/${locale.toLowerCase()}/${variant}/${devotions[index]['devotionId']}`;
  })

  return devotions
}


/**
 * Fetch and cache devotion range given the devotion range url
 * @param {String} url 
 * @param {Array} devotions 
 * @returns {Promise<Array>}
 */
async function _fetchDevotionRangeFromUrl(url, devotions) {
  let json = await Cache(url, {
    duration: "1d",
    type: "json"
  });


  devotions.push(...json['data'])

  if (json['links']['next'] != null) {
    await _fetchDevotionRangeFromUrl(json['links']['next'], devotions)
  }

  return devotions
}

module.exports = async function () {
  try {

    const variants = {
      'classic': ['en_Gb', 'es', 'ar', 'hi', 'zh_Hans'],
      'youth': ['en_Gb'],
      'express': ['en_Gb']
    }
    const data = [];

    for (const [variant, locales] of Object.entries(variants)) {
      for (const locale of locales) {
        data.push(...await fetchDevotionRange(1, 365, locale, variant))
      }
    }

    return data;

  } catch (e) {
    console.log("\n\nSquark; talking to BiOY API failed\n\n");
  }
};

