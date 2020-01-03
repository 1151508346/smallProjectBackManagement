<template>
  <div class="container feedback">
    <div class="feedback-item">
      <span class="info-hint">产品</span>
      <div :class="productionStatus? 'feedback-item-list-active':'feedback-item-list'">
        <input
          ref="product"
          v-model="productionInfo.product"
          type="text"
          style="none"
          class="feedback-item-file"
          placeholder="产品"
          @focus="handleFocusBorderStyle($event,'production')"
          @blur="handleBlurBorderStyle($event,'production')"
        />
      </div>
    </div>
    <div class="feedback-item">
      <span class="info-hint">文档名称</span>
      <div :class="filenameStatus? 'feedback-item-list-active':'feedback-item-list'">
        <input
          v-model="productionInfo.fileName"
          type="text"
          style="none"
          class="feedback-item-file"
          placeholder="文档名称"
          @focus="handleFocusBorderStyle($event,'filename')"
          @blur="handleBlurBorderStyle($event,'filename')"
        />
      </div>
    </div>
    <div class="feedback-item">
      <span class="info-hint">文档版本</span>
      <div :class="versionStatus?'feedback-item-list-active':'feedback-item-list'">
        <input
          v-model="productionInfo.version"
          type="text"
          style="none"
          class="feedback-item-file"
          placeholder="文档版本"
          @focus="handleFocusBorderStyle($event,'version')"
          @blur="handleBlurBorderStyle($event,'version')"
        />
      </div>
    </div>
    <div class="feedback-item">
      <span class="info-hint">章节</span>
      <div :class="chapterStatus ?'feedback-item-list-active':'feedback-item-list'">
        <input
        
          v-model="productionInfo.section"
          type="text"
          style="none"
          class="feedback-item-file"
          placeholder="章节"
          @focus="handleFocusBorderStyle($event,'chapter')"
          @blur="handleBlurBorderStyle($event,'chapter')"
        />
      </div>
    </div>
    <div class="feedback-item">
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
    </div>
  </div>
</template>

<script>
export default {
  props: {
    productionInfo: {
      type: Object,
      default: {},
      validator: function(_self) {
        // console.log(_self)
        return _self != null ? _self : {};
      }
    }
  },

  data: function() {
    return {
      filenameStatus: false,
      versionStatus: false,
      chapterStatus: false,
      descriptionStatus: false,
      productionStatus: false,
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
      // section: "", //章节
      // problem: "" //问题描述
    };
  },
  mounted: function() {
  },
  methods: {
    handleFocusBorderStyle(e, data) {
      if (data === "production") this.productionStatus = true;
      if (data === "filename") this.filenameStatus = true;
      if (data === "version") this.versionStatus = true;
      if (data === "chapter") this.chapterStatus = true;
      if (data === "description") this.descriptionStatus = true;
    },
    handleBlurBorderStyle(e, data) {
      if (data === "production") this.productionStatus = false;
      if (data === "filename") this.filenameStatus = false;
      if (data === "version") this.versionStatus = false;
      if (data === "chapter") this.chapterStatus = false;
      if (data === "description") this.descriptionStatus = false;
    },
  },
  
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