<template>
  <div>
    <title-bar title="个人信息" :back="'back'"/>
    <ApolloQuery
      :query="require('@/graphql/UserMessage.gql')"
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
            <div class="message-cell" style="border-top:1px solid #eee;">
                <span>头像</span>
                <img :src="data.currentUser.avatar.url" height="66" width="66" :alt="data.currentUser.name">
            </div>
            <div class="message-cell">
                <span>昵称</span>
                <span>{{data.currentUser.name}}</span>
            </div>
            <div class="message-cell">
                <span>UID</span>
                <span>{{data.currentUser.id}}</span>
            </div>
            <div class="message-cell">
                <span>注册时间</span>
                <span>{{data.currentUser.insertedAt | dateFilter}}</span>
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
  .message-cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:10px 20px;
    background-color: #fdfdfd;
    border-bottom: 1px solid #eee;
    img {
      border-radius: 50%;
    }
  }
}
</style>
