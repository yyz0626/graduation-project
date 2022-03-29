<template>
  <div class="container">
    <!-- 查询表单 -->
    <div class="search-box" style="margin-bottom: 10px">
      <el-form :inline="true" :model="dynamic" class="demo-form-inline">
        <el-form-item label="用户电话">
          <el-input
            v-model="dynamic.u_tel"
            placeholder="请输入用户联系电话..."
          />
        </el-form-item>
        <el-form-item label="动态标题">
          <el-input v-model="dynamic.d_title" placeholder="请输入动态标题..." />
        </el-form-item>
        <el-form-item label="动态类型">
          <el-select v-model="dynamic.d_type" placeholder="活动区域">
            <el-option label="全部" value="0" />
            <el-option label="难题解答" value="1" />
            <el-option label="交友平台" value="2" />
            <el-option label="二手平台" value="3" />
            <el-option label="休闲娱乐" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getAllDynamicInfo">查询</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- <pre>{{ tableData[0] }}</pre> -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :show-overflow-tooltip="true"
    >
      <el-table-column
        type="index"
        :index="getIndex"
        width="50"
        align="center"
      />
      <el-table-column prop="u_name" label="用户" width="120" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.info_avatar" style="width: 50px; height: 50px" />
          <p>
            {{ scope.row.u_name }}
          </p>
        </template>
      </el-table-column>

      <el-table-column prop="u_tel" label="联系电话" align="center" />
      <el-table-column
        prop="info_gender"
        label="性别"
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          {{ scope.row.info_gender == 0 ? "男" : "女" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="生日"
        width="140"
        align="center"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.info_birthday">
            {{ $moment(scope.row.info_birthday).format("LL") }}
          </p>
          <p v-else>暂未填写</p>
        </template>
      </el-table-column>
      <el-table-column prop="info_email" label="邮箱" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.info_email">
            {{ scope.row.info_email }}
          </p>
          <p v-else>暂未填写</p>
        </template>
      </el-table-column>
      <el-table-column prop="info_hobby" label="兴趣爱好" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.info_hobby">
            {{ scope.row.info_hobby }}
          </p>
          <p v-else>暂未填写</p>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="注册时间" align="center">
        <template slot-scope="scope">
          {{ $moment(scope.row.create_time).format("lll") }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="160" align="center">
        <template slot-scope="scope">
          <router-link
            target="_blank"
            :to="{ path: 'detail', query: { d_id: scope.row.d_id } }"
            >查看动态
          </router-link>
          <el-button @click="edit(scope.row)" type="text" size="small"
            >管理</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pageInfo.pageNo"
      :page-sizes="[5, 10, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalSize"
      style="margin-top: 10px; float: right"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      d_fk_uId: Number(this.$route.query.u_id),
      tableData: [],
      dynamic: {
        u_tel: "",
        d_title: "",
        d_type: "0",
      },
      pageInfo: {
        pageNo: 1,
        pageSize: 5,
      },
      totalSize: 0,
    };
  },

  mounted() {
    this.getAllDynamicInfo();
  },
  computed: {
    token() {
      return localStorage.getItem("token") || "";
    },
    userInfo() {
      return JSON.parse(localStorage.getItem("userInfo")) || "";
    },
  },
  watch: {
    dialogVisible() {
      if (this.dialogVisible == false) {
        this.picList = [];
      }
    },
  },
  methods: {
    // 获取所有用户信息
    getAllDynamicInfo() {
      let params = {
        pageNo: this.pageInfo.pageNo,
        pageSize: this.pageInfo.pageSize,
        u_tel: this.dynamic.u_tel,
        d_type: this.dynamic.d_type,
        d_title: this.dynamic.d_title,
      };
      console.log(params);
      this.$http
        .post("/admin/getAllDynamicInfo", params)
        .then((res) => {
          if (res && res.status == 200) {
            this.tableData = res.data.userInfoList;
            this.totalSize = res.data.length;
          }
        })
        .catch((e) => {
          this.$message({
            message: e,
            type: "warning",
          });
        });
    },

    onSubmit() {
      console.log(this.dynamic);
    },

    // 重置
    reset() {
      this.dynamic = {
        u_tel: "",
        d_title: "",
        d_type: "0",
      };
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
  margin: 0 auto;
  padding-bottom: 60px;
  a {
    text-decoration: none;
    color: #409eff;
    font-size: 12px;
    margin-right: 8px;
  }
}
/deep/ .el-dialog {
  margin-top: 40px !important;
}
</style>
