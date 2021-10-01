export default {
  openEdition: false,
  openLanguages: false,
  isDevotion: false,
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
      "py-2",
    ];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (this.isDevotion) {
          if (entry.intersectionRatio > 0) {
            switchBannerElement.classList.replace("fixed", "absolute");
            switchBannerElement.classList.remove(...bannerClasses);
            switchBannerElement.classList.add("left-16", "mt-1", "top-11");
          } else {
            switchBannerElement.classList.replace("absolute", "fixed");
            switchBannerElement.classList.add(...bannerClasses);
            switchBannerElement.classList.remove("left-16", "mt-1", "top-11");
          }
        }
      });
    });

    observer.observe(headerElement);
  },
};
