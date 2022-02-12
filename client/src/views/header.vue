<template>
  <div id="navbar">
    <div class="left">
      <router-link to="/" class="nav-title">黑大社交平台</router-link>
      <router-link to="news" class="nav-item">时事新闻</router-link>
      <router-link to="friends" class="nav-item">交友平台</router-link>
      <router-link to="auction" class="nav-item">二手市场</router-link>
      <router-link to="entertainment" class="nav-item">休闲娱乐</router-link>
    </div>
    <div class="right">
      <a href="" class="icon twitter"></a>
      <a href="" class="icon wechat"></a>
      <a href="" class="icon sina"></a>
      <a href="" class="icon instagram"></a>
      <div class="search-box">
        <a href="javascript:" class="icon search" @click="searchTab"> </a>
        <input type="text" class="search-input" placeholder="搜索.." />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "title",
  data() {
    return {
      input: "",
      searchIndex: 1,
    };
  },
  methods: {
    searchTab() {},
  },
};
</script>

<style lang="scss" scoped>
#navbar {
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 65px;
  padding: 12px 180px;
  box-sizing: border-box;
  z-index: 999;
  background-image: linear-gradient(rgb(175, 174, 174), rgb(245, 244, 244));
  .left {
    a {
      text-decoration: none;
    }
    .nav-title {
      color: #000;
      margin-right: 20px;
      font-size: 20px !important;
      font-weight: 700;
    }
    .nav-item {
      color: #000;
      margin-right: 10px;
    }
    .nav-item:hover {
      color: rgb(114, 111, 111);
    }
  }
  .right {
    margin-left: 50px;
    .icon {
      display: inline-block;
      width: 40px;
      height: 40px;
      background-color: #fff;
      border-radius: 50%;
      margin-right: 10px;
      background-repeat: no-repeat;
      background-size: 50% 50%;
      background-position: center;
    }
    .icon:hover {
      background-color: #2c2c2c;
    }
    .search-box {
      width: 160px;
      height: 40px;
      display: inline-block;
      position: relative;
      border-top-left-radius: 2.5rem;
      border-top-right-radius: 2.5rem;
      border-bottom-right-radius: 2.5rem;
      border-bottom-left-radius: 2.5rem;
      background-color: #fff;
      margin-right: 10px;
      input {
        width: 96px;
        height: 40px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 0;
        left: 40px;
        border: 0px;
        outline: none;
        margin-left: 5px;
        background: #fff;
      }
    }
    .search {
      background-image: url(~@/static/search.png);
      margin-right: 0px;
    }
    .search:hover {
      background-image: url(~@/static/search-hover.png);
    }
    .twitter {
      background-image: url(~@/static/twitter.png);
    }
    .twitter:hover {
      background-image: url(~@/static/twitter-hover.png);
    }
    .wechat {
      background-image: url(~@/static/wechat.png);
    }
    .wechat:hover {
      background-image: url(~@/static/wechat-hover.png);
    }
    .sina {
      background-image: url(~@/static/sina.png);
    }
    .sina:hover {
      background-image: url(~@/static/sina-hover.png);
    }
    .instagram {
      background-image: url(~@/static/instagram.png);
    }
    .instagram:hover {
      background-image: url(~@/static/instagram-hover.png);
    }
  }
}

// /deep/ .el-menu {
//   // height: 70px;
//   display: inline-block;
// }
</style>
