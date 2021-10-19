import localizeFilter from "@/filters/localize.filter";

export default {
  install(Vue) {
    Vue.prototype.$title = function (titleKey) {
      const appName = process.env.VUE_APP_TITLE;
      console.log(process.env);
      return `${localizeFilter(titleKey)} | ${appName}`;
    };
  },
};
