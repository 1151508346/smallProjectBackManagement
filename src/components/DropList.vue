<template>
  <!-- <div :class="dropListStatus? 'drop-list drop-list-show':'drop-list drop-list-hidden'" title=""> -->
  <div class="drop-list" title :style="{height:dropListEleHeight+'px'}">
    <li
      v-for="(item,index) in operateList"
      :key="index.toString()"
      class="drop-list-item"
      @click="handelFunctionOperate($event,item.msgstr)"
    >{{item.msgid}}</li>
  </div>
</template>

<script>
import Upload from "@/components/Upload";
import UpdatePassword from "@/components/UpdatePassword";
import { ALERTUPLOAD } from "@/store/mutations.js";
export default {
  props: ["dropListEleHeight", "operateList"],
  methods: {
    handelFunctionOperate(e, param) {
      var _this = this;
      // console.log(param);
      var _that = this;
      if (param === "upload") {
        /**
         * 触发该方法，弹出上传文件
         * ALERTUPLOAD 定义常量名，type:funtion，
         */
        this.$store.commit(ALERTUPLOAD, function() {
          var result = _that
            .$alert(<Upload />, "上传文件", {
              dangerouslyUseHTMLString: true
            })
            .then(res => {
              // if(res === 'confirm'){
              //   console.log(res)
              //   var url = _this.$api.uploadfile;
              //   _this.request({
              //     url:url,
              //     method:"GET",
              //   }).then(res=>{
              //     console.log(res);
              //   })
              // }
            });
        });
      }
      if (param === "roleManage") {
        console.log("roleManage");
        this.$router.push({ path: "/rolemanage" });
      }
      if (param === "userManage") {
        this.$router.push({ path: "/usermanage" });
      }
      if (param === "auditLog") {
        this.$router.push({ path: "/auditLog" });
      }
      if (param === "setPassword") {
        var passwords = {
          newPassword: "",
          enterPassword: ""
        };
        var alertResult = this.$alert(
          <UpdatePassword ref="setPassword" passwords={{ ...passwords }} />,
          "修改密码",
          {
            dangerouslyUseHTMLString: true
          }
        );
        alertResult.then(res => {
          if (res === "confirm") {
            var passwords =
              _this.$refs.setPassword.$options.propsData.passwords;
            var checkResult = _this.checkPasswordInfo(passwords);
            if (checkResult) {
              var loading = this.$common.loadingHint(this);
              var url = this.$api.modifyUserPassword;
              this.request({
                url: url,
                methods: "GET",
                params: {
                  userPassword: passwords.newPassword
                }
              })
                .then(function(res) {
                  // 提示弹框
                  loading.close();
                  //登录成功的提示框
                  _this.$common.alertHint(
                    _this,
                    "优炫软件提醒您",
                    "密码修改成功"
                  );
                })
                .catch(function(err) {
                  loading.close();
                  if (err) {
                    //登录失败的提示框
                    _this.$common.alertHint(
                      _this,
                      "优炫软件提醒您",
                      "密码修改失败"
                    );
                  }
                });
            }
          }
        });
      }
      if (param === "exit") {
        this.$common.removeCookie("sessionId"); //退出登录删除sessionId
        this.$common.removeSessionStorage("userName"); //删除保存在session的用户名
        var result = this.$common.alertHint(
          _this,
          "优炫软件提醒您",
          "退出登录成功"
        );
        result.then(function(res) {
          if (res === "confirm") {
            _this.$router.push({
              path: "/login"
            });
          }
        });
      }
    },
    checkPasswordInfo(passwords) {
      if (
        passwords.newPassword.trim() === "" ||
        passwords.enterPassword.trim() === "" ||
        this.$refs.setPassword.$data.newpasswordCheckHint !== "" ||
        this.$refs.setPassword.$data.newpasswordCheckHint !== ""
      ) {
        var result = this.$common.alertHint(
          this,
          "优炫软件提醒您",
          "请完成信息"
        );
        return false;
      }
      if (passwords.newPassword !== passwords.enterPassword) {
        var result = this.$common.alertHint(
          this,
          "优炫软件提醒您",
          "两次密码输入不相同"
        );
        return false;
      }
      return true;
    }
  }
};
</script>

<style lang="scss" scoped>
.drop-list {
  width: 200px;
  overflow: hidden;
  position: absolute;
  top: 40px;
  border-radius: 5px;
  right: 0px;
  box-shadow: 0 0 3px #ccc;
  background-color: #fff;
  transition: 0.2s;
  .drop-list-item {
    padding: 5px;
    cursor: pointer;
    &:hover {
      background-color: #eee;
    }
  }
}
// .drop-list-show{
//     transition:1s;
// }
// .drop-list-hidden{
//     height: 0px;
//     transition:1s;

// }
</style>