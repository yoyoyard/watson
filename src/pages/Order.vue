<template>
  <div class="order">
    <title-bar title_name="订单" />
    <el-main>
      Main
    </el-main>
    <navigator :activeIndex="activeIndex" />
  </div>
</template>

<script>
import Navigator from "../components/Navigator";
import TitleBar from "../components/TitleBar";
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
    return {
      activeIndex: "order"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
