import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./pages/home/index.vue")
    },
    {
      path: "/products",
      name: "products",
      component: () => import("./pages/products/index.vue")
    },
    {
      path: "/products/:id",
      name: "product",
      component: () => import("./pages/products/detail.vue")
    },
    {
      path: "/shopping",
      name: "shopping",
      component: () => import("./pages/shopping/index.vue")
    },
    {
      path: "/orders",
      name: "orders",
      component: () => import("./pages/orders/index.vue")
    },
    {
      path: "/orders/:id",
      name: "order",
      component: () => import("./pages/orders/detail.vue")
    },
    {
      path: "/mypage",
      name: "mypage",
      component: () => import("./pages/mypage/index.vue")
    },
    {
      path: "/mypage/addresses",
      name: "mypage-addresses",
      component: () => import("./pages/mypage/addresses.vue")
    },
    {
      path: "/mypage/addresses/new",
      name: "mypage-addresses-new",
      component: () => import("./pages/mypage/addressNew.vue")
    },
    {
      path: "/mypage/addresses/new",
      name: "mypage-addresses-edit",
      component: () => import("./pages/mypage/addressNew.vue")
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

export default router;
