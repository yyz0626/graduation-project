<template>
  <div>
    <div>{{ postsId }}</div>
    <no-data v-if="!postsId" />
  </div>
</template>

<script>
import noData from "../components/no-data.vue";
export default {
  components: {
    "no-data": noData,
  },
  data() {
    return {
      postsId: this.$route.query.postsId,
    };
  },
};
</script>

<style></style>
