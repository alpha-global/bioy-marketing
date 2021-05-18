export default function setPlatformDependentDownloadLink() {
  const els = document.querySelectorAll(".js-nav-download-btn");
  const deviceType = getDeviceType();

  els.forEach(el => {
    if (deviceType == 'Android'){
      el.href = el.dataset.androidUrl;
    } else if (deviceType == 'iOS') {
      el.href = el.dataset.iosUrl;
    }
  });
}

function getDeviceType() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/android/i.test(userAgent)) {
    return "Android";
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }

  return "unknown";
}
