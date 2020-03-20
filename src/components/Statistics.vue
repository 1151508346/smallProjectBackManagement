<template>
  <div class="statistics">
    <div class="statistics-way">
       <div class="way-item">
        
          <a class="way-item-button" @click="handleGoodsType">商品分类</a>
          <a class="way-item-button" @click="handleGoodsSize">商品尺寸</a>
      </div>
       <div class="way-item">
          <el-select  v-model="goodsId"
           
           size="mini" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
       </div>
    </div>
    <div class="echart-container" id="myChart" >
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      salesVolume:[],
      isStartSize:true,
      options: [],
      goodsId: ''
     }
  },
  mounted(){
    var _that = this;
    var url = this.$api.searchGoodsSaleNumType;
    _that.drawLine({
      url:url,
      text:"商品分类",
      type:["BOY","CHIDREN","GIRL","START","SUIT"]
    });
    _that.getAllGoodsId();
    window.onresize = function(){
      var url = _that.$api.searchGoodsSaleNumType;
      _that.goodsId = "";
      _that.drawLine({
        url:url,
        text:"商品分类",
        type:["BOY","CHIDREN","GIRL","START","SUIT"]
      });
      // _that.getAllGoodsId();
    }
  },
  methods:{
    getAllGoodsId(){
      var _that = this;
      var url = this.$api.getAllGoodsId;
      this.request({
        url:url,
        method:"POST",
      }).then(res=>{
        _that.options = res.data
      })
    },
    drawLine(typeObj){
      var _that = this;
      this.searchGoodsSaleNum(typeObj.url,function(saleVolume){
        console.log(saleVolume)
        // 基于准备好的dom，初始化echarts实例
        var myChart = _that.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: typeObj.text },
            tooltip: {},
            xAxis: {
                data: typeObj.type
            },
            yAxis: { },
            series: [{
                name: '销量',
                type: 'bar',
                data: saleVolume
            }]
        });
      });
        
    },
    searchGoodsSaleNum(url,callback){
      var _that = this;
      var saleVolume = [];
      this.request({
        url:url,
        method:"POST",
        data:{goodsId:_that.goodsId}
      }).then(res=>{
        // console.log(res.data)
        res.data.forEach(item=>{
         saleVolume.push(item.total - item.remainNum)
        })
        callback(saleVolume)
        // console.log(_that.salesVolume)
      })
    },
    handleGoodsType(){
      console.log("aaaaaaaaaa")
      var url = this.$api.searchGoodsSaleNumType;
      this.drawLine({
        url:url,
        text:"商品分类",
        type:["BOY","CHIDREN","GIRL","START","SUIT"]
      });
    },
    handleGoodsSize(){
      if(this.goodsId == ""){
        this.$common.alertHint(this,"衣优美服装提醒您","请选择商品ID");
        return ;
      }
      var url = this.$api.searchGoodsSaleNumSize;
      this.drawLine({
        url:url,
        text:"商品尺寸",
        type:[170,175,180]
      });
    },
    // drawLineSize(typeObj){
    //   var _that = this;
    //   this.searchGoodsSaleNumBySize(typeObj.url,function(saleVolume){
    //     console.log(saleVolume)
    //     // 基于准备好的dom，初始化echarts实例
    //     var myChart = _that.$echarts.init(document.getElementById('myChart'))
    //     // 绘制图表
    //     myChart.setOption({
    //         title: { text: typeObj.text },
    //         tooltip: {},
    //         xAxis: {
    //             data: typeObj.type
    //         },
    //         yAxis: { },
    //         series: [{
    //             name: '销量',
    //             type: 'bar',
    //             data: saleVolume
    //         }]
    //     });
    //   });
        
    // },
    // searchGoodsSaleNumBySize(url,callback){
    //   var _that = this;
    //   var saleVolume = [];
    //   this.request({
    //     url:url,
    //     method:"POST",
    //     data:{goodsId:_that.goodsId}
    //   }).then(res=>{
    //     console.log(res.data)
    //     res.data.forEach(item=>{
    //       switch(res.data.size){
    //         case 170:
    //          saleVolume.push(30-res.data.remainNum);
    //          case 175:
    //          saleVolume.push(30-res.data.remainNum);
    //          case 180:
    //          saleVolume.push(40-res.data.remainNum);

    //       }
    //     })
    //     callback(saleVolume)
    //     // console.log(_that.salesVolume)
    //   })
    // }
  }
};
</script>

<style lang="scss" scoped>
.statistics{
  border:4px solid #32435d;
  box-sizing:border-box;
  width:100%;
  height:100%;
  position:relative;
  .statistics-way{
    width:400px;
    position:absolute;
    right:0px;
    z-index:10;
    // border:1px solid red;
    .way-item{
      float:left;
      .way-item-button{
        cursor:pointer;
        margin-left:10px;
        border:1px solid #eee;
        padding:6px 10px;
        border-radius:4px;
        font-size:12px;
        color:#999;
        display:inline-block;
        &:hover{
          color:#31aaD8;
        }
      }
    }
  }
  .echart-container{
    width:100%;
    height:90%;
  }
  .statistics-tabbar{
    // position:absolute;
    height:10%;
  }
}

</style>
<style lang="scss">
.way-item{
  .el-select > .el-input{
    border:1px solid #eee;
    border-radius: 5px !important;
    margin-left: 10px;
  }
  .el-select{
    margin-top:0px;
    
  }
}


</style>

