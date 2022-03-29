<template>
  <div class="avatar">
    <div class="avatar-img">
      <el-dropdown trigger="click" @command="handleCommand">
        <el-avatar :size="50" title="个人" :src="userInfo.info_avatar" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-user" command="personal"
            >个人资料</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-chat-dot-round" command="dynamic"
            >我的动态</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-phone-outline" command="help"
            >问题反馈</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-close" command="logout"
            >退出</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
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
      return localStorage.getItem("token") || "";
    },
    userInfo() {
      return JSON.parse(localStorage.getItem("userInfo")) || "";
    },
  },
  watch: {},
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
      // 跳转问题反馈页
      if (command == "help") {
        this.$router.push({
          path: "/help",
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
.avatar {
  position: fixed;
  top: 0px;
  margin-left: 25vh;
  // right: 20px;
  width: 1315px;
  background: rgb(255, 255, 255);
  z-index: 99;
}
.avatar-img {
  float: right;
}
</style>
