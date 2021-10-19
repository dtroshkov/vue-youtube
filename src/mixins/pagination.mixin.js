import _ from "lodash";

export default {
  data() {
    return {
      page: +this.$route.query.page || 1,
      pageSize: 5,
      pageCount: 0,
      allItems: [],
      items: [],
    };
  },
  methods: {
    pageChangeHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`);
      this.items = this.allItems[page - 1] || this.allItems[0];
    },
    setupPagination(allItems) {
      console.log("Айтемы на входе", allItems);
      this.allItems = _.chunk(allItems, this.pageSize);
      console.log("Айтемы после разделения", this.allItems);
      this.pageCount = _.size(this.allItems);
      console.log("Кол-во страниц", this.pageCount);
      this.items = this.allItems[this.page - 1] || this.allItems[0];
      console.log("Массив на выход", this.items);
    },
  },
};
