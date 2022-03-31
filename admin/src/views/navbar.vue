
<template>
  <div class="containers">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :router="true"
    >
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="user-management">
        <i class="el-icon-s-custom"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="dynamic-management">
        <i class="el-icon-chat-line-round"></i>
        <span slot="title">动态管理</span>
      </el-menu-item>
      <el-menu-item index="reply-management">
        <i class="el-icon-document"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="admin-management" v-if="adminInfo.admin_type == 1">
        <i class="el-icon-user"></i>
        <span slot="title">管理员管理</span>
      </el-menu-item>
      <el-menu-item index="handle-problem">
        <i class="el-icon-news"></i>
        <span slot="title">问题处理</span>
      </el-menu-item>
      <el-menu-item index="check-record" v-if="adminInfo.admin_type == 1">
        <i class="el-icon-question"></i>
        <span slot="title">日志查看</span>
      </el-menu-item>
    </el-menu>
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
      <el-radio-button :label="!isCollapse">***</el-radio-button>
    </el-radio-group> -->
  </div>
</template>


<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

<script>
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  computed: {
    adminToken() {
      return localStorage.getItem("admin_token") || "";
    },
    adminInfo() {
      return JSON.parse(localStorage.getItem("admin_info")) || "";
    },
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-menu {
  height: 100%;
  width: 25vh;
  line-height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  //   z-index: 99;
}
</style>