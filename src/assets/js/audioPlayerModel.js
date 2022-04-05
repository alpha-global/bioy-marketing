export default () => {
  return {
    isPlaying: false,
    duration: 0,
    seconds: 0,
    minutes: 0,
    hours: 0,
    progressTime: "00:00",
    totalTime: "00:00",
    progress: 0,
    range: 0,
    currentChapter: 0,
    bookmarks: [],
    playrate: 1,
    showBioyTitle: true,

    init() {
      this.$refs.audio.onloadedmetadata = () =>
        (this.totalTime = this.formatTime(this.$refs.audio.duration));

      this.$refs.audio.onended = () => (this.showBioyTitle = true);

      setInterval(() => {
        this.progressTime = this.formatTime(this.$refs.audio.currentTime);
        this.progress =
          (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100;
      });

      this.$watch("range", () => {
        this.$refs.audio.currentTime =
          (this.range * this.$refs.audio.duration) / 100;
        this.setCSSProperty();
        if (Number(this.range) === 100) {
          this.isPlaying = false;
          this.showBioyTitle = true;
        }
      });

      this.$watch("progress", () => {
        this.setCSSProperty();
        if (this.progress === 100) {
          this.isPlaying = false;
        }
        this.progress <
        (Number(this.bookmarks[0]) / this.$refs.audio.duration) * 100
          ? (this.showBioyTitle = true)
          : (this.showBioyTitle = false);
      });

      this.hideNavbar();
      this.listenForMediaKeys();
    },
    setCSSProperty() {
      this.$refs.input.style.setProperty(
        "--webkitProgressPercent",
        `${this.progress}%`
      );
    },
    circumference: 30 * 2 * Math.PI,
    formatTime(time) {
      let hours = parseInt(time / 3600);
      time = time % 3600;
      let minutes = parseInt(time / 60);
      time = time % 60;
      let seconds = parseInt(time);
      if (hours === 0) {
        return `${this.padding(minutes)}:${this.padding(seconds)}`;
      }
      return `${this.padding(hours)}:${this.padding(minutes)}:${this.padding(
        seconds
      )}`;
    },
    padding(num) {
      return num < 10 ? "0" + num : num;
    },
    player() {
      this.$refs.audio.paused
        ? this.$refs.audio.play()
        : this.$refs.audio.pause();
      this.isPlaying = !this.isPlaying;
    },
    showAudioPlayer() {
      this.player();
    },
    listenForMediaKeys() {
      this.$refs.audio.addEventListener("play", () => {
        this.isPlaying = true;
      });

      this.$refs.audio.addEventListener("pause", () => {
        this.isPlaying = false;
      });

      if ("mediaSession" in navigator) {
        navigator.mediaSession.setActionHandler("seekbackward", () => {
          this.seekBackward();
        });
        navigator.mediaSession.setActionHandler("seekforward", () => {
          this.seekForward();
        });

        navigator.mediaSession.setActionHandler("previoustrack", () => {
          this.previousTrack();
        });
        navigator.mediaSession.setActionHandler("nexttrack", () => {
          this.nextTrack();
        });
      }
    },
    seekBackward() {
      this.$refs.audio.currentTime -= 15;
      let el = this.$refs.seekBackward;
      this.animate(el, "-rotate-90");
    },
    seekForward() {
      this.$refs.audio.currentTime += 15;
      let el = this.$refs.seekForward;
      this.animate(el, "rotate-90");
    },

    animate(el, direction) {
      el.addEventListener("transitionend", () => {
        el.classList.remove(direction);
      });
      el.classList.add(direction, "transition", "duration-200", "ease-in-out");
    },

    nextTrack() {
      for (let i = 0; i < this.bookmarks.length; i++) {
        if (Number(this.bookmarks[i]) > this.$refs.audio.currentTime) {
          this.$refs.audio.currentTime = Number(this.bookmarks[i]);
          break;
        }
      }
    },

    previousTrack() {
      let availableBookmarks = [];
      for (let i = this.bookmarks.length - 1; i >= 0; i--) {
        if (Number(this.bookmarks[i]) < this.$refs.audio.currentTime) {
          availableBookmarks.push(Number(this.bookmarks[i]));
        }
      }

      availableBookmarks.length > 0
        ? (this.$refs.audio.currentTime =
            availableBookmarks[1] || availableBookmarks[0])
        : (this.$refs.audio.currentTime = 0);
    },
    showChapterTitle(start, end = this.$refs.audio.duration) {
      let startTime = (start / this.$refs.audio.duration) * 100;
      let endTime = (end / this.$refs.audio.duration) * 100;
      return this.progress > startTime && this.progress < endTime;
    },
    getChapters(chapters) {
      this.bookmarks = chapters.map(({ start }) => start);
    },
    changePlayrate() {
      this.$refs.audio.playbackRate = this.playrate;
    },
    hideNavbar() {
      let prevScrollPosition = window.pageYOffset;
      const mediaQuery = window.matchMedia("(min-width: 768px)");
      window.onscroll = function () {
        let currentScrollPosition = window.pageYOffset;
        if (prevScrollPosition > currentScrollPosition && !mediaQuery.matches) {
          document.getElementById("navbar").classList.remove("hidden");
        } else if (mediaQuery.matches) {
          document.getElementById("navbar").classList.remove("hidden");
        } else {
          document.getElementById("navbar").classList.add("hidden");
        }
        prevScrollPosition = currentScrollPosition;
      };
    },
  };
};
