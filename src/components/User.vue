<template>
<el-container style="height: 500px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-s-order"></i>任务</template>
        <el-menu-item-group>
          <el-menu-item index="1-1">兼职任务</el-menu-item>
          <el-tooltip class="item" effect="dark" content="请登录奶牛端" placement="right-start">
          <el-menu-item index="1-2">发布任务</el-menu-item></el-tooltip>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-s-custom"></i>账户</template>
        <el-menu-item-group>
          <el-menu-item index="2-1"  @click.native="getCash">充值</el-menu-item>
          <el-menu-item index="2-2" @click.native="withDraw">提现</el-menu-item>
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
  
  <el-container>
    <el-header style="text-align: right; font-size: 15px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <router-link to='/AccessAccount'>
          <el-dropdown-item >个人信息</el-dropdown-item></router-link>
          <el-dropdown-item>注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span >唐先生</span>
    </el-header>
    
    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="date" label="日期"  sortable width="140">
        </el-table-column>
        <el-table-column prop="type" label="任务类型" width="120">
        </el-table-column>
        <el-table-column prop="descript" label="任务描述">
        </el-table-column>
        <el-table-column prop="count" sortable  label="需求量">
        </el-table-column>
        <el-table-column prop="price" sortable label="赏金">
        </el-table-column>
         <el-table-column  >
          <el-button  plain @click="Answer">开始答题</el-button>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>

  <el-dialog title="充值"
      :visible.sync="dialogVisible1"
       width="40%"  
      :before-close="handleClose">
   
    </el-dialog>
<el-dialog title="提现"
      :visible.sync="dialogVisible2"
       width="40%"  
      :before-close="handleClose">
   
    </el-dialog>
</el-container>
</template>

<script>
  export default {
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
         tableData: [{
          date: '2016-05-02',
          type: '问卷调查',
          descript: '这是一份调查中大学生对食堂意见的问卷',
          count:400,
          price:'$2'
        }, {
          date: '2016-05-04',
          type: '问卷调查',
          descript: '这是一份调查中大学生对课程安排意见的问卷',
          count:500,
          price:'$5'
        }, {
          date: '2016-05-01',
          type: '问卷调查',
          descript: '这是一份调查中大学生对闲钱宝使用体验的问卷',
          count:1000,
          price:'$3'
        }, {
          date: '2016-05-03',
          type: '问卷调查',
          descript: '这是一份针对中山大学学生睡眠情况的调查问卷',
          count:400,
          price:'$4'
        }],
      
        // 充值框显示和隐藏
        dialogVisible1: false,
        dialogVisible2: false
      }
      
    },
    methods: {
     
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
      }
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
</style>

