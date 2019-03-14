<template>
  <div>
    <div class="page weui-grids">
      <ApolloQuery
        :query="queries.fetchOrderDetail"
        :variables="{ id: $route.params.id }"
        fetchPolicy="network-only"
      >
        <template slot-scope="{ result: { loading, error, data } }">
          <div v-if="loading" class="loading apollo">Loading...</div>
          <div v-else-if="error" class="error apollo">
            tag An error occured
          </div>
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
          <div v-else class="no-result apollo">No result :(</div>
        </template>
      </ApolloQuery>
    </div>
  </div>
</template>

<script>
import { fetchOrderDetail } from "@/graphql/page/orders/orderDetail.gql";

export default {
  props: {
    msg: String
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
      fetchOd: "",
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
