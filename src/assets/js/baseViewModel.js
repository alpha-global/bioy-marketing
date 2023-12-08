export default () => {
  return {
    isCookieBoxOpen: true,
    isLangPickerOpen: false,

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

    deviceUrl(locale, androidUrl, iosUrl) {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      if (/android/i.test(userAgent)) {
        return androidUrl;
      }

      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return iosUrl;
      }

      return `/${locale}/#start`;
    },

    init() {
      this.redirectRoot();
      const stored = localStorage.getItem("cookieConsent");
      if (stored !== "accepted") return;
      this.isCookieBoxOpen = false;
    },
  };
};
