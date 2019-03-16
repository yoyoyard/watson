<template>
  <div>
    <title-bar title="基因检测" />
    <div class="page weui-grids">
      <div class="weui-panel weui-panel_access">
        <div class="weui-panel__bd">
          <ApolloQuery :query="require('@/graphql/page/Products.gql')">
            <template slot-scope="{ result: { loading, error, data } }">
              <lading-error
                v-if="loading || error"
                :loading="loading"
                :error="error"
              />
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
import ladingError from "@/components/loadingError";

export default {
  name: "HelloWorld",

  components: {
    TitleBar,
    Navigator,
    ladingError
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
