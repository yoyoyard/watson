<template>
  <div class="products">
    <title-bar title_name="基因检测" />
    <el-card :body-style="{ padding: '0px' }" v-for="(o, index) in 5" :key="o">
      <div style="padding: 14px;">
        <div class="item-title">儿童关爱 基础套餐{{ index }}</div>
        <div class="item-title small-text">儿童关爱天赋2项</div>
        <div>
          <img src="../assets/logo.png" class="image" />
        </div>
        <div class="bottom clearfix">
          <time class="time">2019.03.03</time>
          <el-button type="text" class="button">操作按钮</el-button>
        </div>
      </div>
    </el-card>
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
.item-title {
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
.button {
  padding: 0;
  float: right;
}
.image {
  width: 20%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
