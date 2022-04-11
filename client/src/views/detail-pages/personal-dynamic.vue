<template>
  <div class="container">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50" align="center" />
      <el-table-column
        prop="d_title"
        label="动态标题"
        width="180"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="d_type"
        label="动态类型"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          {{ checkTextType(scope.row.d_type) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="d_content"
        label="动态内容"
        header-align="center"
      />
      <el-table-column
        prop="createTime"
        label="发布时间"
        width="160"
        align="center"
      >
        <template slot-scope="scope">
          {{ $moment(scope.row.createTime).format("lll") }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <router-link
            v-if="scope.row.d_status != 3"
            target="_blank"
            :to="{ path: 'detail', query: { d_id: scope.row.d_id } }"
            >查看
          </router-link>
          <el-button
            v-if="scope.row.d_status != 3 && userInfo.u_id == d_fk_uId"
            @click="edit(scope.row)"
            type="text"
            size="small"
            >修改</el-button
          >
          <p v-if="scope.row.d_status == 3" style="color: red">
            该动态已被管理员暂停展示！
          </p>
          <el-button
            type="text"
            size="small"
            @click="deleteDynamic(scope.row)"
            v-if="scope.row.d_status != 3 && userInfo.u_id == d_fk_uId"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="编辑动态"
      :before-close="handleClose"
      :visible.sync="dialogVisible"
    >
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
          <el-select
            v-model="dynamic.d_type"
            placeholder="请选择动态类型"
            :disabled="true"
          >
            <el-option label="难题解答" :value="1" />
            <el-option label="交友平台" :value="2" />
            <el-option label="二手市场" :value="3" />
            <el-option label="休闲娱乐" :value="4" />
          </el-select>
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
        <!-- <el-form-item label="动态图片">
          <pre>{{ dynamic.d_pictures }}</pre>
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
        </el-form-item> -->

        <el-form-item style="margin: 0 130px">
          <el-button type="primary" @click="submitForm('dynamic')"
            >确定修改</el-button
          >
          <el-button @click="closeForm">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { checkTextType } from "../../lib/config.js";
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
      d_fk_uId: Number(this.$route.query.u_id),
      tableData: [],
      dialogVisible: false,
      dynamic: "",
      rules: {
        d_title: [{ validator: checkTitle, trigger: "blur" }],
        d_type: [{ validator: checkType, trigger: "change" }],
        d_content: [{ validator: checkContent, trigger: "blur" }],
      },
      // 七牛云的上传地址，根据自己所在地区选择，我这里是华东区
      domain: "https://upload-z2.qiniup.com",
      // 这是七牛云空间的外链默认域名
      qiniuaddr: "ra5pz5j5o.hn-bkt.clouddn.com",
      picList: [],
    };
  },

  mounted() {
    this.getDynamicListByUserId();
  },
  computed: {
    token() {
      return localStorage.getItem("token") || "";
    },
    userInfo() {
      return JSON.parse(localStorage.getItem("userInfo")) || "";
    },
  },
  watch: {
    dialogVisible() {
      if (this.dialogVisible == false) {
        this.picList = [];
      }
    },
  },
  methods: {
    // 获取个人所有动态
    getDynamicListByUserId() {
      let params = {
        d_fk_uId: this.d_fk_uId,
      };
      this.$http
        .post("/dynamic/getDynamicListByUserId", params)
        .then((res) => {
          if (res && res.status == 200) {
            this.tableData = res.data.dynamicList;
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

    // 修改动态————————绑定动态值
    edit(row) {
      this.dialogVisible = true;
      this.dynamic = JSON.parse(JSON.stringify(row));
      if (row.d_pictures && row.d_pictures.split(",").length > 0) {
        this.picList = row.d_pictures.split(",");
        this.picList.forEach((item, index) => {
          this.picList[index] = {};
          this.picList[index].name = item.slice(36, item.length);
          this.picList[index].url = item;
        });
      }
    },

    // 编辑动态
    updateDynamic() {
      let { d_title, d_type, d_content, d_id } = this.dynamic;
      let picList = this.picList.map((item) => {
        return item.url;
      });

      let params = {
        d_id,
        d_title,
        d_type,
        d_content,
        d_pictures: picList.toString(),
      };
      this.$http
        .post("/dynamic/updateDynamic", params)
        .then((res) => {
          // console.log(res);
          if (res && res.status == 200) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.dialogFormVisible = false;
            setTimeout(() => {
              this.$router.go(0);
            }, 1000);
          }
        })
        .catch((e) => {
          this.$message({
            message: e,
            type: "warning",
          });
        });
    },

    // 删除动态
    deleteDynamic(row) {
      this.$confirm("此操作将永久删除该动态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.dynamic = JSON.parse(JSON.stringify(row));
          let { d_id } = this.dynamic;
          let params = {
            d_id,
          };
          console.log(this.dynamic);
          this.$http
            .post("/dynamic/deleteDynamic", params)
            .then((res) => {
              // console.log(res);
              if (res && res.status == 200) {
                this.$message({
                  message: "删除成功",
                  type: "success",
                });
                this.dialogFormVisible = false;
                setTimeout(() => {
                  this.$router.go(0);
                }, 1000);
              }
            })
            .catch((e) => {
              this.$message({
                message: e,
                type: "warning",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "已取消删除",
          });
        });
    },

    // 返回动态类型
    checkTextType(type) {
      return checkTextType(type);
    },

    handleClose(done) {
      this.$confirm("确认放弃编辑？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateDynamic();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 重置表单
    closeForm() {
      this.dialogVisible = false;
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
          // console.log(this.picList);
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
.container {
  width: 1130px;
  margin: 0 auto;
  padding-top: 30px;
  a {
    text-decoration: none;
    color: #409eff;
    font-size: 12px;
    margin-right: 8px;
  }
}
/deep/ .el-dialog {
  margin-top: 40px !important;
}
</style>
