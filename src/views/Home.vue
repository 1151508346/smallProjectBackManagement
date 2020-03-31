<template>
  <div class="container" id="home">
    <el-container>
      <el-header height="100px">
        <Header />
      </el-header>
      <el-container>
        <el-aside width="250px">
          <Aside />
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
import Aside from "@/components/Aside.vue";
import Header from "@/components/Header.vue";
import { ADDPROBLEMBACKCOUNT } from "@/store/mutations"
export default {
  data: function() {
    return {};
  },
  components: {
    Header,
    Aside
  },
  created(){
    //删除不是当天的操作日志
      // this.deleteNotTheSameDayOperateLog();
  },
  mounted() {
    this.verifyUserLoginState();

    this.getProblemBackAllCount();
  },
  methods: {
    verifyUserLoginState(){
      var sessionID = this.$common.getCookie("sessionID");
      var url = this.$api.userVerify;
      var _that = this;
      if (sessionID) {
        this.request({
          url: url,
          method: "GET",
          params: {
            sessionID: sessionID
          }
        })
          .then(res => {
              if (res.data.result === "success") {
              return;
            }
            if (res.data.result === "fail") {
              _that.$router.push({
                path: "/login"
              });
            }
          })
          .catch(err => {
            // console.log(err);
          });
      } else {
        this.$router.push({
          path: "/login"
        });
      }
    },
    // deleteNotTheSameDayOperateLog(){
    //     var url = this.$api.deleteNotTheSameDayLog
    //     this.request({
    //       url:url,
    //       method:"POST",
          
    //     }).then(res=>{
    //       console.log(res.data)
    //     })
    //     setTimeout(()=>{
    //       //每10分钟发送一次请求，用来清除掉不是当前的日志
    //       this.deleteNotTheSameDayOperateLog();
    //     },1000)
    // }
     getProblemBackAllCount() {
      var _that = this;
      var url = this.$api.getProblemBackCount;
      this.request({
        url: url,
        methods: "GET",
      }).then(res => {
        if (res.data.problemBackCount > 0) {
          //vuex中添加problemBackCount以在Header组件中使用
          _that.$store.commit(ADDPROBLEMBACKCOUNT,res.data.problemBackCount)
        }
      });
    },
  },
  // watch: {
  //   // $routes:{
  //   //   handler(old,news){
  //   //     console.log(old,news);
  //   //   },
  //   //   immediate:true
  //   // }
  //   $routes() {
  //     console.log("asdf");
  //   }
  // }
  
};
</script>

<style lang="scss" scoped>
.container {
  // border:1px solid red;
  height: 100%;
  min-width: 1100px;
  box-sizing: border-box;
}
.container > .el-container {
  height: 100%;
}
.el-header,
.el-footer {
  // background-color: #B3C0D1;
  background-color: rgba(50, 67, 93, 1);
  // border:1px solid red;
  color: #333;
  text-align: center;
  // line-height: 60px;
  padding: 0;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  // background-color: #e9eef3;
  // color: #333;
  // text-align: center;
  // line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>