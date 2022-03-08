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
        <el-button type="primary" round @click="registFormVisible = true"
          >使用手机号码或电子邮箱注册</el-button
        >
      </div>
      <p class="title3">已有帐号？</p>
      <div class="btn2">
        <el-button type="primary" round @click="loginFormVisible = true"
          >登录</el-button
        >
      </div>
    </div>
    <!-- 注册框 -->
    <el-dialog title="注册" :visible.sync="registFormVisible">
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
    <!-- 登录框 -->
    <el-dialog title="登录" :visible.sync="loginFormVisible">
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
      registFormVisible: false,
      loginFormVisible: false,
      dynamic: {
        d_title: "",
        d_type: "",
        d_group: false,
        d_groupNum: 0,
        d_content: "",
        d_topping: false,
      },
      loginForm: {
        d_title: "",
        d_type: "",
        d_group: false,
        d_groupNum: 0,
        d_content: "",
        d_topping: false,
      },
      registForm: {
        d_title: "",
        d_type: "",
        d_group: false,
        d_groupNum: 0,
        d_content: "",
        d_topping: false,
      },
    };
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
  padding-top: 50px;
  .right-logo {
    width: 80px;
    height: 80px;
  }
  .title1 {
    font-size: 80px;
    font-weight: 900;
    margin-top: 60px;
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
</style>
