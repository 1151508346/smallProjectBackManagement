<template>
  <div class="goods-manage">
    <div class="goods-title">
      <i class="el-icon-message"></i>
      <span>问题反馈列表</span>
    </div>
    <div class="goods-manage-operate">
      <!-- <el-row>
        <el-button size="mini" icon="el-icon-plus" type="primary">添加用户</el-button>
        <el-button size="mini" icon="el-icon-setting" type="warning">修改用户</el-button>
        <el-button size="mini" icon="el-icon-delete" type="danger">删除用户</el-button>
      </el-row>-->
      <!-- <el-button size="mini" icon="el-icon-upload2" type="primary">上传商品</el-button> -->
      <span></span>
      <!-- <el-input size="mini" placeholder="订单号/商品ID/用户ID" class="input-with-select"
        v-model="searchContent"
      >
        <el-button slot="append" icon="el-icon-search" title="搜索"
          @click = "handleSearch"
        ></el-button>
      </el-input> -->
    </div>

    <el-table
      ref="multipleTable"
      :data="problemBackInfoList"
      tooltip-effect="dark"
      style="width:100% ;"
      type="index"
      :default-sort="{prop: 'createtime',prop: 'goodsid' ,order: 'descending'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column style="background-color:rgba(50, 67, 93, 1)" type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <!-- goodsAllCount -->
      <el-table-column prop="userid" label="用户ID" show-overflow-tooltip></el-table-column>
       <el-table-column prop="probleminfo" label="问题详情" show-overflow-tooltip></el-table-column>
      <el-table-column sortable prop="backdate" label="反馈时间" show-overflow-tooltip></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="seeProblemBackInfo(scope.$index, scope.row)">查看</el-button>
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
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
        :total="problemBackCount"
        :current-page="page"
      ></el-pagination>
    </div>
    
  </div>
</template>

<script>
import UpdateOrderInfo from "@/components/UpdateOrderInfo.vue";
import SeeProblemBackInfo from "@/components/SeeProblemBackInfo.vue";
import { ADDPROBLEMBACKCOUNT } from "@/store/mutations"

export default {
  data: function() {
    return {
      problemBackInfoList: [],
      multipleSelection: [],
      page: 1,
      limit: 10,
      problemBackCount: 0,
      searchInfo: "",
      searchContent: ""
    };
  },
  mounted() {
    /**
     * 获取用户数据列表
     */
    var _that = this;
    this.getProblemBackAllCount();
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
    getProblemBackAllCount() {
      var _that = this;
      var url = this.$api.getProblemBackCount;
      this.request({
        url: url,
        methods: "GET",
        
      }).then(res => {
        if (res.data.problemBackCount > 0) {
          _that.problemBackCount = res.data.problemBackCount;
          //vuex中添加problemBackCount以在Header组件中使用
          _that.$store.commit(ADDPROBLEMBACKCOUNT,_that.problemBackCount)

          var url = _that.$api.getProblemBackInfo;
          _that.initGetProblemBackInfo(url, _that.page, _that);
        }
      });
    },
    initGetProblemBackInfo(url, page, _that) {
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
          var result = res.data.map(item => {
            item.backdate = new Date(
              Date.parse(item.backdate)
            ).toLocaleString();
            return item;
          });
          _that.problemBackInfoList = result;
          console.log(_that.problemBackInfoList)
           
        })
        .catch(err => {
          loading.close();
          //   console.log(err);
        });
    },
    currentChange(page) {
      var url = this.$api.getProblemBackInfo;
      this.initGetOrderInfo(url, page, this);
    },
    prevClick(page) {
      var url = this.$api.getProblemBackInfo;
      this.initGetOrderInfo(url, page, this);
    },
    nextClick(page) {
      var url = this.$api.getProblemBackInfo;
      this.initGetOrderInfo(url, page, this);
    },
    handleDelete(index, row) {
      var url = this.$api.deleteProblemBackInfo;
      var _that = this;
      if (this.multipleSelection.indexOf(row) === -1) {
        this.$common.alertHint(this, "衣优美服装提醒您", "请选中删除列");
        return;
      }
      this.$confirm(
        "此操作将永久删除该商品信息, 是否继续?",
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
            problembackId: row.problembackid
          }
        }).then(res => {
          if (res.data.result === "success") {
            this.$common.alertHint(this, "衣优美服装提醒您", "删除成功");
            var url = _that.$api.getProblemBackInfo;
              _that.getProblemBackAllCount();
          } else if (res.data.result === "fail") {
            this.$common.alertHint(this, "衣优美服装提醒您", "删除失败");
          }
        });
      });
    },
    seeProblemBackInfo(index,row){
      var _that = this;
      if (this.multipleSelection.indexOf(row) === -1) {
        this.$common.alertHint(this, "衣优美服装提醒您", "请选中要查看的列");
        return;
      }
      this.$alert(
        <SeeProblemBackInfo ref="see_proback_back_info"  problemBackInfo = {{...row}}/>,
        "查看问题反馈详情",
        {
          dangerouslyUseHTMLString: true
        }
      )
        .then(res => {
         
        })
        .catch(err => {});

    }
    // handleSearch(){
    //   this.searchInfo = this.searchContent ;
    //   this.searchContent = "";
    //   var url = this.$api.getGoodsInfo;
    //   this.page = 1;
    //    this.getOrderAllCount();
    //   this.initGetOrderInfo(url,this.page,this)
    // }
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