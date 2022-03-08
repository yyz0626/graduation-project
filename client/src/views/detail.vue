<template>
  <div>
    <div>{{ d_id }}</div>
    <!-- <no-data v-if="!postsId" /> -->
  </div>
</template>

<script>
// import noData from "../components/no-data.vue";
export default {
  components: {
    // "no-data": noData,
  },
  data() {
    return {
      d_id: this.$route.query.d_id,
    };
  },
};
</script>

<style></style>
