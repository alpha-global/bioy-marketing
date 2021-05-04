const todaysDayNumber = ()=> {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

module.exports = {
  buildTime: new Date(),
  env: process.env.ELEVENTY_ENV,
  locales: ['en_gb', 'es', 'ar', 'hi', 'zh_Hans'],
  en_gb: {
    language: "English",
    title: "Bible in One Year",
  },
  es: {
    language: "Spanish",
    title: "Biblia en un año"
  },
  ar: {
    language: "Arabic",
    title: 'תנ"ך בשנה אחת'
  },
  hi: {
    language: "Hindi",
    title: "बाइबल एक वर्ष"
  },
  zh_Hans: {
    language: "Chinese (Traditional)",
    title: "一年聖經"
  },
  today: todaysDayNumber()
};

