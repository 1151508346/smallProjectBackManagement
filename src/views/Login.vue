<template>
  <div id="login-container" ref="loginContainer" class="login-container">
    <div class="login-box">
      <div class="login-common-item login-title">
        <div class="login-logo-box">
          <img class="login-logo" src="../assets/logo.png" alt />
        </div>
        <div class="login-content">
          <span>衣优美服装后台管理</span>
        </div>
        <div class="login-content-english">
          <span>YYMClothesBack-stage Management</span>
        </div>
      </div>
      <div class="login-common-item login-operate">
        <div class="login-operate-item login-operate-item-title" >登录/login</div>
        <div class="login-operate-item login-operate-item-username">
          <input type="text" placeholder="请输入您的用户名" 
            v-model="username"
          ></div>
        <div class="login-operate-item login-operate-item-password">
          <input type="password" placeholder ="请输入您的密码" 
            v-model="password"
          ></div>
       
        <div class="login-operate-item">
          <a class="login-submit"
            @click = "submitUserInfo"
          >
            登录
          </a>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  components: {},
  data: function() {
    return {
      username:"",password:""
    };
  },
  created() {},
  mounted: function() {
    var _that = this;
    document.addEventListener("keydown",this.addEnterKeyDown);
  },
  methods: {
    submitUserInfo(){
      var _that = this;
      var url = this.$api.login;
      
        if(this.checkUserInfo()){
          this.request({
            url:url,
            method:"post",
            data:{
              username:_that.username,
              password:_that.password
            }
          }).then(res=>{
            // console.log(res)
            if(res.data.result === "success"){
              _that.$common.alertHint(_that, "衣优美服装提醒您", "登录成功");
              //60分钟过期
              _that.$common.setCookie("sessionID",res.data.sessionID,60)
              _that.$router.push({
                path:"/home"
              })
              return;
            }
            if(res.data.result === "fail"){
               _that.$common.alertHint(_that, "优炫软件提醒您", "管理员用户或密码有误");
            }
          }).catch(err=>{
            // console.log(err)
          })
        }
    },
    checkUserInfo(){
      if(this.username.trim() === "" || this.password.trim() === ""){
        this.$common.alertHint(this,"衣优美服装提醒您","请完善信息");
        return false;
      }
      return true;
    },
    addEnterKeyDown(e){
      if(e.keyCode === 13){
          this.submitUserInfo();
        }
    }
  },
  //当监听键盘事件完成登录功能时，待组件被销毁时，移除掉绑定在document上的keydown事件
  destroyed(){
     document.removeEventListener("keydown",this.addEnterKeyDown);
  }
};
</script>

<style lang="scss" scoped>
$color--font: #fff;
// $color--login:#45c1E5;
$color--login:#31aaD8;
$color--border-bottom:#6e8096;
$color--login-active:rgb(7, 110, 151);

#login-container {
  min-height: 600px;
  height: 100%;
  position: relative;
  // border:1px solid red;
  box-sizing: border-box;
  background-color: rgba(50, 67, 93, 1);
  .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -500px;
    margin-top: -250px;
    width: 1000px;
    height: 500px;
    border: 2px solid rgba(255,255,255,0.3);
    // box-shadow: 0 0 3px rgba(255,255,255,0.3);;
    box-shadow: 0 0 3px $color--login;
    .login-common-item {
      float: left;
    }

    .login-title {
      width: 45%;
      text-align: center;
      color: $color--font;
      .login-logo-box {
        margin-top: 150px;
        margin-bottom:30px;
        //  border:1px solid red;
        .login-logo {
          width: 120px;
        }
      }
      .login-content{
        font-size:24px;
        letter-spacing: 3px;
      }
      .login-content-english{
        font-size:14px;
      }
    }
    .login-operate {
      width: 55%;
      // border-left:1px solid red;
      margin-top:110px;
      //  border:1px solid red;
      box-sizing: border-box;
      .login-operate-item{
        width: 340px;
        margin:0 auto;
        margin-top:30px;
        input{
          outline: none;
          border:none;
          background-color:transparent;
          color:$color--font;
          padding:5px;
          font-size:18px;
        }
        .login-submit{
          display: inline-block;
          width: 100%;
          text-align: center;
          color:$color--font;
          background-color:$color--login;
          border-radius: 20px;
          padding:6px 0;
          cursor: pointer;
          &:hover{
            background-color:$color--login-active
          }
        }
        
      }
      .login-operate-item-title{
        color:#45c1E5;
        font-size:22px;
      }
      .login-operate-item-username,.login-operate-item-password{
            border-bottom:2px solid #6e8096;
            margin-bottom:30px;
            
        }
    }
  }
}
</style>