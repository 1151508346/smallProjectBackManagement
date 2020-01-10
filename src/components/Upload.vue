<template>
  <div class="container upload">
    <div class="upload-item">
      <span class="info-hint">选择文件</span>
      <div class="upload-item-list file">
        <a class="visit-file" @click="handleSelectFile($event)">
          浏览
          <span style="font-size:16px; letter-spacing: 3px">...</span>
        </a>

        <div class="hidden-default-style">
          <input type="file" name id="upload-item-file" />
          <span>{{fileValue}}</span>
        </div>
      </div>
      <!-- <input type="file"
        style = "none"
      class="upload-item-file" value="浏览" placeholder="选择文件..." />-->
    </div>
    <div class="upload-item">
      <span class="info-hint">版本选择</span>
      <div class="upload-item-list version">
        <el-select v-model="value" size="mini" placeholder="请选择">
          <!-- medium/small/mini -->
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="upload-item">
      <span class="info-hint">文件描述</span>
      <textarea class="description-window" id cols="30" rows="15"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    
  },
  data: function() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
      ],
      value: "",
      fileValue: "请选择文档..."
    };
  },
  
  methods: {
    handleSelectFile(e) {
      var _that = this;
      var upload = document.getElementById("upload-item-file");
      upload.onchange = function(e) {
        _that.fileValue = this.value;
      };
      upload.click();
    }
    // getFilePath(e) {
    //   console.log(e);
    // }
  }
};
</script>

<style lang="scss" scoped>
$--color-primary: #409eff;
$--font-size:13px;
.container {
  .upload-item {
    .info-hint {
      font-size: $--font-size;
      margin-left: 20px;
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
.version {
  .el-select {
    width: 100% !important;
    height: 25px;
    margin-top:-10px;
    // border:1px solid red;
    border-radius: 0px !important;
    .el-input {

      overflow: hidden;
      //  height: 25px;
      //  border:1px solid red;
       top:23px;
      border-radius: 0px !important;
        span{
          top:2px;
        }
    }
    .el-input::-webkit-scrollbar-thumb {
      border-radius: 0px !important;
    }
    .el-input__inner {
      border: none;
      // padding-top:9px !important;
        // margin-top: -4px !important;
      background-color: transparent !important;
    }
  }
}
</style>