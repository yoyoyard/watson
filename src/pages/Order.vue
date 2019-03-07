<template>
  <div>
    <title-bar title="我的订单" />
    <div>
      <div class="order-my-all">查看所有订单</div>
      <div class="order-my-mytext">我的订单</div>
      <div class="line"></div>
    </div>
    <el-row>
      <el-col :span="6">
        <img src="../assets/logo.png" class="order-thumb" />
        未支付
      </el-col>
      <el-col :span="6">
        <img src="../assets/logo.png" class="order-thumb" />
        待发货
      </el-col>
      <el-col :span="6">
        <img src="../assets/logo.png" class="order-thumb" />
        待收货
      </el-col>
      <el-col :span="6">
        <img src="../assets/logo.png" class="order-thumb" />
        售后
      </el-col>
    </el-row>

    <div class="order-my-mytext">最近订单</div>
    <el-card class="item-card" v-for="(o, index) in 4" :key="o">
      <el-row type="flex">
        <el-col :span="6" class="item-aside">
          <img src="../assets/logo.png" class="item-image" />
        </el-col>
        <el-col :span="18">
          <div class="item-status">正在出库</div>
          <div class="item-title">儿童关爱 基础套餐{{ index }}</div>
          <div class="item-infos">
            <div>订单号：1234567890</div>
            <div>数 量：3</div>
            <div>实 付：￥123</div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <div class="fix-nav"></div>
    <navigator :activeIndex="activeIndex" />
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

<style lang="css" scoped>
.line {
  border-bottom: 1px solid #969696;
}
.order-my{
  font-size: 1em;
}
.order-my-mytext{
  margin-top: 5%;
  text-align: left;
}
.order-my-all {
  font-size: 0.8em;
  color: #999;
  float: right;
}
.order-my-all::after {
  content: ">";
}
.order-thumb {
  width: 30%;
  margin-left: auto;
  margin-right: auto;
  padding: 10%;
  display: block;
}

.item-card{
  margin-bottom: 10px;
}
.item-aside{
  margin-right: 5%;
}
.item-status{
  float: right;
  font-size: 0.8em;
  color: #444;
}
.item-title {
  text-align: left;
  font-size: 0.8em;
}
.item-infos{
  text-align: left;
  font-size: 0.8em;
}


.item-image {
  width: 100%;
}
.fix-nav {
  height: 60px;
}
</style>
