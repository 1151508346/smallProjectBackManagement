<template>
  <div class="select-component">
    <!-- <div  class="select-target-box">
        <el-select class="select-target" v-model="value1" size="small">
          <el-option
            v-for="(item,index) in options"
            :key="index.toString()"
            :label="item.label"
            :value="item.label"
          ></el-option>
        
  </el-select>
    </div>-->
    <div class="upload-item-list version">
      <el-select v-model="value" size="mini"
        @change="changeSelectValue"
       :multiple="multiple" collapse-tags :placeholder="title"
       >
        <!-- medium/small/mini -->

        <el-option
          v-for="item in params"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>


<script>
export default {
  props: ["title","params","multiple","getChildSelectValue"],
  mounted(){
    // console.log(this.params);
   
  //  if(this.$attrs.defaultSex){
  //    this.value = this.$attrs.defaultSex;
  //  }
  },
  data: function() {
    return {
      options: [
        {
          value: "",
          label: ""
        },
        
      ],
      value: "",
      selectValue:""
    };
  },
  methods: {
    changeSelectValue(params){
     this.selectValue = params
      this.$emit("getTypeId",this.selectValue);
      this.$emit("getCategory",this.selectValue);
    }
  },
};
</script>

<style lang="scss" scoped>
$--color-primary: #409eff;
// .select-component{
//   // line-height: 45px;
//   .select-target-box{
//     border:1px solid red ;
//     height:40px;
//     display: inline-block;
//     vertical-align: middle;
//     .select-target{
//       //  border:1px solid red ;
//     }

//   }
// }
.upload-item-list {
  // margin-left: 30px;
  border: 2px solid $--color-primary;
  outline: none;
  // width: 250px;
  height: 25px;
  display: inline-block;
  vertical-align: middle;
}
</style>
<style lang="scss">
.version {
  .el-select {
    width: 100% !important;
    height: 25px;
    margin-top: 1px;
    border-radius: 0px !important;
    .el-input--suffix {
      //  height: 25px;
      border-radius: 0px !important;
      height: 100%;
      line-height: 0px !important;
      padding: 0px !important;
      margin: 0px;
      margin-top: -25px !important;
    }
    .el-input::-webkit-scrollbar-thumb {
      border-radius: 0px !important;
    }

    .el-input__inner {
      border: none;
      width: 200px;
      // width: 50%;
      font-size: 12px !important;
      background-color: transparent !important;
    }
  }
}
</style>