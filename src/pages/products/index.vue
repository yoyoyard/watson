<template>
  <div>
    <title-bar title="基因检测" />
    <div class="page weui-grids">
      <div class="weui-panel weui-panel_access">
        <div class="weui-panel__bd">
          <ApolloQuery :query="require('@/graphql/page/Products.gql')">
            <template slot-scope="{ result: { loading, error, data } }">
              <!-- Loading -->
              <div v-if="loading" class="loading apollo">Loading@.</div>

              <!-- Error -->
              <div v-else-if="error" class="error apollo">An error occured</div>

              <!-- Result -->
              <div v-else-if="data" class="result apollo">
                <router-link
                  :to="{ name: 'product', params: { id: good.id } }"
                  v-for="good in data.goods"
                  :key="good.id"
                  class="weui-media-box weui-media-box_appmsg"
                >
                  <div class="weui-media-box__hd">
                    <img :src="good.avatar" class="weui-media-box__thumb" />
                  </div>
                  <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">
                      {{ good.name }}
                    </h4>
                    <p class="weui-media-box__desc">
                      {{ good.description }}
                    </p>
                    <p class="weui-media-box__desc price">{{ good.price }}</p>
                  </div>
                </router-link>
              </div>

              <!-- No result -->
              <div v-else class="no-result apollo">No result :</div>
            </template>
          </ApolloQuery>
        </div>
      </div>
    </div>
    <div class="fix-nav"></div>
    <navigator activeIndex="products" />
  </div>
</template>

<script>
import Navigator from "@/components/Navigator";
import TitleBar from "@/components/TitleBar";

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
