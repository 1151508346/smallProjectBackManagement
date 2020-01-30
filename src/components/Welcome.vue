<template>
  <div class="welcome">
    <div class="welcome-title">
      <i class="el-icon-s-home"></i>
      <span>首页</span>
      <span class="system-time">系统时间 : {{systemTime}}</span>
    </div>
    <div class="content-common content-left">
      <div class="content-image">
        <img src="../assets/logo.png" alt />
      </div>
      <br />
      <h1 align="center">衣优美服装欢迎您!</h1>
    </div>
    <div class="content-common content-right">
      <div class="bgwe"></div>
      <div class="system-instruction">
        <h1 class="instruction-title">系统介绍</h1>
        <div class="function-list">
          <li>
            <span class="xuhao">1.</span><span class="item-content">管理注册小程序的用户，添加、删除、修改用户的信息。</span>
          </li>
          <li>
            <span class="xuhao">2.</span><span class="item-content">管理商品详细信息，添加、删除、修改商品的信息。</span>
          </li>
          <li>
            <span class="xuhao">3.</span><span class="item-content">用户下单的详细信息，添加、删除、修改商品的信息，以及用户ID。</span>
          </li>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      systemTime: ""
    };
  },
  created: function() {
    var _that = this;
    setInterval(function() {
      _that.systemTime = _that.formatDate();
    }, 1000);
  },
  methods: {
    formatDate() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      var weeks = this.formatWeek(date.getDay());
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      return (
        year +
        "年" +
        month +
        "月" +
        day +
        "日 " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds +
        " " +
        weeks
      );
    },
    formatWeek(week) {
      switch (week) {
        case 1:
          return "星期一";
        case 2:
          return "星期二";
        case 3:
          return "星期三";
        case 4:
          return "星期四";
        case 5:
          return "星期五";
        case 6:
          return "星期六";
        case 7:
          return "星期日";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.welcome {
  height: 100%;
  // border: 3px solid red;
  box-sizing: border-box;
  &::after {
    content: "";
    display: block;
    clear: both;
  }
  .welcome-title {
    border-bottom: 2px solid rgba(50, 67, 93, 1);
    padding: 10px 15px;
    span {
      margin-left: 5px;
    }
    .system-time {
      float: right;
    }
  }
  .content-common {
    float: left;
    width: 50%;
    // border:1px solid #011;
    box-sizing: border-box;
    height: calc(100% - 50px);
    position: relative;
    .content-image {
      text-align: center;
      margin-top: 20%;
      img {
        width: 200px;
      }
    }
    h1 {
      margin-top: 30px;
      color: #32435d;
      font-size: 30px;
      letter-spacing: 3px;
      font-family: "Courier New";
    }
    .system-instruction {
      position: absolute;
      top: 29%;
      bottom: 0;
      right: 0;
      left: 0;
      .instruction-title {
        text-align: center;
      }
      text-align: center;
      .function-list {
        display: inline-block;

        li {
          margin-top: 20px;
          
          &::after{
            content:"";
            display: block;
            clear: both;
          }
          span {
            float: left;
            padding-bottom:5px;
          }
          .item-content{
            border-bottom: 1px dotted #32435d;
          }
        }
      }
    }
    .bgwe {
      width: 100%;
      height: 100%;
      position: absolute;
      bottom: 0px;
      background-image: url("../assets/bgwe.png");
      background-size: 100%;
      background-position: right;
      background-repeat: no-repeat;
    }
  }
}
</style>