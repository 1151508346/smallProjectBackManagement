<template>
    <div class="search-components">
        <input 
            class="search-input"
        type="text" 
        placeholder=""
       />
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
$--color-primary: #409eff;
.search-components{
        height: 25px;
        border:2px solid $--color-primary;
        
        overflow:hidden;
        .search-input{
            border:none;
            outline:none;
            height: 100%;
            width: 100px;
            padding:0px 3px;

        }
}
</style>