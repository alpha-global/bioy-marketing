export default {
    isCookieBoxOpen: true,
    isLangPickerOpen: false,

    acceptCookies() {
        localStorage.setItem('cookieConsent', "accepted");
        this.isCookieBoxOpen = false;
        console.log("box is open: ", this.isCookieBoxOpen);
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
        const stored = localStorage.getItem('cookieConsent');
        if ( stored !== "accepted") return;
        this.isCookieBoxOpen = false;
    }
}