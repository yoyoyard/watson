<template>
  <div>
    <title-bar title="我的订单"/>
    <ApolloQuery
      :query="require('@/graphql/page/Orders.gql')"
      :variables="{
        order:[{name:'insertedAt',order:'SPECIAL'}],
        oFilter:filter
      }"
      fetchPolicy="cache-and-network"
    >
      <template slot-scope="{ result: { loading, error, data },query }">
        <div class="weui-tab">
          <div class="weui-navbar">
            <div
              :class="`weui-navbar__item ${isAllOrder ? 'weui-bar__item_on' : ''}`"
              @click="fetchByStatus('all',query)"
            >所有订单</div>
            <div
              :class="
            `weui-navbar__item ${isUnfinishOrder ? 'weui-bar__item_on' : ''}`
          "
              @click="fetchByStatus('unfinish',query)"
            >未完成的订单</div>
          </div>
          <div class="weui-tab__panel">
            <div class="weui-panel__hd">订单列表</div>
            <div class="weui-panel_access">
              <lading-error v-if="loading || error" :loading="loading" :error="error"/>
              <div v-else class="result apollo">
                <div class="empty-orders" v-if="data.currentUser.orders.length===0">
                  <span>暂无订单</span>
                </div>
                <router-link
                  v-for="o in data.currentUser.orders"
                  :key="o.id"
                  :to="{ name: 'order', params: { id: o.id } }"
                  class="weui-media-box weui-media-box_appmsg"
                >
                  <div class="weui-media-box__hd">
                    <img :src="o.good.avatar.url" class="weui-media-box__thumb">
                  </div>
                  <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">{{ o.good.name }}</h4>
                    <p class="weui-media-box__desc">{{ o.good.description }}</p>
                    <p class="weui-media-box__desc">{{ fetchDate(o.insertedAt) }}</p>
                    <div class="weui-media-box__desc weui-flex" v-if="o.status ==='finished'">
                      <div class="weui-flex__item">
                        <div class="placeholder">查看物流</div>
                      </div>
                      <div class="weui-flex__item">
                        <div class="placeholder">评价</div>
                      </div>
                      <div class="weui-flex__item">
                        <div class="placeholder">申请开票</div>
                      </div>
                    </div>
                    <div
                      class="weui-media-box__desc weui-flex"
                      style="width:66%;text-align:left;"
                      v-else-if="o.status ==='created'"
                    >
                      <div class="weui-flex__item">
                        <div class="placeholder">付款</div>
                      </div>
                      <div class="weui-flex__item">
                        <div class="placeholder">咨询</div>
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </template>
    </ApolloQuery>
    <navigator activeIndex="orders"/>
  </div>
</template>

<script>
import Navigator from "@/components/Navigator";
import TitleBar from "@/components/TitleBar";
import ladingError from "@/components/loadingError";

export default {
  name: "orders-index",

  components: {
    TitleBar,
    Navigator,
    ladingError
  },

  data() {
    return {
      ordersStatus: "all",
      filter: {}
    };
  },

  computed: {
    isAllOrder: function() {
      return this.ordersStatus === "all";
    },

    isUnfinishOrder: function() {
      return this.ordersStatus === "unfinish";
    }
  },

  methods: {
    fetchDate(value) {
      return value.split("T")[0];
    },

    fetchByStatus(status_text, query) {
      this.ordersStatus = status_text;
      if (this.ordersStatus === "all") {
        this.filter = {};
      } else if (this.ordersStatus === "unfinish") {
        this.filter = {
          status: JSON.stringify({ cond: "eq", value: "2" })
        };
      } else {
        this.filter = {};
      }
      query.refetch();
    }
  }
};
</script>

<style lang="scss" scoped>
.weui-tab {
  margin-bottom: 50px;
  margin-top: 50px;
  .weui-navbar {
    position: fixed;
    top: 50px;
    width: 100%;
  }
}
.weui-flex {
  margin-top: 8px;
  width: 100%;
  float: right;
  .weui-flex__item {
    margin: 4px;
    padding: 4px;
    border: 1px solid lightblue;
    border-radius: 16px;
    text-align: center;
  }
}
.weui-media-box__desc {
  margin-top: 5px;
}
.empty-orders {
  position: absolute;
  left:43%;
  top:347%;
  span {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
