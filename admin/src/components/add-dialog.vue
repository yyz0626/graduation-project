<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-edit"
      @click="openDialog"
      class="add-btn"
      circle
    />
    <el-dialog title="发布动态" :visible.sync="dialogFormVisible">
      <el-form
        :model="dynamic"
        status-icon
        :rules="rules"
        ref="dynamic"
        label-width="90px"
        label-position="left"
        class="demo-dynamic"
      >
        <el-form-item label="动态标题" prop="d_title">
          <el-input v-model="dynamic.d_title" placeholder="请输入动态标题" />
        </el-form-item>
        <el-form-item label="动态类型" prop="d_type">
          <el-select v-model="dynamic.d_type" placeholder="请选择动态类型">
            <el-option label="难题解答" value="1"></el-option>
            <el-option label="交友平台" value="2"></el-option>
            <el-option label="二手市场" value="3"></el-option>
            <el-option label="休闲娱乐" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="是否组队"
          prop="d_group"
          v-if="dynamic.d_type == 4"
        >
          <el-switch v-model="dynamic.d_group" />
        </el-form-item>
        <el-form-item
          label="组队人数"
          prop="d_groupNum"
          v-if="dynamic.d_type == 4 && dynamic.d_group == true"
        >
          <el-input-number
            v-model="dynamic.d_groupNum"
            @change="handleChange"
            :min="0"
            :max="30"
            label="描述文字"
          />
        </el-form-item>
        <el-form-item label="动态内容" prop="d_content">
          <el-input
            type="textarea"
            placeholder="请输入动态内容"
            :autosize="{ minRows: 3 }"
            v-model="dynamic.d_content"
            maxlength="500"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="动态图片">
          <el-upload
            class="upload-demo"
            :action="domain"
            :http-request="upqiniu"
            :before-upload="beforeUpload"
            :file-list="picList"
            :on-remove="handleRemove"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item style="margin-left: 260px">
          <el-button type="primary" @click="submitForm('dynamic')"
            >立即发布</el-button
          >
          <el-button @click="resetForm('dynamic')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 动态标题校验
    var checkTitle = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入标题"));
      } else {
        callback();
      }
    };
    // 动态标题校验
    var checkType = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请选择动态类型"));
      } else {
        callback();
      }
    };
    // 动态内容校验
    var checkContent = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入内容"));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      dynamic: {
        d_title: "",
        d_type: "",
        d_group: false,
        d_groupNum: 0,
        d_content: "",
        // d_topping: false,
      },
      rules: {
        d_title: [{ validator: checkTitle, trigger: "blur" }],
        d_type: [{ validator: checkType, trigger: "change" }],
        d_content: [{ validator: checkContent, trigger: "blur" }],
      },
      // 七牛云的上传地址，根据自己所在地区选择，我这里是华东区
      domain: "https://upload-z2.qiniup.com",
      // 这是七牛云空间的外链默认域名
      qiniuaddr: "r8jcjikss.hn-bkt.clouddn.com",
      picList: [],
    };
  },
  computed: {
    token() {
      return localStorage.getItem("token") || "";
    },
    userInfo() {
      return JSON.parse(localStorage.getItem("userInfo")) || "";
    },
  },
  methods: {
    openDialog() {
      if (!this.token) {
        this.$message({
          showClose: true,
          message: "请先登录再发布动态哦~",
          type: "warning",
        });
        return;
      }
      this.dialogFormVisible = true;
    },
    // 发布动态
    publishDynamic() {
      let { d_title, d_type, d_content } = this.dynamic;
      let picList = this.picList.map((item) => {
        return item.url;
      });
      let params = {
        d_title,
        d_type,
        d_content,
        d_fk_uId: this.userInfo.info_fk_uId,
        d_fk_uName: this.userInfo.info_name,
        d_pictures:
          picList.toString() ||
          `http://r8jcjikss.hn-bkt.clouddn.com/yyz-${d_type}.jpg`,
      };
      this.$http
        .post("/dynamic/publishDynamic", params)
        .then((res) => {
          // console.log(res);
          if (res && res.status == 200) {
            this.$message({
              message: "发布成功",
              type: "success",
            });
            this.dialogFormVisible = false;
            setTimeout(() => {
              this.$router.go(0);
            }, 1000);
            this.dynamic = {
              d_title: "",
              type: "",
              group: false,
              groupNum: 0,
              content: "",
              topping: false,
            };
          } else {
            this.$message.error("发布失败");
          }
        })
        .catch((e) => {
          this.$message({
            message: e,
            type: "warning",
          });
        });
    },

    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.publishDynamic();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
          let obj = {
            name: keyname,
            url: "http://" + this.qiniuaddr + "/" + res.data.key,
          };
          this.picList.push(obj);
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

    // 删除照片
    handleRemove(file) {
      this.picList.find((item, index) => {
        if (file.uid == item.uid) {
          this.picList.splice(index, 1);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.add-btn {
  position: fixed;
  top: 30%;
  left: 5%;
}

// // /deep/ .el-dialog {
// //   margin-top: 15vh;
// // }

// /deep/.el-dialog__body {
//   display: inline-block;
// }
</style>
