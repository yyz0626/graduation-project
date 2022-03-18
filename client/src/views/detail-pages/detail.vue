<template>
  <div class="container">
    <!-- <pre>{{ d_detail }}</pre> -->
    <div class="title">
      {{ d_detail.d_title }}
    </div>

    <div class="detail">
      {{ d_detail.d_type }}·{{
        $moment(d_detail.createTime).format("YYYY-MM-DD HH:mm")
      }}
    </div>

    <div class="content">
      {{ d_detail.d_content }}
    </div>

    <div class="edit-time" v-if="d_detail.updateTime">
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
      <p>添加新评论</p>
      <div class="comment-input">
        <el-input
          type="textarea"
          placeholder="在这里输入你的评论..."
          :autosize="{ minRows: 5, maxRows: 5 }"
          v-model="content_val"
          maxlength="300"
          show-word-limit
        />
      </div>
    </div>
    <el-button type="primary">提交评论</el-button>
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
    };
  },
  created() {
    this.getDynamicDetailById(this.d_id);
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
            console.log(res.data);
            this.d_detail = res.data.dynamicList[0];
            this.last_dynamic = res.data.lastDynamic[0];
            this.next_dynamic = res.data.nextDynamic[0];
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
  margin-top: 20px;
  margin-left: 560px;
  color: #9da3a8;
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
  p {
    color: #409eff;
    font-size: 28px;
    margin-bottom: 30px;
  }
  .comment-input {
    // height: 120px;
  }
}
.el-button--primary {
  width: 100%;
  margin-top: 30px;
}
</style>
