<template>
  <div class="container">
    <!-- 左侧背景 -->
    <div class="left">
      <img src="../static/login.png" class="background" />
      <img src="../static/login-logo.png" class="left-logo" />
    </div>
    <!-- 右侧背景 -->
    <div class="right">
      <img src="../static/login-right-logo.png" class="right-logo" />
      <p class="title1">正发生</p>
      <p class="title2">立即加入 Campus。</p>
      <div class="btn1">
        <el-button type="primary" round @click="registVisible = true"
          >快速注册</el-button
        >
      </div>
      <p class="title3">已有帐号？</p>
      <div class="btn2">
        <el-button type="primary" round @click="loginVisible = true"
          >登录</el-button
        >
      </div>
    </div>

    <!-- 注册框 -->
    <el-dialog class="dialog regist" :visible.sync="registVisible">
      <template slot="title" class="title-logo">
        <img src="../static/login-right-logo.png" alt="" />
      </template>
      <p class="dialog-title">注册Campus</p>
      <el-form
        :model="registForm"
        status-icon
        :rules="rules"
        ref="registForm"
        label-width="100px"
        class="demo-registForm"
        label-position="left"
      >
        <el-form-item label="用户名" prop="u_name">
          <el-input
            v-model="registForm.u_name"
            maxlength="15"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="密码" prop="u_pass">
          <el-input
            type="password"
            v-model="registForm.u_pass"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="registForm.checkPass"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="u_tel">
          <el-input
            v-model="registForm.u_tel"
            @blur="checkTelRepeat(registForm.u_tel)"
          />
        </el-form-item>

        <!-- 注册操作栏 -->
        <el-form-item class="form-operation">
          <el-button type="primary" @click="submitForm('registForm')"
            >注册</el-button
          >
          <el-button @click="resetForm('registForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 登录框 -->
    <el-dialog class="dialog login" :visible.sync="loginVisible">
      <template slot="title" class="title-logo">
        <img src="../static/login-right-logo.png" alt="" />
      </template>
      <p class="dialog-title">登录Campus</p>
      <el-input v-model="loginForm.u_tel" placeholder="请输入手机号码" />
      <el-input
        placeholder="请输入密码"
        v-model="loginForm.u_pass"
        show-password
      />
      <el-button type="primary" round @click="userLogin">登录</el-button>
      <p class="login-reminder">
        还没有账号？
        <el-button type="text" @click="openRegistDialog">注册</el-button>
      </p>
    </el-dialog>

    <div class="return">
      <router-link to="/" class="nav-title">
        <img src="../static/return.png" alt="" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    // 用户名校验
    var checkName = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    // 密码校验
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registForm.checkPass !== "") {
          this.$refs.registForm.validateField("checkPass");
        }
        callback();
      }
    };
    // 二次密码校验
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registForm.u_pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    // 手机号校验
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
        // 所以我就在前面加了一个+实现隐式转换
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else if (value) {
          if (this.userTelRepeatMsg) {
            return callback(new Error(this.userTelRepeatMsg));
          } else {
            callback();
          }
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    };
    return {
      verificationCodeStatus: false,
      // 用户名重复提醒
      userTelRepeatMsg: "",
      // 对话框显示
      registVisible: false,
      loginVisible: false,
      // 登录表单数据
      loginForm: {
        u_tel: "",
        u_pass: "",
      },
      // 注册表单数据
      registForm: {
        u_name: "",
        u_pass: "",
        checkPass: "",
        u_tel: "",
      },
      // 注册表单验证规则
      rules: {
        u_name: [{ validator: checkName, trigger: "blur" }],
        u_pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        u_tel: [{ validator: checkPhone, trigger: "blur" }],
      },
    };
  },
  watch: {
    // 监听登录框显示
    loginVisible() {
      this.loginForm = {
        u_tel: "",
        u_pass: "",
      };
    },
    // 监听注册框显示
    registVisible() {
      if (this.registVisible == false) this.resetForm("registForm");
    },
  },
  methods: {
    // 登录框中打开注册框
    openRegistDialog() {
      this.loginVisible = false;
      this.registVisible = true;
    },
    // 提交注册表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.userRegist();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置注册表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 用户注册接口
    userRegist() {
      let { u_name, u_pass, u_tel } = this.registForm;
      let params = {
        u_name,
        u_pass,
        u_tel,
      };
      this.$http
        .post("/user/userRegist", params)
        .then((res) => {
          // console.log(res);
          if (res && res.status == 200) {
            this.$message({
              message: "注册成功",
              type: "success",
            });
            setTimeout(() => {
              this.registVisible = false;
            }, 3000);
          } else {
            this.$message.error("注册失败");
          }
        })
        .catch((e) => {
          console.log(e);
          this.$message({
            message: e,
            type: "warning",
          });
        });
    },
    // 用户电话重复接口
    checkTelRepeat(u_tel) {
      let params = {
        u_tel,
      };
      this.$http.post("/user/checkTelRepeat", params).then((res) => {
        console.log(res);
        if (res.data.userDetails.length > 0) {
          this.userTelRepeatMsg = "该电话号码已注册";
        } else {
          this.userTelRepeatMsg = "";
        }
        this.$refs.registForm.validateField("u_tel");
      });
    },
    // 用户登录接口
    userLogin() {
      if (!this.loginForm.u_tel) {
        this.$message({
          message: "请输入手机号码",
          type: "warning",
        });
        return;
      }
      if (!this.loginForm.u_pass) {
        this.$message({
          message: "请输入密码",
          type: "warning",
        });
        return;
      }
      this.$http
        .post("/user/userLogin", this.loginForm)
        .then((res) => {
          if (res.status == 200 && res.data.userInfo) {
            let { token, userInfo } = res.data;
            //存token
            this.$store.dispatch("SET_TOKEN", token);
            this.$store.dispatch("SET_USERINFO", JSON.stringify(userInfo[0]));
            this.$router.push("/");
            this.$message({
              message: "登录成功",
              type: "success",
            });
            setTimeout(() => {
              this.registVisible = false;
            }, 3000);
          } else if (res.data.message == "已注销") {
            this.$message.error("该账号已被管理员注销！");
            this.loginForm = {
              u_tel: "",
              u_pass: "",
            };
          } else {
            this.$message.error("密码错误,请重试！");
            this.loginForm = {
              u_tel: "",
              u_pass: "",
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
.container {
  width: 100%;
  height: 100vh;
  display: flex;
}

.left {
  flex: 105;
  position: relative;
  .background {
    width: 100%;
    height: 100%;
  }
  .left-logo {
    position: absolute;
    width: 50%;
    height: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
  }
}

.right {
  flex: 90;
  display: inline-block;
  padding-left: 50px;
  padding-top: 40px;
  .right-logo {
    width: 80px;
    height: 80px;
  }
  .title1 {
    font-size: 80px;
    font-weight: 900;
    margin-top: 50px;
  }
  .title2 {
    font-size: 40px;
    font-weight: 900;
    margin-top: 70px;
  }
  .el-button--primary {
    width: 390px;
    height: 45px;
    border-radius: 120px;
    font-size: 20px;
    font-weight: 600;
  }
  .btn1 {
    margin-top: 50px;
    .el-button--primary {
      color: #fff;
      background-color: #1d9bfd;
      border-color: #1d9bfd;
    }
    .el-button--primary:hover {
      background-color: #1a8cdb;
      border-color: #1a8cdb;
    }
  }
  .title3 {
    margin-top: 150px;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 900;
    margin-top: 70px;
  }
  .btn2 {
    .el-button--primary {
      color: #1a8cdb;
      background-color: #fff;
      border-color: #cfd9de;
    }
    .el-button--primary:hover {
      background-color: #e8f5fd;
      border-color: #cfd9de;
    }
  }
}
/deep/ .el-dialog {
  width: 36%;
  border-radius: 20px;
  padding: 0 130px 100px;
}

/deep/ .el-dialog__header {
  text-align: center;
  img {
    width: 40px;
    height: 40px;
  }
}

/deep/ .el-dialog__body {
  padding: 0;
}

.test {
  padding-left: 160px;
}

.dialog-title {
  font-size: 24px;
  font-weight: 900;
  color: #000;
}

.login {
  /deep/ .el-dialog {
    padding-bottom: 20px !important;
  }
  // .login-reminder {
  //   margin-top: 50px;
  // }
  .el-button--primary {
    margin-top: 30px;
    color: #fff;
    background-color: #000;
    border-color: #000;
  }
  .el-button--primary:hover {
    color: #fff;
    background-color: #272c30;
    border-color: #272c30;
  }
  /deep/ .el-input {
    margin-top: 20px;
  }
  .el-button--primary {
    width: 287.08px;
    font-size: 18px;
    font-weight: 600;
  }
}

.regist {
  /deep/ .el-dialog {
    margin-top: 160px !important;
  }

  /deep/ .el-dialog {
    padding: 0 30px 10px !important;
  }

  /deep/ .el-icon-circle-check {
    color: rgb(50, 194, 50);
  }

  .demo-registForm {
    margin-top: 20px;
  }

  .form-operation {
    /deep/ .el-form-item__content {
      margin-left: 0px !important;
      text-align: center;
    }
    /deep/.el-button--primary,
    .el-button--default {
      width: 150px !important;
      border-radius: 20px;
    }
  }
}

.return {
  position: fixed;

  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  a {
    text-decoration: none;
    color: #1a8cdb;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
