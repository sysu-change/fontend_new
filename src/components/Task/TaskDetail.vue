<template>
<div>
  <br/>
    <br/>
<div class="block">
    
  <el-timeline>
    <el-timeline-item  placement="top" type="success"> 
          <h1 >任务编号:{{ID}}</h1>
    </el-timeline-item>
    <el-timeline-item  placement="top" type="success">
      <el-card>
          <h3 align="left">任务简介:</h3>
        <p></p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item  placement="top">
      <el-card>
          <h3 align="left">任务详情:</h3>
      </el-card>
    </el-timeline-item>
    <el-timeline-item  placement="top">
      <el-card>
          <h3 align="left">任务截止时间:</h3>
      </el-card>
    </el-timeline-item>
    <el-timeline-item  placement="top">
      <el-card>
          <h3 align="left">联系方式:</h3>
          <p align="left">手机:</p>
          <p align="left">微信:</p>
      </el-card>
    </el-timeline-item>

  <el-timeline-item>
      <el-button @click="back">返回</el-button>
  </el-timeline-item>
  </el-timeline>
</div>
</div>
</template>

<script>
export default {
    data(){
        return{
            ID:this.$route.params.id,
            type:"取快递",
        }
    },
    methods:{
       back(){
         this.$router.push('/User/Part/myDoneTask' )
       }
    }
   
}
</script>

<style scope>
  .block{
      position: relative;
      padding: 15px 15px 15px 15px;
       box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      border:1px solid #eee;
      background-color: #ffffff;
      left: 20%;
      width:60%
  }

 
  
  
  
</style>


