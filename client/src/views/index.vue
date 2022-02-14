<template>
  <div class="container">
    <div v-for="(item, index) in dataList" :key="index" class="list-item">
      <router-link :to="{ path: 'detail', query: { postsId: item.postsId } }">
        <background-box :bgData="item"></background-box>
      </router-link>
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

<style lang="scss" scoped></style>
