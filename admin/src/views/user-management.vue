<template>
  <div class="container">
    <!-- 条件表单 -->
    <el-form :inline="true" :model="user_search">
      <el-form-item label="用户名">
        <el-input
          v-model="user_search.u_name"
          placeholder="请输入用户名..."
          clearable
        />
      </el-form-item>
      <el-form-item label="用户电话">
        <el-input
          v-model="user_search.u_tel"
          placeholder="请输入用户联系电话..."
          clearable
        />
      </el-form-item>
      <el-form-item label="用户状态">
        <el-select v-model="user_search.u_status">
          <el-option label="全部用户" :value="0" />
          <el-option label="普通用户" :value="1" />
          <el-option label="禁止发布动态" :value="2" />
          <el-option label="禁止评论动态" :value="3" />
          <el-option label="禁止发布、评论动态" :value="4" />
          <el-option label="已注销" :value="5" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" round @click="getAllUserInfo(1)"
          >查找</el-button
        >
        <el-button type="primary" round @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table
      :data="user_tableData"
      border
      style="width: 100%"
      :show-overflow-tooltip="true"
    >
      <!-- 序号 -->
      <el-table-column
        type="index"
        :index="getIndex"
        width="50"
        align="center"
      />
      <!-- 用户 -->
      <el-table-column prop="u_name" label="用户" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.info_avatar" style="width: 50px; height: 50px" />
          <p>
            {{ scope.row.u_name }}
          </p>
        </template>
      </el-table-column>

      <!-- 联系电话 -->
      <el-table-column prop="u_tel" label="联系电话" align="center" />

      <!-- 邮箱 -->
      <el-table-column prop="info_email" label="邮箱" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.info_email">
            {{ scope.row.info_email }}
          </p>
          <p v-else>暂未填写</p>
        </template>
      </el-table-column>

      <!-- 注册时间 -->
      <el-table-column prop="create_time" label="注册时间" align="center">
        <template slot-scope="scope">
          {{ $moment(scope.row.create_time).format("lll") }}
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="text">详情</el-button>
          <el-button
            @click="manage(scope.row)"
            type="text"
            v-if="scope.row.u_status != 5"
            >管理</el-button
          >
          <el-button
            @click="cancellation(scope.row)"
            type="text"
            v-if="scope.row.u_status != 5 && adminInfo.admin_type == 1"
            >注销</el-button
          >
          <el-button
            v-if="scope.row.u_status == 5 && adminInfo.admin_type == 1"
            @click="recovery(scope.row)"
            type="text"
            >恢复</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 个人信息详情 -->
    <el-dialog title="个人信息详情" :visible.sync="detailDialogVisible">
      <el-form
        :model="userInfo"
        status-icon
        label-width="90px"
        label-position="left"
        class="demo-dynamic"
      >
        <el-form-item label="头像">
          <el-avatar :size="50" :src="userInfo.info_avatar" />
        </el-form-item>

        <el-form-item label="联系电话">
          {{ userInfo.u_tel }}
        </el-form-item>

        <el-form-item label="性别" prop="info_gender">
          {{ userInfo.info_gender == 0 ? "男" : "女" }}
        </el-form-item>

        <el-form-item label="用户名" prop="info_name">
          {{ userInfo.u_name }}
        </el-form-item>

        <el-form-item label="用户状态">
          {{ userInfo.info_hobby ? userInfo.info_hobby : "暂未填写" }}
        </el-form-item>
        <el-form-item label="已发动态">
          <router-link
            :to="{
              path: 'dynamic-management',
              query: { u_tel: userInfo.u_tel },
            }"
          >
            {{ userInfo.dynamic_length }}条
          </router-link>
        </el-form-item>

        <el-form-item label="生日" prop="info_birthday">
          {{
            userInfo.info_birthday
              ? $moment(userInfo.info_birthday).format("LL")
              : "暂未填写"
          }}
        </el-form-item>

        <el-form-item label="Email" prop="info_email">
          {{ userInfo.info_email ? userInfo.info_email : "暂未填写" }}
        </el-form-item>

        <el-form-item label="兴趣爱好" prop="u_hobby">
          {{ userInfo.info_hobby ? userInfo.info_hobby : "暂未填写" }}
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 个人信息管理 -->
    <el-dialog
      title="个人信息管理"
      :before-close="handleClose"
      :visible.sync="manageDialogVisible"
    >
      <el-form
        :model="userInfo"
        status-icon
        ref="dynamic"
        label-width="90px"
        label-position="left"
        class="demo-dynamic"
      >
        <el-form-item label="权限功能">
          <el-select v-model="userInfo.u_status" placeholder="请选择动态类型">
            <el-option label="普通用户" :value="1" />
            <el-option label="禁止发布动态" :value="2" />
            <el-option label="禁止评论动态" :value="3" />
            <el-option label="禁止发布、评论动态" :value="4" />
          </el-select>
        </el-form-item>
        <el-form-item style="margin-left: 55px; margin-top: 100px">
          <el-button type="primary" @click="updateUserStatus">确定</el-button>
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
  data() {
    return {
      user_tableData: [],
      userInfo: "",
      detailDialogVisible: false,
      manageDialogVisible: false,
      user_search: {
        u_tel: "",
        u_status: 0,
        u_name: "",
      },
      pageInfo: {
        pageNo: 1,
        pageSize: 5,
        totalSize: 0,
      },
    };
  },
  created() {
    if (this.u_tel || this.u_status || this.u_name) {
      this.user_search.u_tel = this.u_tel;
      this.user_search.u_status = Number(this.u_status);
      this.user_search.u_name = this.u_name;
    }
  },
  mounted() {
    this.getAllUserInfo();
  },
  computed: {
    adminToken() {
      return localStorage.getItem("admin_token") || "";
    },
    adminInfo() {
      return JSON.parse(localStorage.getItem("admin_info")) || "";
    },
    u_tel() {
      return this.$route.query.u_tel || "";
    },
    u_status() {
      return this.$route.query.u_status || "";
    },
    u_name() {
      return this.$route.query.u_name || "";
    },
  },
  watch: {},
  methods: {
    // 获取所有用户信息
    getAllUserInfo(type) {
      if (type) {
        this.pageInfo.pageNo = 1;
      }
      let params = {
        pageNo: this.pageInfo.pageNo,
        pageSize: this.pageInfo.pageSize,
        u_tel: this.user_search.u_tel,
        u_status: this.user_search.u_status,
        u_name: this.user_search.u_name,
      };
      this.$http
        .post("/admin/getAllUserInfo", params)
        .then((res) => {
          if (res && res.status == 200) {
            this.user_tableData = res.data.userInfoList;
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

    // 改变分页大小
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.pageInfo.pageNo = 1;
      this.getAllUserInfo();
    },

    // 改变分页页码
    handleCurrentChange(val) {
      this.pageInfo.pageNo = val;
      this.getAllUserInfo();
    },

    // 序号排序
    getIndex(index) {
      const page = this.pageInfo.pageNo;
      const pageSize = this.pageInfo.pageSize;
      // 当前页数 - 1 * 每页数据条数 + index + 1
      return (page - 1) * pageSize + index + 1;
    },

    // 重置
    reset() {
      this.user_search = {
        u_tel: "",
        u_status: 0,
        u_name: "",
      };
    },

    handleClose(done) {
      this.$confirm("确认放弃修改？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },

    closeForm() {
      this.detailDialogVisible = false;
      this.manageDialogVisible = false;
    },

    // 详情
    async detail(data) {
      this.userInfo = JSON.parse(JSON.stringify(data));
      let params = {
        d_fk_uId: this.userInfo.u_id,
      };
      const res = await this.$http.post(
        "/dynamic/getDynamicListByUserId",
        params
      );
      if (res && res.status == 200) {
        this.userInfo.dynamic_length = res.data.length;
      }
      this.detailDialogVisible = true;
    },

    // 管理
    manage(data) {
      this.userInfo = JSON.parse(JSON.stringify(data));
      this.manageDialogVisible = true;
    },

    // 管理操作下------修改用户状态
    updateUserStatus() {
      let params = {
        u_status: this.userInfo.u_status,
        u_id: this.userInfo.u_id,
      };
      this.$http
        .post("/admin/updateUserStatus", params)
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

    // 注销用户操作
    cancellation(data) {
      this.$confirm("确定注销该用户？")
        .then(() => {
          this.userInfo = JSON.parse(JSON.stringify(data));
          let params = {
            u_status: 5,
            u_id: this.userInfo.u_id,
          };
          this.$http
            .post("/admin/updateUserStatus", params)
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

    // 恢复用户操作
    recovery(data) {
      this.$confirm("确定恢复该用户权限？")
        .then(() => {
          this.userInfo = JSON.parse(JSON.stringify(data));
          let params = {
            u_status: 1,
            u_id: this.userInfo.u_id,
          };
          this.$http
            .post("/admin/updateUserStatus", params)
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
  margin: 40px 59px 10px;
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
