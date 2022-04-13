<template>
  <div id="app">
    <!-- 头部 -->
    <!-- <Header /> -->
    <navbar v-if="!isLogin" />
    <!-- <login /> -->
    <!-- 空白区域 -->
    <div class="top" v-if="!isLogin" />
    <!-- 内容区域 -->
    <div class="container">
      <router-view :key="$route.fullPath" />
    </div>
    <!-- 底部 -->
    <!-- <div class="bottom" v-if="!isLogin && !isPersonal" /> -->
    <!-- 回到顶部 -->
    <el-backtop :bottom="60" v-if="!isLogin" />
  </div>
</template>

<script>
// import Header from "./views/header.vue";
import navbar from "./views/navbar.vue";
// import login from "./views/login.vue";

export default {
  name: "app",
  components: {
    // Header,
    navbar,
    // login,
  },
  data() {
    return {
      isLogin: false,
      isPersonal: false,
    };
  },
  watch: {
    // 检测路由
    $route: {
      handler: function (route) {
        if (route.path == "/login") {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
        if (route.path == "/personal") {
          this.isPersonal = true;
        } else {
          this.isPersonal = false;
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
#app {
  display: flex;
}
.container {
}
.top {
  // height: 100px;
  margin-left: 25vh;
  // margin-bottom: 20px;
  // margin-top: 85px;
}
// .bottom {
//   width: 100%;
//   margin-top: 50px;
//   height: 65px;
//   background: #fff;
// }
</style>
