<template>
  <div class="container setPassword">
    <!-- <div class="setPassword-item">
      <span class="info-hint">原密码</span>
      <div :class="oldPasswordStatus? 'setPassword-item-list-active':'setPassword-item-list'">
        <input
          v-model="passwords.oldPassword"
          type="password"
          style="none"
          class="setPassword-item-file"
          placeholder="原密码"
          @focus="handleFocusBorderStyle($event,'oldPassword')"
          @blur="handleBlurBorderStyle($event,'oldPassword')"
        />
      </div>
    </div> -->
    <div class="setPassword-item">
      <span class="info-hint">新密码</span>
      <div :class="newPasswordStatus? 'setPassword-item-list-active':'setPassword-item-list'">
        <input
          v-model="passwords.newPassword"
          type="password"
          style="none"
          class="setPassword-item-file"
          placeholder="新密码"
          @focus="handleFocusBorderStyle($event,'newPassword')"
          @blur="handleBlurBorderStyle($event,'newPassword')"
        />
        <span class="error-hint">{{newpasswordCheckHint}}</span>
      </div>
    </div>
    <div class="setPassword-item">
      <span class="info-hint">确认密码</span>
      <div :class="enterPasswordStatus?'setPassword-item-list-active':'setPassword-item-list'">
        <input
          v-model="passwords.enterPassword"
          type="password"
          style="none"
          class="setPassword-item-file"
          placeholder="确认密码"
          @focus="handleFocusBorderStyle($event,'enterPassword')"
          @blur="handleBlurBorderStyle($event,'enterPassword')"
        />
         <span class="error-hint">{{enterpasswordCheckHint}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { blurInput } from "@/tools/updatePasswordCheck.js"
export default {
  props: {
    passwords: {
      type: Object,
      default: null
    }
  },
  data: function() {
    return {
    //   oldPasswordStatus: false,
      newPasswordStatus: false,
      enterPasswordStatus: false,
      newpasswordCheckHint:"" , //新密码校验提示错误信息
      enterpasswordCheckHint :"" //确认密码校验提示错误信息
    };
  },
  mounted: function() {},
  methods: {
    handleFocusBorderStyle(e, params) {
    //   if (data === "oldPassword") this.oldPasswordStatus = true;
      if (params === "newPassword") this.newPasswordStatus = true;
      if (params === "enterPassword") this.enterPasswordStatus = true;

    },
    handleBlurBorderStyle(e, params) {
    //   if (data === "oldPassword") this.oldPasswordStatus = false;
      if (params === "newPassword") this.newPasswordStatus = false;
      if (params === "enterPassword") this.enterPasswordStatus = false;
       var value = e.target.value;
       blurInput(value, params, this);
    }
  }
};
</script>

<style lang="scss" scoped>
$--color-primary: #409eff;
$--color-noselect: #ddd;
.container {
  .setPassword-item {
    .info-hint {
      display: inline-block;
      width: 90px;
      text-align: right;
      // border:1px solid red;
      font-size: 14px;
      //   margin-left: 20px;
    }
    margin-top: 30px;
    // textarea {
    //   transition: 0.3s;
    //   text-indent: 2em;
    // }
    // .description-window,
    // .description-window-active {
    //   margin-left: 30px;
    //   outline: none;
    //   width: 250px;
    //   padding: 5px 0;
    //   vertical-align: text-top;
    //   resize: none;
    // }
    // .description-window {
    //   border: 2px solid $--color-noselect;
    // }
    // .description-window-active {
    //   border: 2px solid $--color-primary;
    // }
    .setPassword-item-list,
    .setPassword-item-list-active {
      margin-left: 30px;
      outline: none;
      width: 250px;
      height: 25px;
      display: inline-block;
      vertical-align: middle;
      transition: 0.3s;
      position: relative;
      input {
        // text-align: right;
        text-align: center;
        outline: none;
        border: none;
        width: 240px;
        padding: 4px 5px;
        // font-size:13px;
        // margin-top:5px;
        // margin:5px;
      }
      .error-hint{
        position: absolute;
        bottom: -16px;
        left: 0px;
        font-size: 12px;
        color: #e00;
      }
    }
    .setPassword-item-list {
      border: 2px solid $--color-noselect;
    }
    .setPassword-item-list-active {
      border: 2px solid $--color-primary;
    }
  }
}
</style>

<style lang="scss" >
.el-select {
  width: 100% !important;
  height: 25px;
  margin-top: 1px;
  border-radius: 0px !important;
  .el-input--suffix {
    //  height: 25px;
    border-radius: 0px !important;
  }
  .el-input::-webkit-scrollbar-thumb {
    border-radius: 0px !important;
  }
  .el-input__inner {
    border: none;
    background-color: transparent !important;
  }
}
</style>