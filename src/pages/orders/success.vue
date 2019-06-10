<template>
  <div class="pay-content">
    <i class="weui-icon-success weui-icon_msg size"></i>
    <p class="success">支付成功</p>
    <router-link to="/orders" class="weui-btn weui-btn_block weui-btn_default" style="margin-top:6vh;width:70%;">返回订单</router-link>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.pay-content {
  margin-top: 15vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .size {
    font-size: 120px;
  }
  .success {
    margin-top: 3vh;
    font-size: 25px;
    font-weight: bold;
  }
}
</style>


