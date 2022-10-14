export default () => {
  return {
    openEdition: false,
    openLanguages: false,
    isDevotion: false,
    outOfView: false,
    init(variant) {
      this.switchBanner();
      this.isDevotion = variant ? true : false;
    },

    parsePageUrl(url, locale) {
      return `/${locale}${url.substring(3)}`;
    },

    switchBanner() {
      const headerElement = document.getElementById("header");

      const switchBannerElement = document.getElementById("switchBanner");

      const bannerClasses = [
        "top-0",
        "inset-x-0",
        "justify-center",
        "bg-white",
        "max-w-2xl",
        "mx-auto",
        "divide-y-1",
        "border-b-2",
        "border-red",
        "divide-x-2",
        "rtl:divide-x-reverse",
        "divide-grey-light",
      ];

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (this.isDevotion) {
            if (entry.intersectionRatio > 0) {
              this.outOfView = false;
              switchBannerElement.classList.replace("fixed", "absolute");
              switchBannerElement.classList.remove(...bannerClasses);
              switchBannerElement.classList.add(
                "ltr:left-16",
                "rtl:right-16",
                "top-10"
              );
            } else {
              this.outOfView = true;
              switchBannerElement.classList.replace("absolute", "fixed");
              switchBannerElement.classList.add(...bannerClasses);
              switchBannerElement.classList.remove(
                "ltr:left-16",
                "rtl:right-16",
                "top-10"
              );
            }
          }
        });
      });

      observer.observe(headerElement);
    },
  };
};
