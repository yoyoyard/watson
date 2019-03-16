<template>
  <div>
    <title-bar title="我的订单" />
    <div class="weui-tab">
      <div class="weui-navbar">
        <div
          :class="`weui-navbar__item ${isAllOrder ? 'weui-bar__item_on' : ''}`"
          @click="fetchByStatus('all')"
        >
          所有订单
        </div>
        <div
          :class="
            `weui-navbar__item ${isUnfinishOrder ? 'weui-bar__item_on' : ''}`
          "
          @click="fetchByStatus('unfinish')"
        >
          未完成的订单
        </div>
      </div>
      <div class="weui-tab__panel">
        <div class="weui-panel__hd">订单列表</div>
        <div class="weui-panel_access">
          <ApolloQuery
            :query="require('@/graphql/page/Orders.gql')"
            :variables="ofilter_status_value"
          >
            <template slot-scope="{ result: { loading, error, data } }">
              <div v-if="loading" class="loading apollo">Loading...</div>
              <div v-else-if="error" class="error apollo">
                An error occured
              </div>
              <div v-else-if="data" class="result apollo">
                <router-link
                  v-for="o in data.currentUser.orders"
                  :key="o.id"
                  :to="{ name: 'order', params: { id: o.id } }"
                  class="weui-media-box weui-media-box_appmsg"
                >
                  <div class="weui-media-box__hd">
                    <img
                      src="@/assets/logo.png"
                      class="weui-media-box__thumb"
                    />
                  </div>
                  <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">
                      order {{ o.id }} : {{ o.good.name }}
                    </h4>
                    <p class="weui-media-box__desc">
                      {{ o.good.description }}
                    </p>
                    <div class="weui-media-box__desc weui-flex">
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
                  </div>
                </router-link>
              </div>
              <div v-else class="no-result apollo">No result :(</div>
            </template>
          </ApolloQuery>
        </div>
      </div>
    </div>
    <navigator activeIndex="orders" />
  </div>
</template>

<script>
import Navigator from "@/components/Navigator";
import TitleBar from "@/components/TitleBar";

export default {
  name: "HelloWorld",

  components: {
    TitleBar,
    Navigator
  },

  data() {
    return {
      ordersStatus: "all"
    };
  },

  computed: {
    isAllOrder: function() {
      return this.ordersStatus === "all";
    },

    isUnfinishOrder: function() {
      return this.ordersStatus === "unfinish";
    },

    ofilter_status_value: function() {
      if (this.isAllOrder) {
        return {};
      } else if (this.isUnfinishOrder) {
        return {
          oFilter: {
            status: `{"cond": "eq", "value": "pre_pay" }`
          }
        };
      } else return {};
    }
  },

  mounted() {
    console.log("order page");
  },

  methods: {
    bug() {
      debugger;
    },

    fetchByStatus(status_text) {
      this.ordersStatus = status_text;
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
</style>
