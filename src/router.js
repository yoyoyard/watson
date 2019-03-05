import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("./pages/HelloWorld.vue")
    },
    {
      path: "/apollo",
      name: "apollo",
      component: () => import("./components/ApolloExample.vue")
    }
  ]
});
