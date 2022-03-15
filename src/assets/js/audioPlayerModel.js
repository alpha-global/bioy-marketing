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

    init() {
      this.$refs.audio.onloadedmetadata = () =>
        (this.totalTime = this.formatTime(this.$refs.audio.duration));

      setInterval(() => {
        this.progressTime = this.formatTime(this.$refs.audio.currentTime);
        this.progress = Math.floor(
          (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100
        );
      });

      this.$watch("range", () => {
        this.$refs.audio.currentTime =
          (this.range * this.$refs.audio.duration) / 100;
        this.setCSSProperty();
      });

      this.$watch("progress", () => {
        this.setCSSProperty();
      });
    },
    setCSSProperty() {
      this.$refs.input.style.setProperty(
        "--webkitProgressPercent",
        `${this.progress}%`
      );
    },
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
    speedBack() {
      this.$refs.audio.currentTime -= 15;
    },
    speedForwards() {
      this.$refs.audio.currentTime += 15;
    },
    skipForwards() {
      this.$refs.audio.pause();
    },
    skipBack() {},
    showChapterTitle(start, end = this.$refs.audio.duration) {
      let startTime = (start / this.$refs.audio.duration) * 100;
      let endTime = (end / this.$refs.audio.duration) * 100;
      return this.progress > startTime && this.progress < endTime;
    },
  };
};
