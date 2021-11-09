const slugify = require('slugify')
const faqs = require("../src/faqs/faqs.11tydata.json");

exports.faqsItems = collection => {
  items = [];

  Object.keys(faqs).forEach(locale => {
    faqs[locale].faqsItems.forEach(item => {
      if (!item.title) return;
      item.locale = locale;
      item.slug = slugify(item.title, {
        lower: true,
        remove: /[*+~.,<>()?&%$@'"!:@]/g,
        replacement: '-',
        locale: locale
      });
      items.push(item);
    });
  });

  return items;
}
