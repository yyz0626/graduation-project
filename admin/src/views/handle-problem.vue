<template>
  <div class="container">
    <!-- 查询表单 -->
    <div class="search-box" style="margin-bottom: 10px">
      <el-form :inline="true" :model="problem_search" class="demo-form-inline">
        <el-form-item label="管理员名称">
          <el-input
            v-model="problem_search.help_fk_adminName"
            placeholder="请输入管理员名称..."
            clearable
          />
        </el-form-item>
        <el-form-item label="问题状态">
          <el-select v-model="problem_search.status">
            <el-option label="全部" :value="0" />
            <el-option label="已处理" :value="1" />
            <el-option label="未处理" :value="2" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getAllProblemInfo(1)"
            >查询</el-button
          >
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- <pre>{{ problem_tableData[0] }}</pre> -->
    <!-- 表格 -->
    <el-table
      :data="problem_tableData"
      style="width: 100%; margin-bottom: 20px"
      border
    >
      <!-- 序号 -->
      <el-table-column
        type="index"
        :index="getIndex"
        width="50"
        align="center"
      />

      <el-table-column
        prop="help_detail"
        label="问题描述"
        align="center"
        :show-overflow-tooltip="true"
      />

      <el-table-column label="反馈用户" align="center" width="120">
        <template slot-scope="scope">
          <router-link
            :to="{
              path: 'user-management',
              query: {
                u_name: scope.row.help_fk_uName,
              },
            }"
          >
            {{ scope.row.help_fk_uName }}
          </router-link>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="问题提出时间" align="center">
        <template slot-scope="scope">
          {{ $moment(scope.row.create_time).format("lll") }}
        </template>
      </el-table-column>

      <el-table-column label="问题状态" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status == 1 ? "已处理" : "未处理" }}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status == 1"
            @click="detail(scope.row)"
            type="text"
            >处理详情</el-button
          >
          <el-button
            v-if="scope.row.status == 2"
            @click="manage(scope.row)"
            type="text"
            >立即处理</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 问题处理详情 -->
    <el-dialog title="处理详情" :visible.sync="detailDialogVisible">
      <el-form
        :model="problem_info"
        status-icon
        label-width="90px"
        label-position="left"
        class="demo-dynamic"
      >
        <el-form-item label="管理员账号">
          {{ problem_info.help_fk_adminTel }}
        </el-form-item>

        <el-form-item label="管理员姓名">
          {{ problem_info.help_fk_adminName }}
        </el-form-item>

        <el-form-item label="处理时间" prop="info_gender">
          {{ $moment(problem_info.update_time).format("lll") }}
        </el-form-item>

        <el-form-item label="备注" prop="info_name">
          {{ problem_info.remarks || "无" }}
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--问题立即处理 -->
    <el-dialog
      title="问题处理"
      :before-close="handleClose"
      :visible.sync="manageDialogVisible"
    >
      <el-form
        :model="problem_info"
        status-icon
        ref="dynamic"
        label-width="90px"
        label-position="left"
        class="demo-dynamic"
      >
        <el-form-item label="备注">
          <el-input
            type="textarea"
            placeholder="请输入备注..."
            v-model="remarks"
            maxlength="300"
            :autosize="{ minRows: 5 }"
            show-word-limit
          />
        </el-form-item>
        <el-form-item style="margin-left: 95px">
          <el-button type="primary" @click="updateProblemStatus"
            >提交</el-button
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
export default {
  components: {},
  data() {
    return {
      problem_tableData: [],
      detailDialogVisible: false,
      manageDialogVisible: false,
      problem_info: "",
      remarks: "",
      problem_search: {
        status: 0,
        help_fk_adminName: "",
      },
      pageInfo: {
        pageNo: 1,
        pageSize: 5,
        totalSize: 0,
      },
    };
  },
  created() {
    this.getAllProblemInfo();
  },
  computed: {
    adminToken() {
      return localStorage.getItem("admin_token") || "";
    },
    adminInfo() {
      return JSON.parse(localStorage.getItem("admin_info")) || "";
    },
  },
  watch: {},
  methods: {
    // 获取所有管理员信息
    getAllProblemInfo(type) {
      if (type) {
        this.pageInfo.pageNo = 1;
      }
      let params = {
        pageNo: this.pageInfo.pageNo,
        pageSize: this.pageInfo.pageSize,
        admin_tel: this.problem_search.admin_tel,
        status: this.problem_search.status,
        help_fk_adminName: this.problem_search.help_fk_adminName,
      };
      this.$http
        .post("/admin/getAllProblemInfo", params)
        .then((res) => {
          if (res && res.status == 200 && res.data) {
            this.problem_tableData = res.data.adminInfoList;
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

    // 管理操作下------处理问题
    updateProblemStatus() {
      let params = {
        status: 1,
        remarks: this.remarks,
        help_id: this.problem_info.help_id,
        help_fk_adminName: this.adminInfo.admin_name,
        help_fk_adminTel: this.adminInfo.admin_tel,
      };
      console.log(params);
      this.$http
        .post("/admin/updateProblemStatus", params)
        .then((res) => {
          if (res && res.status == 200) {
            this.$message({
              message: "处理成功",
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

    // 详情
    detail(data) {
      this.problem_info = JSON.parse(JSON.stringify(data));
      this.detailDialogVisible = true;
    },

    // 管理
    manage(data) {
      this.remarks = "";
      this.problem_info = JSON.parse(JSON.stringify(data));
      this.manageDialogVisible = true;
    },

    handleClose(done) {
      this.$confirm("确认放弃处理？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },

    closeForm() {
      this.manageDialogVisible = false;
    },

    // 改变分页大小
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.pageInfo.pageNo = 1;
      this.getAllProblemInfo();
    },

    // 改变分页页码
    handleCurrentChange(val) {
      this.pageInfo.pageNo = val;
      this.getAllProblemInfo();
    },

    // 重置
    reset() {
      this.problem_search = {
        admin_tel: "",
        status: 0,
        admin_name: "",
      };
    },

    // 序号排序
    getIndex(index) {
      const page = this.pageInfo.pageNo;
      const pageSize = this.pageInfo.pageSize;
      // 当前页数 - 1 * 每页数据条数 + index + 1
      return (page - 1) * pageSize + index + 1;
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
    // font-size: 12px;
    // margin-right: 8px;
  }
}
/deep/ .el-dialog {
  width: 36%;
  max-height: 670px;
  margin-top: 150px !important;
  border-radius: 20px;
}
</style>
