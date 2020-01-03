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
export default {
  data: function() {
    return {};
  },
  components: {
    Header,
    Aside
  },
  mounted() {
    var sessionID = this.$common.getCookie("sessionID");
    // console.log(sessionID);
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
          // console.log(res);
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
  methods: {},
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