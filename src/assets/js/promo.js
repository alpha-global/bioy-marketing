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

    async init(startDate, endDate) {
      await this.setPromoDates(startDate, endDate);

      localStorage.getItem('hasSeenPromo') === 'true'
        ? (this.hasSeenPromo = true)
        : (this.hasSeenPromo = false);

      dayjs().isSameOrBefore(this.endDate, 'day') &&
        dayjs().isSameOrAfter(this.startDate, 'day') &&
        !this.hasSeenPromo &&
        this.showPromo();
    },
    showPromo() {
      this.$refs.promoModal.classList.add('flex');
      this.$refs.promoModal.classList.remove('hidden');
    },
    hidePromo() {
      localStorage.setItem('hasSeenPromo', 'true');
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
      localStorage.setItem('hasSeenPromo', 'true');
      location.href = donationUrl;
    },
  };
};
