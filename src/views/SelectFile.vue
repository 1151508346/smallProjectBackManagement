<template>
  <div class="container select-file" id="select-file">
    <div class="time-line">
      <div class="time-line-item time-line-item-common">
        <el-select v-model="value1" size="small"
          
         @change="handelSelectItem" placeholder="产品">
          <el-option
            v-for="(item,index) in options1"
            :key="index.toString()"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select>
      </div>
      <div class="instructions time-line-item-common">
        <!-- <img src="../assets/noActive.png" alt=""> -->
        <div :class="instruc_status1 ? 'instruc-line-active':'instruc-line' ">
          <div :class="instruc_status1 ? 'instruc-line-radius-active':'instruc-line-radius' "></div>
        </div>
      </div>
      <div class="time-line-item time-line-item-common">
        <el-select v-model="value2" 
        size="small" 
        :disabled="!instruc_status1"
        @change="handelSelectItem2" 
        placeholder="版本"
        
        >
          <el-option
            v-for="(item,index) in options2"
            :key="index.toString()"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select>
      </div>
      <div class="instructions time-line-item-common">
        <!-- <img src="../assets/noActive.png" alt=""> -->
        <div :class="instruc_status2 ? 'instruc-line-active':'instruc-line'">
          <div :class="instruc_status2 ? 'instruc-line-radius-active':'instruc-line-radius' "></div>
        </div>
      </div>
      <div class="time-line-item time-line-item-common">
        <!-- medium/small/mini -->
        <el-select v-model="value3" 
            :disabled="!instruc_status2"
        size="small" placeholder="文档名">
          <el-option
            v-for="item in options3"
            :key="item.value3"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select>
      </div>
      <div class="el-button-box">
        <el-button type="primary" size="small" class="el-button-right">确定</el-button>
        <!-- <el-button type="cancel" size="small" class="el-button-left">取消</el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          label: "A",
          options: [
            {
              label: "A1",
              options: [{ label: "A1-1" }, { label: "A1-2" }, { label: "A1-3" }]
            },
            {
              label: "A2",
              options: [{ label: "A2-1" }, { label: "A2-2" }, { label: "A2-3" }]
            },
            {
              label: "A3",
              options: [{ label: "A3-1" }, { label: "A3-2" }, { label: "A3-3" }]
            }
          ]
        },
        {
          label: "B",
          options: [
            {
              label: "B1",
              options: [{ label: "B1-1" }, { label: "B1-2" }, { label: "B1-3" }]
            },
            {
              label: "B2",
              options: [{ label: "B2-1" }, { label: "B2-2" }, { label: "B2-3" }]
            },
            {
              label: "B3",
              options: [{ label: "B3-1" }, { label: "B3-2" }, { label: "B3-3" }]
            }
          ]
        },
        {
          label: "C",
          options: [
            {
              label: "C1",
              options: [{ label: "C1-1" }, { label: "C1-2" }, { label: "C1-3" }]
            },
            {
              label: "C2",
              options: [{ label: "C2-1" }, { label: "C2-2" }, { label: "C2-3" }]
            },
            {
              label: "C3",
              options: [{ label: "C3-1" }, { label: "C3-2" }, { label: "C3-3" }]
            }
          ]
        }
      ],
      options1: [],
      options2: [],
      options3: [],
      value1: "",
      value2: "",
      value3: "",
      instruc_status1: false,
      instruc_status2: false
    };
  },
  created() {
    for (var i = 0; i < this.options.length; i++) {
      this.options1.push({ label: this.options[i].label });
    }
  },
  methods: {
    handelSelectItem: function(e) {
      this.options2 = [];
      this.value2 = "";
      this.options3 = [];
      this.value3 = "";
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].label == e) {
          for (var j = 0; j < this.options[i].options.length; j++) {
            this.options2.push({ label: this.options[i].options[j].label });
          }
        }
      }
        if (this.options2.length !== 0) {this.instruc_status1 = true}
        else{ this.instruc_status1 = false}
        if (this.options3.length !== 0) {this.instruc_status2 = true}
        else{this.instruc_status2 = false}
    },
    handelSelectItem2: function(e) {
      this.options3 = [];
      this.value3 = "";
      for (var i = 0; i < this.options.length; i++) {
        for (var j = 0; j < this.options[i].options.length; j++) {
          if (this.options[i].options[j].label == e) {
            for (
              var k = 0;
              k < this.options[i].options[j].options.length;
              k++
            ) {
              this.options3.push({
                label: this.options[i].options[j].options[k].label
              });
            }
          }
        }
      }
      if (this.options3.length !== 0) {this.instruc_status2 = true}
      else{this.instruc_status2 = false}
    }
  }
};
</script>

<style lang="scss" scoped>
$--color-primary:#409EFF;
.container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgb(250 ,250, 250);
  .time-line {
    padding: 10px;
    position: absolute;
    height: 350px;
    width: 834px;
    top: 0px;
    bottom: 0px;
    right: 0px;
    left: 0px;
    margin: auto;
    border: 1px solid #ddd;
    // background-color:#fff;
    box-shadow: 0 0 15px #bbb;
    .time-line-item{
       border: 2px solid $--color-primary;
       box-sizing:border-box;
    }
    .time-line-item-common {
      float: left;
    }
    .instructions {
      width: 90px;
      height: 35px;
      line-height: 35px;
      

      .instruc-line,
      .instruc-line-active {
        width: 86%;
        height: 0;
        border-radius: 6px;
        position: relative;
        margin-top: 13px;
      }
      .instruc-line-radius,
      .instruc-line-radius-active {
        position: absolute;
        width: 8px;
        height: 8px;
        top: 50%;
        margin-top: -4px;
        right: -8px;
        border-radius: 50%;
      }
    }
    .instruc-line {
      border: 2px solid #ddd;
      .instruc-line-radius {
        background-color: #ddd;
      }
    }
    .instruc-line-active {
       border: 2px solid #409eff;
      .instruc-line-radius-active {
        background-color: #409eff;
      }
    }
    .el-button-box {
      position: absolute;
      bottom: 10px;
      // right: 1px;
      width: 100%;
      .el-button-right {
        float: right;
        margin-right: 20px !important;
      }
      button {
        margin-left: 0px !important;
      }
    }
  }
}
</style>
