<template>
  <el-autocomplete
    v-model="inputVal"
    :fetch-suggestions="querySearchAsync"
    placeholder="搜索动态..."
    @select="handleSelect"
    prefix-icon="el-icon-search"
    :clearable="true"
  />
</template>

<script>
export default {
  data() {
    return {
      dynamiTop5List: [],
      inputVal: "",
      timeout: null,
    };
  },
  mounted() {},
  methods: {
    // 查询匹配
    async querySearchAsync(queryString, cb) {
      if (this.inputVal == "") {
        // 查看数前五条动态
        const res = await this.$http.get("/dynamic/getDynamicListByTop5");
        if (res && res.status == 200) {
          var arrTop5 = JSON.parse(
            JSON.stringify(res.data.dynamicList).replace(/d_title/g, "value")
          );
          this.dynamiTop5List = arrTop5;
        }
      } else {
        // 模糊查询
        let params = {
          string: queryString,
        };
        const res = await this.$http.post("/dynamic/getDynamicByFuzzy", params);
        if (res && res.status == 200) {
          var arr = JSON.parse(
            JSON.stringify(res.data.dynamicList).replace(/d_title/g, "value")
          );
          this.dynamiTop5List = arr;
        }
      }
      var results = this.dynamiTop5List;
      // clearTimeout(this.timeout);
      // this.timeout = setTimeout(() => {
      cb(results);
      // }, 500 * Math.random());
    },

    // 动态页面跳转
    handleSelect(item) {
      let routeUrl = this.$router.resolve({
        path: "/detail",
        query: { d_id: item.d_id },
      });
      window.open(routeUrl.href, "_blank");
      // this.$router.push({ path: "/detail", query: { d_id: item.d_id } });
    },
  },
};
</script>

<style></style>
