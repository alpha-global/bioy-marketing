export default () => {
  return {
    init() {
      if (!localStorage.getItem('bannerSeen')) {
        this.showBanner();
      }
    },
    hideBanner() {
      localStorage.setItem('bannerSeen', true);
      this.$refs.banner.classList.add('hidden');
      this.$refs.banner.classList.remove('fixed');
    },
    showBanner() {
      this.$refs.banner.classList.add('fixed');
      this.$refs.banner.classList.remove('hidden');
    },
  };
};
