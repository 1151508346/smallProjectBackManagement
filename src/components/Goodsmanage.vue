<template>
  <div class="goods-manage">
    <div class="goods-title">
      <i class="el-icon-s-goods"></i>
      <span>商品列表</span>
    </div>
    <div class="goods-manage-operate">
      <el-button size="mini" icon="el-icon-upload2" type="primary" @click="uploadGoods">上传商品</el-button>
      <el-input
        size="mini"
        placeholder="根据商品ID或商品名称"
        class="input-with-select"
        v-model="searchContent"
      >
        <el-button slot="append" icon="el-icon-search" title="搜索" @click="handleSearch"></el-button>
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
      <el-table-column prop="goodsid" label="商品ID" sortable width="100"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="goodscount" label="商品数量" width="80"></el-table-column>
      <el-table-column prop="goodsprice" label="商品价格" width="80"></el-table-column>
      <el-table-column sortable prop="createtime" label="添加日期" show-overflow-tooltip></el-table-column>
      <el-table-column prop="typeid" label="分类" width="100"></el-table-column>
      <el-table-column prop="category" label="商品所属类型" width="110" show-overflow-tooltip></el-table-column>
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
    <!-- <UploadGoods ref="uploadGoods" /> -->
  </div>
</template>

<script>
import UpdateGoodsInfo from "@/components/UpdateGoodsInfo.vue";
import UploadGoods from "@/components/UploadGoods.vue";

