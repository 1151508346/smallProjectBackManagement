<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  },
  mounted(){
     
  }
}
</script>

<style lang="scss" >
*{
  margin:0;
  padding:0;
  list-style: none;
  // font-size:16px;
}
html,body{
  width: 100%;
  height:100%;
  min-width: 1000px;
  
} 
#app{
    height: 100%;
    width:100%;
    min-height: 550px;
    // border:1px solid red;
    box-sizing: border-box;

}
 
</style>
