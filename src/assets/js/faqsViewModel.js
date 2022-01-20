export default () => {
  return {
    query: null,
    show: false,
    faqsItems: [],

    init() {
      this.faqsItems = document.querySelectorAll(".js-faqsItem");

      const filterContainer = document.querySelector(".js-filter");
      filterContainer.classList.remove("hidden");
    },

    filteredItems() {
      if (!this.query) {
        this.faqsItems.forEach((item) => {
          item.classList.remove("hidden");
        });
        return null;
      }

      let results = 0;

      this.faqsItems.forEach((item) => {
        if (item.innerText.includes(this.query)) {
          item.classList.remove("hidden");
          results++;
        } else {
          item.classList.add("hidden");
        }
      });
      return results;
    },
  };
};
