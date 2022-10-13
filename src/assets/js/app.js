import Alpine from "alpinejs";
import Swipe from "swipejs";

import baseView from "./baseViewModel.js";
import faqsView from "./faqsViewModel.js";
import mediumView from "./mediumViewModel.js";
import errorPageViewModel from "./errorPageViewModel.js";

import audioPlayer from "./audioPlayerModel.js";
const { locales } = require("../../_data/globals");

import devotionBanner from "./devotionBannerModel.js";

window.app = new (function () {
  return {
    init() {},

    // baseViewModel,
    // faqsViewModel,
    // mediumViewModel,
    // helpers,
    errorPageViewModel,
    // audioPlayerModel,
  };
})();

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

const testimonySwiper = new Swipe(document.getElementById("slider"), {
  startSlide: 0,
  speed: 500,
  auto: 6000,
  draggable: false,
  continuous: true,
  disableScroll: false,
  stopPropagation: true,
});

window.testimonySwiper = testimonySwiper;

setMailPopup();

Alpine.data("audioPlayer", audioPlayer);
Alpine.data("baseView", baseView);
Alpine.data("devotionBanner", devotionBanner);
Alpine.data("mediumView", mediumView);
Alpine.data("faqsView", faqsView);
Alpine.start();
