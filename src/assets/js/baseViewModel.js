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
      window.location.replace("/en/");
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
      const stored = localStorage.getItem("cookieConsent");
      if (stored !== "accepted") return;
      this.isCookieBoxOpen = false;
      this.redirectRoot();
    },
  };
};
