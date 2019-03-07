<template>
  <div>
    <title-bar title="我的订单" />
    <div class="weui-tab">
      <div class="weui-navbar">
        <div class="weui-navbar__item weui-bar__item_on">
          所有订单
        </div>
        <div class="weui-navbar__item">
          未完成的订单
        </div>
      </div>
      <div class="weui-tab__panel">
        <div class="weui-panel__hd">订单列表</div>
        <div class="weui-panel_access">
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
              <div class="weui-media-box__desc weui-flex">
                <div class="weui-flex__item">
                  <div class="placeholder">查看物流</div>
                </div>
                <div class="weui-flex__item">
                  <div class="placeholder">评价</div>
                </div>
                <div class="weui-flex__item">
                  <div class="placeholder">申请开票</div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <navigator activeIndex="order" />
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
  },
  data() {
    return {
      activeIndex: "order"
    };
  }
};
</script>

<style lang="scss" scoped>
.weui-tab {
  margin-bottom: 50px;
  margin-top: 50px;
  .weui-navbar {
    position: fixed;
    top: 50px;
    width: 100%;
  }
}
.weui-flex {
  margin-top: 8px;
  width: 100%;
  float: right;
  .weui-flex__item {
    margin: 4px;
    padding: 4px;
    border: 1px solid lightblue;
    border-radius: 16px;
    text-align: center;
  }
}
</style>
