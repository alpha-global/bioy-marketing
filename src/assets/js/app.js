import Alpine from "alpinejs";

import audioPlayer from "./audioPlayerModel.js";
import baseView from "./baseViewModel.js";
import devotionBanner from "./devotionBannerModel.js";
import errorPageView from "./errorPageViewModel.js";
import faqsView from "./faqsViewModel.js";
import mediumView from "./mediumViewModel.js";
import testimonialsSlider from "./testimonialsSliderModel.js";

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

setMailPopup();

Alpine.data("audioPlayer", audioPlayer);
Alpine.data("baseView", baseView);
Alpine.data("devotionBanner", devotionBanner);
Alpine.data("faqsView", faqsView);
Alpine.data("errorPageView", errorPageView);
Alpine.data("mediumView", mediumView);
Alpine.data("testimonialsSlider", testimonialsSlider);
Alpine.start();
