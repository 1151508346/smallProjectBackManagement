<template>
  <div class="user-manage">
    <div class="user-title">
      <i class="el-icon-s-custom"></i>
      <span>用户列表</span>
    </div>
    <div class="user-manage-operate">
      <el-row>
        <el-button size="mini" icon="el-icon-plus" type="primary">添加用户</el-button>
        <el-button size="mini" icon="el-icon-setting" type="warning">修改用户</el-button>
        <el-button size="mini" icon="el-icon-delete" type="danger">删除用户</el-button>
      </el-row>
    </div>

    <el-table
      ref="multipleTable"
      :data="userInfoList"
      tooltip-effect="dark"
      style="width: 100%"
      type="index"
      :default-sort="{prop: 'date', order: 'descending'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="序号" width="120"></el-table-column>
      <el-table-column prop="userid" label="用户ID" width="120"></el-table-column>
      <!-- <el-table-column label="日期" sortable prop="date" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>-->
      <el-table-column prop="username" label="用户名" width="120"></el-table-column>
      <el-table-column prop="sex" label="性别" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
      <el-table-column prop="telphone" label="电话" width="120"></el-table-column>
      <el-table-column prop="user_address" label="地址" show-overflow-tooltip></el-table-column>
    </el-table>
    <div class="pagination-box">
      <el-pagination
        @current-change="currentChange"
        @prev-click="prevClick"
        @next-click="nextClick"
        background
        layout="prev, pager, next"
        :total="userAllCount"
      ></el-pagination>
    </div>
    <!-- <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>-->
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      userInfoList: [],
      multipleSelection: [],
      page: 1,
      limit: 10,
      userAllCount: 0
    };
  },
  mounted() {
    /**
     * 获取用户数据列表
     */
    var _that = this;

    this.getUserAllCount();
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
    getUserAllCount() {
      var _that = this;
      var url = this.$api.getUserCount;
      this.request({
        url: url,
        methods: "GET"
      }).then(res => {
        // console.log(res.data);
        if (res.data["count(userid)"] > 0) {
          _that.userAllCount = res.data["count(userid)"];
          var url = this.$api.getUserInfo;
          _that.initGetUserInfo(url, _that.page, _that);
        }
      });
    },
    initGetUserInfo(url, page, _that) {
        var loading = this.$common.loadingHint(_that,"加载中...")
      this.request({
        url: url,
        methods: "GET",
        params: {
          page: page,
          limit: _that.limit
        }
      })
        .then(res => {
          console.log(res);
          loading.close();
          _that.userInfoList = res.data;
        })
        .catch(err => {
            loading.close();
          console.log(err);
        });
    },
    currentChange(page) {
      console.log(page);
      var url = this.$api.getUserInfo;
      this.initGetUserInfo(url, page, this);
    },
    prevClick(page) {
      var url = this.$api.getUserInfo;
      this.initGetUserInfo(url, page, this);
    },
    nextClick(page) {
      var url = this.$api.getUserInfo;
      this.initGetUserInfo(url, page, this);
    }
  }
};
</script>

<style lang="scss" scoped>
.user-manage {
  border: 1px solid red;
  height: 100%;
  box-sizing: border-box;
  .user-manage-operate {
    //   margin-top:20px;
    //   margin-left:20px;
    padding: 10px 15px;
  }
  .user-title {
    border-bottom: 2px solid rgba(50, 67, 93, 1);
    padding: 10px 15px;
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