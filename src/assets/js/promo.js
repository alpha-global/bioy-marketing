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
    isPromoActive: false,
    isValidDates: false,

    async init(startDate, endDate) {
      await this.setPromoDates(startDate, endDate);

      localStorage.getItem('promoActive') === 'true'
        ? (this.isPromoActive = true)
        : (this.isPromoActive = false);

      this.isValidDates &&
      dayjs().isSameOrBefore(this.endDate, 'day') &&
      dayjs().isSameOrAfter(this.startDate, 'day') &&
      !this.isPromoActive
        ? this.showPromo()
        : this.hidePromo();
    },
    showPromo() {
      this.$refs.promo.classList.add('flex');
      this.$refs.promo.classList.remove('hidden');
    },
    hidePromo() {
      localStorage.setItem('promoActive', 'true');
      this.$refs.promo.classList.add('hidden');
      this.$refs.promo.classList.remove('flex');
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
      localStorage.setItem('promoActive', 'true');
      location.href = donationUrl;
    },
  };
};
