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
      path: "/products",
      name: "products",
      component: () => import("./pages/Products.vue")
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
