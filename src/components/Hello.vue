<template>
  <el-container>
    

    <div class="back">
      <div id="name" class="name">
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

      <div class="imgblock">
        <img class="img1" src="../assets/icon1.png">
        <el-button class="reg_button1" type="success" v-on:click.native="reg">注册</el-button>
        <br>
        <br> 
        <span class="item4">已有账号，请</span><el-button class="item5" type="text" v-on:click.native="denglu">登录</el-button> 
      </div>

    </div>
      
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
    reg: function() {
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

.back{
  position: absolute;
   background-color: #ffffff;
    border: 1.5px solid #00b38a;
    border-radius: 16px;
  color: #00b38a;
  width: 50%;
  height: 70%;
  margin-top: 5%;
  margin-left: 22%;
  margin-right: 20%;
  box-shadow:5px 5px 20px #909090;
}
.el-container {
  padding: 0,0,0,0;
  background-color:#00b38a;
  margin-bottom: 0px;
  width: 100%;
  height: 60vh;
  z-index: 1;
}

.backcolor{
  background-color: #ffffff;
  color: #ffffff;
  z-index: 1;
}
.name {
  position: relative;
  margin-top: 2%;
  margin-left: 1%;
  margin-bottom: 5%;  
  float: left;
  width: 300px;
  height: 60px;
  clear:left,right;
}
.imgblock{
  position: relative;
  margin-top: 0%;
  width: 44%;
  float: right;
  top: -50%;
}
/* 布局 */
.el-row {
  margin-left: 0%;
  margin-bottom: 5%; 
}
.el-col {
  border-radius: 6px;
}
.info {
  position: relative;
  margin-top: 20%;
  width: 50%;
  margin-right: 1px;
  
}

/* 文字 */
.item1 {
  color: #00b38a;
  font-size: 300%;
  position: relative;
  margin-left: 4%;
  margin-top:2%; 
  
}
.item2 {
  color: #00b38a;
  font-size: 100%;
  position: relative;
  margin-top:2%; 
  margin-left:0%;
}
.item3 {
  color: #00b38a;
  font-size: 80%;
  position: relative;  
  margin: 2%;
  left: 30%;
}
.item4 {
  color: #8e868b;
  font-size: 80%;
  position: relative;
  left: 0%;
  
}
.item5 {
  color: #00b38a;
  font-size: 80%;
  position: relative;
  left: 0%;
}

/* 图片 */
.img1 {
  position: relative;
  left: 0%;
  top: 0%;
  
  
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
  left: 0%;
  border-radius: 4px;
  width: 150px;
  height: 40px;
}


</style>
