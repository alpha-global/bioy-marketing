const EleventyFetch = require('@11ty/eleventy-fetch');
const { variants } = require('./globals');
const { calculateDateRange } = require('../../utils/helpers');
const dayjs = require('dayjs');
const leapYearPlugin = require('dayjs/plugin/isLeapYear');

dayjs.extend(leapYearPlugin);

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

function isLeapYear() {
  const year = new Date().getFullYear();
  const isLeap = dayjs(year.toString(), 'YYYY').isLeapYear();
  return isLeap;
}

function includeLeapYear(data) {
  const minNumber = data.reduce((acc, item) => Math.min(acc, item.number), 400);
  const maxNumber = data.reduce((acc, item) => Math.max(acc, item.number), -1);
  if (maxNumber < 59) return false;
  if (minNumber > 61) return false;

  return true;
}

async function injectLeapYear(data) {
  // if not leapyear, return data minus the leap year content
  if (!isLeapYear()) return data;


  // this is a leap year get the LY content
  const leapYear = [];

  for (const [variant, locales] of Object.entries(variants)) {
    for (const locale of locales) {
      const day60 = await fetchDevotionRange(366, 366, locale, variant);
      if (!day60.length) continue;
      const item = day60[0];
      item.number = 60;
      item.url = item.url.replace('366', '60');
      leapYear.push(item);
    }
  }

  const preDays = data.filter((item) => item.number < 60);
  const postDays = data.filter((item) => item.number >= 60).map((item) => {
    // bump the day number by 1
    const newId = item.number + 1;
    item.number = newId;
    // change the url
    item.url = `/${item.locale}/${item.variant}/${newId}`;
    return item;
  });

  if (!includeLeapYear(data)) {
    // date range not near 29 Feb, so 
    // one of the following will be empty
    return [
      ...preDays,
      ...postDays
    ];
  }

  return [
    ...preDays,
    ...leapYear,
    ...postDays
  ];

}

module.exports = async function () {

  let startDayNumber = 1;
  let endDayNumber = 365;

  if (!process.env.CLEAN_SLATE) {
    const now = new Date();
    const { startDay, endDay } = calculateDateRange(now);
    startDayNumber = startDay;
    endDayNumber = endDay;
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

    const adjusted = injectLeapYear(data);
    return adjusted;
  } catch (e) {
    console.error('\n\nTalking to CMS API failed\n\n');
  }
};
