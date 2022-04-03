<template>
  <div class="container">
    <h3 class="title">欢迎登陆校园社交网后台管理系统</h3>

    <div class="admin-name">
      你好，管理员：
      <span>{{ adminInfo.admin_name }}， </span>
      <el-button type="text" @click="adminLogout">退出</el-button>
    </div>

    <div class="admin-detail">
      <div class="detail-item item-left">
        <p>用户总数<span>222</span>个</p>
        <p>今日发布<span>222</span>条动态</p>
        <p>待处理<span>222</span>个问题</p>
      </div>
      <div class="detail-item">
        <p>管理员总数<span>222</span>个</p>
        <p>历史发布<span>222</span>条动态</p>
        <p>已处理<span>222</span>个问题</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        admin_tel: "",
        admin_pass: "",
      },
    };
  },
  watch: {},
  created() {},
  computed: {
    adminInfo() {
      return JSON.parse(localStorage.getItem("admin_info")) || "";
    },
  },
  methods: {
    // 管理员登出
    adminLogout() {
      this.$confirm("确定退出登录？")
        .then(() => {
          this.$store.dispatch("LOG_OUT");
          this.$message({
            message: "退出成功",
            type: "success",
          });
          setTimeout(() => {
            this.$router.push({ path: "/" });
            this.$router.go(0);
          }, 500);
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  .title {
    margin-top: 30px;
    margin-left: 350px;
    color: #409eff;
    font-size: 34px;
    letter-spacing: 2.5px;
  }
  .admin-name {
    margin-left: 530px;
    margin-top: 20px;
    font-size: 20px;
    span {
      color: rgb(50, 145, 135);
    }
  }

  .admin-detail {
    display: flex;
    height: 500px;
    margin-left: 100px;
    margin-top: 40px;
    text-align: center;
    letter-spacing: 2.5px;
    justify-content: center;
    p {
      font-size: 24px;
      margin-bottom: 120px;
      color: #708ba6;
    }
    span {
      font-size: 38px;
      font-weight: 900;
      color: #17416c;
      margin-left: 5px;
      margin-right: 5px;
    }
  }
  .detail-item {
    width: 500px;
  }

  .item-left {
    margin-right: 100px;
  }
}
</style>

