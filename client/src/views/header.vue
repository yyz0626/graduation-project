<template>
  <div class="container">
    <el-menu
      :default-active="this.$router.path"
      router
      mode="horizontal"
      style="width: 100%"
    >
      <!-- 标题 -->
      <div class="nav-title">
        <router-link to="/" class="nav-title">校园社交网 </router-link>
      </div>
      <!-- 导航栏 -->
      <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}
      </el-menu-item>

      <!-- 搜索框 -->
      <search-box style="margin-left: 140px" />

      <div class="loginBox">
        <div v-if="!token" class="login-title">
          <router-link to="/login">登录 | 注册</router-link>
        </div>
        <div class="avatar" v-else>
          <el-dropdown trigger="click" @command="handleCommand">
            <el-avatar :size="50" title="个人" :src="avatarUrl" />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user" command="personal"
                >个人资料</el-dropdown-item
              >
              <el-dropdown-item icon="el-icon-chat-line-round" command="dynamic"
                >我的动态</el-dropdown-item
              >
              <el-dropdown-item icon="el-icon-close" command="logout"
                >退出</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-menu>
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
      navList: [
        { name: "/questions", navItem: "难题解答" },
        { name: "/friends", navItem: "交友平台" },
        { name: "/auction", navItem: "二手平台" },
        { name: "/entertainment", navItem: "休闲娱乐" },
      ],
      avatarUrl: "",
    };
  },
  computed: {
    token() {
      return localStorage.getItem("token");
    },
    userInfo() {
      return JSON.parse(localStorage.getItem("userInfo"));
    },
  },
  watch: {
    userInfo: {
      handler() {
        if (this.userInfo.u_avatar) {
          this.avatarUrl = this.userInfo.u_avatar;
        } else {
          this.avatarUrl =
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    // console.log(this.$store.state);
  },
  methods: {
    handleCommand(command) {
      if (command == "logout") {
        this.$store.dispatch("LOG_OUT");
        this.$message({
          message: "退出成功",
          type: "success",
        });
        setTimeout(() => {
          this.$router.push({ path: "/" });
          this.$router.go(0);
        }, 500);
      }
      // 跳转个人信息页
      if (command == "personal") {
        this.$router.push({
          path: "/personal",
          query: { u_id: this.userInfo.u_id },
        });
      }
      // 跳转个人动态页
      if (command == "dynamic") {
        this.$router.push({
          path: "/personalDynamic",
          query: { u_id: this.userInfo.u_id },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
}
/deep/ .el-menu {
  height: 80px;
  line-height: 80px;
  position: fixed;
  top: 0;
}
/deep/ .el-menu--horizontal > .el-menu-item {
  height: 80px;
  line-height: 80px;
  font-size: 20px;
}
.nav-title {
  float: left;
  margin-left: 90px;
  margin-right: 10px;
  font-size: 30px;
  font-weight: 700;
  text-decoration: none;
  color: #409eff;
}

.loginBox {
  float: right;
  margin-right: 140px;
}
.login-title {
  a {
    text-decoration: none;
    color: #909399;
    font-size: 20px;
  }
}
.avatar {
  margin-top: 15px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.el-dropdown-menu {
  top: 60px !important;
}
</style>
