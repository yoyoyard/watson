<template>
  <div>
    <title-bar title="我的" />
    <ApolloQuery :query="require('@/graphql/PageMyPage.gql')">
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <div class="page">
            <div class="account">
              <img src="@/assets/logo.png" class="avatar" />
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
                  </div>
                </div>
              </div>
            </div>
            <a class="weui-cell weui-cell_access" href="javascript:;">
              <div class="weui-cell__bd weui-cell_primary">
                <p class="weui-btn weui-btn_warn">退出登录</p>
              </div>
            </a>
          </div>
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
    <navigator activeIndex="mypage" />
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
  props: {
    msg: String
  },
  data() {
    return {};
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
