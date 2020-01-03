<template>
  <div class="sole-manage container" id="sole-manage">

        <h1 style="height:10%">asdasd</h1>
    <div style = "height:90%" class="user-wrapper">
        <div class="user-list-panel user-common">
        用户列表
        <div class="user-list-panel-wrapper">
            <li>5</li>
            <li>5</li>
            <li>5</li>
            <li>5</li>
            <li>5</li>
        </div>
        </div>
        <div class="user-list-box user-common">
            <el-transfer class="sole-manage-transfer" 
            :titles="['用户列表', '角色包含用户列表']"
            v-model="value" :data="data"></el-transfer>
        </div>
    </div>

  </div>
</template>

<script>
import Test from "@/components/Test.vue";
export default {
  components: {
    Test
  },
  methods: {
    open() {
      console.log(this);
    
    }
  },
   data() {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 30; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            // disabled: i % 4 === 0
          });
        }
        return data;
      };
      return {
        data: generateData(),
        value: [1,4,3]
      };
    }
};
</script>

<style lang="scss" scoped>
.container{
    min-height: 400px;
    height: 100%;
    // width: 100%;
    // overflow: hidden;
    // border:1px solid red;
    .user-wrapper{
        // margin-top:100px;
        display: flex;
        justify-content:center;
        .user-list-box{
            // border:1px solid red;
            height: 100%;
            min-width:580px;
           
            .sole-manage-transfer{
                height: 100%;
            }
        }
        
        .user-list-panel{
            // border:1px solid red;
            height: 100%;
            flex: 1;
            border: 1px solid #eee;
            box-sizing: border-box;
            // min-width: 300px;
            // width: 10%;
            // width: 100px;
            li{
                float: left;
                margin:5px;
                padding:10px;
            }
            .user-list-panel-wrapper{
                min-width: 400px;
                border:1px solid red;
            }
        }
        .user-common{
            // width:   
                
        }
    }
    
}
@media screen and (max-width: 1000px) {
    .user-list-panel{
        width: 500px;
             flex:0;  
    }
    
}

 
</style>
<style lang="scss" >


.sole-manage-transfer .el-button{
        padding:5px 12px !important;
        display: block;
        margin-right:0px !important;
        margin-left:0px !important;
        padding-right:0px;
}
.el-transfer-panel{
    min-width: 200px !important;
    height: 100%;

}
.el-transfer-panel__body{
   height: 100% !important;  
   .el-checkbox-group,.el-transfer-panel__list{
        height: 100% !important;
    }
}


</style>