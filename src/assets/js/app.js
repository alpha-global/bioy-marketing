import 'alpinejs';
import Swipe from 'swipejs';
const data = require("../../help.11tydata.json");
// const homeData = require("../../home.11tydata.json");
const { locales } = require("../../_data/globals");


const app = new function() {
    var one, two, three;
    
  this.init = function () {
      
      this.setDateId();
    };
    
    var setDateId = function() {
         const todayBlock = document.querySelector('.js-today');
  if (todayBlock) {
    const readLink = todayBlock.querySelector('a');

    // Todo: Extract, Tidy and cater for leap year
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);

    const url = `/${todayBlock.dataset.locale}/${todayBlock.dataset.variant}/${day}`;

    readLink.href = url;
  }
    };
    
    this.publicFunction = function() {

    };

}

function start() {

  const testimonySwiper = new Swipe(document.getElementById('slider'), {
    startSlide: 0,
    speed: 500,
    auto: 6000,
    draggable: false,
    continuous: true,
    disableScroll: false,
    stopPropagation: true,
  });



}

if (document.readyState!='loading') start();
else document.addEventListener('DOMContentLoaded', start);

// Redirect base URL
(window.onpopstate = function () {
  // http://bioy-marketing.netlify.app/#invite_token=A1111l38jNObCN586k61UQ
  // https://bioy-marketing.netlify.app/#recovery_token=RS2222lxAkkntZg81ARUYQ
  var isLoginRequest = window.location.hash.includes("token");
  if (isLoginRequest) return;
  
  var currentPath = window.location.pathname;
  if (currentPath && currentPath !== '/') return;

  const lang = navigator.language.split('-')[0];

  if (locales.includes(lang)) {
    window.location = `/${lang}/`
  }
})();




const mailerLiteLink = document.querySelector('.js-mailerLite');
if (mailerLiteLink) {
  (function(m,a,i,l,e,r){ m['MailerLiteObject']=e;function f(){
    var c={ a:arguments,q:[]};var r=this.push(c);return "number"!=typeof r?r:f.bind(c.q);}
    f.q=f.q||[];m[e]=m[e]||f.bind(f.q);m[e].q=m[e].q||f.q;r=a.createElement(i);
    var _=a.getElementsByTagName(i)[0];r.async=1;r.src=l+'?v'+(~~(new Date().getTime()/1000000));
    _.parentNode.insertBefore(r,_);})(window, document, 'script', 'https://static.mailerlite.com/js/universal.js', 'ml');

  var ml_account = ml('accounts', '3056200', 'f0i3r5m4t5', 'load');

  mailerLiteLink.addEventListener('click', function(e) {
    e.preventDefault();
    let d = mailerLiteLink.dataset.ml.split(',');
    ml_account('webforms', String(d[0]), String(d[1]), 'show');
  });
}

window.store = function() {
  return {
    query: null,
    show: false,
    helpItems: [],
    init() {
      this.helpItems = data["en"].helpItems;

      document.querySelector('.filter').classList.remove('hidden')
    },

    filteredItems() {
      if (!this.query) return [];
      return this.helpItems.filter((helpItem) => {
        if (helpItem.title.toLowerCase().includes(this.query.toLowerCase())) {
          return true;
        }

        if (helpItem.shortAnswer.toLowerCase().includes(this.query.toLowerCase())) {
          return true;
        }

        if (helpItem.category.toLowerCase().includes(this.query.toLowerCase())) {
          return true;
        }

        return false;

      })
    }
  }
}

window.mediumBlock = function () {
  return {
    mediaFocus: 0,
    mediaClass(node) {
      return {
        'text-white': (node === this.mediaFocus),
        'bg-transparent': (node === this.mediaFocus),
        'text-red': (node !== this.mediaFocus),
        'bg-grey-light': (node !== this.mediaFocus)
      };
    },
    init() {
      if (this.$refs.mediaNav) {
        this.$refs.mediaNav.classList.remove('hidden');
        this.$refs.mediaContainer.classList.remove('flex-col');
      }
    },
  }
}
