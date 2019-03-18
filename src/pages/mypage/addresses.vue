<template>
  <div>
    <title-bar title="我的地址" back="back" />
    <div class="page weui-grids">
      <ApolloQuery :query="queries.fetchUserAddresses" @result="baseInfoDone">
        <template slot-scope="{ result: { loading, error, data } }">
          <lading-error
            v-if="loading || error"
            :loading="loading"
            :error="error"
          />
          <div v-else-if="data" class="data apollo">
            <div class="weui-panel weui-panel_access">
              <div class="weui-panel__hd">我的地址列表</div>
              <div class="weui-panel__bd">
                <div
                  class="weui-media-box weui-media-box_text"
                  v-for="address in data.currentUser.addresses"
                  :key="address.id"
                  :to="{ name: 'mypage-addresses-edit' }"
                >
                  <router-link :to="{ name: 'mypage-addresses-edit' }">
                    <h4 class="weui-media-box__title">{{ address.name }}</h4>
                    <p class="weui-media-box__desc">
                      {{
                        `${address.province}-${address.city}-${
                          address.distinct
                        }`
                      }}<br />
                      {{ address.detail }}
                    </p>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="weui-btn-area">
              <router-link
                class="weui-btn weui-btn_primary"
                :to="{ name: 'mypage-addresses-new' }"
                id="showTooltips"
                >新增地址
              </router-link>
            </div>
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
      queries: {
        fetchUserAddresses: fetchUserAddresses
      },
      addresses: []
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
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/styles/base.scss";
</style>
