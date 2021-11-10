import Swipe from "swipejs";

export default {
  swiperPosition: 0,

  init() {
    const podcastSwiper = new Swipe(document.getElementById("podcast"), {
      callback: function (index, element) {},
      transitionEnd: function (index, element) {},
    });

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

    const getSwiperPosition = () => podcastSwiper.getPos();
  },
};
