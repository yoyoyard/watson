import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("./pages/login/index.vue")
    },
    {
      path: "/",
      name: "home",
      component: () => import("./pages/home/index.vue")
    },
    {
      path: "/product",
      name: "product",
      component: () => import("./pages/product/index.vue")
    },
    {
      path: "/order",
      name: "order",
      component: () => import("./pages/order/index.vue")
    },
    {
      path: "/mypage",
      name: "mypage",
      component: () => import("./pages/mypage/index.vue")
    },
    {
      path: "/hello",
      name: "hello",
      component: () => import("./pages/HelloWorld.vue")
    },
    {
      path: "/apollo",
      name: "apollo",
      component: () => import("./components/ApolloExample.vue")
    }
  ]
});
