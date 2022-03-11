<template>
  <div class="container">
    <div class="detail">
      d_detail:
      <pre>{{ d_detail }}</pre>
    </div>

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
      d_detail: "",
    };
  },
  created() {
    this.getDynamicDetailById(this.d_id);
  },
  methods: {
    // 根据动态id获取动态信息
    getDynamicDetailById(d_id) {
      let params = {
        d_id,
      };
      this.$http
        .post("/dynamic/getDynamicDetailById", params)
        .then((res) => {
          // console.log(res);
          if (res && res.status == 200) {
            this.d_detail = res.data.dynamicList[0];
          }
        })
        .catch((e) => {
          this.$message({
            message: e,
            type: "warning",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  // text-align: center;
}
.detail {
  width: 830px;
  margin: 0 auto;
}
</style>
