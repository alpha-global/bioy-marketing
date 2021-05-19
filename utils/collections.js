const slugify = require('slugify')
const help = require("../src/help/help.11tydata.json");

exports.helpItems = collection => {
  items = [];

    Object.keys(help).forEach(locale => {
        help[locale].helpItems.forEach(item => {
          item.locale = locale;
          item.slug = slugify(item.title,{
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
