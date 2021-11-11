import Swipe from "swipejs";

export default {
  mediaFocus: 0,

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
    const previousPodcast = document.getElementById("previous");
    const nextPodcast = document.getElementById("next");
    const paginationButtons = document.querySelectorAll(".podcast-pagination");

    const podcastSwiper = new Swipe(document.getElementById("podcast"), {
      startSlide: 0,
      speed: 200,
      auto: 6000,
      draggable: false,
      continuous: true,
      disableScroll: true,
      transitionEnd: function (index, element) {
        const currentElementIndex = element.getAttribute("data-index");
        paginationButtons.forEach((button) =>
          button.getAttribute("data-index") === currentElementIndex
            ? button.classList.add("bg-white")
            : button.classList.remove("bg-white")
        );
      },
    });

    podcastSwiper.getPos() === 0
      ? paginationButtons[0].classList.add("bg-white")
      : null;

    nextPodcast.addEventListener("click", function () {
      podcastSwiper.next();
    });

    previousPodcast.addEventListener("click", function () {
      podcastSwiper.prev();
    });

    paginationButtons.forEach((button) => {
      button.addEventListener("click", () =>
        podcastSwiper.slide(button.getAttribute("data-index"), 200)
      );
    });
  },
};
