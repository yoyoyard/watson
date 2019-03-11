<template>
  <div class="container">
    <title-bar title="WATSON" />
    <ApolloMutation
      :mutation="require('@/graphql/createAuthUser.gql')"
      :variables="{
        input: {
          cellphone: cellphone,
          password: password
        }
      }"
      class="form"
      @done="handleDone"
    >
      <template slot-scope="{ mutate }">
        <div class="page">
          <div class="weui-cells">
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <input
                  class="weui-input"
                  v-model="cellphone"
                  type="text"
                  placeholder="电话号码"
                />
              </div>
            </div>
          </div>
          <div class="weui-cells">
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <input
                  class="weui-input"
                  v-model="password"
                  type="text"
                  placeholder="密码"
                />
              </div>
            </div>
          </div>
          <div class="login">
            <button @click="mutate()" class="weui-btn weui-btn_plain-primary">
              登录
            </button>
          </div>
        </div>
      </template>
    </ApolloMutation>
  </div>
</template>
<script>
import TitleBar from "@/components/TitleBar";
import { onLogin } from "@/vue-apollo";

export default {
  components: {
    TitleBar
  },
  data() {
    return {
      cellphone: "",
      password: ""
    };
  },
  methods: {
    handleDone(result) {
      const { token } = result.data.CreateAuthUser;
      onLogin(this.$apollo.provider.defaultClient, `Bearer ${token}`);
      this.$router.push("/");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/base.scss";
.container {
  height: calc(100vh - 50px);
  background-image: url("~@/assets/images/bg.jpg");
  background-repeat: no-repeat;
}
.page {
  display: flex;
  height: calc(100vh - 50px);
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.logo {
  width: 60px;
}
.login {
  margin: 20px 0;
  width: 60%;
}
.weui-btn_plain-primary {
  border-color: $main-color;
  color: $main-color;
}
</style>
