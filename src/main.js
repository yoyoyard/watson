import Vue from "vue";
import App from "./App.vue";
import { createProvider } from "./vue-apollo";
import router from "./router";

Vue.config.productionTip = false;

Vue.filter("dateFilter", value => {
  return new Date(+new Date(value) + 8 * 3600 * 1000)
    .toISOString()
    .replace(/T/g, " ")
    .replace(/\.[\d]{3}Z/, "");
});

new Vue({
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
