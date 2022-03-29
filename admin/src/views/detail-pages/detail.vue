<template>
  <div class="container" v-if="d_detail">
    <!-- 动态信息 -->
    <div class="dynamic-info">
      <div class="title">
        {{ d_detail.d_title }}
      </div>

      <div class="detail">
        {{ d_detail.d_type }} ·
        {{ $moment(d_detail.createTime).format("lll") }} ·
        {{ d_detail.d_fk_uName }}
      </div>

      <div class="content">
        {{ d_detail.d_content }}
      </div>

      <div class="pic" v-if="picList.length > 0">
        <div v-for="(item, index) in picList" :key="index">
          <img :src="item" alt="" />
        </div>
      </div>

      <div class="edit-time" v-if="d_detail.updateTime != d_detail.createTime">
        最后编辑于：{{ $moment(d_detail.updateTime).format("lll") }}
      </div>
    </div>

    <!-- 快进 -->
    <div class="fast-forward">
      <!-- 上一篇 -->
      <div>
        上一篇:
        <p v-if="last_dynamic">
          <router-link
            :to="{ path: 'detail', query: { d_id: last_dynamic.d_id } }"
            >{{ last_dynamic.d_title }}
          </router-link>
        </p>
        <p v-else>没有了..</p>
      </div>
      <!-- 下一篇 -->
      <div>
        下一篇:
        <p v-if="next_dynamic">
          <router-link
            :to="{ path: 'detail', query: { d_id: next_dynamic.d_id } }"
            >{{ next_dynamic.d_title }}
          </router-link>
        </p>
        <p v-else>没有了..</p>
      </div>
    </div>

    <!-- 评论信息 -->
    <div class="comment">
      <!-- 评论框 -->
      <div class="comment-input">
        <p class="add-new-comment">添加新评论</p>
        <el-input
          type="textarea"
          placeholder="在这里输入你的评论..."
          :autosize="{ minRows: 5, maxRows: 5 }"
          v-model="content_val"
          maxlength="300"
        />
        <p class="limit">{{ content_val.length }}/300</p>
        <el-button type="primary" @click="publishComment">提交评论</el-button>
      </div>

      <!-- 评论区 -->
      <div class="comment-output">
        <!-- 评论条数 -->
        <div class="comment-output-title">
          <p v-if="commentsList.length > 0">
            已有 {{ commentsList.length }} 条评论
          </p>
          <p v-else>暂无评论</p>
        </div>

        <!-- 评论列表 -->
        <div
          v-for="(item, index) in commentsList"
          :key="index"
          class="comment-output-detail"
        >
          <div class="comment-output-detail-left">
            <div class="floor">第{{ index + 1 }}楼</div>
            <img :src="item.info_avatar" />
          </div>

          <div class="info">
            <p class="name">{{ item.info_name }}</p>
            <p class="time">
              {{ $moment(item.create_time).format("lll") }}
            </p>
            <p class="contents">
              {{ item.c_content }}
            </p>
          </div>
          <div class="reply-button">
            <el-button type="text" @click="reply(item)">回复</el-button>
          </div>

          <!-- 评论回复 -->
          <div class="reply-list" v-if="JSON.parse(item.reply_list).length > 0">
            <div
              v-for="(reply, replyIndex) in JSON.parse(item.reply_list)"
              :key="replyIndex"
              class="reply-list-item"
            >
              <div class="reply-list-item-left">
                <img :src="reply.info_avatar" />
              </div>
              <div class="reply-list-item-right">
                <p class="name">{{ reply.from_uName }}</p>
                <p class="time">
                  {{ $moment(reply.create_time).format("lll") }}
                </p>
                <p class="contents">
                  <span v-if="reply.to_uId" style="margin-right: 10px"
                    >@{{ reply.to_uName }}</span
                  >{{ reply.c_content }}
                </p>
              </div>
              <div class="reply-buttons">
                <el-button type="text" @click="reply_in_floor(reply, item)"
                  >回复</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 回复对话框 -->
      <el-dialog title="评论回复" :visible.sync="dialogVisible" width="30%">
        <!-- <span>这是一段信息</span> -->
        <el-input
          type="textarea"
          placeholder="在这里输入你的评论..."
          :autosize="{ minRows: 5, maxRows: 5 }"
          v-model="content_diglog_val"
          maxlength="300"
          show-word-limit
        />
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="replyComment">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- <no-data v-if="!postsId" /> -->
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
      d_id: this.$route.query.d_id,
      d_detail: "",
      content_val: "",
      content_diglog_val: "",
      last_dynamic: "",
      next_dynamic: "",
      picList: "",
      reply_info: "",
      reply_info_in_floor: "",
      // 评论对话框显示
      dialogVisible: false,
      // 评论列表
      commentsList: [],
      replyList: "",
    };
  },
  computed: {
    userInfo() {
      return JSON.parse(localStorage.getItem("userInfo")) || "";
    },
  },
  watch: {
    dialogVisible() {
      this.content_diglog_val = "";
    },
  },
  created() {
    this.getDynamicDetailById(this.d_id);
    this.getCommentsById(this.d_id);
  },
  methods: {
    // 根据动态id获取动态信息
    getDynamicDetailById(d_id) {
      let params = {
        d_id,
      };
      this.$http
        .post("/dynamic/getDynamicDetailById", params)
        .then((res) => {
          if (res && res.status == 200 && res.data) {
            this.d_detail = res.data.dynamicList[0];
            this.last_dynamic = res.data.lastDynamic[0];
            this.next_dynamic = res.data.nextDynamic[0];
            this.picList = this.d_detail.d_pictures
              ? this.d_detail.d_pictures.split(",")
              : [];
          }
        })
        .catch((e) => {
          this.$message({
            message: e,
            type: "warning",
          });
        });
    },

    // 评论查询
    getCommentsById(c_fk_dId) {
      let params = {
        c_fk_dId,
      };
      this.$http
        .post("/dynamic/getCommentsById", params)
        .then((res) => {
          if (res && res.status == 200 && res.data) {
            this.commentsList = res.data.commentsList;
            // console.log(res.data.commentsList);
          }
        })
        .catch((e) => {
          this.$message({
            message: e,
            type: "warning",
          });
        });
    },

    // 发表评论
    publishComment() {
      if (!this.content_val) {
        this.$message({
          showClose: true,
          message: "评论不能为空哦~",
          type: "warning",
        });
        return;
      }
      const userInfo = this.userInfo;
      // console.log(userInfo);
      let params = {
        from_uId: userInfo.u_id || "",
        c_content: this.content_val,
        c_fk_dId: this.d_id || "",
      };
      this.$http
        .post("/dynamic/publishComment", params)
        .then((res) => {
          if (res && res.status == 200) {
            this.$message({
              message: "评论成功",
              type: "success",
            });
            this.dialogFormVisible = false;
            setTimeout(() => {
              this.$router.go(0);
            }, 1000);
            this.content_val = "";
          }
        })
        .catch((e) => {
          this.$message({
            message: e,
            type: "warning",
          });
        });
    },

    // 每层楼评论回复按钮
    reply(item) {
      this.dialogVisible = true;
      this.reply_info = item;
    },

    reply_in_floor(reply, item) {
      this.dialogVisible = true;
      this.reply_info_in_floor = reply;
      this.reply_info = item;
    },

    // 回复评论
    replyComment() {
      if (!this.content_diglog_val) {
        this.$message({
          showClose: true,
          message: "回复不能为空哦~",
          type: "warning",
        });
        return;
      }
      const userInfo = this.userInfo;
      const reply_info = this.reply_info;
      const reply_info_in_floor = this.reply_info_in_floor;
      let obj = {
        from_uId: userInfo.u_id || "",
        from_uName: userInfo.info_name,
        to_uId: reply_info_in_floor
          ? reply_info_in_floor.from_uId
          : reply_info.from_uId,
        to_uName: reply_info_in_floor
          ? reply_info_in_floor.from_uName
          : reply_info.info_name,
        c_content: this.content_diglog_val,
        create_time: new Date(),
        info_avatar: userInfo.info_avatar,
      };
      // console.log(userInfo, reply_info, obj);
      this.replyList = JSON.parse(reply_info.reply_list);
      this.replyList.push(obj);
      let params = {
        reply_fk_cId: reply_info.c_id,
        reply_list: JSON.stringify(this.replyList),
      };

      this.$http
        .post("/dynamic/replyComment", params)
        .then((res) => {
          if (res && res.status == 200) {
            this.$message({
              message: "回复成功",
              type: "success",
            });
            this.dialogFormVisible = false;
            setTimeout(() => {
              this.$router.go(0);
            }, 1000);
            this.content_val = "";
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
  width: 830px;
  margin: 0 auto;
  padding-top: 30px;
  a {
    text-decoration: none;
  }
}

// 动态信息
.dynamic-info {
  .title {
    text-align: center;
    font-size: 44px;
  }
  .detail {
    text-align: center;
    margin-top: 10px;
  }
  .content {
    margin-top: 15px;
    text-indent: 2em;
    line-height: 30px;
    font-size: 18px;
  }
  .pic {
    margin-top: 10px;
    text-align: center;
    img {
      max-width: 830px;
    }
  }
  .edit-time {
    margin-left: 550px;
    color: #7a7676bc;
  }
}

// 快进
.fast-forward {
  height: 120px;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  padding: 20px;
  border-radius: 10px;
  color: #409eff;
  border: 1px solid #409eff;
  box-sizing: border-box;
  p {
    color: black;
    margin-top: 5px;
  }
}

// 评论信息
.comment {
  margin-top: 50px;
}

.comment-input {
  margin-bottom: 40px;
  .add-new-comment {
    color: #409eff;
    font-size: 28px;
    margin-bottom: 30px;
  }
  .el-button--primary {
    width: 100%;
    margin-top: 30px;
  }
  .el-textarea {
    // z-index: -1;
    position: static;
  }
  .limit {
    float: right;
    margin-top: 5px;
    font-size: 14px;
    color: rgb(182, 182, 182);
  }
}

.comment-output {
  .comment-output-title {
    font-size: 28px;
    margin-bottom: 20px;
  }

  .comment-output-detail {
    margin-bottom: 20px;
    padding: 10px 10px 0 10px;
    // border-bottom: 3px solid rgb(246, 246, 246);

    .comment-output-detail-left {
      display: inline-block;
      vertical-align: top;
      .floor {
        margin-left: 20px;
        margin-bottom: 5px;
      }
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }

    .info {
      display: inline-block;
      vertical-align: top;
      width: 690px;
      margin-top: 25px;
      margin-left: 10px;

      .name {
        color: rgb(55, 129, 179);
        font-size: 16px;
      }
      .time {
        margin-top: 5px;
        font-size: 13px;
      }
      .contents {
        margin-top: 5px;
        font-size: 20px;
      }
    }

    .reply-button {
      display: inline-block;
      // height: 100%;
      // margin-left: 550px;
      font-size: 16px;
    }

    .reply-list {
      margin-left: 120px;
      padding-left: 10px;
      border-left: 3px solid rgb(246, 246, 246);
      .reply-list-item {
        width: 700px;
        // background-color: red;
        margin-bottom: 20px;
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
        .reply-list-item-left {
          display: inline-block;
          vertical-align: top;
          width: 100px;
          height: 80px;
        }
        .reply-list-item-right {
          display: inline-block;
          vertical-align: top;
          width: 547px;
          margin-top: 15px;
          .name {
            color: rgb(55, 129, 179);
            font-size: 16px;
          }
          .time {
            margin-top: 5px;
            font-size: 13px;
          }
          .contents {
            margin-top: 5px;
            font-size: 20px;
          }
        }
        .reply-buttons {
          display: inline-block;
          // height: 100%;
          // margin-left: 550px;
          font-size: 16px;
          // margin-left: 10px;
        }
      }
    }
  }
}
</style>
