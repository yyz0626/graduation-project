<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">校园社交网后台管理系统</h3>
      </div>

      <el-form-item prop="admin_tel">
        <el-input
          ref="admin_tel"
          v-model="loginForm.admin_tel"
          placeholder="请输入管理员账号..."
          name="admin_tel"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="admin_pass">
        <el-input
          ref="admin_pass"
          v-model="loginForm.admin_pass"
          show-admin_pass
          placeholder="请输入管理员密码..."
          name="admin_pass"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click="submitForm('loginForm')"
        >立即登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    // 用户名校验
    var checkName = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    // 密码校验
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        admin_tel: "",
        admin_pass: "",
      },
      loginRules: {
        admin_tel: [{ validator: checkName, trigger: "blur" }],
        admin_pass: [{ validator: validatePass, trigger: "blur" }],
      },
      loading: false,
    };
  },
  watch: {},
  methods: {
    // 提交注册表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.adminLogin();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 管理员登录
    adminLogin() {
      this.$http
        .post("/admin/adminLogin", this.loginForm)
        .then((res) => {
          if (res && res.status == 200 && res.data.admin_token) {
            let { admin_token, admin_info } = res.data;
            // //存token
            this.$store.dispatch("SET_ADMIN_TOKEN", admin_token);
            this.$store.dispatch(
              "SET_ADMIN_INFO",
              JSON.stringify(admin_info[0])
            );
            this.$message({
              message: "登录成功",
              type: "success",
            });
            this.$router.push("/");
          } else if (res.data.message == "已注销") {
            this.$message.error("该账号已被管理员注销！");
            this.loginForm = {
              admin_tel: "",
              admin_pass: "",
            };
          } else {
            this.$message.error("密码错误,请重试！");
            this.loginForm = {
              admin_tel: "",
              admin_pass: "",
            };
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
.login-container {
  background-color: #f3f6fa;
  overflow: hidden;

  height: 100%;
  width: 100%;
  position: fixed;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #409eff;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
