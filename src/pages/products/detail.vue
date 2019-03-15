<template>
  <div>
    <title-bar title="基因检测产品" back="/products" />
    <div class="page weui-grids">
      <ApolloQuery
        :query="queries.fetchProductDetail"
        :variables="{ id: $route.params.id }"
      >
        <template slot-scope="{ result: { loading, error, data } }">
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
            <div>
              <a
                class="weui-cell weui-cell_access"
                href="javascript:void(0);"
                @click="toShopping()"
              >
                <div class="weui-cell__bd weui-cell_primary">
                  <p class="weui-btn weui-btn_warn">购 买</p>
                </div>
              </a>
            </div>
          </div>
          <div v-else class="no-result apollo">No result :</div>
        </template>
      </ApolloQuery>
    </div>
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
</style>
