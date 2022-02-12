<template>
  <div id="app">
    <Header />
    <div class="container" />
    <router-view />
  </div>
</template>

<script>
import Header from "./views/header.vue";
export default {
  name: "app",
  components: {
    Header,
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  height: 65px;
}
</style>
