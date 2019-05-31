<template>
  <div>
    <title-bar title="订单详情" back="back"/>
    <div class="page weui-grids">
      <div class="page preview">
        <div class="page__hd page-title">
          <h1 class="page__title">提交订单</h1>
          <p class="page__desc">以下是您选购的商品</p>
        </div>
        <div class="page__hd"></div>
        <div class="page__bd"></div>
        <div class="weui-form-preview">
          <div class="weui-form-preview__hd">
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">付款金额</label>
              <em class="weui-form-preview__value">¥{{ good.price * goodNumber }}</em>
            </div>
          </div>
          <div class="weui-form-preview__bd">
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">商品</label>
              <span class="weui-form-preview__value">{{ good.name }}</span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">商品描述</label>
              <span class="weui-form-preview__value">{{ good.description }}</span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">商品单价</label>
              <span class="weui-form-preview__value">{{ good.price }}</span>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">购买数量</label>
              <div class="number-box">
                <a href="javascript:;" class="weui-btn weui-btn_plain-default button-size" @click="()=>{if(goodNumber<=1){return}goodNumber--}">-</a>
                <span class="number-value">{{ goodNumber }}</span>
                <a href="javascript:;" class="weui-btn weui-btn_plain-default button-size" @click="goodNumber++">+</a>
              </div>
            </div>
          </div>
          <div class="weui-form-preview__ft"></div>
        </div>
      </div>
      <div class="weui-cells">
        <div class="weui-cell" @click="showPicker" v-if="hasAddresses">
          <div class="weui-cell__bd">
            <p>送货地址</p>
          </div>
          <div class="weui-cell__ft">{{ selectedAddressDetail }}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>添加送货地址</p>
          </div>
          <div class="weui-cell__ft">
            <a
              class="weui-form-preview__btn weui-form-preview__btn_primary"
              href="javascript:"
              @click="toCreateAddress"
            >新增地址</a>
          </div>
        </div>
      </div>
      <div class="button-sp-area">
        <div class="weui-form-preview__ft">
          <a
            class="weui-form-preview__btn weui-form-preview__btn_primary"
            href="javascript:"
            @click="submitOrder"
          >提交订单</a>
        </div>
      </div>
      <div v-for="err in callbackErrors" :key="err.key">{{ `${err.key}-${err.message}` }}</div>
    </div>
  </div>
</template>
<script>
import gql from "graphql-tag";
import { fetchShoppingBaseInfo } from "@/graphql/page/shopping/shopping.gql";
import { createOrder } from "@/graphql/page/orders/createOrder.gql";
import TitleBar from "@/components/TitleBar";
// import ladingError from "@/components/loadingError";

export default {
  components: {
    TitleBar
    // ladingError
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

  created() {
    this.fetchGood();
  },

  data() {
    return {
      currentUser: { id: 0 },
      showDistpicker: false,
      goodNumber: 1,
      good: {
        avatar: "",
        description: "",
        id: 0,
        name: "",
        price: 0
      },
      addresses: [],
      selectedAddressId: "",
      selectedAddressDetail: "请选择地址",
      callbackErrors: []
    };
  },

  computed: {
    hasAddresses: function() {
      return this.addresses.length !== 0;
    }
  },

  methods: {
    toCreateAddress() {
      this.$router.push({ name: "mypage-addresses-new" });
    },
    toMyOrder() {
      this.$router.push({ name: "orders" });
    },

    showPicker: function() {
      const that = this;
      const addPickerData = this.addresses.map(address => {
        return {
          address: address,
          label:
            address.province + address.city + address.name + address.cellphone,
          value: address.id
        };
      });

      const pickerOptions = {
        className: "custom-classname",
        defaultValue:
          that.addresses[0] === undefined ? [] : [that.addresses[0].id],
        onConfirm: function(result) {
          that.selectedAddressId = parseInt(result[0].value);
          that.selectedAddressDetail =
            result[0].address.name + "-" + result[0].address.cellphone;
        },
        id: "singleLinePicker"
      };
      weui.picker(addPickerData, pickerOptions);
    },

    fetchGood: function() {
      const that = this;
      that.$apollo
        .query({
          query: fetchShoppingBaseInfo,
          variables: {
            goodId: this.$route.query.goodId
          }
        })
        .then(function(result) {
          that.addresses = result.data.currentUser.addresses;
          that.currentUser.id = result.data.currentUser.id;
          that.good = result.data.good;
        })
        .catch(error => {
          console.error(error);
        });
    },

    submitOrder: function() {
      const that = this;
      that.$apollo
        .mutate({
          mutation: createOrder,
          variables: {
            input: {
              addressId: that.selectedAddressId,
              number: that.goodNumber,
              amount: that.good.price * that.goodNumber,
              goodId: that.good.id,
              userId: that.currentUser.id
            }
          }
        })
        .then(function(result) {
          if (result.data.createOrder.errors === null) {
            that.toMyOrder();
          } else {
            console.log(result);
            that.callbackErrors = result.data.createOrder.errors;
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
.page-title {
  margin-left: 10px;
  margin-bottom: 10px;
}
.number-box {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .button-size {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    width: 26px;
    height: 26px;
  }
  .number-value {
    display: block;
    margin: 0 8px;
    color:#000;
  }
}
</style>
