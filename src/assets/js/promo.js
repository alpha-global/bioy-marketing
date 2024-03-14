import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(customParseFormat);

export default () => {
  return {
    startDate: '',
    endDate: '',
    now: dayjs(),
    hasSeenPromo: false,
    promoID: '',
    locator: null,
    showVideo: false,
    embedURL: '',

    async init(startDate, endDate, promoID, type, youTubeURL) {
      if (type == undefined) return;

      youTubeURL == undefined || youTubeURL == ''
        ? (this.embedURL = '')
        : (this.embedURL = this.videoParams(youTubeURL).embedURL);

      if (type == 'modal') {
        this.locator = this.$refs.promoModal;
      } else if (type == 'banner') {
        this.locator = this.$refs.promoBanner;
      }

      this.promoID = promoID;

      await this.setPromoDates(startDate, endDate);

      JSON.parse(localStorage.getItem('promoIDs'))?.includes(this.promoID)
        ? (this.hasSeenPromo = true)
        : (this.hasSeenPromo = false);

      dayjs().isSameOrBefore(this.endDate, 'day') &&
        dayjs().isSameOrAfter(this.startDate, 'day') &&
        !this.hasSeenPromo &&
        this.showPromo();
    },
    updatePromoIDsStore(promoID) {
      const promoIDs = JSON.parse(localStorage.getItem('promoIDs')) || [];
      if (promoIDs?.includes(promoID)) return;
      promoIDs.push(promoID);
      localStorage.setItem('promoIDs', JSON.stringify(promoIDs));
    },
    showPromo() {
      this.locator.classList.add('flex');
      this.locator.classList.remove('hidden');
    },
    hidePromo() {
      this.updatePromoIDsStore(this.promoID);
      this.locator.classList.add('hidden');
      this.locator.classList.remove('flex');
    },
    async setPromoDates(start, end) {
      if (
        dayjs(start, 'YYYY-MM-DD', true).isValid() &&
        dayjs(end, 'YYYY-MM-DD', true).isValid()
      ) {
        this.startDate = dayjs(start, 'YYYY-MM-DD');
        this.endDate = dayjs(end, 'YYYY-MM-DD');
      }
    },
    acceptAction(ctaUrl) {
      this.updatePromoIDsStore(this.promoID);
      location.href = ctaUrl;
    },
    playVideo() {
      this.showVideo = true;
    },
    videoParams(videoUrl) {
      const videoId = videoUrl.split('v=')[1];
      const ampersandPosition = videoId.indexOf('&');
      if (ampersandPosition !== -1) {
        return videoId.substring(0, ampersandPosition);
      }
      const embedURL = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0`;
      return {
        embedURL: embedURL,
        videoId: videoId,
      };
    },
  };
};
