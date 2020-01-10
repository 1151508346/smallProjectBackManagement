<template>
  <div class="goods-manage">
    <div class="goods-title">
      <i class="el-icon-s-goods"></i>
      <span>订单列表</span>
    </div>
    <div class="goods-manage-operate">
      <!-- <el-row>
        <el-button size="mini" icon="el-icon-plus" type="primary">添加用户</el-button>
        <el-button size="mini" icon="el-icon-setting" type="warning">修改用户</el-button>
        <el-button size="mini" icon="el-icon-delete" type="danger">删除用户</el-button>
      </el-row>-->
      <!-- <el-button size="mini" icon="el-icon-upload2" type="primary">上传商品</el-button> -->
      <span></span>
      <el-input size="mini" placeholder="订单号/商品ID/用户ID" class="input-with-select"
        v-model="searchContent"
      >
        <el-button slot="append" icon="el-icon-search" title="搜索"
          @click = "handleSearch"
        ></el-button>
      </el-input>
    </div>

    <el-table
      ref="multipleTable"
      :data="goodsInfoList"
      tooltip-effect="dark"
      style="width:100% ;background-color:rgba(50, 67, 93, 1);"
      type="index"
      :default-sort="{prop: 'createtime',prop: 'goodsid' ,order: 'descending'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column style="background-color:rgba(50, 67, 93, 1)" type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <!-- goodsAllCount -->
      <el-table-column prop="orderid" label="订单号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="goodsid" label="商品ID" sortable width="100"></el-table-column>
      <el-table-column prop="userid" label="用户ID" sortable width="100"></el-table-column>
      <el-table-column prop="receiver" label="收货人" width="110" show-overflow-tooltip></el-table-column>
      <!-- <el-table-column prop="goodsprice" label="商品价格" width="80" ></el-table-column> -->
      <el-table-column sortable prop="purchasetime" label="购买时间" show-overflow-tooltip></el-table-column>
      <el-table-column sortable prop="goodsstatus" label="购买状态" show-overflow-tooltip></el-table-column>

      <el-table-column prop="detailaddress" label="收货地址" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-box">
      <el-pagination
        @current-change="currentChange"
        @prev-click="prevClick"
        @next-click="nextClick"
        background
        layout="prev, pager, next"
        :total="goodsAllCount"
        :current-page="page"
      ></el-pagination>
    </div>
    <!-- <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>-->
  </div>
</template>

<script>
import UpdateOrderInfo from "@/components/UpdateOrderInfo.vue";
export default {
  data: function() {
    return {
      goodsInfoList: [],
      multipleSelection: [],
      page: 1,
      limit: 10,
      goodsAllCount: 0,
      searchInfo: "",
      searchContent: ""
    };
  },
  mounted() {
    /**
     * 获取用户数据列表
     */
    var _that = this;
    this.getOrderAllCount();
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getOrderAllCount() {
      //   console.log("----------------");
      var _that = this;
      var url = this.$api.getOrderCount;
      this.request({
        url: url,
        methods: "GET",
        params:{
          searchInfo:_that.searchInfo
        }
      }).then(res => {
        // console.log(res.data);
        if (res.data["count(goodsid)"] > 0) {
          _that.goodsAllCount = res.data["count(goodsid)"];
          var url = _that.$api.getOrderInfo;
          _that.initGetOrderInfo(url, _that.page, _that);
        }
      });
    },
    initGetOrderInfo(url, page, _that) {
      var loading = this.$common.loadingHint(_that, "加载中...");
      this.request({
        url: url,
        methods: "GET",
        params: {
          page: page,
          limit: _that.limit,
          searchInfo:_that.searchInfo
        }
      })
        .then(res => {
          loading.close();
          res.data.map(item => {
            item.goodsprice = item.goodsprice + "元";
            item.createtime = new Date(
              Date.parse(item.createtime)
            ).toLocaleString();
            return item;
          });
          _that.goodsInfoList = res.data;
          //   console.log(res);
        })
        .catch(err => {
          loading.close();
          //   console.log(err);
        });
    },
    currentChange(page) {
      console.log(page);
      var url = this.$api.getOrderInfo;
      console.log(this);
      this.initGetOrderInfo(url, page, this);
    },
    prevClick(page) {
      var url = this.$api.getOrderInfo;
      this.initGetOrderInfo(url, page, this);
    },
    nextClick(page) {
      var url = this.$api.getOrderInfo;
      this.initGetOrderInfo(url, page, this);
    },
    handleDelete(index, row) {
      // console.log(index,row);
      var url = this.$api.deleteOrderData;
      var _that = this;
      if (this.multipleSelection.indexOf(row) === -1) {
        this.$common.alertHint(this, "衣优美服装提醒您", "请选中删除列");
        return;
      }
      this.$confirm(
        "此操作将永久删除该商品信心, 是否继续?",
        "衣优美服装提醒您",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(res => {
        this.request({
          url: url,
          method: "GET",
          params: {
            orderid: row.orderid
          }
        }).then(res => {
          if (res.data.result === "success") {
            this.$common.alertHint(this, "衣优美服装提醒您", "删除成功");
            var url = _that.$api.getOrderInfo;
            _that.initGetOrderInfo(url, _that.page, _that);
          } else if (res.data.result === "fail") {
            this.$common.alertHint(this, "衣优美服装提醒您", "删除失败");
          }
        });
      });
    },
    handleEdit(index, row) {
      var _that = this;
      if (this.multipleSelection.indexOf(row) === -1) {
        this.$message({
          type: "info",
          message: "请选择指定要编辑的列"
        });
        return;
      }

      this.$alert(
        <UpdateOrderInfo ref="update_order_info" orderInfo={{ ...row }} />,
        "编辑商品",
        {
          dangerouslyUseHTMLString: true
        }
      )
        .then(res => {
          var {
            goodsid,
            userid,
            receiver,
            purchasetime,
            detailaddress,
            goodsstatus,
            orderid,
            addressid
          } = _that.$refs.update_order_info.$options.propsData.orderInfo;
          var url = this.$api.updateOrderInfo;
          this.request({
            url: url,
            method: "POST",
            data: {
              goodsid,
              userid,
              receiver,
              purchasetime,
              detailaddress,
              goodsstatus,
              orderid,
              addressid
            }
          })
            .then(res => {
              // console.log(res);
              if (res.data.result === "success") {
                _that.$common.alertHint(
                  _that,
                  "衣优美服装提醒您",
                  "修改订单信息成功"
                );
                var url = this.$api.getOrderInfo;
                _that.initGetOrderInfo(url, _that.page, _that);
              }
              if (res.data.result === "fail") {
                _that.$common.alertHint(
                  _that,
                  "衣优美服装提醒您",
                  "修改订单信息失败"
                );
              }
            })
            .catch(err => {});
        })
        .catch(err => {});
    },
    handleSearch(){
      this.searchInfo = this.searchContent ;
      this.searchContent = "";
      var url = this.$api.getGoodsInfo;
      this.page = 1;
       this.getOrderAllCount();
      this.initGetOrderInfo(url,this.page,this)
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-manage {
  //   border: 1px solid red;
  //   background-color: rgba(50, 67, 93, 1);
  height: 100%;
  box-sizing: border-box;
  .goods-manage-operate {
    //   margin-top:20px;
    //   margin-left:20px;
    padding: 15px 15px;
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
    margin-top: 30px;
    text-align: center;
  }
}
</style>

<style lang="scss">
// .goods-manage {
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