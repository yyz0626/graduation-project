<template>
  <div class="container">
    <!-- <pre>{{ comment_tableData[2] }}</pre> -->
    <!-- 查询表单 -->
    <div class="search-box" style="margin-bottom: 10px">
      <el-form :inline="true" :model="comment_search" class="demo-form-inline">
        <el-form-item label="评论内容">
          <el-input
            v-model="comment_search.c_content"
            placeholder="请输入评论内容..."
            clearable
          />
        </el-form-item>
        <el-form-item label="评论人">
          <el-input
            v-model="comment_search.info_name"
            placeholder="请输入评论人..."
            clearable
          />
        </el-form-item>
        <el-form-item label="评论状态">
          <el-select v-model="comment_search.c_status">
            <el-option label="正常" :value="1" />
            <el-option label="删除" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="动态ID">
          <el-input
            v-model="comment_search.d_id"
            placeholder="请输入动态ID..."
            clearable
          />
        </el-form-item>
        <el-form-item label="动态标题">
          <el-input
            v-model="comment_search.d_title"
            placeholder="请输入动态标题..."
            clearable
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getAllCommentInfo(1)"
            >查询</el-button
          >
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <pre>{{ comment_tableData[0] }}</pre> -->
    <el-table
      :data="comment_tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="create_time"
      border
      :tree-props="{ children: 'reply_list' }"
      v-if="comment_tableData"
    >
      <!-- 自定义index -->
      <el-table-column type="index" label="序号" width="80" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.index }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="c_content" label="评论内容" header-align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.to_uId">回复@{{ scope.row.to_uName }}： </span>
          <span>{{ scope.row.c_content }}</span>
        </template>
      </el-table-column>

      <el-table-column label="评论人" align="center">
        <template slot-scope="scope">
          <span>{{
            scope.row.info_name ? scope.row.info_name : scope.row.from_uName
          }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="评论动态(ID)" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.d_id">
            <router-link
              :to="{
                path: 'dynamic-management',
                query: { d_id: scope.row.d_id },
              }"
            >
              {{ scope.row.d_title }}
              <span>({{ scope.row.d_id }})</span>
            </router-link>
          </div>
          <div v-else>- -</div>
        </template>
      </el-table-column>

      <el-table-column label="评论时间" align="center">
        <template slot-scope="scope">
          {{ $moment(scope.row.create_time).format("lll") }}
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="deleteComment(scope)" type="text">删除</el-button>
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
    return {
      comment_tableData: "",
      comment_info: "",
      comment_search: {
        c_content: "",
        c_status: 1,
        info_name: "",
        d_id: "",
        d_title: "",
      },
      pageInfo: {
        pageNo: 1,
        pageSize: 5,
        totalSize: 0,
      },
    };
  },
  created() {
    if (this.d_id) {
      this.comment_search.d_id = this.d_id;
    }
    this.getAllCommentInfo();
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
  watch: {},
  methods: {
    // 获取所有评论信息
    getAllCommentInfo() {
      let params = {
        pageNo: this.pageInfo.pageNo,
        pageSize: this.pageInfo.pageSize,
        c_content: this.comment_search.c_content,
        c_status: this.comment_search.c_status,
        info_name: this.comment_search.info_name,
        d_id: this.comment_search.d_id,
        d_title: this.comment_search.d_title,
      };
      console.log(params);
      this.$http
        .post("/admin/getAllCommentInfo", params)
        .then((res) => {
          if (res && res.status == 200 && res.data) {
            this.comment_tableData = res.data.commentInfoList;
            this.pageInfo.totalSize = res.data.length;
            if (this.comment_tableData.length > 0) {
              this.comment_tableData.forEach((item, index) => {
                this.comment_tableData[index].reply_list = JSON.parse(
                  item.reply_list
                );
              });
              this.setTableIndex(this.comment_tableData);
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

    // 树形列表index层级，实现方法
    setTableIndex(arr, index) {
      const page = this.pageInfo.pageNo;
      const pageSize = this.pageInfo.pageSize;
      arr.forEach((item, key) => {
        item.index = (page - 1) * pageSize + key + 1;
        if (index) {
          item.index = (page - 1) * pageSize + index + "-" + (key + 1);
        }
        if (item.reply_list) {
          this.setTableIndex(item.reply_list, item.index);
        }
      });
    },
    // 改变分页大小
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.pageInfo.pageNo = 1;
      this.getAllCommentInfo();
    },

    // 改变分页页码
    handleCurrentChange(val) {
      this.pageInfo.pageNo = val;
      this.getAllCommentInfo();
    },

    // 删除评论
    deleteComment(data) {
      if (data.info_fk_uId) {
        console.log(data);
        console.log("评论");
      } else {
        console.log(data);
        console.log("回复");
      }
    },

    // 重置
    reset() {
      this.comment_search = {
        c_content: "",
        c_status: 1,
        info_name: "",
        d_id: "",
        d_title: "",
      };
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
</style>
