<template>
  <div class="background">
    <img class="img" :src="bgData.bgUrl" />
    <div class="details">
      <span class="title" :title="bgData.title">{{ bgData.title }}</span>
      <span class="introduce"
        >{{ bgData.author }} · {{ bgData.date }} ·
        {{ checkTextType(bgData.textType) }}</span
      >
    </div>
  </div>
</template>

<script>
import { checkTextType, checkTextTypeByEnglish } from "../lib/config.js";
export default {
  props: {
    bgData: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {},
  methods: {
    checkTextType(type) {
      return checkTextType(type);
    },
    checkTextTypeByEnglish(type) {
      return checkTextTypeByEnglish(type);
    },
  },
};
</script>

<style lang="scss" scoped>
.background {
  display: inline-block;
  position: relative;
  width: 830px;
  height: 250px;
  margin-top: 50px;
  box-sizing: border-box;
  .img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
}
.details {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-60%);
  span {
    display: block;
  }
  .title {
    width: 600px;
    font-size: 28px;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
    color: #fff;
  }
  .introduce {
    margin-top: 5px;
    color: rgb(251, 251, 251);
  }
}

// .background:hover {
//   width: 850px;
//   height: 270px;
//   background: red;
//   border-radius: 5px;
// }
</style>
