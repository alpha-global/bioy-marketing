import Swipe from "swipejs";

export default () => {
  return {
    init() {
      new Swipe(this.$refs.slider, {
        startSlide: 0,
        speed: 500,
        auto: 6000,
        draggable: false,
        continuous: true,
        disableScroll: false,
        stopPropagation: true,
      });
    },
  };
};
