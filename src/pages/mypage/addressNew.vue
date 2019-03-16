<template>
  <div>
    <title-bar title="添加新地址" back="back" />
    <div class="page weui-grids">
      <ApolloQuery
        :query="queries.fetchShoppingBaseInfo"
        :variables="{ goodId: this.$route.query.goodId }"
        @result="baseInfoDone"
      >
        <template slot-scope="{ result: { loading, error, data } }">
          <lading-error
            v-if="loading || error"
            :loading="loading"
            :error="error"
          />
          <div v-else-if="data && data.good.id !== null" class="data apollo">
            <div class="page preview">
              <div class="page__hd">
                <h1 class="page__title">提交订单</h1>
                <p class="page__desc">以下是您选购的商品</p>
              </div>
              <div class="page__hd"></div>
              <div class="page__bd"></div>
              <div class="weui-form-preview">
                <div class="weui-form-preview__hd">
                  <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">付款金额</label>
                    <em class="weui-form-preview__value"
                      >¥{{ data.good.price * goodNumber }}</em
                    >
                  </div>
                </div>
                <div class="weui-form-preview__bd">
                  <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">商品</label>
                    <span class="weui-form-preview__value">{{
                      data.good.name
                    }}</span>
                  </div>
                  <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">商品描述</label>
                    <span class="weui-form-preview__value">{{
                      data.good.description
                    }}</span>
                  </div>
                  <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">商品单价</label>
                    <span class="weui-form-preview__value">{{
                      data.good.price
                    }}</span>
                  </div>
                  <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">购买数量</label>
                    <span class="weui-form-preview__value">{{
                      goodNumber
                    }}</span>
                  </div>
                </div>
                <div class="weui-form-preview__ft"></div>
              </div>
            </div>
            <div class="weui-cells">
              <div v-if="hasAddresses" class="weui-cell" @click="showPicker">
                <div class="weui-cell__bd">
                  <p>送货地址</p>
                </div>
                <div class="weui-cell__ft">
                  {{ selectedAddressDetail }}
                </div>
              </div>
              <div v-else class="weui-cell" @click="showNewAddPicker">
                <div class="weui-cell__bd">
                  <p>添加送货地址</p>
                </div>
                <div class="weui-cell__ft">
                  <button>新增</button>
                </div>
              </div>
            </div>
            <div class="button-sp-area">
              <div class="weui-form-preview__ft">
                <a
                  class="weui-form-preview__btn weui-form-preview__btn_primary"
                  href="javascript:"
                  @click="submitOrder"
                  >操作</a
                >
              </div>
            </div>
          </div>
        </template>
      </ApolloQuery>
    </div>

  </div>
</template>
<script>
import { fetchShoppingBaseInfo } from "@/graphql/page/shopping/shopping.gql";
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
        fetchShoppingBaseInfo: fetchShoppingBaseInfo
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
    },


  }
};
</script>
<style lang="scss">
@import "@/assets/styles/base.scss";
</style>
