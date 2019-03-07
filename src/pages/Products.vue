<template>
  <div>
    <title-bar title="基因检测" />
    <el-card :body-style="{ padding: '0px' }" v-for="(o, index) in 5" :key="o">
      <div style="padding: 14px;">
        <div class="item">儿童关爱 基础套餐{{ index }}</div>
        <el-button class="order_btn">购买</el-button>
        <div class="item small-text">儿童关爱天赋2项</div>
        <div class="img">
          <img src="../assets/logo.png" class="image" />
        </div>
        <div class="item time">2019.03.03</div>
      </div>
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
      activeIndex: "products"
    };
  }
};
</script>

<style scoped>
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

.image {
  width: 15%;
  margin-left: auto;
  margin-right: auto;
  display: block;
}
.fix-nav {
  height: 60px;
}
</style>
