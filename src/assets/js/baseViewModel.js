export default () => {
  return {
    isCookieBoxOpen: true,

    acceptCookies() {
      localStorage.setItem('cookieConsent', 'accepted');
      this.isCookieBoxOpen = false;
      console.log('box is open: ', this.isCookieBoxOpen);
    },

    redirectSubPath(path, target) {
      setTimeout(() => {
        window.location.replace(`${target}${path}`);
      }, 3000);
    },
    redirectRoot(path, target) {
      setTimeout(() => {
        window.location.replace(`${target}${path}`);
      }, 5000);
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
      const path = window.location.pathname;
      const target = 'https://bible.alpha.org';

      const segments = path.split('/').filter((segment) => segment.trim() !== '');

      segments.length <= 1
        ? this.redirectRoot(path, target)
        : this.redirectSubPath(path, target);

      const stored = localStorage.getItem('cookieConsent');
      if (stored !== 'accepted') return;
      this.isCookieBoxOpen = false;
    },
  };
};
