<template>
  <div>
    <title-bar title="添加新地址" back="back" />
    <div class="page weui-grids">
      <ApolloMutation
        :mutation="queries.createAddress"
        :variables="{
          info: {
            name: name,
            userId: currentUser.id,
            cellphone: cellphone,
            province: province,
            city: city,
            distinct: distinct,
            detail: detail
          }
        }"
        @done="createAddressCallback"
      >
        <template slot-scope="{ mutate, loading, error }">
          <div class="weui-cells weui-cells_form">
            <weui-distpciker
              v-if="showDistpicker"
              :province="province"
              :city="city"
              :area="distinct"
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
                  :placeholder="`${province}-${city}-${distinct}`"
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
                  v-model="detail"
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
                  v-model="name"
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
                  v-model="cellphone"
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
import { createAddress } from "@/graphql/page/address/createAddress.gql";
import TitleBar from "@/components/TitleBar";
import loadingError from "@/components/loadingError";
import gql from "graphql-tag";
import WeuiDistpciker from "weui-distpicker";

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
    `
  },
  mounted() {
    console.log(this.$apolloData.data.currentUser);
  },

  data() {
    return {
      currentUser: "",
      showDistpicker: false,
      queries: {
        createAddress: createAddress
      },
      name: "",
      cellphone: "",
      province: "",
      city: "",
      distinct: "",
      detail: "",
      callbackErrors: []
    };
  },

  methods: {
    createAddressCallback: function(result) {
      if (result.data.createAddress.address === null) {
        console.log(result.data.createAddress.errors);
        this.callbackErrors = result.data.createAddress.errors;
      } else {
        console.log(result);
        this.$router.replace({ name: "mypage-addresses" });
      }
    },

    showNewAddPicker: function() {
      this.showDistpicker = true;
    },

    distpickerConfirm: function(data) {
      this.province = data[0].label;
      this.city = data.length >= 2 ? data[1].label : "";
      this.distinct = data.length == 3 ? data[2].label : "";
      this.showDistpicker = false;
      console.log(this.province + this.city + this.distinct);
    },

    distpickerCancel: function() {
      this.showDistpicker = false;
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/styles/base.scss";
</style>
