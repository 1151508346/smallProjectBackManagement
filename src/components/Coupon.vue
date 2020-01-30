<template>
  <div class="goods-coupon">
    <div class="goods-title">
      <i class="el-icon-s-ticket"></i>
      <span>优惠卷</span>
    </div>
    <div class="goods-coupon-operate">
      <div class="button-group">
        <el-button size="mini" icon="el-icon-setting" type="warning" @click="updateCouponInfo">修改</el-button>
        <el-button size="mini" icon="el-icon-delete" type="danger" @click="deleteCouponInfo">删除</el-button>
      </div>

      <el-input
        size="mini"
        placeholder="根据用户ID或商品ID"
        class="input-with-select"
        v-model="searchContent"
      >
        <el-button
          @click = "handleSearchFunc"
          slot="append" icon="el-icon-search" title="搜索"
        ></el-button>
      </el-input>
    </div>
    <el-table
      ref="multipleTable"
      :data="couponDetailList"
      tooltip-effect="dark"
      style="width:100% ;background-color:rgba(50, 67, 93, 1);"
      type="index"
      :default-sort="{prop: 'createtime',prop: 'goodsid' ,order: 'descending'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column style="background-color:rgba(50, 67, 93, 1)" type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="userid" label="用户ID" sortable width="100"></el-table-column>
      <el-table-column prop="goodsid" label="商品ID" show-overflow-tooltip width="100"></el-table-column>
      <el-table-column prop="couponprice" label="优惠价格"
        show-overflow-tooltip
       ></el-table-column>
      <el-table-column prop="couponstatus" label="优惠卷状态" width="100"></el-table-column>
       <el-table-column prop="starttime" label="开始时间"  show-overflow-tooltip></el-table-column> -->
        <el-table-column prop="endtime" label="结束时间" show-overflow-tooltip></el-table-column> -->

      <!-- <el-table-column sortable prop="createtime" label="添加日期" show-overflow-tooltip></el-table-column>
      <el-table-column prop="typeid" label="分类" width="100"></el-table-column>
     
      <!-- <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>-->
    </el-table>
    <div class="pagination-box">
      <el-pagination
        @current-change="currentChange"
        @prev-click="prevClick"
        @next-click="nextClick"
        background
        layout="prev, pager, next"
        :total="couponCount"
        :current-page="page"
      ></el-pagination>
    </div>
    <!-- <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>-->
    <!-- <UploadGoods ref="uploadGoods" /> -->
  </div>
</template>

<script>
import EditCouponInfo from "@/components/EditCouponInfo.vue";

