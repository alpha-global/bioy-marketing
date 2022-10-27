export default () => {
    return {
        startDate : "",
        endDate : "",

        init(){
            this.showPromo()
        },

        showPromo(){
            this.$refs.promo.classList.add("flex")
            this.$refs.promo.classList.remove("hidden")
        },
        hidePromo(){
            this.$refs.promo.classList.add("hidden")
            this.$refs.promo.classList.remove("flex")
        }
    }
}