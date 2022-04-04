<template>
  <div class="container">
    <!-- 表格 -->
    <el-table
      :data="log_tableData"
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
        prop="admin_tel"
        label="日志时间"
        align="center"
        min-width="30%"
      >
        <template slot-scope="scope">
          {{ $moment(scope.row.create_time).format("lll") }}
        </template>
      </el-table-column>

      <el-table-column label="日志内容" align="center">
        <template slot-scope="scope">
          <!-- <span> {{ scope.row.log_type }}: </span> -->
          <!-- 1-1 管理员修改动态状态 -->
          <div v-if="scope.row.log_type == '1-1'">
            管理员：{{ scope.row.admin_name }}({{
              scope.row.admin_id
            }})，将动态：{{ scope.row.detail }}的状态，从【{{
              checkDynamicType(scope.row.old_val)
            }}】设置为【{{ checkDynamicType(scope.row.new_val) }}】
          </div>
          <!-- 1-2 用户修改动态标题 -->
          <div v-if="scope.row.log_type == '1-2'">
            用户：{{ scope.row.user_name }}({{ scope.row.user_id }})，将动态：{{
              scope.row.detail
            }}的标题，从【{{ scope.row.old_val }}】修改为【{{
              scope.row.new_val
            }}】
          </div>
          <!-- 1-3 用户修改动态内容 -->
          <div v-if="scope.row.log_type == '1-3'">
            用户：{{ scope.row.user_name }}({{ scope.row.user_id }})，将动态：{{
              scope.row.detail
            }}的内容，从【{{ scope.row.old_val }}】修改为【{{
              scope.row.new_val
            }}】
          </div>
          <!-- 1-4 用户新建动态 -->
          <div v-if="scope.row.log_type == '1-4'">
            用户：{{ scope.row.user_name }}({{
              scope.row.user_id
            }})，发布动态：{{ scope.row.detail }}
          </div>
          <!-- 1-5 用户删除动态 -->
          <div v-if="scope.row.log_type == '1-5'">
            用户：{{ scope.row.user_name }}({{
              scope.row.user_id
            }})，删除动态：{{ scope.row.detail }}
          </div>
          <!-- 2-1 用户注册 -->
          <div v-if="scope.row.log_type == '2-1'">
            用户：{{ scope.row.new_val }}注册校园社交网
          </div>
          <!-- 2-2 管理员修改用户状态 -->
          <div v-if="scope.row.log_type == '2-2'">
            管理员：{{ scope.row.admin_name }}({{
              scope.row.admin_id
            }})，将用户：{{ scope.row.user_name }}({{
              scope.row.user_id
            }})的状态，从【{{ checkUserType(scope.row.old_val) }}】设置为【{{
              checkUserType(scope.row.new_val)
            }}】
          </div>
          <!-- 2-3 用户登陆 -->
          <div v-if="scope.row.log_type == '2-3'">
            {{ scope.row.new_val }}
          </div>
          <!-- 2-4 用户退出登陆 -->
          <div v-if="scope.row.log_type == '2-4'">
            {{ scope.row.new_val }}
          </div>
          <!-- 2-5 用户修改个人信息 -->
          <div v-if="scope.row.log_type == '2-5'">
            {{ scope.row.new_val }}
          </div>
          <!-- 3-1 管理员删除评论 -->
          <div v-if="scope.row.log_type == '3-1'">
            {{ scope.row.new_val }}
          </div>
          <!-- 3-2 管理员删除评论回复 -->
          <div v-if="scope.row.log_type == '3-2'">
            {{ scope.row.new_val }}
          </div>
          <!-- 3-3 用户添加评论 -->
          <div v-if="scope.row.log_type == '3-3'">
            {{ scope.row.new_val }}
          </div>
          <!-- 3-4 用户回复 -->
          <div v-if="scope.row.log_type == '3-4'">
            {{ scope.row.new_val }}
          </div>
          <!-- 4-1 管理员登陆 -->
          <div v-if="scope.row.log_type == '4-1'">
            {{ scope.row.new_val }}
          </div>
          <!-- 4-2 管理员注册 -->
          <div v-if="scope.row.log_type == '4-2'">
            {{ scope.row.new_val }}
          </div>
          <!-- 4-3 管理员变更状态 -->
          <div v-if="scope.row.log_type == '4-3'">
            管理员：{{ scope.row.admin_name }}({{
              scope.row.admin_id
            }})的状态，从【{{ checkAdminType(scope.row.old_val) }}】设置为【{{
              checkAdminType(scope.row.new_val)
            }}】
          </div>
          <!-- 4-4 管理员退出登录 -->
          <div v-if="scope.row.log_type == '4-4'">
            {{ scope.row.new_val }}
          </div>
          <!-- 5-1 用户反馈问题 -->
          <div v-if="scope.row.log_type == '5-1'">
            用户：{{ scope.row.user_name }}({{ scope.row.user_id }})，反馈问题：
            "{{ scope.row.new_val }}"
          </div>
          <!-- 5-2 管理解决问题 -->
          <div v-if="scope.row.log_type == '5-2'">
            管理员：{{ scope.row.admin_name }}({{
              scope.row.admin_id
            }})，处理用户：{{ scope.row.admin_name }}({{
              scope.row.admin_id
            }})的问题： "{{ scope.row.new_val }}"，备注："{{
              scope.row.old_val
            }}"
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pageInfo.pageNo"
      :page-sizes="[5, 10, 20, 100]"
      :page-size="100"
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
      log_tableData: [],
      pageInfo: {
        pageNo: 1,
        pageSize: 100,
        totalSize: 0,
      },
    };
  },
  created() {
    this.getAllLogInfo();
  },
  computed: {
    adminToken() {
      return localStorage.getItem("adminToken") || "";
    },
    adminInfo() {
      return JSON.parse(localStorage.getItem("adminInfo")) || "";
    },
    admin_tel() {
      return this.$route.query.admin_tel || "";
    },
  },
  watch: {},
  methods: {
    // 获取所有日志信息
    getAllLogInfo(type) {
      if (type) {
        this.pageInfo.pageNo = 1;
      }
      let params = {
        pageNo: this.pageInfo.pageNo,
        pageSize: this.pageInfo.pageSize,
      };
      this.$http
        .post("/admin/getAllLogInfo", params)
        .then((res) => {
          if (res && res.status == 200 && res.data) {
            this.log_tableData = res.data.logoInfoList;
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

    // 动态状态类型
    checkDynamicType(type) {
      const map = {
        1: "普通展示",
        2: "置顶展示",
        3: "暂停展示",
      };
      return map[type];
    },

    // 用户状态类型
    checkUserType(type) {
      const map = {
        1: "普通用户",
        2: "禁止发布动态",
        3: "禁止评论动态",
        4: "禁止发布、评论动态",
        5: "注销",
      };
      return map[type];
    },

    // 管理员状态类型
    checkAdminType(type) {
      const map = {
        1: "一级管理员",
        2: "二级管理员",
        3: "注销管理员",
      };
      return map[type];
    },

    // 改变分页大小
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.pageInfo.pageNo = 1;
      this.getAllLogInfo();
    },

    // 改变分页页码
    handleCurrentChange(val) {
      this.pageInfo.pageNo = val;
      this.getAllLogInfo();
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
  margin: 40px 19px;
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
