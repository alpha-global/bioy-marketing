import { locales } from "../../_data/globals";

export default () => {
  return {
    currentUserLocale: "",
    init() {
      this.currentUserLocale = this.getUserLocale();
    },
    getUserLocale() {
      const browserLocale = navigator.language;
      const userLocale = browserLocale.split("-")[0];
      return locales.includes(userLocale) ? userLocale : "en";
    },
    goHome() {
      const hostname = location.host;
      const protocol = location.protocol;
      const url = `${protocol}//${hostname}/${this.currentUserLocale}`;
      window.location.assign(url);
    },
    errorMessageForLocale(locale) {
      return locale === this.currentUserLocale ? true : false;
    },
  };
};
