<template>
  <div class="container audit-log" id="audit-log">
    <div class="audit-log-operate">
      <div class="operate-item back-home"
        title="回到首页"
        @click="backHomePage"  
    ></div>
      <div class="operate-item operate-search">
        <a :class="isSearch? 'can-search' : 'cannot-search'">查询</a>
      </div>
      <div class="operate-item time-filter">
        <input class="checkbox" v-model="userSelectStatus1" type="checkbox" />
        <input
          :class="userSelectStatus1 ? 'input-filter-content input-filter-content-selected' : 'input-filter-content input-filter-content-noselected'"
          type="text"
          placeholder="时间段过滤"
          :disabled="!userSelectStatus1"
        />
      </div>
      <div class="operate-item user-filter">
        <input class="checkbox" type="checkbox" name id v-model="userSelectStatus2" />
        <!-- :class="userSelectStatus ? 'input-filter-content input-filter-content-noselected' : 'input-filter-content input-filter-content-selected'" ; -->
        <!-- class="input-filter-content" -->

        <input
          type="text"
          :class="userSelectStatus2 ? 'input-filter-content input-filter-content-selected' : 'input-filter-content input-filter-content-noselected'"
          placeholder="用户名过滤"
          :disabled="!userSelectStatus2"
        />
      </div>
    </div>
    <div class="audit-list-box">
      <div class="audit-list-item audit-list-header">
        <li>序列</li>
        <li>用户名</li>
        <li>操作类型</li>
        <li>操作时间</li>
        <li>操作结果</li>
      </div>
      <!-- <div v-for=" (item,index) in 100 " class="audit-list-item audit-list-body" :key="index.toString()">
                <li>1</li>
                <li>张三</li>
                <li>浏览文档</li>
                <li>2019-12-13</li>
                <li>成功</li>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      userSelectStatus1: false,
      userSelectStatus2: false
    };
  },
  computed: {
    isSearch() {
      return this.userSelectStatus1 || this.userSelectStatus2;
    }
  },
  methods: {
    backHomePage() {
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$--color-primary: #409eff;
$--color-input-noselect: #bbb;
$--color-input-select: #409eff;
$--color-search-hover: #3356a6;
$--color-cannot-seach: #bbb;
.audit-log-operate {
  // border:1px solid red;
  padding-top: 25px;
  .operate-item {
    float: right;
    height: 100%;
    // border:1px solid red;
    margin-right: 20px;
    padding: 3px 5px;
    position: relative;
    .input-filter-content {
      width: 200px;
      height: 10px;
      outline: none;
      border: none;
      padding: 8px;
      margin-left: 18px;
    }
    .input-filter-content-selected {
      border: 2px solid $--color-input-select;
    }
    .input-filter-content-noselected {
      border: 2px solid $--color-input-noselect;
    }
    .checkbox {
      position: absolute;
      top: 50%;
      margin-top: -5px;
    }
  }
  // .operate-search{
  //     // border:1px solid red;
  //     // padding:4px 10px;
  // }
  &::after {
    content: "";
    display: block;
    clear: both;
  }
  .operate-search {
    // border:1px solid red;
    a {
      padding: 5px 10px;
      border: none;
      transition: 0.3s;
      border: none;
      display: inline-block;
      font-size: 14px;
      user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
      -o-user-select: none;
    }

    .can-search {
      cursor: pointer;
      color: #fff;
      background-color: $--color-primary;
      &:hover {
        background-color: $--color-search-hover;
      }
    }
    .cannot-search {
      cursor: not-allowed;
      color: #000;
      background-color: $--color-cannot-seach;
      // &:hover{
      //     background-color:$--color-search-hover;
      // }
    }
  }
  .back-home {
    float: right;
    margin-right: 20px;
    margin-top: 5px;
    width: 18px;
    height: 18px;
    padding:5px 8px;
    background-color: transparent;
    background-image: url("../assets/shouye.png");
    background-size: 100%;
    background-position: center;
    &:hover {
      background-color: transparent;
    }
  }
}
.audit-list-box {
  .audit-list-item {
    // border:1px solid red;
    // margin-right:25px;
    // margin-left:25px;
    li {
      float: left;
      width: 20%;
      box-sizing: border-box;
      text-align: center;
      font-size: 14px;
      padding: 5px 0px;
      // border:1px solid red;
    }
    &::after {
      content: "";
      display: block;
      clear: both;
    }
    &:hover {
      background-color: #eee;
    }
  }
  border-top: $--color-primary 2px solid;
  border-bottom: $--color-primary 2px solid;
  margin-left: 25px;
  margin-right: 25px;
  margin-top: 25px;
  margin-bottom: 25px;
}
</style>