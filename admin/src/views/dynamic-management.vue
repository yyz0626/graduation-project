<template>
  <div class="container">
    <!-- 查询表单 -->
    <div class="search-box" style="margin-bottom: 10px">
      <el-form :inline="true" :model="dynamic_search" class="demo-form-inline">
        <el-form-item label="用户电话">
          <el-input
            v-model="dynamic_search.u_tel"
            placeholder="请输入用户联系电话..."
            clearable
          />
        </el-form-item>
        <el-form-item label="动态ID">
          <el-input
            v-model="dynamic_search.d_id"
            placeholder="请输入动态ID..."
            clearable
          />
        </el-form-item>
        <el-form-item label="动态标题">
          <el-input
            v-model="dynamic_search.d_title"
            placeholder="请输入动态标题..."
            clearable
          />
        </el-form-item>
        <el-form-item label="动态状态">
          <el-select v-model="dynamic_search.d_status">
            <el-option label="全部" :value="0" />
            <el-option label="普通展示" :value="1" />
            <el-option label="置顶展示" :value="2" />
            <el-option label="暂停展示" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="动态类型">
          <el-select v-model="dynamic_search.d_type">
            <el-option label="全部" :value="0" />
            <el-option label="难题解答" :value="1" />
            <el-option label="交友平台" :value="2" />
            <el-option label="二手平台" :value="3" />
            <el-option label="休闲娱乐" :value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序条件">
          <el-select v-model="dynamic_search.sort_type">
            <el-option label="发布时间" :value="1" />
            <el-option label="浏览数" :value="2" />
            <el-option label="评论数" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getAllDynamicInfo(1)"
            >查询</el-button
          >
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格 -->
    <el-table :data="dynamic_tableData" border style="width: 100%">
      <el-table-column
        type="index"
        :index="getIndex"
        width="50"
        align="center"
      />
      <el-table-column
        prop="d_title"
        label="动态标题"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="d_id"
        label="动态ID"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="动态类型" align="center">
        <template slot-scope="scope">
          {{ checkTextType(scope.row.d_type) }}
        </template>
      </el-table-column>
      <el-table-column
        label="动态内容"
        align="center"
        width="130"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          {{ scope.row.d_content }}
        </template>
      </el-table-column>

      <el-table-column label="发布人(联系电话)" align="center" width="120">
        <template slot-scope="scope">
          <router-link
            :to="{
              path: 'user-management',
              query: { u_tel: scope.row.u_tel, status: scope.row.status },
            }"
          >
            {{ scope.row.u_name }}
          </router-link>
          <span>({{ scope.row.u_tel }})</span>
        </template>
      </el-table-column>

      <el-table-column label="浏览数" align="center">
        <template slot-scope="scope"> {{ scope.row.info_count }}次 </template>
      </el-table-column>

      <el-table-column label="评论数" align="center">
        <template slot-scope="scope">
          {{ scope.row.info_comment_count }}次
        </template>
      </el-table-column>

      <el-table-column label="发布时间" align="center">
        <template slot-scope="scope">
          {{ $moment(scope.row.createTime).format("lll") }}
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            @click="manage(scope.row)"
            type="text"
            v-if="scope.row.d_status != 3"
            >管理</el-button
          >
          <el-button
            @click="suspend(scope.row)"
            type="text"
            v-if="scope.row.d_status != 3"
            >暂停</el-button
          >
          <el-button
            @click="recovery(scope.row)"
            type="text"
            v-if="scope.row.d_status == 3"
            >恢复</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 动态管理 -->
    <el-dialog
      title="动态管理"
      :before-close="handleClose"
      :visible.sync="manageDialogVisible"
    >
      <el-form
        :model="dynamicInfo"
        status-icon
        ref="dynamicInfo"
        label-width="90px"
        label-position="left"
        class="demo-dynamic"
      >
        <pre>{{ dynamicInfo }}</pre>
        <el-form-item label="动态状态">
          <el-select v-model="dynamicInfo.d_status">
            <el-option label="普通展示" value="1" />
            <el-option label="置顶展示" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item style="margin-left: 55px; margin-top: 100px">
          <el-button type="primary" @click="updateDynamicStatus"
            >确定</el-button
          >
          <el-button @click="closeForm">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pageInfo.pageNo"
      :page-sizes="[5, 10, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.totalSize"
      style="margin-top: 10px; float: right"
    >
    </el-pagination>
  </div>
</template>

<script>
import { checkTextType } from "../lib/config.js";

