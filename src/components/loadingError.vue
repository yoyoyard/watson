<template>
  <div>
    <div v-if="loading" id="loadingToast">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
        <i class="weui-loading weui-icon_toast"></i>
        <p class="weui-toast__content">数据加载中</p>
      </div>
    </div>
    <div v-else class="error apollo" @click="errHandle">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
        <i class="weui-icon-warn weui-icon_font weui-icon_msg-primary"></i>
        <p class="weui-toast__body">发生了错误</p>
        <p class="weui-toast__content">点击返回</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    errHandle() {
      window.history.back();
    }
  }
};
</script>
<style lang="scss" scoped>
.weui-toast__body {
  font-size: 14px;
  color: lightgrey;
}

.weui-toast__content {
  font-size: 14px;
  color: lightgrey;
}

.weui-icon_font {
  margin: 16px;
  font-size: 50px;
}
</style>