export default {
  data: function() {
    return {
      page: 1,
      limit: 10,
      couponDetailList:[],
      couponCount: 0,
      searchInfo: "",
      searchContent: "",
      dialogVisible: false,
      multipleSelection:[]
    };
  },
  created() {},
  mounted() {
    this.getCouponCount();
    this.getCouponDetailInfo();
  },

  methods: {
    getCouponCount() {
        var _that = this;
        var url = this.$api.getCouponCount;
        this.request({
            url: url,
            method: "GET",
            params:{
                searchInfo : _that.searchInfo
            }
        }).then(res => {
            console.log(res.data)
            _that.couponCount = res.data.couponCount;
        });
    },
    getCouponDetailInfo() {
    //   console.log("----------------------------");
      var _that = this;
      var url = this.$api.getCouponDetailInfo;
      this.request({
        url: url,
        method: "POST",
        data: {
          page: _that.page,
          limit: _that.limit,
          searchInfo:_that.searchInfo
          
        }
      }).then(res => {
        console.log(res.data);
        _that.couponDetailList = res.data

      });
    },
    currentChange(page) {
      // var url = this.$api.getGoodsInfo;
       var url = this.$api.getCouponDetailInfo;
      this.page = page;
      this.getcouponDetailInfo(url, page, this);
    },
    prevClick(page) {
      // var url = this.$api.getGoodsInfo;
       var url = this.$api.getCouponDetailInfo;
      this.page = page;
      this.getcouponDetailInfo(url, page, this);
    },
    nextClick(page) {
      // var url = this.$api.getGoodsInfo;
       var url = this.$api.getCouponDetailInfo;
      this.page = page;
      this.getcouponDetailInfo(url, page, this);
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
      // console.log(val) 
    },
    updateCouponInfo(){
       var _that = this;
      // console.log(index,row)
      if (this.multipleSelection.length!==1) {
        // this.$common.alertHint(this, "衣优美服装提醒您", "请选择修改的一列");
        this.$message({
          type: "info",
          message: "请选择指定编辑的一行"
        });
        return;
      }
    //   console.log(this.multipleSelection)
    //   this.multipleSelection.
       this.$alert(
        <EditCouponInfo ref="edit_coupon_info" couponInfo = {{...this.multipleSelection[0]}}/>,
        "评价编辑",
        {
          dangerouslyUseHTMLString: true
        }
      ).then(res=>{
        // console.log(res);
        var editedCouponInfo = _that.$refs.edit_coupon_info._props.couponInfo;
        var url = _that.$api.editedCouponInfo
        // console.log(editedCouponInfo);
        this.request({
          url:url,
          method:"POST",
          data:editedCouponInfo
        }).then(res=>{
        //   console.log(res)
          if(res.data.result === "success"){
              _that.$common.alertHint(_that, "衣优美服装提醒您", "修改信息成功");
          }else{
            _that.$common.alerHint(_that,"衣优美服装提醒您","修改信息失败");
          }
        })
      })
    },
    deleteCouponInfo(){
       var _that = this;
      // console.log(index,row)
      if (this.multipleSelection.length===0) {
        // this.$common.alertHint(this, "衣优美服装提醒您", "请选择修改的一列");
        this.$message({
          type: "info",
          message: "请选择要删除的数据"
        });
        return;
      }
       this.$confirm(
        "此操作将永久删除该商信息, 是否继续?",
        "衣优美服装提醒您",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(()=>{
       var url = _that.$api.deleteCouponInfo;
        _that.request({
        url:url,
        method:"POST",
        data:_that.multipleSelection
      }).then(res=>{
          console.log(res.data);
          if(res.data.result === "success"){
          _that.$common.alertHint(_that,"衣优美丽服装提醒您","删除成功");
          _that.getCouponDetailInfo();
          _that.getCouponCount();
        }else{
          _that.$common.alertHint(_that,"衣优美服装提醒您","删除失败");
        }
      })
      }).catch(()=>{
        _that.$message({
            type: "info",
            message: "已取消删除"
          });
      })
     
      
    },
    handleSearchFunc(){
      this.searchInfo = this.searchContent;
      this.searchContent = "";
      this.getCouponCount();
      this.getCouponDetailInfo();
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-coupon {
  //   border: 1px solid red;
  //   background-color: rgba(50, 67, 93, 1);
  height: 100%;
  box-sizing: border-box;
  .goods-coupon-operate {
    //   margin-top:20px;
    //   margin-left:20px;
    padding: 10px 15px 0px 15px;
    // border: 1px solid red;
    display: flex;
    justify-content: space-between;
    .el-input-group {
      width: 300px;
    }
  }
  .goods-title {
    border-bottom: 2px solid rgba(50, 67, 93, 1);
    // border-bottom: 2px solid rgb(169, 185, 197);
    padding: 10px 15px;
    // color: #fff;
    span {
      margin-left: 5px;
    }
  }
  .pagination-box {
    margin-top: 20px;
    text-align: center;
  }
}
</style>

<style lang="scss">
// .goods-coupon {
//   .el-table tr.el-table__row {
//     background-color: rgba(50, 67, 93, 1) !important;
//     color: #fff;
//     &:hover {
//       background-color: rgba(50, 67, 93, 0.6) !important;
//       color: #000;
//     }
//   }
//   .el-table th {
//     background-color: rgba(50, 67, 93, 1) !important;
//     // &:hover{
//     //     background-color: rgba(50, 67, 93, 0.6) !important;
//     //     color:#fff;
//     // }
//   }
//   .el-table th.is-leaf,
//   .el-table td {
//     border-bottom: 1px solid rgb(169, 185, 197) !important;
//   }
//   thead.has-gutter tr {
//     color: #fff;
//     &:hover {
//       color: #fff;
//     }
//   }
// }
</style>