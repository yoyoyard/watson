<template>
  <div>
    <title-bar title="修改地址" back="back" />
    <div class="page weui-grids">
      <ApolloMutation
        :mutation="queries.updateAddress"
        :variables="{
          id: addressId,
          info: {
            userId: currentUser.id,
            name: address.name,
            cellphone: address.cellphone,
            province: address.province,
            city: address.city,
            distinct: address.distinct,
            detail: address.detail
          }
        }"
        @done="updateAddressCallback"
      >
        <template slot-scope="{ mutate, loading, error }">
          <div class="weui-cells weui-cells_form">
            <weui-distpciker
              v-if="showDistpicker"
              :province="address.province"
              :city="address.city"
              :area="address.distinct"
              @confirm="distpickerConfirm"
              @cancel="distpickerCancel"
            >
            </weui-distpciker>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label">地区</label>
              </div>
              <div class="weui-cell__bd" @click="showNewAddPicker">
                <input
                  class="weui-input"
                  type="text"
                  :placeholder="
                    `${address.province}-${address.city}-${address.distinct}`
                  "
                />
              </div>
            </div>
            <div class="weui-cell ">
              <div class="weui-cell__hd">
                <label class="weui-label">详细地址</label>
              </div>
              <div class="weui-cell__bd">
                <input
                  class="weui-input"
                  type="text"
                  placeholder=""
                  v-model="address.detail"
                />
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label">收货人</label>
              </div>
              <div class="weui-cell__bd">
                <input
                  class="weui-input"
                  type=""
                  v-model="address.name"
                  placeholder="收货人"
                />
              </div>
            </div>
            <div class="weui-cell ">
              <div class="weui-cell__hd">
                <label class="weui-label">手机号</label>
              </div>
              <div class="weui-cell__bd">
                <input
                  class="weui-input"
                  type="tel"
                  v-model="address.cellphone"
                  placeholder="请输入手机号"
                />
              </div>
            </div>
          </div>
          <div v-if="currentUser.id !== undefined">
            <div class="weui-btn-area">
              <button
                class="weui-btn weui-btn_primary"
                :disabled="loading"
                @click="mutate()"
              >
                确定
              </button>
              <button
                class="weui-btn weui-btn_warn"
                :disabled="loading"
                @click="deleteAddress"
              >
                删除
              </button>
            </div>
          </div>
          <div v-for="err in callbackErrors" :key="err.key">
            {{ `${err.key}-${err.message}` }}
          </div>
          <loading-error v-if="error" :error="error" />
        </template>
      </ApolloMutation>
    </div>
  </div>
</template>
<script>
import { updateAddress } from "@/graphql/page/address/updateAddress.gql";
import TitleBar from "@/components/TitleBar";
import loadingError from "@/components/loadingError";
import gql from "graphql-tag";
import WeuiDistpciker from "weui-distpicker";

const deleteAddressGql = gql`
  mutation deleteAddress($id: ID!) {
    deleteAddress(id: $id) {
      status
      message
    }
  }
`;

export default {
  components: {
    TitleBar,
    loadingError,
    WeuiDistpciker
  },

  apollo: {
    currentUser: gql`
      {
        currentUser {
          id
        }
      }
    `,
    address: {
      query() {
        return gql`
          query fetchInfo($addressId: ID!) {
            address(id: $addressId) {
              name
              cellphone
              province
              city
              distinct
              detail
            }
          }
        `;
      },
      variables() {
        return { addressId: this.addressId };
      },
      update: data => data.address
    }
  },
  mounted() {
    this.addressId = this.$route.params.id;
  },

  data() {
    return {
      currentUser: { id: 0 },
      showDistpicker: false,
      queries: {
        updateAddress: updateAddress
      },
      address: "",
      addressId: 0,
      deleteAddressStatus: "",
      callbackErrors: []
    };
  },

  methods: {
    bug() {
      debugger;
    },
    updateAddressCallback: function(result) {
      if (result.data.updateAddress.address === null) {
        this.callbackErrors = result.data.updateAddress.errors;
      } else {
        this.$router.push({ name: "mypage-addresses" });
      }
    },

    showNewAddPicker: function() {
      this.showDistpicker = true;
    },

    distpickerConfirm: function(data) {
      this.address.province = data[0].label;
      this.address.city = data.length >= 2 ? data[1].label : "";
      this.address.distinct = data.length == 3 ? data[2].label : "";
      this.showDistpicker = false;
    },

    distpickerCancel: function() {
      this.showDistpicker = false;
    },
    deleteAddress() {
      const that = this;
      that.$apollo
        .mutate({
          mutation: deleteAddressGql,
          variables: {
            id: that.addressId
          }
        })
        .then(function(result) {
          if (
            result.data.deleteAddress !== undefined &&
            result.data.deleteAddress.status === "success"
          ) {
            that.$router.push({ name: "mypage-addresses" });
          } else {
            that.callbackErrors = [
              {
                key: "失败",
                message: "网络繁忙，稍后再试。"
              }
            ];
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/styles/base.scss";
</style>
