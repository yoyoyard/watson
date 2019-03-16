<template>
  <div>
    <title-bar title="添加新地址" back="back" />
    <div class="page weui-grids">
      <ApolloQuery :query="queries.fetchUserAddresses" @result="baseInfoDone">
        <template slot-scope="{ result: { loading, error, data } }">
          <lading-error
            v-if="loading || error"
            :loading="loading"
            :error="error"
          />
          <div v-else-if="data" class="data apollo">
            <table>
              <tbody>
                <tr
                  v-for="address in data.currentUser.addresses"
                  :key="address.id"
                >
                  <td>{{ address.name }}</td>
                  <td>{{ address.detail }}</td>
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
import { fetchUserAddresses } from "@/graphql/page/fetchUserAddresses.gql";
import TitleBar from "@/components/TitleBar";
import ladingError from "@/components/loadingError";

export default {
  components: {
    TitleBar,
    ladingError
  },

  mounted() {},

  data() {
    return {
      showDistpicker: false,
      queries: {
        fetchUserAddresses: fetchUserAddresses
      },
      goodNumber: 1,
      addresses: [],
      selectedAddressId: "",
      selectedAddressDetail: "请选择地址",
      province: "湖北省",
      city: "武汉市",
      area: ""
    };
  },

  watch: {
    selectedAddressDetail: function(newVal) {
      console.log(newVal);
    }
  },

  computed: {
    hasAddresses: function() {
      return this.addresses.length !== 0;
    }
  },

  methods: {
    baseInfoDone: function(result) {
      this.addresses = result.data.currentUser.addresses;
    },

    showNewAddPicker: function() {
      this.showDistpicker = true;
    },

    distpickerConfirm: function(data) {
      this.province = data[0].label;
      this.city = data.length >= 2 ? data[1].label : "";
      this.area = data.length == 3 ? data[2].label : "";
      this.showDistpicker = false;
      console.log(this.province + this.city + this.area);
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/styles/base.scss";
</style>
