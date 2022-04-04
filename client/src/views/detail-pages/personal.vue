<template>
  <div class="container">
    <!-- <pre>{{ userInfo }}</pre> -->
    <el-form
      :model="userInfo"
      status-icon
      ref="userInfo"
      :rules="rules"
      label-width="100px"
      label-position="left"
      v-if="userInfo.info_fk_uId"
    >
      <el-form-item label="头像">
        <el-upload
          class="photo-uploader"
          :action="domain"
          :http-request="upqiniu"
          :before-upload="beforeUpload"
        >
          <el-avatar :size="100" :src="userInfo.info_avatar" />
        </el-upload>
      </el-form-item>

      <el-form-item label="联系电话">
        <el-input v-model="userInfo.u_tel" :disabled="true" />
      </el-form-item>
      <el-form-item label="性别" prop="info_gender">
        <el-radio-group
          v-model="userInfo.info_gender"
          :disabled="this.userInfos.u_id != this.u_id"
        >
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户名" prop="info_name">
        <el-input
          v-model="userInfo.info_name"
          :disabled="this.userInfos.u_id != this.u_id"
        />
      </el-form-item>
      <el-form-item label="生日" prop="info_birthday">
        <el-date-picker
          v-model="userInfo.info_birthday"
          type="date"
          placeholder="选择日期"
          :disabled="this.userInfos.u_id != this.u_id"
        />
      </el-form-item>

      <el-form-item label="Email" prop="info_email">
        <el-input
          v-model="userInfo.info_email"
          :disabled="this.userInfos.u_id != this.u_id"
        />
      </el-form-item>
      <el-form-item label="兴趣爱好" prop="u_hobby">
        <el-select
          v-model="userInfo.info_hobby"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择兴趣爱好"
          :disabled="this.userInfos.u_id != this.u_id"
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
      <!-- 查看他的动态 -->
      <el-form-item
        label="ta的动态"
        prop="u_hobby"
        v-if="this.userInfos.u_id != this.u_id"
      >
        <router-link
          target="_blank"
          :to="{ path: 'personalDynamic', query: { u_id: this.u_id } }"
        >
          点击查看
        </router-link>
      </el-form-item>

      <!-- 注册操作栏 -->
      <el-form-item class="form-operation">
        <el-button
          type="primary"
          @click="submitForm('userInfo')"
          v-if="this.userInfos.u_id == this.u_id"
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
    var checkBirthday = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("生日不能为空"));
      } else {
        callback();
      }
    };
    // 生日校验
    var checkGender = (rule, value, callback) => {
      if (value != 0 && value != 1) {
        return callback(new Error("请选择性别"));
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
      u_id: Number(this.$route.query.u_id),
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
      // 个人信息表单验证规则
      rules: {
        info_birthday: [{ validator: checkBirthday, trigger: "blur" }],
        info_name: [{ validator: checkName, trigger: "blur" }],
        info_email: [{ validator: checkEmail, trigger: "blur" }],
        info_gender: [{ validator: checkGender, trigger: "change" }],
      },
      // 七牛云的上传地址，根据自己所在地区选择，我这里是华东区
      domain: "https://upload-z2.qiniup.com",
      // 这是七牛云空间的外链默认域名
      qiniuaddr: "r8jcjikss.hn-bkt.clouddn.com",
    };
  },
  computed: {
    token() {
      return localStorage.getItem("token") || "";
    },
    userInfos() {
      return JSON.parse(localStorage.getItem("userInfo")) || "";
    },
  },
  created() {
    this.getUserInfoById(this.u_id);
  },
  watch: {},
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
          if (res && res.data.userInfo[0]) {
            this.userInfo = res.data.userInfo[0];
            // this.$store.dispatch("SET_USERINFO", JSON.stringify(this.userInfo));
            if (this.userInfo.info_hobby) {
              this.userInfo.info_hobby = this.userInfo.info_hobby.split(",");
            }
          } else {
            location.href = "/404";
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
        info_fk_uId: this.userInfo.info_fk_uId,
        info_name: this.userInfo.info_name,
        info_birthday: this.$moment(this.userInfo.info_birthday).format(
          "YYYY-MM-DD"
        ),
        info_email: this.userInfo.info_email,
        info_hobby: this.userInfo.info_hobby.toString(),
        info_avatar: this.userInfo.info_avatar,
        info_gender: this.userInfo.info_gender,
      };
      this.$http
        .post("/user/updateUserInfo", params)
        .then((res) => {
          if (res && res.status == 200 && res.data.userInfo) {
            this.$message({
              message: "保存成功",
              type: "success",
            });
            this.getUserInfoById(this.u_id);
            this.$store.dispatch("SET_USERINFO", JSON.stringify(this.userInfo));
            setTimeout(() => {
              this.$router.go(0);
            }, 1000);
          }
        })
        .catch((e) => {
          console.log(e);
          this.$message({
            message: "保存失败！",
            type: "warning",
          });
        });
    },

    // 上传文件到七牛云
    upqiniu(req) {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      let filetype = "";
      if (req.file.type === "image/png") {
        filetype = "png";
      } else {
        filetype = "jpg";
      }
      // 重命名要上传的文件
      const keyname =
        "yyz" + "-" + req.file.name.split(".")[0] + "." + filetype;
      // 从后端获取上传凭证token
      this.$http.get("/user/getQiNiuToken").then((res) => {
        const formdata = new FormData();
        formdata.append("file", req.file);
        formdata.append("token", res.data.uploadToken);
        formdata.append("key", keyname);
        // 获取到凭证之后再将文件上传到七牛云空间
        this.$http.post(this.domain, formdata, config).then((res) => {
          this.userInfo.info_avatar =
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
  a {
    text-decoration: none;
    color: #409eff;
  }
}
.photo-uploader {
  display: inline-block;
}
/deep/ .el-upload-list {
  display: none !important;
}
</style>
