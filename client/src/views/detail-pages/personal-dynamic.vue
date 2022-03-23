<template>
  <div class="container">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50" align="center" />
      <el-table-column
        prop="d_title"
        label="动态标题"
        width="180"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="d_type"
        label="动态类型"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          {{ checkTextType(scope.row.d_type) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="d_content"
        label="动态内容"
        header-align="center"
      />
      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <router-link
            target="_blank"
            :to="{ path: 'detail', query: { d_id: scope.row.d_id } }"
            >查看
          </router-link>
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { checkTextType } from "../../lib/config.js";
export default {
  data() {
    return {
      d_fk_uId: Number(this.$route.query.u_id),
      tableData: [],
    };
  },
  mounted() {
    this.getDynamicListByUserId();
  },
  methods: {
    // 发布动态
    getDynamicListByUserId() {
      let params = {
        d_fk_uId: this.d_fk_uId,
      };
      this.$http
        .post("/dynamic/getDynamicListByUserId", params)
        .then((res) => {
          if (res && res.status == 200) {
            this.tableData = res.data.dynamicList;
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
    handleClick(row) {
      console.log(row);
    },
    checkTextType(type) {
      return checkTextType(type);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 1130px;
  margin: 0 auto;
  padding-top: 30px;
  a {
    text-decoration: none;
    color: #409eff;
    font-size: 12px;
    margin-right: 8px;
  }
}
</style>
