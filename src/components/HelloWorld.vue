<template>
  <el-container>
    <el-header height="80px"></el-header>

    <el-main> 
      <div id="name">
        <span class="item1">闲钱宝|</span>
        <span class="item2">
          <sub>专注中大学生赚点钱</sub>
        </span>
      </div>

      <div class="info">
        <el-row>
          <el-col :span="6">
            <i class="el-icon-location"></i>
            <br>
            <span class="item3">坐标中大</span>
          </el-col>
          <el-col :span="6">
            <i class="el-icon-s-comment"></i>
            <br>
            <span class="item3">活跃的社区</span>
          </el-col>
          <el-col :span="6">
            <i class="el-icon-s-order"></i>
            <br>
            <span class="item3">在线获取任务</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <i class="el-icon-user-solid"></i>
            <br>
            <span class="item3">可切换的角色</span>
          </el-col>
          <el-col :span="6">
            <i class="el-icon-time"></i>
            <br>
            <span class="item3">掌握你的闲余时间</span>
          </el-col>
        </el-row>
      </div>

      <div>
        <img class="img1" src="../assets/icon1.png">
      </div>

      <div>
        <el-button class="reg_button1" type="success" v-on:click.native="nainiu">奶牛端注册</el-button>
        <br>
        <br>
        <el-button class="reg_button2" type="success" v-on:click.native="xuesheng">学生端注册</el-button>
        <br>
        <span class="item4">已有账号，请</span><el-button class="item5" type="text" v-on:click.native="denglu">登录</el-button> 
      </div>

    </el-main>
    <el-footer height="40px">
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      
    };
  },
  methods: {
    nainiu: function() {
      this.$router.push({path: '/Register'});
    },
    xuesheng: function() {
       this.$router.push({path: '/Register'});
    },
    denglu: function() {
     this.$router.push({path: '/Signin'});
    }

    
  }
};
</script>

<style scoped>

/* 布局容器 */
.el-header {
  background-color: #00b38a;
  color: #333;
  line-height: 10px;
}
.el-main {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  height: 40vh;
  margin-left: 20%;
  margin-right: 20%;

  z-index: 1;
}
.el-container {
  background-color: white;
  margin-bottom: 0px;
  width: 100%;
  height: 95vh;
  z-index: 1;
}
.el-footer {
  background-color: #999999;
  color: #ffffff;
  width: 100%;
  height: 30vh;
}
.backcolor{
  background-color: #ffffff;
  color: #ffffff;
  z-index: 1;
}

/* 布局 */
.el-row {
  margin-left: 45%;

  margin-bottom: 5%;
  
}
.el-col {
  border-radius: 6px;
}
.info {
  position: relative;
  left: -40%;
  bottom: -20%;
}

/* 文字 */
.item1 {
  color: #00b38a;
  font-size: 300%;
  position: relative;
  left: -30%;
}
.item2 {
  color: #00b38a;
  font-size: 100%;
  position: relative;
  left: -30%;
}
.item3 {
  color: #00b38a;
  font-size: 80%;
  position: relative;
  left: -2%;
  margin: 2%;
}
.item4 {
  color: #8e868b;
  font-size: 80%;
  position: relative;
  left: 30%;
  
}
.item5 {
  color: #00b38a;
  font-size: 80%;
  position: relative;
  left: 30%;
}

/* 图片 */
.img1 {
  position: relative;
  left: 30%;
  top: 0%;
  margin-top: -30%;
}



/* 图标 */ 
.el-icon-location {
  color: #00b38a;

  font-size: 300%;
}
.el-icon-s-comment {
  color: #00b38a;
  font-size: 300%;
}
.el-icon-s-order {
  color: #00b38a;
  font-size: 300%;
}
.el-icon-user-solid {
  color: #00b38a;
  font-size: 300%;
}
.el-icon-time {
  color: #00b38a;
  font-size: 300%;
}


.reg_button1 {
  position: relative;
  background-color: #ffffff;
  border: 1.5px solid #00b38a;
  color: #00b38a;
  left: 30%;
  border-radius: 4px;
  width: 150px;
  height: 40px;
}
.reg_button2 {
  position: relative;
  background-color: #ffffff;
  border: 1.5px solid #00b38a;
  color: #00b38a;
  left: 30%;
  width: 150px;
  height: 40px;
  border-radius: 4px;
  margin-bottom: 1%;
  
}

</style>
