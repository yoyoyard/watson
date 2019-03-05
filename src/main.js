import Vue from "vue";
import App from "./App.vue";
import { createProvider } from "./vue-apollo";
import router from "./router";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;
Vue.use(Element);

new Vue({
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
