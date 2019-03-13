<template>
  <div>
    <div class="page weui-grids">
      <ApolloQuery
        :query="queries.fetchProductDetail"
        :variables="{ id: $route.params.id }"
      >
        <template slot-scope="{ result: { loading, error, data } }">
          <!-- Loading -->
          <div v-if="loading" class="loading apollo">Loading...</div>

          <!-- Error -->
          <div v-else-if="error" class="error apollo">An error occured</div>

          <!-- Result -->
          <div v-else-if="data" class="result apollo">
            <div>{{ data.good.avatar }}</div>
            <table>
              <tbody>
                <tr>
                  <td>name</td>
                  <td>{{ data.good.name }}</td>
                </tr>
                <tr>
                  <td>description</td>
                  <td>{{ data.good.description }}</td>
                </tr>
                <tr>
                  <td>number</td>
                  <td>{{ data.good.price }}</td>
                </tr>
                <tr>
                  <td>amount</td>
                  <td>{{ data.good.updatedAt }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- No result -->
          <div v-else class="no-result apollo">No result :(</div>
        </template>
      </ApolloQuery>
    </div>
  </div>
</template>

<script>
import { fetchProductDetail } from "@/graphql/page/products/productDetail.gql";
export default {
  props: {
    msg: String
  },

  mounted() {
    console.log(this.$route.params);
    this.id = this.$route.params.id;
  },

  data() {
    return {
      queries: {
        fetchProductDetail: fetchProductDetail
      },
      id: ""
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/base.scss";
</style>
