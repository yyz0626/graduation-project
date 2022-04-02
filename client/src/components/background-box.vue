<template>
  <div class="background" :style="styleObject">
    <span class="title" :title="bgData.d_title">{{ bgData.d_title }}</span>
    <div class="Topping" v-if="bgData.d_status == 2">置顶 TOP</div>
    <span class="detail"
      >{{ bgData.d_fk_uName }} ·
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
  data() {
    return {
      styleObject: {
        backgroundImage: this.bgData.d_pictures
          ? "url(" + this.bgData.d_pictures.split(",")[0] + ")"
          : "url(" + require(`../static/bg/1.jpg`) + ")",
      },
    };
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
  position: relative;
  margin-top: 50px;
  background-image: url(../static/bg/1.jpg);
  background-size: 100% 100%;
  border-radius: 15px;
  overflow: hidden;

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

.Topping {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 20px;
  right: -80px;
  width: 250px;
  height: 50px;
  border-radius: 15px;
  background: rgba(20, 137, 132, 0.7);
  color: rgba(255, 255, 255, 0.85);
  transform: rotate(45deg);
  font-size: 20px;
}
</style>
