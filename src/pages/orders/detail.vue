<template>
  <div>
    <title-bar title="订单详情" back="/order" />
    <div class="page weui-grids">
      <ApolloQuery
        :query="queries.fetchOrderDetail"
        :variables="{ id: this.oid }"
        fetchPolicy="cache-and-network"
      >
        <template slot-scope="{ result: { loading, error, data } }">
          <lading-error
            v-if="loading || error"
            :loading="loading"
            :error="error"
          />
          <div v-else-if="data" class="result apollo">
            <table>
              <tbody>
                <tr>
                  <td>name</td>
                  <td>{{ data.order.good.name }}</td>
                </tr>
                <tr>
                  <td>description</td>
                  <td>{{ data.order.good.description }}</td>
                </tr>
                <tr>
                  <td>number</td>
                  <td>{{ data.order.amount }}</td>
                </tr>
                <tr>
                  <td>amount</td>
                  <td>{{ data.order.number }}</td>
                </tr>
                <tr>
                  <td>address</td>
                  <td>{{ data.order.address.detail }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </ApolloQuery>
    </div>
  </div>
</template>

<script>
import { fetchOrderDetail } from "@/graphql/page/orders/orderDetail.gql";
import TitleBar from "@/components/TitleBar";
import ladingError from "@/components/loadingError";

export default {
  components: {
    TitleBar,
    ladingError
  },

  beforeMount() {
    this.oid = this.$route.params.id;
  },

  mounted() {
    console.log(this.$route.params);
  },

  data() {
    return {
      oid: "",
      queries: {
        fetchOrderDetail: fetchOrderDetail
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/base.scss";
</style>
