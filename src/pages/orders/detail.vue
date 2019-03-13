<template>
  <div>
    <div class="page weui-grids">
      <input type="text" v-model="oid" />
      <div>{{ fetchOd }}</div>
      <ApolloQuery
        :query="queries.fetchOrderDetail"
        :variables="{ id: $route.params.id }"
        fetchPolicy="network-only"
        :debounce="5000"
      >
        <template slot-scope="{ result: { loading, error, data } }">
          <!-- Loading -->
          <div v-if="loading" class="loading apollo">Loading...</div>

          <!-- Error -->
          <div v-else-if="error" class="error apollo">
            tag An error occured
          </div>

          <!-- Result -->
          <div v-else-if="data" class="result apollo">
            <!--             <table>
              <tbody>
                <tr>
                  <td>name</td>
                </tr>
                <tr>
                  <td>description</td>
                </tr>
                <tr>
                  <td>number</td>
                  <td>{{ data.order.amount }}</td>
                </tr>
                <tr>
                  <td>amount</td>
                  <td>{{ data.order.number }}</td>
                </tr>
              </tbody>
            </table> -->
          </div>
          <!-- No result -->
          <div v-else class="no-result apollo">No result :(</div>
        </template>
      </ApolloQuery>
    </div>
  </div>
</template>

<script>
import { fetchOrderDetail } from "@/graphql/page/orders/orderDetail.gql";
import gql from "graphql-tag";

export default {
  apollo: {
    fetchOd: gql`
        query fetchOrderDetail($id: ID!) {
          order(id: $id) {
            id
            good {
              name
              description
            }
            addressId
            number
            amount
            address {
              detail
            }
          }
        }
      `,
      variables() {
        return { id: this.oid };
      }
    }
  },

  props: {
    msg: String
  },

  mounted() {
    console.log(this.$route.params);
  },

  data() {
    return {
      queries: {
        fetchOrderDetail: fetchOrderDetail
      },
      oid: this.$route.params.id,
      fetchOd: ""
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/base.scss";
</style>
