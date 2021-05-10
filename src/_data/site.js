const todaysDayNumber = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

// https://en.wikipedia.org/wiki/IETF_language_tag
const languages = [
  {
    locale: "en",
    language: "English"
  },
  {
    locale: "es",
    language: "Español"
  },
  {
    locale: "ar",
    language: "عربى"
  },
  {
    locale: "hi",
    language: "हिंदी"
  },
  {
    locale: "zh",
    language: "中國人"
  }
];

module.exports = {
  buildTime: new Date(),
  env: process.env.ELEVENTY_ENV,
  locales: languages.map(i => i.locale),
  languages: languages,
  today: todaysDayNumber()
}
