export default () => {
  return {
    isPlaying: false,

    init() {
      console.log(this.$refs.audio);
    },
    player() {
      this.$refs.audio.paused
        ? this.$refs.audio.play()
        : this.$refs.audio.pause();
      this.isPlaying = !this.isPlaying;
    },
    speedBack() {},
    skipBack() {},
    speedForwards() {
      console.log(this.$refs.audio.paused);
      // this.$refs.audio.playbackRate = 2;
    },
    skipForwards() {
      this.$refs.audio.pause();
    },
  };
};
