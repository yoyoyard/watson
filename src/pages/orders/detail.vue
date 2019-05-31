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
                    <span class="weui-form-preview__value">{{ data.order.id }}</span>
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
                <a
                  class="weui-btn weui-btn_block weui-btn_primary"
                  style="width:80%;margin-top:30px;"
                  href="javascript:"
                >付款</a>
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
    // console.log(this.$route.params);
  },

  data() {
    return {
      oid: "",
      queries: {
        fetchOrderDetail: fetchOrderDetail
      }
    };
  },
  methdos: {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/base.scss";
</style>
