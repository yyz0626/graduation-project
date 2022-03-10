<template>
  <div class="container">
    <el-menu
      :default-active="this.$router.path"
      router
      mode="horizontal"
      style="width: 100%"
    >
      <div class="nav-title">
        <router-link to="/" class="nav-title">校园社交网站</router-link>
      </div>
      <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}
      </el-menu-item>
      <search-box style="margin-left: 80px" />
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
        { name: "/auction", navItem: "个人中心" },
        { name: "/entertainment", navItem: "休闲娱乐" },
      ],
    };
  },
  methods: {
    searchTab() {},
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
  margin-left: 80px;
  margin-right: 10px;
  font-size: 30px;
  font-weight: 700;
  text-decoration: none;
  // color: #fff;
}
#navbar {
  width: 100%;
  height: 85px;
  display: flex;
  position: fixed;
  top: 0;
  align-items: center;
  padding: 0 30px 0 0;
  box-sizing: border-box;
  background-image: linear-gradient(#083252, #4f7fa3, #e2e8ec);
  text-align: center;
  a {
    text-decoration: none;
    color: #fff;
  }
}
.left {
  flex: 7;

  .nav-item {
    margin-right: 10px;
  }
  .nav-item:hover {
    color: rgb(114, 111, 111) !important;
  }
}
.mid {
  flex: 4;
  /deep/ .el-input__inner {
    width: 200px;
    border-radius: 111px;
  }
}
.right {
  flex: 1;
}
</style>
