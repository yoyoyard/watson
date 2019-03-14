<template>
  <div>
    <title-bar title="我的" />
    <div class="page">
      <div class="account">
        <img src="@/assets/logo.png" class="avatar" />
        <h5 class="page__title">个人中心</h5>
      </div>
      <div v-if="isLogin()">
        <ApolloQuery
          :query="require('@/graphql/page/MyPage.gql')"
          fetchPolicy="cache-and-network"
        >
          <template slot-scope="{ result: { loading, error, data } }">
            <div v-if="loading" class="loading apollo">Loading...</div>
            <div v-else-if="error" class="error apollo">An error occured</div>
            <div v-else-if="data" class="result apollo">
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
                    </div>
                  </div>
                </div>
              </div>
              <a
                class="weui-cell weui-cell_access"
                href="javascript:void(0);"
                @click="signOut()"
              >
                <div class="weui-cell__bd weui-cell_primary">
                  <p class="weui-btn weui-btn_warn">退出登录</p>
                </div>
              </a>
            </div>
            <div v-else class="no-result apollo">No result :(</div>
          </template>
        </ApolloQuery>
      </div>
      <div v-else>
        请先登陆
        <a
          class="weui-cell weui-cell_access"
          href="javascript:void(0);"
          @click="toSignIn()"
        >
          <div class="weui-cell__bd weui-cell_primary">
            <p class="weui-btn weui-btn_warn">登 录</p>
          </div>
        </a>
        <a class="weui-cell weui-cell_access" href="javascript:void(0);">
          <div class="weui-cell__bd weui-cell_primary">
            <p class="weui-btn weui-btn_warn">注 册</p>
          </div>
        </a>
      </div>
    </div>
    <navigator activeIndex="mypage" />
  </div>
</template>

<script>
import Navigator from "@/components/Navigator";
import TitleBar from "@/components/TitleBar";
import { isLogin, onLogout } from "@/vue-apollo";

export default {
  components: {
    TitleBar,
    Navigator
  },

  data() {
    return {};
  },

  computed: {},

  methods: {
    isLogin,
    onLogout,

    signOut: function() {
      onLogout(this.$apollo.provider.defaultClient);
      console.log(isLogin());
      this.$router.push({ name: "home" });
    },
    toSignIn: function() {
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/base.scss";

.account {
  text-align: center;
  margin: 16px;
  .avatar {
    max-width: 40%;
    max-width: 30%;
  }
}
</style>
