<template>
  <div class="background">
    <span class="title" :title="bgData.d_title">{{ bgData.d_title }}</span>
    <span class="detail"
      >{{ bgData.d_fk_uid }} ·
      {{ $moment(bgData.createTime).format("YYYY-MM-DD HH:mm") }} ·
      {{ checkTextType(bgData.d_type) }}</span
    >
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
  width: 830px;
  height: 250px;
  margin-top: 50px;
  background-image: url(../static/bg/1.jpg);
  background-size: 100% 100%;
  border-radius: 15px;

  span {
    display: block;
  }

  .title {
    margin-top: 80px;
    font-size: 28px;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
    color: #fff;
  }
  .detail {
    margin-top: 15px;
    color: rgb(251, 251, 251);
  }
}
</style>
