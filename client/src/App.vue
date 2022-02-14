<template>
  <div id="app">
    <Header />
    <div class="top" />
    <div class="container">
      <router-view />
    </div>
    <div class="bottom" />
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
.top {
  height: 65px;
}
.container {
  width: 100%;
  text-align: center;
}
.bottom {
  background: #000;
  height: 65px;
}
</style>
