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
    const podcastSwiper = new Swipe(document.getElementById("podcast"), {
      startSlide: 0,
      speed: 500,
      auto: 6000,
      draggable: false,
      continuous: true,
      disableScroll: true,
      callback: function (index, element) {},
      transitionEnd: function (index, element) {
        const paginationButtons = document.querySelectorAll(
          ".podcast-pagination"
        );
        paginationButtons.forEach((button) => console.log(button));
      },
    });

    podcastSwiper.enable();

    const previousPodcast = document.getElementById("previous");
    const nextPodcast = document.getElementById("next");

    const firstPodcastPagination = document.getElementById(
      "firstPodcastPagination"
    );
    const secondPodcastPagination = document.getElementById(
      "secondPodcastPagination"
    );
    const thirdPodcastPagination = document.getElementById(
      "thirdPodcastPagination"
    );

    nextPodcast.addEventListener("click", function () {
      podcastSwiper.next();
    });

    previousPodcast.addEventListener("click", function () {
      podcastSwiper.prev();
    });

    firstPodcastPagination.addEventListener("click", function () {
      podcastSwiper.slide(0, 100);
    });

    secondPodcastPagination.addEventListener("click", function () {
      podcastSwiper.slide(1, 100);
    });

    thirdPodcastPagination.addEventListener("click", function () {
      podcastSwiper.slide(2, 100);
    });
  },
};
