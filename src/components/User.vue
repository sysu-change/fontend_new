<template>
<el-container style="height: 600px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-s-order"></i>任务</template>
        <el-menu-item-group>
          <el-menu-item index="1-1" v-on:click.native="goGetjob">兼职任务</el-menu-item>
          <el-tooltip class="item" effect="dark" content="请登录奶牛端" placement="right-start">
          <el-menu-item index="1-2" v-on:click.native="goPutjob">发布任务</el-menu-item></el-tooltip>
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
        <template slot="title"><i class="el-icon-setting"></i>开发中</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="3-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="3-4">
          <template slot="title">选项4</template>
          <el-menu-item index="3-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container class="compo">
    <el-header style="text-align: right; font-size: 15px;" class="elheader">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="goAccountInfo">个人信息</el-dropdown-item>
          <el-dropdown-item @click.native="signout">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span >{{user_name}}</span>
    </el-header>
    <router-view></router-view>
  </el-container>
  <el-dialog :visible.sync="dialogVisible1" width="40%" :before-close="handleClose">
      <Recharge></Recharge> 
  </el-dialog>
  <el-dialog :visible.sync="dialogVisible2" width="40%" :before-close="handleClose">
      <Withdraw></Withdraw>
  </el-dialog>
</el-container>
</template>

<script>
  import Recharge from './Recharge.vue'
  import Withdraw from './Withdraw.vue'
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

      
        // 充值框显示和隐藏
        dialogVisible1: false,
        dialogVisible2: false,
        user_name:"唐..",
        user_id:"",
        user_phone:""
      }
      
    },
    methods: {
      goAccountInfo() {
        this.$router.push('/User/Part/AccessAccount');
      },
      signout() {
        this.$router.push("/Signin");
        sessionStorage.clear()
      },
      goGetjob() {
        this.$router.push("/User/Part/Getjob");
      },
      goPutjob() {
        this.$router.push("/User/Part/Putjob");
      },
      
      Answer(){
        this.$router.push("qsEdit");
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
            alert("服务器未能返回数据");
          }
        }).catch(function(err){
          console.log(err);
          alert("An Err Happened");
        });
      }
    },
    mounted() {
      this.getUserInfo(this);
    }
  };
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .elheader{
    background-color: #409EFF;
    color:white;
    font-size: 24px;
  }
  .compo{
    overflow: scroll;
  }
</style>

