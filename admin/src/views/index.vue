<template>
  <div>
    <p>你好，xxxxxx</p>
    <p>今日发布xx条动态，历史发布xx条动态</p>
    <p>待处理xx个问题</p>
    <el-button type="primary" @click="adminLogout">退出</el-button>
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
</style>

