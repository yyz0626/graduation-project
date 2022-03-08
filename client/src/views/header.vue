<template>
  <div id="navbar">
    <div class="left">
      <router-link to="/" class="nav-title">校园社交网站</router-link>
      <router-link to="questions" class="nav-item">难题解答</router-link>
      <router-link to="friends" class="nav-item">交友平台</router-link>
      <router-link to="auction" class="nav-item">二手市场</router-link>
      <router-link to="entertainment" class="nav-item">休闲娱乐</router-link>
    </div>
    <div class="mid">
      <search-box></search-box>
    </div>
    <div class="right">
      <router-link to="login" class="nav-title">登录/注册</router-link>
    </div>
  </div>
</template>

<script>
import searchBox from "../components/search-box.vue";

export default {
  name: "Header",
  components: {
    "search-box": searchBox,
  },
  data() {
    return {
      input: "",
    };
  },
  methods: {
    searchTab() {},
  },
};
</script>

<style lang="scss" scoped>
#navbar {
  width: 100%;
  height: 65px;
  display: flex;
  position: fixed;
  top: 0;
  align-items: center;
  padding: 12px 180px;
  box-sizing: border-box;
  background-image: linear-gradient(rgb(175, 174, 174), rgb(245, 244, 244));
  text-align: center;
  a {
    text-decoration: none;
    color: #000;
  }
}
.left {
  flex: 7;
  .nav-title {
    margin-right: 20px;
    font-size: 20px !important;
    font-weight: 700;
  }
  .nav-item {
    margin-right: 10px;
  }
  .nav-item:hover {
    color: rgb(114, 111, 111) !important;
  }
}
.mid {
  flex: 3;
  /deep/ .el-input__inner {
    width: 200px;
    border-radius: 111px;
  }
}
.right {
  flex: 1;
}
</style>
