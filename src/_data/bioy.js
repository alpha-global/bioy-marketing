const EleventyFetch = require('@11ty/eleventy-fetch');

/**
 * Fetch devotion range
 * @param {Number} from
 * @param {Number} to
 * @param {String} locale
 * @param {String} variant
 * @returns {Promise<Array>}
 */
async function fetchDevotionRange(
  from = 1,
  to = 365,
  locale = 'en',
  variant = 'classic',
) {
  const url = `https://content.bioy.app/api/v1/chapter/from/${from}/to/${to}?locale=${locale}&story=${variant}`;
  let devotions = await _fetchDevotionRangeFromUrl(url, []);
  devotions.forEach((_, index) => {
    // To build the pages and cool URIs later we'll need lto keep hold of
    // the locale and variant…
    const lang = locale.split('_')[0];
    devotions[index]['locale'] = lang;
    devotions[index]['variant'] = variant;
    devotions[index]['url'] = `/${lang}/${variant}/${devotions[index]['number']}`;
  });

  return devotions;
}

/**
 * Fetch and cache devotion range given the devotion range url
 * @param {String} url
 * @param {Array} devotions
 * @returns {Promise<Array>}
 */
async function _fetchDevotionRangeFromUrl(url, devotions) {
  let json = await EleventyFetch(url, {
    duration: '1d',
    type: 'json',
    verbose: true,
  });

  devotions.push(...json['data']);

  // if (json['links']['next'] != null) {
  //   await _fetchDevotionRangeFromUrl(json['links']['next'], devotions);
  // }

  return devotions;
}

module.exports = async function (fullImport = false) {
  let startDayNumber = 1;
  let endDayNumber = 365;

  if (!process.env.CLEAN_SLATE) {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    if (day < 11) {
      startDayNumber = 1;
      endDayNumber = 10;
    } else {
      startDayNumber = day - 5;
      endDayNumber = day;
    }
  }

  try {
    const variants = {
      classic: ['en'],
      classic: ['en', 'ar', 'de', 'fr', 'hi', 'id', 'it', 'es', 'th', 'vi', 'zh_Hans'],
      youth: ['en', 'ar'],
      express: ['en', 'de', 'ar'],
    };

    if (process.env.CHUNKS) {
      let chunk = process.env.CHUNKS.split(',');
      variants.classic = chunk;
      console.log(`Fetch ${variants.classic} variants...`);
    }

    const data = [];

    for (const [variant, locales] of Object.entries(variants)) {
      for (const locale of locales) {
        data.push(
          ...(await fetchDevotionRange(startDayNumber, endDayNumber, locale, variant)),
        );
      }
    }

    return data;
  } catch (e) {
    console.log('\n\nSquark; talking to BiOY API failed\n\n');
  }
};
