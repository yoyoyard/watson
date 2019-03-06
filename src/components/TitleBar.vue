<template>
  <el-header class="title-bar">
    {{ title_name }}
  </el-header>
</template>
<script>
export default {
  props: {
    title_name: String
  }
};
</script>

<style scoped>
/* .title-bar {
  position: absolute;
  top: 0;
  margin: 0;
} */
</style>
