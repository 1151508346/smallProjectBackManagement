<template>
  <div class="container header">
      <div class="logo-box">
        <div class="logo-image">
          <img src="../assets/logo.png" alt="">
        </div>
        <div class="logo-image-content">
          衣优美后台管理
        </div>
        <div class="logo-image-content-english" >YYMClothesBack-stage Management</div>
      </div>
      <div class="operate-box">
          <div class="exit" @click = "exitLogin">退出</div>
          <div class="welcome">欢迎 : <span>admin</span></div>
      </div>
  </div>
</template>

<script>

export default {
  data: function() {
    return {
   
    };
  },
  components: {
   
  },
  mounted: function() {

  },
  methods: {
    exitLogin(){
        var sessionID = this.$common.getCookie("sessionID");
        if(sessionID){
          this.$common.removeCookie("sessionID");
          this.$common.alertHint(this,"衣优美服装提醒您","退出登录成功");
          this.$router.push({
            path:"/login"
          })
        }else{
          this.$common.alertHint(this,"衣优美服装提醒您","会话已超时，退出成功");
           this.$router.push({
            path:"/login"
          })
        }
    },
    //阻止事件冒泡
    stopCancel(e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
$color-font:#fff;
.header {
  // border:1px solid red;
  height: 100%;
  display: flex;
  .logo-box{
    width: 250px;
    // border:1px solid red;
    margin-top:15px;
    color:$color-font;
    .logo-image img{
      width: 60px;
    }
    .logo-image-content{
      letter-spacing: 3px;
      font-size:15px;
    }

    .logo-image-content-english{
      font-size:13px;
      // border:1px solid red;
      // text-align:left;
    }
  }
  .operate-box{
    flex:1;
    // border:1px solid red;
    color:$color-font;
    line-height: 100px;
    div{
      float: right;
      margin-right:30px;
    }
    .welcome{
      span{
        text-decoration: underline;
      }
    }
    .exit{
      cursor: pointer;
    }

  }
}
</style>