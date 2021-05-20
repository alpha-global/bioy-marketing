export default {
    query: null,
    show: false,
    helpItems: [],
    
    init() {
      this.helpItems = document.querySelectorAll('.js-helpItem');

      const filterContainer = document.querySelector('.js-filter');
      filterContainer.classList.remove('hidden');
    },

    filteredItems() {
      if (!this.query) {
        this.helpItems.forEach(item => {
          item.classList.remove('hidden');
        });
        return null;
      }

      let results = 0;

      this.helpItems.forEach(item => {
        if (item.innerText.includes(this.query)) {
          item.classList.remove('hidden');
          results++;
        } else {
          item.classList.add('hidden');
        }
      });
      return results;
    }
  }