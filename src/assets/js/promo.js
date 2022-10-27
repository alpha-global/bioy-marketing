import dayjs from "dayjs"

export default () => {
    return {
        startDate : "October 28, 2022 10:45 AM",
        endDate : "",
        now: dayjs(),
        promoIsActive : false,

        init(){
            this.showPromo()
            console.log(this.now);
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

// localStorage.setItem("cookieConsent", "accepted");
//       this.isCookieBoxOpen = false;
//       console.log("box is open: ", this.isCookieBoxOpen);

//       const stored = localStorage.getItem("cookieConsent");
//       if (stored !== "accepted") return;
//       this.isCookieBoxOpen = false;