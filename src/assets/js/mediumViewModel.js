import Swipe from "swipejs";

export default () => {
  return {
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
      const previousPodcast = document.getElementById("previous");
      const nextPodcast = document.getElementById("next");
      const paginationButtons = document.querySelectorAll(
        ".podcast-pagination"
      );

      const podcastSwiper = new Swipe(document.getElementById("podcast"), {
        startSlide: 0,
        speed: 200,
        auto: 6000,
        draggable: false,
        continuous: true,
        disableScroll: true,
        transitionEnd: (index, element) => {
          const currentElementIndex = element.getAttribute("data-index");
          paginationButtons.forEach((button) =>
            button.getAttribute("data-index") === currentElementIndex
              ? button.classList.add("bg-white")
              : button.classList.remove("bg-white")
          );
        },
      });

      if (paginationButtons.length) {
        podcastSwiper.getPos() === 0
          ? paginationButtons[0].classList.add("bg-white")
          : null;

        paginationButtons.forEach((button) => {
          button.addEventListener("click", () =>
            podcastSwiper.slide(button.getAttribute("data-index"), 200)
          );
        });
      }

      if (nextPodcast || previousPodcast) {
        nextPodcast.addEventListener("click", () => podcastSwiper.next());

        previousPodcast.addEventListener("click", () => podcastSwiper.prev());
      }
    },
    mailerLitePopup(e) {
      (function (m, a, i, l, e, r) {
        m["MailerLiteObject"] = e;
        function f() {
          var c = { a: arguments, q: [] };
          var r = this.push(c);
          return "number" != typeof r ? r : f.bind(c.q);
        }
        f.q = f.q || [];
        m[e] = m[e] || f.bind(f.q);
        m[e].q = m[e].q || f.q;
        r = a.createElement(i);
        var _ = a.getElementsByTagName(i)[0];
        r.async = 1;
        r.src = l + "?v" + ~~(new Date().getTime() / 1000000);
        _.parentNode.insertBefore(r, _);
      })(
        window,
        document,
        "script",
        "https://static.mailerlite.com/js/universal.js",
        "ml"
      );

      let ml_account = ml("accounts", "3056200", "f0i3r5m4t5", "load");

      e.preventDefault();
      let d = e.target.dataset.ml.split(",");
      ml_account("webforms", String(d[0]), String(d[1]), "show");
    },

    zohoForm() {
      this.$refs.zohoFormIframe.classList.toggle("hidden");
    },
  };
};
