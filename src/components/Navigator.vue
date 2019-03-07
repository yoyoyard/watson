<template>
  <div class="weui-tabbar">
    <router-link
      to="/"
      class="weui-tabbar__item"
      :class="{ 'weui-bar__item_on': activeIndex === 'home' }"
    >
      <img src="../assets/images/home.png" alt="" class="weui-tabbar__icon" />
      <p class="weui-tabbar__label">
        首页
      </p>
    </router-link>
    <router-link
      to="/product"
      class="weui-tabbar__item"
      :class="{ 'weui-bar__item_on': activeIndex === 'product' }"
    >
      <img
        src="../assets/images/product.png"
        alt=""
        class="weui-tabbar__icon"
      />
      <p class="weui-tabbar__label">
        基因检测
      </p>
    </router-link>
    <router-link
      to="/order"
      class="weui-tabbar__item"
      :class="{ 'weui-bar__item_on': activeIndex === 'order' }"
    >
      <img src="../assets/images/order.png" alt="" class="weui-tabbar__icon" />
      <p class="weui-tabbar__label">
        我的订单
      </p>
    </router-link>
    <router-link
      to="/mypage"
      class="weui-tabbar__item"
      :class="{ 'weui-bar__item_on': activeIndex === 'mypage' }"
    >
      <img src="../assets/images/my.png" alt="" class="weui-tabbar__icon" />
      <p class="weui-tabbar__label">
        个人中心
      </p>
    </router-link>
  </div>
</template>
<script>
export default {
  props: {
    activeIndex: String
  }
};
</script>

<style scoped>
.weui-tabbar {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
