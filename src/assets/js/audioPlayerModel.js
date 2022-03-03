export default () => {
  return {
    isPlaying: false,
    duration: 0,
    seconds: 0,
    minutes: 0,
    hours: 0,
    progressTime: "00:00",
    totalTime: "00:00",

    init() {
      this.$refs.audio.onloadedmetadata = () =>
        (this.totalTime = this.formatTime(this.$refs.audio.duration));

      setInterval(() => {
        this.progressTime = this.formatTime(this.$refs.audio.currentTime);
      });
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
  };
};
