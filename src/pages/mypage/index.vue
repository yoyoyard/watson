<template>
  <div>
    <title-bar title="我的" />
    <ApolloQuery
      :query="require('@/graphql/page/MyPage.gql')"
      fetchPolicy="cache-and-network"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <div class="page">
          <lading-error
            v-if="loading || error"
            :loading="loading"
            :error="error"
          />
          <div v-else-if="data" class="result apollo">
            <div class="account">
              <img
                :src="data.currentUser.avatar || require('@/assets/logo.png')"
                class="avatar"
              />
              <h5 class="page__title">个人中心</h5>
            </div>
            <div class="weui-panel">
              <div class="weui-panel__hd">{{ data.currentUser.name }}</div>
              <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_small-appmsg">
                  <div class="weui-cells">
                    <a class="weui-cell weui-cell_access" href="javascript:;">
                      <div class="weui-cell__bd weui-cell_primary">
                        <p>修改密码</p>
                      </div>
                      <span class="weui-cell__ft"></span>
                    </a>
                    <a class="weui-cell weui-cell_access" href="javascript:;">
                      <div class="weui-cell__bd weui-cell_primary">
                        <p>个人信息</p>
                      </div>
                      <span class="weui-cell__ft"></span>
                    </a>
                    <router-link
                      :to="{ name: 'mypage-addresses' }"
                      class="weui-cell weui-cell_access"
                    >
                      <div class="weui-cell__bd weui-cell_primary">
                        <p>我的地址</p>
                      </div>
                      <span class="weui-cell__ft"></span>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </ApolloQuery>
    <navigator activeIndex="mypage" />
  </div>
</template>

<script>
import Navigator from "@/components/Navigator";
import TitleBar from "@/components/TitleBar";
import ladingError from "@/components/loadingError";

export default {
  components: {
    TitleBar,
    Navigator,
    ladingError
  },

  data() {
    return {};
  },

  computed: {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/base.scss";
.page {
  margin-top: 80px;
}
.account {
  text-align: center;
  margin: 16px;
  .avatar {
    max-width: 40%;
    max-width: 30%;
  }
}
</style>
