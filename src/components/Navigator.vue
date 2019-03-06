<template>
  <el-footer class="nav-bar">
    <el-menu
      :default-active="activeIndex"
      class="el-menu"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="home">
        首页
      </el-menu-item>
      <el-menu-item index="products">
        基因检测
      </el-menu-item>
      <el-menu-item index="order">
        订单
      </el-menu-item>
      <el-menu-item index="mypage">
        我的
      </el-menu-item>
    </el-menu>
  </el-footer>
</template>
<script>
export default {
  props: {
    activeIndex: String
  },
  methods: {
    handleSelect(key) {
      this.$router.push({ name: key });
    }
  }
};
</script>

<style scoped>
.nav-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: white;
}
</style>
