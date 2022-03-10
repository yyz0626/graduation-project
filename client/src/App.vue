<template>
  <div id="app">
    <!-- 头部 -->
    <Header v-if="!isLogin" />
    <!-- 全局发布动态 -->
    <add-dialog class="dialog" v-if="!isLogin" />
    <!-- 空白区域 -->
    <div class="top" v-if="!isLogin" />
    <!-- 内容区域 -->
    <div class="container">
      <router-view />
    </div>
    <!-- 底部 -->
    <div class="bottom" v-if="!isLogin" />
    <!-- 回到顶部 -->
    <el-backtop :bottom="60" v-if="!isLogin" />
  </div>
</template>

<script>
import Header from "./views/header.vue";
import addDialog from "./components/add-dialog.vue";

export default {
  name: "app",
  components: {
    Header,
    addDialog,
  },
  data() {
    return {
      isLogin: false,
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
.top {
  margin-top: 85px;
}
.bottom {
  position: relative;
  bottom: 0px;
  background: #fff;
  width: 100%;
  height: 65px;
}
</style>
