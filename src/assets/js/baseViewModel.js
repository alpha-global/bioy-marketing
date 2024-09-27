export default () => {
  return {
    isCookieBoxOpen: true,

    acceptCookies() {
      localStorage.setItem("cookieConsent", "accepted");
      this.isCookieBoxOpen = false;
    },

    redirectRoot() {
      const relativeUrl = window.location.pathname;
      if (relativeUrl !== "/") return;
      const browserLanguage = navigator.language || 'en';
      const supportedLanguages = ['en', 'ar', 'de', 'fr', 'hi', 'id', 'it', 'es', 'th', 'vi', 'zh'];
      let locale;
      if (supportedLanguages.includes(browserLanguage.slice(0, 2))) {
        locale = browserLanguage.slice(0, 2);
      } else {
        locale = 'en';
      }

      window.location.replace(`/${locale}/`);
    },

    init() {
      this.redirectRoot();
      const stored = localStorage.getItem("cookieConsent");
      if (stored !== "accepted") return;
      this.isCookieBoxOpen = false;
    },
  };
};
