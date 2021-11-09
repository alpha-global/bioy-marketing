import Swipe from "swipejs";


export default {
  itemPosition: 0,
  edition: "Classic",
  editions: ["Classic", "Youth", "Express"],

  init() {
    const podcastSwiper = new Swipe(document.getElementById("podcast"), {
      callback: function (index, element) {},
      transitionEnd: function (index, element) {},
    });

    this.itemPosition = podcastSwiper.getPos();

    const previousPodcast = document.getElementById("previous");
    const nextPodcast = document.getElementById("next");

    nextPodcast.addEventListener("click", function () {      
      podcastSwiper.next();
    });

    previousPodcast.addEventListener("click", function () {    
      podcastSwiper.prev();
    });
  },

  
  
};
// const previousPodcast = document.getElementById("previous");
// const nextPodcast = document.getElementById("next");
// previousPodcast.onclick = podcastSwiper.prev
// nextPodcast.onclick = podcastSwiper.next

// console.log(podcastSwiper.getNumSlides())

// const firstPodcastPaginnationButton = document.getElementById(
//   "firstPodcastPaginnation"
// );

// firstPodcastPaginnationButton.addEventListener("click", function () {
//   console.log("Clicked")
// })
// const secondPodcastPaginnationButton = document.getElementById(
//   "secondPodcastPaginnation"
// );
// const thirdPodcastPaginnationButton = document.getElementById(
//   "secondPodcastPaginnation"
// );
