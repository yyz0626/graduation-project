<template>
  <div class="container">
    <el-form
      :model="userInfo"
      status-icon
      ref="userInfo"
      :rules="rules"
      label-width="100px"
      label-position="left"
      v-if="userInfo.u_id"
    >
      <el-form-item label="头像" prop="u_phone">
        <el-upload
          class="photo-uploader"
          :action="domain"
          :http-request="upqiniu"
          :before-upload="beforeUpload"
        >
          <el-avatar :size="100" :src="userInfo.u_avatar" />
        </el-upload>
      </el-form-item>
      <el-form-item label="联系电话" prop="u_phone">
        <el-input v-model="userInfo.u_phone" :disabled="true" />
      </el-form-item>
      <el-form-item label="性别" prop="u_gender">
        <el-radio-group v-model="userInfo.u_gender" :disabled="true">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户名" prop="u_name">
        <el-input v-model="userInfo.u_name" />
      </el-form-item>
      <el-form-item label="生日" prop="u_age">
        <el-date-picker
          v-model="userInfo.u_age"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>

      <el-form-item label="Email" prop="u_email">
        <el-input v-model="userInfo.u_email" />
      </el-form-item>
      <el-form-item label="兴趣爱好" prop="u_hobby">
        <el-select
          v-model="hobby"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择兴趣爱好"
        >
          <el-option
            v-for="item in hobbyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 注册操作栏 -->
      <el-form-item class="form-operation">
        <el-button type="primary" @click="submitForm('userInfo')"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
    <div>
      <!-- 用户不存在 -->
      <!-- <no-data v-if="!postsId" /> -->
    </div>
  </div>
</template>

<script>
// import noData from "../components/no-data.vue";
export default {
  components: {
    // "no-data": noData,
  },
  data() {
    // 生日校验
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("生日不能为空"));
      } else {
        callback();
      }
    };
    // 用户名校验
    var checkName = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else if (value) {
        if (this.userNameRepeatMsg) {
          return callback(new Error(this.userNameRepeatMsg));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    // 邮箱校验
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };
    return {
      u_id: this.$route.query.u_id,
      userInfo: "",
      activeName: "first",
      hobbyOptions: [
        {
          value: "唱",
          label: "唱",
        },
        {
          value: "跳",
          label: "跳",
        },
        {
          value: "rap",
          label: "rap",
        },
        {
          value: "篮球",
          label: "篮球",
        },
      ],
      hobby: [],
      // 个人信息表单验证规则
      rules: {
        u_age: [{ validator: checkAge, trigger: "blur" }],
        u_name: [{ validator: checkName, trigger: "blur" }],
        u_email: [{ validator: checkEmail, trigger: "blur" }],
      },
      // 七牛云的上传地址，根据自己所在地区选择，我这里是华东区
      domain: "https://upload-z2.qiniup.com",
      // 这是七牛云空间的外链默认域名
      qiniuaddr: "r8jcjikss.hn-bkt.clouddn.com",
    };
  },
  created() {
    this.getUserInfoById(this.u_id);
  },
  watch: {
    userInfo: {
      handler() {
        if (this.userInfo.u_avatar == null) {
          console.log(this.userInfo);
          console.log(1);
          this.userInfo.u_avatar =
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
        }
      },
      deep: true,
    },
  },
  methods: {
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateUserInfo();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 根据用户id获取用户信息接口
    getUserInfoById(u_id) {
      let params = {
        u_id,
      };
      this.$http
        .post("/user/getUserInfoById", params)
        .then((res) => {
          // console.log(res);
          if (res && res.status == 200) {
            this.userInfo = res.data.userInfo[0];
            this.hobby = this.userInfo.u_hobby.split(",");
          }
        })
        .catch((e) => {
          this.$message({
            message: e,
            type: "warning",
          });
        });
    },

    // 更新用户信息接口
    updateUserInfo() {
      let params = {
        u_name: this.userInfo.u_name,
        u_age: this.$moment(this.userInfo.u_age).format("YYYY-MM-DD"),
        u_email: this.userInfo.u_email,
        u_hobby: this.hobby.toString(),
        u_id: this.userInfo.u_id,
        u_avatar: this.userInfo.u_avatar,
      };
      this.$http
        .post("/user/updateUserInfo", params)
        .then((res) => {
          // console.log(res);
          if (res && res.status == 200 && res.data.userInfo) {
            this.$message({
              message: "保存成功",
              type: "success",
            });
            console.log(this.userInfo.u_avatar);
            this.getUserInfoById(this.u_id);
            // this.$store.dispatch("UPDATE_USERINFO");
            this.$store.dispatch("SET_USERINFO", JSON.stringify(this.userInfo));
            this.$router.go(0);
          } else {
            this.$message.error("保存失败！");
          }
        })
        .catch((e) => {
          this.$message({
            message: e,
            type: "warning",
          });
        });
    },

    // 上传文件到七牛云
    upqiniu(req) {
      // console.log(req);
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      let filetype = "";
      if (req.file.type === "image/png") {
        filetype = "png";
      } else {
        filetype = "jpg";
      }
      console.log();
      // 重命名要上传的文件
      const keyname =
        "yyz" + "-" + req.file.name.split(".")[0] + "." + filetype;
      // console.log(keyname);
      // 从后端获取上传凭证token
      this.$http.get("/user/getQiNiuToken").then((res) => {
        // console.log(res);
        const formdata = new FormData();
        formdata.append("file", req.file);
        formdata.append("token", res.data.uploadToken);
        formdata.append("key", keyname);
        // 获取到凭证之后再将文件上传到七牛云空间
        this.$http.post(this.domain, formdata, config).then((res) => {
          // console.log(res);
          this.userInfo.u_avatar =
            "http://" + this.qiniuaddr + "/" + res.data.key;
        });
      });
    },
    // 验证文件合法性
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 830px;
  margin: 0 auto;
  padding-top: 20px;
}
.photo-uploader {
  display: inline-block;
}
/deep/ .el-upload-list {
  display: none !important;
}
</style>
