import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./pages/Home.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./pages/Login.vue")
    },
    {
      path: "/product",
      name: "product",
      component: () => import("./pages/Product.vue")
    },
    {
      path: "/order",
      name: "order",
      component: () => import("./pages/Order.vue")
    },
    {
      path: "/mypage",
      name: "mypage",
      component: () => import("./pages/MyPage.vue")
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
