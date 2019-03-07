<template>
  <div>
    <title-bar title="基因检测" />
    <div class="page weui-grids">
      <div class="weui-panel weui-panel_access">
        <div class="weui-panel__bd">
          <router-link
            to="/products/detail"
            v-for="(o, index) in 6"
            :key="o"
            class="weui-media-box weui-media-box_appmsg"
          >
            <div class="weui-media-box__hd">
              <img src="../assets/logo.png" class="weui-media-box__thumb" />
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">
                儿童关爱 基础套餐{{ index + 1 }}
              </h4>
              <p class="weui-media-box__desc">
                儿童关爱天赋2项, 性格测试50项，基因起源缺陷分析100项
              </p>
              <p class="weui-media-box__desc price">¥100</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="fix-nav"></div>
    <navigator activeIndex="product" />
  </div>
</template>

<script>
import Navigator from "../components/Navigator";
import TitleBar from "../components/TitleBar";

export default {
  name: "HelloWorld",
  components: {
    TitleBar,
    Navigator
  },
  props: {
    msg: String
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/base.scss";
.el-card {
  margin: 10px 0;
}
.item {
  position: block;
  text-align: left;
}
.small-text {
  font-size: 0.7em;
}
.time {
  font-size: 13px;
  color: #999;
}
.order_btn {
  padding: 0.5em;
  float: right;
}

.price {
  margin-top: 8px;
}
</style>
