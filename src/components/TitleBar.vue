<template>
  <div class="weui-tab__header">
    <div class="weui-navbar">
      <a v-show="back" class="back-button" @click="backHandle">返回 </a>
      <div class="weui-navbar__item">
        {{ title }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    back: String
  },
  methods: {
    backHandle() {
      if (this.back === "back") {
        window.history.back();
      } else {
        this.$router.push(this.back);
      }
    }
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
.back-button {
  color: white;
  position: absolute;
  left: 30px;
  line-height: 50px;
  z-index: 2;
  &:after {
    content: " ";
    display: block;
    height: 10px;
    width: 10px;
    border-width: 2px 2px 0 0;
    border-style: solid;
    border-color: rgba(white, 1);
    opacity: 1;
    -webkit-transform: matrix(-0.71, -0.71, 0.71, -0.71, 0, 0);
    transform: matrix(-0.71, -0.71, 0.71, -0.71, 0, 0);
    position: absolute;
    top: 18px;
    left: -15px;
  }
}
</style>
