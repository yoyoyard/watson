<template>
  <div class="home-page">
    <title-bar title_name="首页" />
    <el-row>
      <div class="row bxslider-box">
        <div class="block">
          <el-carousel trigger="click" height="150px">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="row button-box">
        <el-button> 听书 </el-button>
        <el-button> 电子书 </el-button>
        <el-button> 商城 </el-button>
        <el-button> 专题 </el-button>
      </div>
      <div class="row introduction-box">
        <div class="row introduction-title">关于我们</div>
        <div class="row introduction-content">
          <el-col
            :span="8"
            v-for="(o, index) in 2"
            :key="o"
            :offset="index > 0 ? 2 : 0"
          >
            <el-card :body-style="{ padding: '0px' }">
              <img src="../assets/logo.png" class="image" />
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time">2019.2.2</time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </div>
      </div>
    </el-row>
    <navigator :activeIndex="activeIndex" />
  </div>
</template>

<script>
import Navigator from "../components/Navigator";
import TitleBar from "../components/TitleBar";

export default {
  name: "Home",

  components: {
    TitleBar,
    Navigator
  },
  data() {
    return {
      activeIndex: "home"
    };
  },
  mounted: function() {}
};
</script>

<style lang="css" scoped>
.home-page {
  margin: 0;
}
.content {
  width: 100%;
  height: 100%;
  margin: 0;
}
.row {
  width: 100%;
  margin: 5% 0;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>
