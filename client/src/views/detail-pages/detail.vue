<template>
  <div class="container">
    <!-- <pre>{{ d_detail }}</pre> -->
    <div class="title">
      {{ d_detail.d_title }}
    </div>

    <div class="detail">
      {{ d_detail.d_type }}·{{ $moment(d_detail.createTime).format("lll") }}
    </div>

    <div class="content">
      {{ d_detail.d_content }}
    </div>

    <div class="pic">
      <div v-for="(item, index) in picList" :key="index">
        <img :src="item" alt="" />
      </div>
    </div>

    <div class="edit-time" v-if="d_detail.updateTime != d_detail.createTime">
      最后编辑于：{{ $moment(d_detail.updateTime).format("lll") }}
    </div>

    <!-- 快进 -->
    <div class="fast-forward">
      <div class="last-dynamic">
        上一篇:
        <p v-if="last_dynamic">
          <router-link
            :to="{ path: 'detail', query: { d_id: last_dynamic.d_id } }"
            >{{ last_dynamic.d_title }}
          </router-link>
        </p>
        <p v-else>没有了..</p>
      </div>
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

    <div class="comment">
      <p class="add-new-comment">添加新评论</p>
      <div class="comment-input">
        <el-input
          type="textarea"
          placeholder="在这里输入你的评论..."
          :autosize="{ minRows: 5, maxRows: 5 }"
          v-model="content_val"
          maxlength="300"
          show-word-limit
        />
        <el-button type="primary" @click="publishComment">提交评论</el-button>
      </div>

      <div class="comment-output" v-if="commentsList.length > 0">
        已有 {{ commentsList.length }} 条评论
      </div>

      <div class="comment-output" v-else>暂无评论</div>

      <div
        v-for="(item, index) in commentsList"
        :key="index"
        class="comment-detail"
      >
        <!-- <pre>{{ item }}</pre> -->

        <div class="floor">第{{ index + 1 }}楼</div>
        <img :src="item.info_avatar" alt="" />

        <div class="info">
          <p class="name">{{ item.info_name }}</p>
          <p class="time">
            {{ $moment(item.create_time).format("lll") }}
          </p>
          <p class="contents">{{ item.c_content }}</p>
        </div>
      </div>
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
      last_dynamic: "",
      next_dynamic: "",
      picList: "",
      // 评论列表
      commentsList: [],
    };
  },
  computed: {
    userInfo() {
      return JSON.parse(localStorage.getItem("userInfo"));
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
            this.picList = this.d_detail.d_pictures.split(",");
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
            console.log(res.data.commentsList);
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
      const userInfo = this.userInfo;
      let params = {
        from_uId: userInfo.u_id || "",
        to_uId: 0,
        c_content: this.content_val,
        c_fk_dId: this.d_id,
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
          } else {
            this.$message.error("评论失败");
          }
        })
        .catch((e) => {
          this.$message({
            message: e,
            type: "warning",
          });
        });
      console.log(params);
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

.edit-time {
  margin-left: 550px;
  color: #7a7676bc;
}

.pic {
  margin-top: 10px;
  text-align: center;
}

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
.comment {
  margin-top: 50px;
  .add-new-comment {
    color: #409eff;
    font-size: 28px;
    margin-bottom: 30px;
  }
  // .comment-input {
  //   // height: 120px;
  // }
}
.el-button--primary {
  width: 100%;
  margin-top: 30px;
}

.comment-output {
  margin-top: 40px;
  font-size: 28px;
  margin-bottom: 20px;
}
.comment-detail {
  position: relative;
  height: 120px;
  margin-bottom: 20px;
  padding: 10px 10px 0 10px;
  // border-bottom: 3px solid rgb(243, 243, 243);
  z-index: -1;

  .floor {
    margin-left: 20px;
    margin-bottom: 5px;
  }
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .info {
    .name {
      position: absolute;
      top: 40px;
      left: 100px;
      color: rgb(55, 129, 179);
      font-size: 16px;
    }
    .time {
      position: absolute;
      top: 65px;
      left: 100px;
      font-size: 13px;
    }
    .contents {
      position: absolute;
      top: 90px;
      left: 100px;
      font-size: 20px;
    }
  }
}

.el-textarea {
  position: static;
}
</style>
