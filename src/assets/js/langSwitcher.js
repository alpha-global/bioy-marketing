export default () => {
    return {
        outOfView: false,
        showEditions: false,
        showLanguages: false,

        parsePageUrl(url, locale) {
            return `/${locale}${url.substring(3)}`;
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
    }
}