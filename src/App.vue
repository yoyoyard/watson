<template>
  <div id="app">
    <router-view :key="key" />
  </div>
</template>

<script>
import { createWechatAuthUser } from "@/graphql/createWechatAuthUser.gql";
import { onLogin } from "@/vue-apollo.js";

const AUTH_TOKEN = "apollo-token";
const PRE_LOGIN_LINK = "link-before-login";
const WECHAT_APP_ID = "wxb7f2e1e70c4556bd";

const parseQueryString = queryString => {
  var params = {},
    queries,
    temp,
    i,
    l;
  if (queryString === "") return params;

  queries = queryString.split("&");

  for (i = 0, l = queries.length; i < l; i++) {
    temp = queries[i].split("=");
    params[temp[0]] = temp[1];
  }
  return params;
};

export default {
  name: "app",
  computed:{
	    key(){
	        return this.$route.path + Math.random();
	    }
	},

  async beforeCreate() {
    // when have token just bypass
    const token = localStorage.getItem(AUTH_TOKEN);
    if (token) return true;

    // when have code we need to do wechat auth
    const query = parseQueryString(window.location.search.replace("?", ""));
    console.log(query);
    const code = query["code"];
    if (code) {
      const client = this.$apolloProvider.defaultClient;
      const authResult = await client.mutate({
        fetchPolicy: "no-cache",
        mutation: createWechatAuthUser,
        variables: {
          input: { code: code }
        }
      });

      const result = authResult.data.createWechatAuthUser;

      if (!result.error) {
        console.log(result.token);
        onLogin(client, result.token);
        localStorage.removeItem(PRE_LOGIN_LINK);
        return true;
      }
    }

    // when we didn't get code and token, we need to do redirect
    const url = location.href;
    const savedUrl = localStorage.getItem(PRE_LOGIN_LINK);
    const redirectUri = encodeURIComponent(savedUrl || url);
    localStorage.setItem(PRE_LOGIN_LINK, savedUrl || url);
    const authPageBaseUri =
      "https://open.weixin.qq.com/connect/oauth2/authorize";
    const authParams = `?appid=${WECHAT_APP_ID}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=watson#wechat_redirect`;
    window.location.href = authPageBaseUri + authParams;
  }
};
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body {
  margin: 0;
}
</style>
