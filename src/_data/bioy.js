const Cache = require("@11ty/eleventy-cache-assets");

async function fetchDay(day, locale='en_GB', variant='classic') {

  let url = `https://api.bioydata.com/api/v1/devotion/${day}?locale=${locale}&variant=${variant}`;

  let json = await Cache(url, {
    duration: "1d",
    type: "json"
  });

  // To build the pages and cool URIs later we'll need lto keep hold of
  // the locale and variant…
  json[variant].locale = locale.toLowerCase();
  json[variant].variant = variant;
  json[variant].url = `/${locale.toLowerCase()}/${variant}/${day}`;

  return json[variant]
}

module.exports = async function() {
  try {

    const variants = {
      'classic': ['en_Gb', 'es'],
      // 'classic': ['en_Gb', 'es', 'ar', 'hi', 'zh_Hans'],
      'youth': ['en_Gb'],
      'express': ['en_Gb']
    }
    const data = [];

    for (const [variant, locales] of Object.entries(variants)) {
      locales.forEach(async function (locale) {
        for (let day = 55; day <= 70; day++) {
          data.push(await fetchDay(day, locale, variant));
        }
      });
    }

    return data;

  } catch (e) {
    console.log("\n\nSquark; talking to BiOY API failed\n\n");
  }
};

