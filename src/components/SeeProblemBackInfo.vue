<template>
    <div class="problem-back-wrapper">
        <div class="problem-back-item">
            <div class="title">
                用户ID
            </div>
            <div class="content">{{problemBackInfo.userid}}</div>
        </div>
        <div class="problem-back-item">
            <div class="title">
                反馈详情
            </div>
            <div class="content problem-detail" >{{problemBackInfo.probleminfo}}</div>
        </div>
         <div class="problem-back-item">
            <div class="title">
                反馈时间
            </div>
            <div class="content">{{problemBackInfo.backdate}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['problemBackInfo']
        ,mounted() {
            
        },
    }
    
</script>

<style lang="scss" scoped>
.problem-back-wrapper{
    padding: 20px;
    .problem-back-item{
        
        .title{
            font-weight: 600;
        }
        .content{
            padding: 20px;
        }
        .problem-detail{
            line-height: 25px;
        }
    }
}

</style>