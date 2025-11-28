
export default () => {
    return {
        isPlaying: false,

        init() {
            const player = this.$refs.player;
            if (!player) return;

            player.addEventListener('ended', () => {
                this.isPlaying = false;
            });
        },

        play() {
            const player = this.$refs.player;
            if (!player) return;

            player.play();
            this.isPlaying = true;

        },
    }
}