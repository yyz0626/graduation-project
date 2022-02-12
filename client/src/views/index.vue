<template>
  <div class="container">
    <div v-for="(item, index) in dataList" :key="index" class="list-item">
      <background-box :bgData="item"></background-box>
    </div>
  </div>
</template>

<script>
import backgroundBox from "../components/background-box.vue";
import { dataList } from "../lib/config.js";
export default {
  name: "index",
  components: {
    "background-box": backgroundBox,
  },
  data() {
    return {
      dataList,
    };
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  text-align: center;
}
</style>
