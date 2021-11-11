import Swipe from "swipejs";

export default {
  mediaFocus: 0,
  currentElementIndex: 0,

  mediaClass(node) {
    return {
      "text-white": node === this.mediaFocus,
      "bg-transparent": node === this.mediaFocus,
      "text-red": node !== this.mediaFocus,
      "bg-grey-light": node !== this.mediaFocus,
    };
  },

  init() {
    if (this.$refs.mediaNav) {
      this.$refs.mediaNav.classList.remove("hidden");
      this.$refs.mediaContainer.classList.remove("flex-col");
    }
    const podcastSwiper = new Swipe(document.getElementById("podcast"), {
      startSlide: 0,
      speed: 500,
      auto: 6000,
      draggable: false,
      continuous: true,
      disableScroll: true,
      callback: function (index, element) {},
      transitionEnd: function (index, element) {
        this.currentElementIndex = element.getAttribute("data-index");
        console.log(this.currentElementIndex);
      },
    });

    const previousPodcast = document.getElementById("previous");
    const nextPodcast = document.getElementById("next");

    nextPodcast.addEventListener("click", function () {
      podcastSwiper.next();
    });

    previousPodcast.addEventListener("click", function () {
      podcastSwiper.prev();
    });

    const paginationButtons = document.querySelectorAll(".podcast-pagination");
    paginationButtons.forEach((button) => {
      button.addEventListener("click", () =>
        podcastSwiper.slide(button.getAttribute("data-index"), 200)
      );
    });
  },
};
