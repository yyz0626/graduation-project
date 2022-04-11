<template>
  <div class="g-main">
    <img :src="imageUrl" class="ablum" />
    <el-upload
      class="photo-uploader"
      list-type="picture-card"
      :action="domain"
      :http-request="upqiniu"
      :before-upload="beforeUpload"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="imageUrl" alt="" />
    </el-dialog>
    <button @click="test">test</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      imageUrl: "http://xxxxxx.cn/4.png",
      token: {},
      // 七牛云的上传地址，根据自己所在地区选择，我这里是华东区
      domain: "https://upload-z2.qiniup.com",
      // 这是七牛云空间的外链默认域名
      qiniuaddr: "ra5pz5j5o.hn-bkt.clouddn.com",
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.imageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传文件到七牛云
    upqiniu(req) {
      console.log(req);
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
        "ablum" + Math.floor(Math.random() * 1000) + "." + filetype;
      console.log(keyname);
      // 从后端获取上传凭证token
      this.$http.get("/user/getQiNiuToken").then((res) => {
        console.log(res);
        const formdata = new FormData();
        formdata.append("file", req.file);
        formdata.append("token", res.data.uploadToken);
        formdata.append("key", keyname);
        // 获取到凭证之后再将文件上传到七牛云空间
        this.$http.post(this.domain, formdata, config).then((res) => {
          console.log(res);
          this.imageUrl = "http://" + this.qiniuaddr + "/" + res.data.key;
          console.log(this.imageUrl);
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

<style>
.g-main {
  position: relative;
  height: 60vh;
  width: 100%;
}
.ablum {
  display: block;
  height: 77vh;
  width: 100%;
  object-fit: cover;
}
</style>
