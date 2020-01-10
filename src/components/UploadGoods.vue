<template>
  <div class="container feedback">
    <div class="upload-item">
      <span class="info-hint">选择文件</span>
      <div class="upload-item-list file">
        <a class="visit-file" @click="handleSelectFile($event)">
          浏览
          <span style="font-size:16px; letter-spacing: 3px">...</span>
        </a>

        <div class="hidden-default-style">
          <input type="file" multiple="multiple" name id="upload-item-file" />
          <span>{{fileValue}}</span>
        </div>
      </div>
      <!-- <input type="file"
        style = "none"
      class="upload-item-file" value="浏览" placeholder="选择文件..." />-->
    </div>
    <div class="feedback-item">
      <span class="info-hint">商品ID</span>
      <div :class="usernameStatus? 'feedback-item-list-active':'feedback-item-list'">
        <input
          ref="product"
          v-model="goodsId"
          type="text"
          style="none"
          class="feedback-item-file"
          placeholder="商品ID"
          @focus="handleFocusBorderStyle($event,'username')"
          @blur="handleBlurBorderStyle($event,'username')"
        />
      </div>
    </div>
    <div class="feedback-item">
      <span class="info-hint">商品名称</span>
      <div :class="passwordStatus? 'feedback-item-list-active':'feedback-item-list'">
        <input
          ref="product"
          v-model="goodsName"
          type="text"
          style="none"
          class="feedback-item-file"
          placeholder="商品名称"
          @focus="handleFocusBorderStyle($event,'password')"
          @blur="handleBlurBorderStyle($event,'password')"
        />
      </div>
    </div>
    <!-- <div class="feedback-item">
      <span class="info-hint">性别</span>
    <Select :params="sexList" :multiple= "false" ref="sexSelect"/>-->
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
      <span class="info-hint">商品数量</span>
      <div :class="emailStatus?'feedback-item-list-active':'feedback-item-list'">
        <input
          v-model="goodsCount"
          type="text"
          style="none"
          class="feedback-item-file"
          placeholder="商品数量"
          @focus="handleFocusBorderStyle($event,'email')"
          @blur="handleBlurBorderStyle($event,'email')"
        />
      </div>
    </div>
    <div class="feedback-item">
      <span class="info-hint">商品价格</span>
      <div :class="telphoneStatus ?'feedback-item-list-active':'feedback-item-list'">
        <input
          v-model="goodsPrice"
          type="text"
          style="none"
          class="feedback-item-file"
          placeholder="商品价格"
          @focus="handleFocusBorderStyle($event,'telphone')"
          @blur="handleBlurBorderStyle($event,'telphone')"
        />
      </div>
    </div>
    <!-- <div class="feedback-item">
      <span class="info-hint">分类</span>
      <div :class="addressStatus?'feedback-item-list-active':'feedback-item-list'">
        <input
          v-model="userInfo.address"
          type="text"
          style="none"
          class="feedback-item-file"
          placeholder="分类"
          @focus="handleFocusBorderStyle($event,'address')"
          @blur="handleBlurBorderStyle($event,'address')"
        />
      </div>
    </div>-->
    <div class="feedback-item">
      <span class="info-hint">分类</span>
      <Select
        :params="goodsSort"
        :multiple="false"
        @getTypeId="getTypeIdByChildComponent"
        ref="sort"
      />
    </div>
    <div class="feedback-item">
      <span class="info-hint">所属类别</span>
      <Select
        :params="categoryList"
        :multiple="false"
        @getCategory="getCategoryByChildComponent"
        ref="category"
      />
      <!-- <div :class="sexStatus? 'feedback-item-list-active':'feedback-item-list'">
        <input
          v-model="userInfo.sex"
          type="text"
          style="none"
          class="feedback-item-file"
          placeholder="所属类别"
          @focus="handleFocusBorderStyle($event,'sex')"
          @blur="handleBlurBorderStyle($event,'sex')"
        />
      </div>-->
    </div>
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
    goodsSort: {
      type: Object,
      default: []
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
      userInfo: {
        username: "",
        email: "",
        telphone: "",
        address: ""
      },
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
      categoryList: [],
      sexList: [
        {
          value: "male",
          label: "男"
        },
        {
          value: "female",
          label: "女"
        }
      ],
      fileValue: "请选择图片...",
      selectValue: "",
      typeId: "", // typeId
      category: "", //category
      goodsId: "",
      goodsName: "",
      goodsCount: "",
      goodsPrice: "",
      formDataInfo:null
    };
  },
  mounted() {},
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
    },
    handleSelectFile(e) {
      var _that = this;
      var upload = document.getElementById("upload-item-file");
      upload.onchange = function(e) {
        var formData = new FormData();
        _that.fileValue = this.value;
        var fileArr = e.target.files;
        fileArr.forEach(item => {
          formData.append("imageList", item,item.name);
        });
        _that.formDataInfo = formData;
        
      };
      upload.click();
    },
    getTypeIdByChildComponent(params) {
      this.typeId = params;
      this.getCategoryList(this.typeId);
    },
    getCategoryByChildComponent(params) {
      this.category = params;
    },
    getCategoryList(typeId) {
      this.categoryList = [];
      var _that = this;
      var url = this.$api.getCategoryList;
      this.request({
        url: url,
        method: "GET",
        params: {
          typeid: typeId
        }
      })
        .then(res => {
          res.data.forEach(item => {
            _that.categoryList.push({
              value: item.category,
              label: item.category
            });
          });
        })
        .catch(err => {});
    }
  },
 
};
</script>

<style lang="scss" scoped>
$--color-primary: #409eff;
$--color-noselect: #ddd;
$--font-size: 14px;
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
    .feedback-item-list {
      border: 2px solid $--color-noselect;
    }
    .feedback-item-list-active {
      border: 2px solid $--color-primary;
    }
  }
  .upload-item {
    .info-hint {
      font-size: $--font-size;
      margin-left: 35px;
    }
    margin-top: 30px;
    .description-window {
      margin-left: 30px;
      border: 2px solid $--color-primary;
      outline: none;
      width: 250px;
      vertical-align: text-top;
      resize: none;
    }
    .upload-item-list {
      margin-left: 30px;
      border: 2px solid $--color-primary;
      outline: none;
      width: 250px;
      height: 25px;
      display: inline-block;
      vertical-align: middle;
      .hidden-default-style {
        vertical-align: middle;
        display: inline-block;
        width: 250px;
        overflow: hidden;
        height: 100%;
        input {
          vertical-align: middle;
          height: 100%;
          width: 100%;
          display: none;
        }
        span {
          display: inline-block;
          height: 100%;
          // border:1px solid red;
          padding-left: 75px;
          width: 100%;
          line-height: 26px;
          font-size: $--font-size;
          color: #999;
        }
      }
    }
    .file {
      position: relative;
      .visit-file {
        display: inline-block;
        position: absolute;
        left: -1px;
        font-size: $--font-size;
        width: 70px;
        background-color: $--color-primary;
        color: #fff;
        text-align: center;
        line-height: 25px;
        cursor: pointer;
      }
      input {
        outline: none;
      }
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