<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-edit"
      @click="dialogFormVisible = true"
      class="add-btn"
      circle
    />
    <el-dialog title="发布动态" :visible.sync="dialogFormVisible">
      <el-form
        :model="dynamic"
        ref="dynamic"
        label-width="90px"
        label-position="right"
        class="demo-dynamic"
      >
        <el-form-item label="动态标题" prop="d_title">
          <el-input v-model="dynamic.d_title"></el-input>
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
          <el-switch v-model="dynamic.d_group"></el-switch>
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
            :rows="5"
            :autosize="{ minRows: 5, maxRows: 8 }"
            v-model="dynamic.d_content"
            maxlength="500"
            show-word-limit
          />
        </el-form-item>

        <el-form-item label="申请置顶" prop="d_topping">
          <el-switch v-model="dynamic.d_topping" />
        </el-form-item>

        <el-form-item>
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
    return {
      dialogFormVisible: false,
      dynamic: {
        d_title: "",
        d_type: "",
        d_group: false,
        d_groupNum: 0,
        d_content: "",
        d_topping: false,
      },
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 发布动态
    publishDynamic() {
      let { d_title, d_type, d_content } = this.dynamic;
      let params = {
        d_title,
        d_type,
        d_content,
        d_fk_uid: 1,
        d_status: 0,
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
