<template>
  <div>
    <ApolloQuery
      :query="queries.fetchProductDetail"
      :variables="{ id: $route.params.id }"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <title-bar title="基因检测产品" back="/products" />
        <div class="page weui-grids">
          <div v-if="loading" class="loading apollo">Loading...</div>
          <div v-else-if="error" class="error apollo">An error occured</div>
          <div v-else-if="data" class="result apollo">
            <div><img :src="data.good.avatar" class="avatar" /></div>
            <table>
              <tbody>
                <tr>
                  <td>产品名</td>
                  <td>{{ data.good.name }}</td>
                </tr>
                <tr>
                  <td>产品介绍</td>
                  <td>{{ data.good.description }}</td>
                </tr>
                <tr>
                  <td>价格</td>
                  <td>{{ data.good.price }}</td>
                </tr>
                <tr>
                  <td>上架时间</td>
                  <td>{{ data.good.updatedAt }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="no-result apollo">No result :</div>
        </div>
        <div class="weui-tabbar">
          <div class="weui-tabbar__left">
            <img src="@/assets/images/ask.png" class="weui-tabbar__icon" />
            <p class="weui-tabbar__label">
              咨询
            </p>
          </div>
          <div class="weui-tabbar__item">
            <div class="weui-cell__bd weui-cell_primary" @click="toShopping">
              <p class="buy-button">立即购买</p>
            </div>
          </div>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import { fetchProductDetail } from "@/graphql/page/products/productDetail.gql";
import TitleBar from "@/components/TitleBar";

export default {
  props: {
    msg: String
  },

  components: {
    TitleBar
  },

  mounted() {
    this.id = this.$route.params.id;
  },

  data() {
    return {
      queries: {
        fetchProductDetail: fetchProductDetail
      },
      id: ""
    };
  },

  methods: {
    toShopping: function() {
      this.$router.push({ name: "shopping", query: { goodId: this.id } });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/base.scss";
.avatar {
  width: 100%;
}
.weui-tabbar__left {
  display: block;
  -webkit-box-flex: 0.5;
  -webkit-flex: 0.5;
  flex: 0.5;
  padding: 5px 0 0;
  font-size: 0;
  color: #999;
  text-align: center;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.buy-button {
  background: lightsalmon;
  padding: 6px 12px;
  font-size: 18px;
  margin-right: 16px;
  border-radius: 20px;
  color: white;
}
</style>
