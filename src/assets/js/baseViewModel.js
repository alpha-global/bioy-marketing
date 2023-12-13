export default () => {
  return {
    isCookieBoxOpen: true,

    acceptCookies() {
      localStorage.setItem("cookieConsent", "accepted");
      this.isCookieBoxOpen = false;
      console.log("box is open: ", this.isCookieBoxOpen);
    },

    redirectRoot() {
      // redirect after 3 seconds
      setTimeout(() => {
        const relativeUrl = window.location.pathname;
        const targetDomain = "https://bible.alpha.org";

        // replace does not push the url to the history, so the user can't go back
        window.location.replace(`${targetDomain}${relativeUrl}`);
      }, 3000);
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
