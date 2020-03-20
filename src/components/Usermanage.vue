<template>
  <div class="user-manage">
    <div class="user-title">
      <i class="el-icon-s-custom"></i>
      <span>用户列表</span>
    </div>
    <div class="user-manage-operate">
      <el-row>
        <el-button
          size="mini"
          icon="el-icon-plus"
          type="primary"
          @click="handleOperateUser($event,'add')"
        >添加用户</el-button>
        <el-button
          size="mini"
          icon="el-icon-setting"
          type="warning"
          @click="handleOperateUser($event,'update')"
        >修改用户</el-button>
        <el-button
          size="mini"
          icon="el-icon-delete"
          type="danger"
          @click="handleOperateUser($event,'delete')"
        >删除用户</el-button>
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
import AddUserInfo from "@/components/AddUserInfo.vue";
import UpdateUserInfo from "@/components/UpdateUserInfo.vue";
export default {
  data: function() {
    return {
      userInfoList: [],
      multipleSelection: [],
      page: 1,
      limit: 10,
      userAllCount: 0,
       searchInfo:"",
      searchContent:""
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
      var loading = this.$common.loadingHint(_that, "加载中...");
      this.request({
        url: url,
        methods: "GET",
        params: {
          page: page,
          limit: _that.limit
        }
      })
        .then(res => {
          // console.log(res);
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
      this.page = page;
      this.initGetUserInfo(url, page, this);
    },
    prevClick(page) {
      var url = this.$api.getUserInfo;
      this.page = page;
      this.initGetUserInfo(url, page, this);
    },
    nextClick(page) {
      this.page = page;
      var url = this.$api.getUserInfo;
      this.initGetUserInfo(url, page, this);
    },
    handleOperateUser(e, way) {
      switch (way) {
        case "add":
          this.addUserInfo();
          break;
        case "update":
          this.updateUserInfo();
          break;
        case "delete":
          this.deleteUserInfo();
          break;
        default:
          break;
      }
    },
    addUserInfo() {
      var _that = this;
      this.$alert(<AddUserInfo ref="add_user_info" />, "添加用户", {
        dangerouslyUseHTMLString: true
      })
        .then(res => {
          if (res === "confirm") {
            var sexSelect = _that.$refs.add_user_info.$children[0].$data.value;
            // console.log(sexSelect)
            var userInfo = _that.$refs.add_user_info.$data.userInfo;
            for (var item in userInfo) {
              if (userInfo[item] === "" || sexSelect === "") {
                _that.$common.alertHint(
                  _that,
                  "衣优美服装提醒您",
                  "请完善信息"
                );
                return;
              }
            }
            //发送请求
            var url = _that.$api.addUserInfo;
            // console.log(url,_that.userInfo)
            _that
              .request({
                url: url,
                method: "POST",
                data: { ...userInfo, sex: sexSelect }
              })
              .then(res => {
                if (res.data.result === "success") {
                  _that.$common.alertHint(
                    _that,
                    "衣优美服装提醒您",
                    "添加成功"
                  );
                  var url = this.$api.getUserInfo;
                  _that.initGetUserInfo(url, _that.page, _that);
                }
                if (res.data.result === "has exit userInfo") {
                  _that.$common.alertHint(
                    _that,
                    "衣优美服装提醒您",
                    "用户信息已存在"
                  );
                }
                if (res.data.result === "fail") {
                  _that.$common.alertHint(
                    _that,
                    "衣优美服装提醒您",
                    "添加失败"
                  );
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(err => {});
    },
    updateUserInfo() {
      var _that = this;
      if (this.multipleSelection.length !== 1) {
        this.$common.alertHint(this, "衣优美服装提醒您", "请选中一列");
        return;
      }

      var userInfoDetail = {
        userid: this.multipleSelection[0].userid,
        username: this.multipleSelection[0].username,
        password: "",
        avatar: "default",
        email: "",
        telphone: "",
        sex: "",
        user_address: ""
      };

      //  console.log(userInfoDetail)
      this.$alert(
        <UpdateUserInfo
          ref="update_user_info"
          userInfoDetail={{ ...userInfoDetail }}
        />,
        "修改用户",
        {
          dangerouslyUseHTMLString: true
        }
      )
        .then(res => {
          if (res === "confirm") {
            var updatedUserInfo =
              _that.$refs.update_user_info.$options.propsData.userInfoDetail;
            var sexSelect =
              _that.$refs.update_user_info.$children[0].$data.value;
            updatedUserInfo.sex = sexSelect;
            // console.log(updatedUserInfo);
            //发送请求
            var keys = Object.keys(updatedUserInfo);
            // console.log(keys)

            for (var i = 0; i < keys.length; i++) {
              // console.log(updatedUserInfo[keys[i]] === "");
              if (updatedUserInfo[keys[i]] === "") {
                _that.$common.alertHint(
                  _that,
                  "衣优美服装提醒您",
                  "请完善信息"
                );
                return;
              }
            }
            var url = _that.$api.updateUserInfo;
            _that
              .request({
                url: url,
                method: "POST",
                data: {
                  ...updatedUserInfo
                }
              })
              .then(res => {
                if (res.data.result === "success") {
                  var url = _that.$api.getUserInfo;

                  _that.initGetUserInfo(url, _that.page, _that);
                  _that.$common.alertHint(
                    _that,
                    "衣优美服装提醒您",
                    "修改用户信息成功"
                  );
                }
                if (res.data.result === "warning") {
                  _that.$common.alertHint(
                    _that,
                    "衣优美服装提醒您",
                    "未更改用户信息"
                  );
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(err => {});
    },
    deleteUserInfo() {
      var useridList = [];
      var _that = this;
      if (this.multipleSelection.length !== 1) {
        this.$common.alertHint(this, "衣优美服装提醒您", "选择指定一列删除");
        return;
      }
       this.$confirm(
        "此操作将永久删除该用户全部信息, 是否继续?",
        "衣优美服装提醒您",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
           var url = this.$api.deleteUserInfo;
            _that.request({
              url: url,
              method:"POST",
              data: {
                useridList:useridList,
              }
            }).then(res=>{
              console.log(res.data)
               if (res.data.result === "success") {
                  _that.getUserAllCount();
                _that.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }else{
                _that.$message({
                  type: "info",
                  message: "删除失败"
                });
              }
             
            }).catch(err=>{
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });

      for (var item of this.multipleSelection) {
        useridList.push({
          userid: item.userid
        });
      }
     
    }
  }
};
</script>

<style lang="scss" scoped>
.user-manage {
  // border: 1px solid red;
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