<template>
  <div class="container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="问题反馈" name="help">
        <p class="help-title">请在下方描述您遇到的问题:</p>
        <el-input
          type="textarea"
          placeholder="请输入..."
          v-model="textarea"
          :autosize="{ minRows: 10 }"
          maxlength="500"
          show-word-limit
        >
        </el-input>
        <div class="help-submit">
          <el-button type="primary" round :disabled="!textarea.length"
            >提 交</el-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane label="历史记录" name="history">历史记录</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "help",
      textarea: "",
    };
  },
  methods: {
    // handleClick(tab, event) {
    // console.log(tab, event);
    // },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 830px;
  margin: 0 auto;
  padding-top: 30px;
  a {
    text-decoration: none;
  }
}
.help-title {
  margin-bottom: 10px;
  color: #67696b;
}
.help-submit {
  margin-top: 20px;
  text-align: center;
}
</style>
