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
    language: "English",
  },
  {
    locale: "ar",
    language: "عربى",
  },
  {
    locale: "de",
    language: "Deutsch",
  },
  {
    locale: "es",
    language: "Español",
  },
  {
    locale: "fr",
    language: "Français",
  },
  {
    locale: "hi",
    language: "हिंदी",
  },
  {
    locale: "id",
    language: "Bahasa Indonesia",
  },
  {
    locale: "th",
    language: "ไทย",
  },
  {
    locale: "zh",
    language: "中國人",
  },
];

module.exports = {
  siteUrl: "https://bibleinoneyear.com",
  buildTime: new Date(),
  cacheBuster: Math.round(+new Date() / 1000),
  currentYear: new Date().getFullYear(),
  env: process.env.ELEVENTY_ENV,
  liveLanguages: ["en", "es"],
  locales: languages.map((i) => i.locale),
  languages: languages,
  today: todaysDayNumber(),
  stores: {
    ios: "https://itunes.apple.com/gb/app/bible-in-one-year/id504133402?mt=8",
    android:
      "https://play.google.com/store/apps/details?id=com.multipie.bibleinoneyear&hl=en_GB",
  },
};
