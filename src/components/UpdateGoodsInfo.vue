<template>
  <div class="container feedback">
    <div class="feedback-item">
      <span class="info-hint">商品名</span>
      <div :class="usernameStatus? 'feedback-item-list-active':'feedback-item-list'">
        <input
          ref="product"
          v-model="goodsInfo.goodsname"
          type="text"
          style="none"
          class="feedback-item-file"
          placeholder="商品名"
          @focus="handleFocusBorderStyle($event,'username')"
          @blur="handleBlurBorderStyle($event,'username')"
        />
      </div>
    </div>
    <div class="feedback-item">
      <span class="info-hint">商品数量</span>
      <div :class="passwordStatus? 'feedback-item-list-active':'feedback-item-list'">
        <input
          ref="product"
          v-model="goodsInfo.goodscount"
          type="text"
          style="none"
          class="feedback-item-file"
          placeholder="商品数量"
          @focus="handleFocusBorderStyle($event,'password')"
          @blur="handleBlurBorderStyle($event,'password')"
        />
      </div>
    </div>
    <!-- <div class="feedback-item">
      <span class="info-hint">性别</span>
    <Select :params="sexList" :multiple= "false" ref="sexSelect" />-->
    <!-- <div :class="sexStatus? 'feedback-item-list-active':'feedback-item-list'">
        <input
          v-model="userInfo.sex"
          type="text"
          style="none"
          class="feedback-item-file"
          placeholder="性别"
          @focus="handleFocusBorderStyle($event,'sex')"
          @blur="handleBlurBorderStyle($event,'sex')"
        />
    </div>-->
    <!-- </div> -->
    <div class="feedback-item">
      <span class="info-hint">商品价格</span>
      <div :class="emailStatus?'feedback-item-list-active':'feedback-item-list'">
        <input
          v-model="goodsInfo.goodsprice"
          type="text"
          style="none"
          class="feedback-item-file"
          placeholder="商品价格"
          @focus="handleFocusBorderStyle($event,'email')"
          @blur="handleBlurBorderStyle($event,'email')"
        />
      </div>
    </div>
    <div class="feedback-item">
      <span class="info-hint">日期</span>

      <!-- <div :class="telphoneStatus ?'feedback-item-list-active':'feedback-item-list'"> -->

      <!-- <input
          v-model="goodsInfo.createtime"
          type="text"
          style="none"
          class="feedback-item-file"
          placeholder="添加日期"
          @focus="handleFocusBorderStyle($event,'telphone')"
          @blur="handleBlurBorderStyle($event,'telphone')"
      />-->
      <!-- </div> -->
      <div class="add-date-piker">
        <el-date-picker v-model="defaultDate" type="datetime" size="mini" placeholder="选择日期时间"></el-date-picker>
      </div>
    </div>
    <!-- <div class="feedback-item">
      <span class="info-hint">地址</span>
      <div :class="addressStatus?'feedback-item-list-active':'feedback-item-list'">
        <input
          v-model="goodsInfo.user_address"
          type="text"
          style="none"
          class="feedback-item-file"
          placeholder="地址"
          @focus="handleFocusBorderStyle($event,'address')"
          @blur="handleBlurBorderStyle($event,'address')"
        />
      </div> 
    </div>-->
    <!-- <div class="feedback-item">
      <span class="info-hint">详细描述说明</span>
      <textarea
        v-model="productionInfo.problem"
        :class="descriptionStatus?'description-window-active':'description-window'"
        cols="30"
        rows="15"
        placeholder="详细描述说明"
        @focus="handleFocusBorderStyle($event,'description')"
        @blur="handleBlurBorderStyle($event,'description')"
      ></textarea>
    </div>-->
  </div>
</template>

<script>
import Select from "@/components/Select.vue";
export default {
  props: {
    goodsInfo: {
      type: Object,
      default: {}
    }
  },
  components: {
    Select
  },
  data: function() {
    return {
      //   sexStatus: false,
      passwordStatus: false,
      emailStatus: false,
      telphoneStatus: false,
      //   descriptionStatus: false,
      usernameStatus: false,
      addressStatus: false,
      //   userInfo: {
      //     username: "",
      //     email: "",
      //     telphone: "",
      //     address: ""
      //   },
      options: [
        {
          value: "",
          label: ""
        },
        {
          value: "",
          label: ""
        },
        {
          value: "",
          label: ""
        },
        {
          value: "",
          label: ""
        },
        {
          value: "",
          label: ""
        }
      ],
      value: "",
      defaultDate: "",
      // section: "", //章节
      // problem: "" //问题描述
      sexList: [
        {
          value: "male",
          label: "男"
        },
        {
          value: "female",
          label: "女"
        }
      ]
    };
  },
  mounted: function() {
    this.defaultDate = this.goodsInfo.createtime;
  },
  methods: {
    handleFocusBorderStyle(e, data) {
      if (data === "username") this.usernameStatus = true;
      //   if (data === "sex") this.sexStatus = true;
      if (data === "telphone") this.telphoneStatus = true;
      if (data === "email") this.emailStatus = true;
      //   if (data === "description") this.descriptionStatus = true;
      if (data === "address") this.addressStatus = true;
      if (data === "password") this.passwordStatus = true;
    },
    handleBlurBorderStyle(e, data) {
      if (data === "username") this.usernameStatus = false;
      //   if (data === "sex") this.sexStatus = false;
      if (data === "telphone") this.telphoneStatus = false;
      if (data === "email") this.emailStatus = false;
      //   if (data === "description") this.descriptionStatus = false;
      if (data === "address") this.addressStatus = false;
      if (data === "password") this.passwordStatus = false;
    }
  }
};
</script>

<style lang="scss" scoped>
$--color-primary: #409eff;
$--color-noselect: #ddd;
.container {
  .feedback-item {
    .info-hint {
      display: inline-block;
      width: 90px;
      text-align: right;
      // border:1px solid red;
      font-size: 14px;
      //   margin-left: 20px;
      .select-component {
        width: 300px;
        display: inline-block !important;
      }
    }
    margin-top: 30px;
    textarea {
      transition: 0.3s;
      text-indent: 2em;
    }
    .description-window,
    .description-window-active {
      margin-left: 30px;
      outline: none;
      width: 250px;
      padding: 5px 0;
      vertical-align: text-top;
      resize: none;
    }
    .description-window {
      border: 2px solid $--color-noselect;
    }
    .description-window-active {
      border: 2px solid $--color-primary;
    }
    .feedback-item-list,
    .feedback-item-list-active {
      margin-left: 30px;
      outline: none;
      width: 250px;
      height: 25px;
      display: inline-block;
      vertical-align: middle;
      transition: 0.3s;
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
    }
    .add-date-piker {
      margin-left: 30px;
      width: 260px;
      height: 25px;
      display: inline-block;
     
    }
    .feedback-item-list {
      border: 2px solid $--color-noselect;
    }
    .feedback-item-list-active {
      border: 2px solid $--color-primary;
    }
  }
}
</style>

<style lang="scss" >
$--color-primary:#31aaD8;
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
.add-date-piker{
   .el-input--mini .el-input__inner{
        width: 253px !important;
         border:2px solid #ddd;
        &:focus{
          border:2px solid $--color-primary;
        }
      }
      .el-input__suffix{
        right: -25px;
      }
}
.feedback-item {
  .select-component {
    width: 250px;
    // border:1px solid red;
    margin-left: 28px;
    display: inline-block !important;
  }
  .version .el-select .el-input__inner {
    width: 250px;
    text-align: center;
  }
}
</style>