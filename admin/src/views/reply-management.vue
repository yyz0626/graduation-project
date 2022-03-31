<template>
  <div class="container">
    <pre>{{ comment_tableData[0] }}</pre>
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

      <el-table-column prop="address" label="评论动态" align="center">
        <template slot-scope="scope">
          <router-link
            :to="{
              path: 'dynamic-management',
              query: { d_id: scope.row.d_id },
            }"
          >
            {{ scope.row.d_title }}
          </router-link>
        </template>
      </el-table-column>

      <el-table-column label="评论时间" align="center">
        <template slot-scope="scope">
          {{ $moment(scope.row.create_time).format("lll") }}
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="deleteComment(scope.row)" type="text"
            >删除</el-button
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
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          childrens: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
          ],
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      comment_tableData: "",
      comment_info: "",
      pageInfo: {
        pageNo: 1,
        pageSize: 5,
        totalSize: 0,
      },
    };
  },
  computed: {
    userInfo() {
      return JSON.parse(localStorage.getItem("userInfo")) || "";
    },
  },
  watch: {},
  created() {
    this.getAllCommentInfo();
  },
  methods: {
    // 获取所有评论信息
    getAllCommentInfo() {
      let params = {
        pageNo: this.pageInfo.pageNo,
        pageSize: this.pageInfo.pageSize,
      };
      this.$http
        .post("/admin/getAllCommentInfo", params)
        .then((res) => {
          if (res && res.status == 200 && res.data) {
            this.comment_tableData = res.data.commentInfoList;
            this.pageInfo.totalSize = res.data.length;
            if (this.comment_tableData.length > 0) {
              this.setTableIndex(this.comment_tableData);
              this.comment_tableData.forEach((item, index) => {
                this.comment_tableData[index].reply_list = JSON.parse(
                  item.reply_list
                );
              });
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

    // 树形列表index层级，实现方法（可复制直接调用）
    setTableIndex(arr, index) {
      arr.forEach((item, key) => {
        item.index = key + 1;
        if (index) {
          item.index = index + "-" + (key + 1);
        }
        if (item.children) {
          this.setTableIndex(item.children, item.index);
        }
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
    deleteComment(data) {
      if (data.info_fk_uId) {
        console.log("评论");
      } else {
        console.log("回复");
      }
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
