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

    async init(startDate, endDate, promoID) {
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
      this.$refs.promoModal.classList.add('flex');
      this.$refs.promoModal.classList.remove('hidden');
    },
    hidePromo() {
      this.updatePromoIDsStore(this.promoID);
      this.$refs.promoModal.classList.add('hidden');
      this.$refs.promoModal.classList.remove('flex');
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
    donate(donationUrl) {
      this.updatePromoIDsStore(this.promoID);
      location.href = donationUrl;
    },
  };
};
