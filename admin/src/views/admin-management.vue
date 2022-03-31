<template>
  <div class="container">
    <!-- 查询表单 -->
    <div class="search-box" style="margin-bottom: 10px">
      <el-form :inline="true" :model="admin_search" class="demo-form-inline">
        <el-form-item label="管理员账号">
          <el-input
            v-model="admin_search.admin_tel"
            placeholder="请输入管理员账号..."
            clearable
          />
        </el-form-item>
        <el-form-item label="管理员名称">
          <el-input
            v-model="admin_search.admin_name"
            placeholder="请输入管理员名称..."
            clearable
          />
        </el-form-item>
        <el-form-item label="管理员级别">
          <el-select v-model="admin_search.admin_type">
            <el-option label="全部" :value="0" />
            <el-option label="一级管理员" :value="1" />
            <el-option label="二级管理员" :value="2" />
            <el-option label="已注销" :value="3" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getAllAdminInfo(1)">查询</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
          <el-button type="primary" @click="addAdminDialogVisible = true"
            >添加管理员</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格 -->
    <el-table
      :data="admin_tableData"
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

      <el-table-column prop="admin_tel" label="管理员账号" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.to_uId">回复@{{ scope.row.to_uName }}： </span>
          <span>{{ scope.row.admin_tel }}</span>
        </template>
      </el-table-column>

      <el-table-column label="管理员名称" align="center">
        <template slot-scope="scope">
          <span>{{
            scope.row.admin_name ? scope.row.admin_name : scope.row.from_uName
          }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="管理员级别" align="center">
        <template slot-scope="scope">
          {{
            scope.row.admin_type == 1 ? "一级管理员" : "二级管理员"
          }}</template
        >
      </el-table-column>

      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.admin_type == 1">暂无</div>
          <div v-if="scope.row.admin_type == 2">
            <el-button @click="cancellation(scope.row)" type="text"
              >注销</el-button
            >
          </div>
          <div v-if="scope.row.admin_type == 3">
            <el-button @click="recovery(scope.row)" type="text">恢复</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加管理员 -->
    <el-dialog title="添加管理员" :visible.sync="addAdminDialogVisible">
      <el-form
        :model="admin_regist_form"
        status-icon
        :rules="rules"
        ref="admin_regist_form"
        label-width="120px"
        label-position="left"
      >
        <el-form-item label="管理员账号">
          {{ 20000 + admin_index }}
        </el-form-item>
        <el-form-item prop="admin_name" label="管理员名称">
          <el-input
            v-model="admin_regist_form.admin_name"
            placeholder="请输入管理员名称..."
            clearable
          />
        </el-form-item>
        <el-form-item prop="admin_pass" label="管理员密码">
          <el-input
            v-model="admin_regist_form.admin_pass"
            placeholder="请输入管理员密码..."
            clearable
          />
        </el-form-item>
        <el-form-item style="margin-left: 55px; margin-top: 100px">
          <el-button type="primary" @click="submitForm('admin_regist_form')"
            >确定</el-button
          >
          <el-button @click="resetForm('admin_regist_form')">重置</el-button>
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
// import noData from "../components/no-data.vue";
export default {
  components: {
    // "no-data": noData,
  },
  data() {
    // 用户名校验
    var checkName = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error("名称不能为空"));
      } else {
        callback();
      }
    };
    // 密码校验
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      admin_tableData: [],
      comment_info: "",
      addAdminDialogVisible: false,
      admin_index: "",
      admin_regist_form: {
        admin_pass: "",
        admin_name: "",
      },
      admin_search: {
        admin_tel: "",
        admin_type: 0,
        admin_name: "",
      },
      pageInfo: {
        pageNo: 1,
        pageSize: 5,
        totalSize: 0,
      },
      rules: {
        admin_name: [{ validator: checkName, trigger: "blur" }],
        admin_pass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  created() {
    if (this.d_id) {
      this.admin_search.d_id = this.d_id;
    }
    this.getAllAdminInfo();
  },
  computed: {
    adminToken() {
      return localStorage.getItem("adminToken") || "";
    },
    adminInfo() {
      return JSON.parse(localStorage.getItem("adminInfo")) || "";
    },
    d_id() {
      return this.$route.query.d_id || "";
    },
  },
  watch: {
    // 监听注册框显示
    addAdminDialogVisible() {
      if (this.addAdminDialogVisible == false)
        this.resetForm("admin_regist_form");
    },
  },
  methods: {
    // 获取所有管理员信息
    getAllAdminInfo() {
      let params = {
        pageNo: this.pageInfo.pageNo,
        pageSize: this.pageInfo.pageSize,
        admin_tel: this.admin_search.admin_tel,
        admin_type: this.admin_search.admin_type,
        admin_name: this.admin_search.admin_name,
      };
      this.$http
        .post("/admin/getAllAdminInfo", params)
        .then((res) => {
          if (res && res.status == 200 && res.data) {
            this.admin_tableData = res.data.adminInfoList;
            this.pageInfo.totalSize = res.data.length;
            if (this.admin_search.admin_type == 0) {
              this.admin_index = this.admin_tableData.length;
            }
          }
        })
        .catch((e) => {
          this.$message({
            message: e,
            type: "warning",
          });
        });
    },

    // 改变分页大小
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.pageInfo.pageNo = 1;
      this.getAllAdminInfo();
    },

    // 改变分页页码
    handleCurrentChange(val) {
      this.pageInfo.pageNo = val;
      this.getAllAdminInfo();
    },

    // 重置
    reset() {
      this.admin_search = {
        admin_tel: "",
        admin_type: 0,
        admin_name: "",
      };
    },

    // 注销管理员操作
    cancellation(data) {
      this.$confirm("确定注销该管理员？")
        .then(() => {
          let info = JSON.parse(JSON.stringify(data));
          let params = {
            admin_type: 3,
            admin_id: info.admin_id,
          };
          this.$http
            .post("/admin/updateAdminStatus", params)
            .then((res) => {
              if (res && res.status == 200) {
                this.$message({
                  message: "注销成功",
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

    // 恢复管理员操作
    recovery(data) {
      this.$confirm("确定恢复该管理员权限？")
        .then(() => {
          let info = JSON.parse(JSON.stringify(data));
          let params = {
            admin_type: 2,
            admin_id: info.admin_id,
          };
          this.$http
            .post("/admin/updateAdminStatus", params)
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

    // 提交注册表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.adminRegist();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 重置注册表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 管理员注册
    adminRegist() {
      let { admin_name, admin_pass } = this.admin_regist_form;
      let params = {
        admin_name,
        admin_pass,
        admin_tel: 20000 + this.admin_index,
        admin_type: 2,
      };
      this.$http
        .post("/admin/adminRegist", params)
        .then((res) => {
          if (res && res.status == 200) {
            this.$message({
              message: "注册成功",
              type: "success",
            });
            setTimeout(() => {
              this.addAdminDialogVisible = false;
              this.$router.go(0);
            }, 1000);
          } else {
            this.$message.error("注册失败");
          }
        })
        .catch((e) => {
          console.log(e);
          this.$message({
            message: e,
            type: "warning",
          });
        });
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
    font-size: 12px;
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
