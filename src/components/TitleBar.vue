<template>
  <div class="weui-tab__header">
    <div class="weui-navbar">
      <div class="weui-navbar__item">
        {{ title }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/base.scss";

.weui-navbar {
  background: $main-color;
  color: white;
  position: fixed;
  top: 0;
  width: 100%;
}
</style>
