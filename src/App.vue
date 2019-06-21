<template>
  <div id="app">
    <el-header 
       style="font-size: 15px;"
        class="elheader"
        v-if="$route.path!=='/Signin' 
             && $route.path!=='/Hello'
             && $route.path!=='/Register'">
      
      <el-row><el-col :span="4">
          <span style="font-size:30px">闲钱宝</span>
        </el-col>

      <el-dropdown style="left:35%;color:#ffffff">
        <i class="el-icon-s-custom" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <router-link :to="{ path: '/AccessAccount'}">
          <el-dropdown-item >个人信息</el-dropdown-item>
          </router-link >
          <router-link :to="{ path: '/Hello'}">
          <el-dropdown-item >返回首页</el-dropdown-item>
          </router-link>
          <router-link :to="{ path: '/Signout'}">
          <el-dropdown-item >用户注销</el-dropdown-item>
          </router-link>
        </el-dropdown-menu>
        <span >{{user_name}}</span>
      </el-dropdown>
      </el-row>
    </el-header>

    <router-view ></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
        user_name:"唐育涛"
    }
  },
   methods:{
     getUserinfo(vm) {
      var axios={method:"get",url:"http://localhost:8082/module/user/userinfo",widthCredentials: false};
      vm.$http(axios).then(function(res){
      if(res.status==200) {
        
        vm.user_name=res.data.name;
       
      }
      else {
        alert("网络错误");
      }
    }).catch(function(err) {
      console.log(err);
      alert("An Err Happened");
    });
    }
   },
  created() {
    this.getUserinfo(this);
  },
  watch:{
    $route(to,from) {
      if(to.path=="/User/Part/Getjob") {
        this.getUserinfo(this);
      }
    }
  }
  
  }
  
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html, body, #app {
  height: 90%;
}

.mainPage{
  color:#00B38A;
  margin: auto;
  border-radius: 6px,6px,6px,6px;
  border-style: solid;
  border-width: 2px;
  width:80px;
  border-color:#00B38A;
}

</style>
