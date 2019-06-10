<template>
  <div>
    <title-bar title="订单详情" back="back"/>
    <div class="page weui-grids">
      <ApolloQuery
        :query="queries.fetchOrderDetail"
        :variables="{ id: this.oid }"
        fetchPolicy="cache-and-network"
      >
        <template slot-scope="{ result: { loading, error, data } }">
          <lading-error v-if="loading || error" :loading="loading" :error="error"/>
          <div v-else-if="data" class="result apollo">
            <div class="weui-panel weui-panel_access">
              <router-link
                :to="'/products/'+data.order.good.id"
                class="weui-media-box weui-media-box_appmsg"
              >
                <div class="weui-media-box__hd">
                  <img class="weui-media-box__thumb" :src="data.order.good.avatar.url" alt>
                </div>
                <div class="weui-media-box__bd">
                  <h4 class="weui-media-box__title">{{ data.order.good.name }}</h4>
                  <p class="weui-media-box__desc">{{ data.order.good.description }}</p>
                </div>
              </router-link>

              <div class="weui-form-preview">
                <div class="weui-form-preview__bd">
                  <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">订单编号</label>
                    <span class="weui-form-preview__value">{{ data.order.uniqueNumber }}</span>
                  </div>
                  <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">创建时间</label>
                    <span class="weui-form-preview__value">{{ data.order.insertedAt | dateFilter }}</span>
                  </div>
                  <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">商品</label>
                    <span class="weui-form-preview__value">{{ data.order.good.name }}</span>
                  </div>
                  <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">购买数量</label>
                    <span class="weui-form-preview__value">{{ data.order.number }}</span>
                  </div>
                  <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">单价</label>
                    <span class="weui-form-preview__value">¥{{ data.order.good.price }}</span>
                  </div>
                  <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">收货地址</label>
                    <span class="weui-form-preview__value">{{ `${data.order.address.province}${data.order.address.city}${data.order.address.distinct}${data.order.address.detail}`}}</span>
                  </div>
                </div>
                <div class="weui-form-preview__hd">
                  <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">付款金额</label>
                    <em class="weui-form-preview__value">¥{{ data.order.amount }}</em>
                  </div>
                </div>
              </div>
              <div class="weui-panel__ft" v-if="data.order.status==='finished'">
                <a href="javascript:void(0);" class="weui-cell weui-cell_access weui-cell_link">
                  <div class="weui-cell__bd">查看详细物流信息</div>
                  <span class="weui-cell__ft"></span>
                </a>
              </div>
              <div class="weui-form-preview__ft" v-else-if="data.order.status==='created'">
                <div
                  class="weui-btn weui-btn_block weui-btn_primary"
                  style="width:80%;margin-top:30px;"
                  @click="goPay(data.order.good.name,data.order.payment,data.order.userId,data.order.id)"
                >付款</div>
              </div>
            </div>
          </div>
        </template>
      </ApolloQuery>
    </div>
  </div>
</template>

<script>
import { fetchOrderDetail } from "@/graphql/page/orders/orderDetail.gql";
import { payQuery } from "@/graphql/page/orders/payQuery.gql";
import { payMutate } from "@/graphql/page/orders/payMutate.gql";
import { createPayment } from "@/graphql/page/orders/createPayment.gql";
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

  created() {
    this.$apollo
      .query({
        fetchPolicy: "no-cache",
        variables: { url: window.location.href },
        query: payQuery,
        fetchResults: true
      })
      .then(result => {
        let config = Object.assign(
          { debug: false, jsApiList: ["chooseWXPay"] },
          result.data.JsapiParamsUser
        );
        delete config.url;
        config.appId = config.appid;
        delete config.appid;
        config.nonceStr = config.noncestr;
        delete config.noncestr;
        wx.config(config);
        wx.error(res => {
          console.log(res);
        });
      })
      .catch(error => {
        console.log(error);
      });
  },

  data() {
    return {
      oid: "",
      payQuery,
      payMutate,
      queries: {
        fetchOrderDetail: fetchOrderDetail
      }
    };
  },
  methods: {
    async goPay(name, payment, userId, orderId) {
      var uniqueNumber;
      if (!payment) {
        let result = await this.$apollo.mutate({
          fetchPolicy: "no-cache",
          fetchResults: true,
          variables: {
            input: { orderId, userId }
          },
          mutation: createPayment
        });
        uniqueNumber = result.data.createPayment.payment.uniqueNumber;
      } else {
        uniqueNumber = payment.uniqueNumber;
      }
      let paymentResult = await this.$apollo.mutate({
        fetchPolicy: "no-cache",
        fetchResults: true,
        variables: {
          input: { body: name, outTradeNo: uniqueNumber }
        },
        mutation: payMutate
      });
      let input = Object.assign(
        {
          successs: res => {
            this.$router.push({name:'orders-success'})
          },
          fail: res => {
            console.log(res);
          },
          cancel:res=>{
            console.log(res)
          }
        },
        paymentResult.data.wechatJsapiPayPayment
      );
      delete input.appId;
      wx.chooseWXPay(input);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/base.scss";
</style>
