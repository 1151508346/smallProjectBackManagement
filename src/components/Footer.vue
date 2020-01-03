<template>
  <div class="footer-wrapper">
    <div class="feedback-box">
      <span class="feedback-content" @click="handleAlertFeedBack">问题反馈</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    alertFeedBack: {
      type: Function,
      default: function() {},
      validator: function(self) {
        return typeof self === "function";
      }
    }
  },
  methods: {
    //执行父组件传进来的alertFeedBack函数
    handleAlertFeedBack() {
      // console.log("aaa");
      this.alertFeedBack();
    }
  }
};
</script>

<style lang="scss" scoped>
$--color-primary: #409eff;
.footer-wrapper {
  // border:1px solid red;
  height: 100%;
  box-sizing: border-box;
  .feedback-box {
    float: right;
    margin-right: 30px;
    margin-top: 17px;
    cursor: pointer;
    .feedback-content {
      font-size: 13px;
      text-decoration: underline;
      transition: 0.2s;
      &:hover {
        color: $--color-primary;
      }
    }
  }
}
</style>