export default {
  // components: {
  //   UploadGoods
  // },
  data: function() {
    return {
      goodsInfoList: [],
      multipleSelection: [],
      page: 1,
      limit: 10,
      goodsAllCount: 0,
      searchInfo: "",
      searchContent: "",
      goodsSort: [],
      dialogVisible: false
    };
  },
  created() {},

  mounted() {
    /**
     * 获取用户数据列表
     */
    var _that = this;
    this.getGoodsAllCount();
    this.getSort();
  },

  methods: {
    handleClose(done) {
      var _that = this;
      _that.$common.alertHint(_that, "衣优美服装提醒您", "a");
    },
    handleOpened() {
      this.$common.alertHint(this, "衣优美服装提醒您", "b");
    },
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
    getGoodsAllCount() {
      //   console.log("----------------");
      var _that = this;
      var url = this.$api.getGoodsCount;
      this.request({
        url: url,
        method: "GET",
        params: {
          searchInfo: _that.searchInfo
        }
      }).then(res => {
        // console.log(res.data);
        if (res.data["count(goodsid)"] > 0) {
          _that.goodsAllCount = res.data["count(goodsid)"];
          var url = _that.$api.getGoodsInfo;
          _that.initGetGoodsInfo(url, _that.page, _that);
        }
      });
    },
    initGetGoodsInfo(url, page, _that) {
      var loading = this.$common.loadingHint(_that, "加载中...");
      this.request({
        url: url,
        methods: "GET",
        params: {
          page: page,
          limit: _that.limit,
          searchInfo: _that.searchInfo
        }
      })
        .then(res => {
          loading.close();
          res.data.map(item => {
            item.goodsprice = item.goodsprice + "元";
            // item.createtime = new Date(
            //   Date.parse(item.createtime)
            // ).toLocaleString();
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
      var url = this.$api.getGoodsInfo;
      this.page = page;
      this.initGetGoodsInfo(url, page, this);
    },
    prevClick(page) {
      var url = this.$api.getGoodsInfo;
      this.page = page;
      this.initGetGoodsInfo(url, page, this);
    },
    nextClick(page) {
      var url = this.$api.getGoodsInfo;
      this.page = page;

      this.initGetGoodsInfo(url, page, this);
    },
    handleDelete(index, row) {
      var _that = this;
      // console.log(index,row)
      if (this.multipleSelection.indexOf(row) === -1) {
        this.$common.alertHint(this, "衣优美服装提醒您", "请选择要删除的一列");
        return;
      }
      // console.log(row.goodsid);

      this.$confirm(
        "此操作将永久删除该商品信心, 是否继续?",
        "衣优美服装提醒您",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });

          var url = this.$api.deleteGoodsInfo;
          this.request({
            url: url,
            method: "GET",
            params: {
              goodsid: row.goodsid
            }
          })
            .then(res => {
              if (res.data.result === "success") {
                var url = this.$api.getGoodsInfo;
                _that.initGetGoodsInfo(url, _that.page, _that);
                _this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
              if (res.data.result === "fail") {
                _this.$message({
                  type: "info",
                  message: "删除失败"
                });
              }
            })
            .catch(err => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });

      return;
    },
    handleEdit(index, row) {
      var _that = this;
      // console.log(index, row);
      if (this.multipleSelection.indexOf(row) === -1) {
        this.$message({
          type: "info",
          message: "请选择指定要编辑的列"
        });
        return;
      }
      this.$alert(
        <UpdateGoodsInfo ref="update_goods_info" goodsInfo={{ ...row }} />,
        "编辑商品",
        {
          dangerouslyUseHTMLString: true
        }
      )
        .then(res => {
          var {
            goodsname,
            goodsprice,
            goodscount,
            goodsid
          } = _that.$refs.update_goods_info.$options.propsData.goodsInfo;
          var { defaultDate } = _that.$refs.update_goods_info.$data;
          var url = this.$api.updateGoodsInfo;
          if (
            goodsname === "" ||
            goodsprice === "" ||
            goodscount === "" ||
            defaultDate === "" ||
            defaultDate === null
          ) {
            _that.$common.alertHint(_that, "衣优美服装提醒您", "请完善信息");
            return;
          }
          _that
            .request({
              url: url,
              method: "POST",
              data: {
                goodsname: goodsname,
                goodsprice: goodsprice,
                goodscount: goodscount,
                goodsid: goodsid,
                createtime: defaultDate
              }
            })
            .then(res => {
              if (res.data.result === "success") {
                _that.$common.alertHint(
                  _that,
                  "衣优美服装提醒您",
                  "修改商品数据成功"
                );
                var url = this.$api.getGoodsInfo;
                _that.initGetGoodsInfo(url, _that.page, _that);
              } else {
                _that.$common.alertHint(
                  _that,
                  "衣优美服装提醒您",
                  "修改商品数据失败"
                );
              }
            })
            .catch(err => {});
        })
        .catch(err => {});
    },
    handleSearch() {
      this.searchInfo = this.searchContent;
      this.searchContent = "";
      var url = this.$api.getGoodsInfo;
      this.page = 1;
      this.getGoodsAllCount();
      this.initGetGoodsInfo(url, this.page, this);
    },
    createContent(data) {
      var _that = this;
      var {
        typeId,
        category,
        goodsId,
        goodsName,
        goodsCount,
        goodsPrice,
        formDataInfo
      } = data;
      var url = this.$api.createContent;
      this.request({
        url: url,
        method: "POST",
        data: {
          typeId,
          category,
          goodsId,
          goodsName,
          goodsCount,
          goodsPrice,
          formDataInfo
        }
      }).then(res => {
        if (res.data.result != "fail") {
        formDataInfo.append("typeId", typeId);
        formDataInfo.append("category", category);
        formDataInfo.append("goodsId", goodsId);
        formDataInfo.append("goodsName", goodsName);
        formDataInfo.append("goodsCount", goodsCount);
        formDataInfo.append("goodsPrice", goodsPrice);
          var url = _that.$api.uploadFile;
          var loading = _that.$common.loadingHint(_that);
          _that
            .request({
              url: url,
              method: "POST",
              data: formDataInfo,
              headers: {
                "Content-Type": "multipart/form-data"
              }
            })
            .then(res => {
              loading.close();
              if(res.data.result === "success"){
                _that.$common.alertHint(_that,"衣优美服装提醒您","上传商品成功");
              }else{
                 _that.$common.alertHint(_that,"衣优美服装提醒您","上传商品失败");
              }
            })
            .catch(err => {
              loading.close();
            });
        }
      });
    },
    uploadGoods() {
      var _that = this;
      var goodsSort = this.goodsSort;
      this.$alert(
        <UploadGoods ref="uploadGoods" goodsSort={{ ...goodsSort }} />,
        "上传商品",
        {
          dangerouslyUseHTMLString: true
        }
      ).then(res => {
        var {
          typeId,
          category,
          goodsId,
          goodsName,
          goodsCount,
          goodsPrice,
          formDataInfo
        } = _that.$refs.uploadGoods.$data;
        if (
          typeId.trim() === "" ||
          category.trim() === "" ||
          goodsId.trim() === "" ||
          goodsName.trim() === "" ||
          goodsCount.trim() === "" ||
          goodsPrice.trim() === "" ||
          formDataInfo == null
        ) {
        _that.$common.alertHint(_that, "衣优美服装提醒您", "请完善信息");
          return;
        }
        _that.createContent(_that.$refs.uploadGoods.$data);
       
        
      });
    },
    getSort() {
      var _that = this;
      this.goodsSort = [];
      var url = this.$api.getSort;
      this.request({
        url: url,
        method: "GET"
      })
        .then(res => {
          res.data.forEach(item => {
            _that.goodsSort.push({
              value: item.typeid,
              label: item.typeid
            });
          });
        })
        .catch(err => {});
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