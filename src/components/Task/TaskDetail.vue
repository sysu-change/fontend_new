<template>
<div>
  <br/>
    <br/>
<div class="block">
    
  <el-timeline v-loading.fullscreen.lock="loading">
    <el-timeline-item  placement="top" type="success"> 
          <h1 >任务编号:{{ID}}</h1>
    </el-timeline-item>
    <el-timeline-item  placement="top" type="success">
      <el-card>
          <h3  align="left" v-if="type==2">取快递</h3>
          <h3 align="left"  v-if="type==3">运动业务</h3>
          <h3   align="left" v-if="type==4">学习业务</h3>
          <h3  align="left" v-if="type==5">求夸夸业务</h3>
          <h3   align="left" v-if="type==6">其他业务</h3>
        <p align="left">{{descript}}</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item  placement="top">
      <el-card>
          <h3 align="left">任务详情:</h3>
          <p align="left">{{detail}}</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item  placement="top">
      <el-card>
          <h3 align="left">任务截止时间:</h3>
          <p align="left">
           <i  style="color:orange" class="el-icon-time" ></i>{{deadline}}</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item  placement="top">
      <el-card>
          <h3 align="left">联系方式:</h3>
          <div>
              <p align="left">
               <i  style="color:#00b38a" class="el-icon-phone" ></i>手机:{{phone_num}}</p>
               <p align="left">
          <i style="color:#00b38a" class="el-icon-chat-dot-square" ></i>微信:{{weixin}}</p>
          </div>
      </el-card>
    </el-timeline-item>

        <el-timeline-item>
          <el-button @click="$router.go(-1)">返回</el-button>
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
            type:"",
            descript:"",
            detail:"",
            deadline:"",
            phone_num:"",
            weixin:"",
            loading: true
        }
    },
    methods:{
      //任务详情
        getTask: function(vm) {
     
      vm.loading=true;
      var URL = "http://localhost:8082/module/user/task/"+parseInt(vm.ID);
      
      var axios = {
        method: "get",
        url: URL,
        widthCredentials: false,
      };
       vm.$http(axios).then(function(res){
      if(res.status==200) {
         if (res.data.code == 200) {
        vm.type=res.data.content.type;
        vm.descript=res.data.content.description;
        vm.detail=res.data.content.detail;
        vm.deadline=res.data.content.deadline;
        vm.phone_num=res.data.content.phone_num;
        vm.weixin= res.data.content.wechat;
        vm.loading = false;
        }
      }
      else {
        alert("网络错误");
      }
    }).catch(function(err) {
      console.log(err);
      alert("An Err Happened");
    });
    },

       back(){
         this.$router.push('/User/Part/myDoneTask' )
       }
    },
    created() {
    this.getTask(this);
  },
   
}
</script>

<style scope>
.block {
  position: relative;
  padding: 15px 15px 15px 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border: 1px solid #eee;
  background-color: #ffffff;
  left: 20%;
  width: 60%;
}
</style>