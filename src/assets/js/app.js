import "alpinejs";
import Swipe from "swipejs";

import baseViewModel from "./baseViewModel.js";
import faqsViewModel from "./faqsViewModel.js";
import mediumViewModel from "./mediumViewModel.js";
const { locales } = require("../../_data/globals");

import helpers from "./helpers.js";

window.app = new (function () {
  // public functions
  return {
    init() {
      setMailPopup();

      const testimonySwiper = new Swipe(document.getElementById("slider"), {
        startSlide: 0,
        speed: 500,
        auto: 6000,
        draggable: false,
        continuous: true,
        disableScroll: false,
        stopPropagation: true,
      });
     
    },

    baseViewModel,
    faqsViewModel,
    mediumViewModel,
    helpers,
  };

  function setMailPopup() {
    const mailerLiteLink = document.querySelector(".js-mailerLite");
    if (!mailerLiteLink) return;
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

    var ml_account = ml("accounts", "3056200", "f0i3r5m4t5", "load");

    mailerLiteLink.addEventListener("click", function (e) {
      e.preventDefault();
      let d = mailerLiteLink.dataset.ml.split(",");
      ml_account("webforms", String(d[0]), String(d[1]), "show");
    });
  }
})();

if (document.readyState != "loading") {
  window.app.init();
} else {
  document.addEventListener("DOMContentLoaded", window.app.init);
}
