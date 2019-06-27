<template>
<div>
  <br/>
  <el-row  v-if="$route.path=='/User/Part/GetTask' 
        || $route.path=='/User/Part/Getjob'">
    <el-col  :lg="22"  offset="1" :span="11">
      <el-carousel class="carousel" height="150px"  type="card">
        <el-carousel-item v-for="(item,index) in imgArr" :key="item">
          <img class="small" v-bind:src="imgArr[index]" />
        </el-carousel-item>
      </el-carousel>
    </el-col>
  </el-row>
<br/>
<el-container style="width:95%; border: 1px solid #eee" class="userBox">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-setting"></i>管理</template>
        <el-menu-item-group>
          <el-menu-item index="1-1" v-on:click.native="goGetjob">兼职任务端</el-menu-item>
          <el-menu-item index="1-2" v-on:click.native="goPutjob">奶牛任务端</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-s-custom"></i>账户</template>
        <el-menu-item-group>
          <el-menu-item index="2-1"  v-on:click.native="getCash">充值</el-menu-item>
          <el-menu-item index="2-2" v-on:click.native="withDraw">提现</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-s-order"></i>我的任务</template>
        <el-menu-item-group>
          <el-menu-item index="3-1" v-on:click.native="getDone">已完成</el-menu-item>
          <el-menu-item index="3-2" v-on:click.native="getTodo">进行中</el-menu-item>
        </el-menu-item-group>
       
      </el-submenu>
    </el-menu>
  </el-aside>

    <router-view></router-view>
  </el-container>

  <el-dialog :visible.sync="dialogVisible1" width="40%" :before-close="handleClose">
      <Recharge></Recharge> 
  </el-dialog>
  <el-dialog :visible.sync="dialogVisible2" width="40%" :before-close="handleClose">
      <Withdraw></Withdraw>
  </el-dialog>

</div>
</template>

<script>
  import Recharge from '../components/User/Recharge.vue'
  import Withdraw from '../components/User/Withdraw.vue'
  export default {
    components: {Recharge,Withdraw},
    data() {
      const item = {
        date: '2016-05-02',
        type: '问卷调查',
        descript: '这是一份针对中山大学学生睡眠情况的调查问卷',
        count:300,
        price:'$1'
      };
      return {
          /*tableData: Array(20).fill(item)*/

        imgArr:["/static/p2.jpg","/static/p3.jpg","/static/p4.jpg"],
        // 充值框显示和隐藏
        dialogVisible1: false,
        dialogVisible2: false,
        user_name:"唐..",
        user_id:"",
        user_phone:""
      }
      
    },
    methods: {
      goGetjob() {
        this.$router.push("/User/Part/Getjob");
      },
      goPutjob() {
        this.$router.push("/User/Part/Putjob");
      },
      getUser(){
        this.$router.push("/AccessAccount");
      },
      getCash(){
         this.dialogVisible1 = true;
      },
      withDraw(){
         this.dialogVisible2 = true;
      },
      getTodo(){
             this.$router.push('/User/Part/myTodoTask')
      },
      getDone(){
           this.$router.push('/User/Part/myDoneTask')
      },
      getUserInfo(vm) {
        var URL="http://localhost:8082/module/user/userinfo";
        var axios={method: "get",url:URL,widthCredentials: false};
        vm.$http(axios).then(function(res){
          if(res.status==200) {
            vm.user_name=res.data.name;
            vm.user_id=res.data.sid;
            sessionStorage.setItem('user', String(vm.user_id));
          }
          else {
            vm.$message({
              showClose: true,
              message: "服务器未能返回数据",
              type: "error"
            });
          }
        }).catch(function(err){
          console.log(err);
          vm.$message({
              showClose: true,
              message: "request failed",
              type: "error"
            });
        });
      }
    },
    mounted() {
      this.getUserInfo(this);
    }
  };
</script>

<style>
   .userBox{
     position: relative;
     left:2%;
   }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .elheader{
    background-color: #00b8a0;
    color:white;
    font-size: 24px;
  }
  .compo{
    overflow: scroll;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item{
     background-color: white;
     opacity: 1.0;
  }
  
  .carousel{
    position: relative;
    left:5%;
    width:1000px;
  }
  
  .small{
    width:100%;
    height: 100%;
  }
</style>

