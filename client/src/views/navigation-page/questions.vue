<template>
  <div class="container">
    <!-- 动态列表 -->
    <div v-for="(item, index) in dynamicList" :key="index" class="list-item">
      <router-link
        target="_blank"
        :to="{ path: 'detail', query: { d_id: item.d_id } }"
      >
        <background-box :bgData="item"></background-box>
      </router-link>
    </div>
    <el-empty
      v-if="dynamicList.length == 0"
      description="暂无动态"
      :image-size="200"
    />
  </div>
</template>

<script>
import backgroundBox from "../../components/background-box.vue";

export default {
  name: "index",
  components: {
    "background-box": backgroundBox,
  },
  data() {
    return {
      dynamicList: [],
    };
  },
  mounted() {
    this.getDynamicList();
  },
  methods: {
    // 发布动态
    getDynamicList() {
      this.$http
        .post("/dynamic/getDynamicListByType", { d_type: 1 })
        .then((res) => {
          if (res && res.status == 200) {
            this.dynamicList = res.data.dynamicList;
            this.dialogFormVisible = false;
            this.dynamic = {
              d_title: "",
              type: "",
              group: false,
              groupNum: 0,
              content: "",
              topping: false,
            };
          } else {
            this.$message.error("发布失败");
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
  text-align: center;
}
</style>
