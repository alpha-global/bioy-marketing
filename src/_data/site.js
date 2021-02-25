module.exports = {
  buildTime: new Date(),
  env: process.env.ELEVENTY_ENV,
  locales: ['en_gb', 'es'],
  en_gb: {
    language: "English",
    title: "Bible in One Year",
  },
  es: {
    language: "Spanish",
    title: "Biblia en un año"
  }
}