export default {
  data() {
    return {
      d_fk_uId: Number(this.$route.query.u_id),
      dynamic_tableData: [],
      dynamicInfo: "",
      dynamic_search: {
        u_tel: "",
        d_title: "",
        d_type: 0,
        d_id: "",
        sort_type: 1,
        d_status: 0,
      },
      pageInfo: {
        pageNo: 1,
        pageSize: 5,
        totalSize: 0,
      },
      manageDialogVisible: false,
    };
  },
  created() {
    if (this.u_tel) {
      this.dynamic_search.u_tel = this.u_tel;
    }
    if (this.d_id) {
      this.dynamic_search.d_id = this.d_id;
    }
  },

  mounted() {
    this.getAllDynamicInfo();
  },
  computed: {
    adminToken() {
      return localStorage.getItem("adminToken") || "";
    },
    adminInfo() {
      return JSON.parse(localStorage.getItem("adminInfo")) || "";
    },
    u_tel() {
      return this.$route.query.u_tel || "";
    },
    d_id() {
      return this.$route.query.d_id || "";
    },
  },

  watch: {},

  methods: {
    // 获取所有动态信息
    getAllDynamicInfo(type) {
      if (type) {
        this.pageInfo.pageNo = 1;
      }
      let params = {
        pageNo: this.pageInfo.pageNo,
        pageSize: this.pageInfo.pageSize,
        u_tel: this.dynamic_search.u_tel,
        d_type: this.dynamic_search.d_type,
        d_title: this.dynamic_search.d_title,
        sort_type: this.dynamic_search.sort_type,
        d_status: this.dynamic_search.d_status,
        d_id: this.dynamic_search.d_id,
      };
      this.$http
        .post("/admin/getAllDynamicInfo", params)
        .then((res) => {
          if (res && res.status == 200) {
            this.dynamic_tableData = res.data.userInfoList;
            this.pageInfo.totalSize = res.data.length;
          }
        })
        .catch((e) => {
          this.$message({
            message: e,
            type: "warning",
          });
        });
    },

    // 重置
    reset() {
      this.dynamic_search = {
        u_tel: "",
        d_title: "",
        d_type: 0,
        d_id: "",
        sort_type: 1,
        d_status: 0,
      };
    },

    // 改变分页大小
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.pageInfo.pageNo = 1;
      this.getAllDynamicInfo();
    },

    // 改变分页页码
    handleCurrentChange(val) {
      this.pageInfo.pageNo = val;
      this.getAllDynamicInfo();
    },

    // 序号排序
    getIndex(index) {
      const page = this.pageInfo.pageNo;
      const pageSize = this.pageInfo.pageSize;
      // 当前页数 - 1 * 每页数据条数 + index + 1
      return (page - 1) * pageSize + index + 1;
    },

    // 返回动态类型
    checkTextType(type) {
      return checkTextType(type);
    },

    handleClose(done) {
      this.$confirm("确认放弃修改？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },

    // 管理
    manage(data) {
      this.dynamicInfo = JSON.parse(JSON.stringify(data));
      this.manageDialogVisible = true;
    },

    closeForm() {
      this.detailDialogVisible = false;
      this.manageDialogVisible = false;
    },

    // 管理操作下------修改动态状态
    updateDynamicStatus() {
      let params = {
        d_status: this.dynamicInfo.d_status,
        d_id: this.dynamicInfo.d_id,
      };
      this.$http
        .post("/admin/updateDynamicStatus", params)
        .then((res) => {
          if (res && res.status == 200) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            setTimeout(() => {
              this.manageDialogVisible = false;
              this.$router.go(0);
            }, 1000);
          }
        })
        .catch((e) => {
          this.$message({
            message: e,
            type: "warning",
          });
        });
    },

    // 暂停操作
    suspend(data) {
      this.$confirm("确定暂停展示该动态？")
        .then(() => {
          this.dynamicInfo = JSON.parse(JSON.stringify(data));
          let params = {
            d_status: 3,
            d_id: this.dynamicInfo.d_id,
          };
          this.$http
            .post("/admin/updateDynamicStatus", params)
            .then((res) => {
              if (res && res.status == 200) {
                this.$message({
                  message: "暂停成功",
                  type: "success",
                });
                setTimeout(() => {
                  this.manageDialogVisible = false;
                  this.$router.go(0);
                }, 1000);
              }
            })
            .catch((e) => {
              this.$message({
                message: e,
                type: "warning",
              });
            });
        })
        .catch(() => {});
    },

    // 恢复用户操作
    recovery(data) {
      this.$confirm("确定恢复该动态状态？")
        .then(() => {
          this.dynamicInfo = JSON.parse(JSON.stringify(data));
          let params = {
            d_status: 0,
            d_id: this.dynamicInfo.d_id,
          };
          this.$http
            .post("/admin/updateDynamicStatus", params)
            .then((res) => {
              if (res && res.status == 200) {
                this.$message({
                  message: "恢复成功",
                  type: "success",
                });
                setTimeout(() => {
                  this.manageDialogVisible = false;
                  this.$router.go(0);
                }, 1000);
              }
            })
            .catch((e) => {
              this.$message({
                message: e,
                type: "warning",
              });
            });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 1280px;
  margin: 10px 19px;
  padding-bottom: 60px;
  a {
    text-decoration: none;
    color: #409eff;
    font-size: 14px;
    margin-right: 8px;
  }
}

/deep/ .el-dialog {
  width: 36%;
  max-height: 670px;
  margin-top: 30px !important;
  border-radius: 20px;
}
</style>
