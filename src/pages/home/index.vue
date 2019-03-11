<template>
  <div>
    <title-bar title="首页" />
    <div class="page article">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="@/assets/images/1.jpg" class="slider" />
          </div>
          <div class="swiper-slide">
            <img src="@/assets/images/2.jpg" class="slider" />
          </div>
          <div class="swiper-slide">
            <img src="@/assets/images/3.jpg" class="slider" />
          </div>
          <div class="swiper-slide">
            <img src="@/assets/images/4.jpg" class="slider" />
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <div class="weui-flex">
        <div class="weui-flex__item"><div class="placeholder">听书</div></div>
        <div class="weui-flex__item"><div class="placeholder">电子书</div></div>
        <div class="weui-flex__item"><div class="placeholder">商城</div></div>
        <div class="weui-flex__item"><div class="placeholder">专题</div></div>
      </div>
      <div class="weui-panel weui-panel_access">
        <div class="weui-panel__hd">关于我们</div>
        <div class="weui-panel__bd">
          <a
            href="javascript:void(0);"
            class="weui-media-box weui-media-box_appmsg"
          >
            <div class="weui-media-box__hd">
              <img src="@/assets/logo.png" class="weui-media-box__thumb" />
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">我们是谁</h4>
              <p class="weui-media-box__desc">
                致力于解决孩子成长问题，着手于健康方案
              </p>
            </div>
          </a>
          <a
            href="javascript:void(0);"
            class="weui-media-box weui-media-box_appmsg"
          >
            <div class="weui-media-box__hd">
              <img src="@/assets/logo.png" class="weui-media-box__thumb" />
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">我们提供什么</h4>
              <p class="weui-media-box__desc">
                基因检测
              </p>
            </div>
          </a>
          <a
            href="javascript:void(0);"
            class="weui-media-box weui-media-box_appmsg"
          >
            <div class="weui-media-box__hd">
              <img src="@/assets/logo.png" class="weui-media-box__thumb" />
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">为什么选择我们</h4>
              <p class="weui-media-box__desc">
                我们有专业的团队，资深的顾问和科学的方法。
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
    <navigator activeIndex="home" />
  </div>
</template>

<script>
import Navigator from "@/components/Navigator";
import TitleBar from "@/components/TitleBar";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

export default {
  name: "Home",

  components: {
    TitleBar,
    Navigator
  },

  mounted() {
    new Swiper(".swiper-container", {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000
      },
      pagination: {
        el: ".swiper-pagination"
      }
    });
  },

  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/base.scss";

.swiper-container {
  width: 100%;
  height: 90vw;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: darkgray;
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.slider {
  width: 100vw;
}
.weui-flex {
  margin: 16px;
  text-align: center;
}
.weui-flex__item {
  margin: 4px;
}
</style>
