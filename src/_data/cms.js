const EleventyFetch = require('@11ty/eleventy-fetch');
const { variants } = require('./globals');

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

  if (json.meta.next_page_url != null) {
    const [base, qs] = url.split('?');
    const [locale, story, page] = qs.split('&');
    const next = page !== undefined ? parseInt(page.split('=')[1]) + 1 : 2;
    const pageUrl = `${base}?${locale}&${story}&page=${next}`;
    await _fetchDevotionRangeFromUrl(pageUrl, devotions);
  }
  return devotions;
}

module.exports = async function () {
  let startDayNumber = 1;
  let endDayNumber = 365;

  if (!process.env.CLEAN_SLATE) {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    if (day <= 5) {
      startDayNumber = 1;
      endDayNumber = 8;
    } else if (day >= 360 && day <= 365) {
      startDayNumber = day - 5;
      endDayNumber = 365;
    } else {
      startDayNumber = day - 4;
      endDayNumber = day + 3;
    }
  }

  if (process.env.START_DAY && process.env.END_DAY) {
    startDayNumber = process.env.START_DAY;
    endDayNumber = process.env.END_DAY;
  }

  try {
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
    console.error('\n\nTalking to CMS API failed\n\n');
  }
};
