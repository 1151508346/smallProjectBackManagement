<template>
  <div class="aside">
    <el-row class="tac">
      <el-col :span="24">
        <!-- <h5>自定义颜色</h5> -->
        <el-menu
          :default-active="pathName"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#32435d"
          text-color="#fff"
          active-text-color="#31aaD8"
          router
        >
          <el-menu-item index="welcome">
            <i class="el-icon-s-home"></i>

            <span slot="title" style="display:inline-block;">
              首
              <span class="space" style="display:inline-block;width:20px;">
              </span>
              页
            </span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
               <span slot="title" style="display:inline-block;">
              商
              <span class="space" style="display:inline-block;width:20px;">
                &nbsp;
              </span>
              品
            </span>
            </template>
            <el-menu-item-group>
              <el-menu-item style="padding-left:60px;" index="goodsevalute">
                <i class="el-icon-s-goods"></i>
                <span slot="title">商品评价</span>
              </el-menu-item>
              <el-menu-item style="padding-left:60px;" index="goodsmanage">
                <i class="el-icon-s-goods"></i>
                <span slot="title">商品管理</span>
              </el-menu-item>
            </el-menu-item-group>
            <!-- <el-menu-item index="1-3">选项3</el-menu-item> -->
          </el-submenu>

          <el-menu-item index="usermanage">
            <i class="el-icon-s-custom"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>

          <!-- <el-menu-item index="goodsmanage">
            <i class="el-icon-s-goods"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>-->
          <el-menu-item index="ordermanage">
            <i class="el-icon-s-order"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-menu-item index="coupon" style="padding-left:26px">
            <i class="el-icon-s-ticket"></i>
            <span slot="title" style="letter-spacing:7px">优惠卷</span>
          </el-menu-item>
          <el-menu-item index="auditLog">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">审计日志</span>
          </el-menu-item>
          <el-menu-item index="statistics">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">统
               <span class="space" style="display:inline-block;width:20px;">
                &nbsp;
              </span>
              计</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      pathName: ""
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  watch: {
    // $routes:{
    //   handler(old,news){
    //     console.log(old,news);
    //   },
    //   immediate:true
    // }
    $routes() {
      console.log("asdf");
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        //  console.log(to,from)
        var name = to.name;
        this.pathName = name;
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.aside {
  // border: 1px solid red;
  height: 100%;
  box-sizing: border-box;
  .el-row {
    height: 100%;
    .el-menu {
      height: 100%;
    }
  }
}
</style>
<style lang="scss">
.aside {
  .el-col-24 {
    height: 100% !important;
  }
}
</style>