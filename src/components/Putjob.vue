<template>
<el-container style="height: 500px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-s-order"></i>任务</template>
        <el-menu-item-group>
          <el-menu-item index="1-1">兼职任务</el-menu-item>
          <el-tooltip class="item" effect="dark" content="发布问卷以外的任务" placement="right-start">
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
    <el-header style="text-align: right; font-size: 20px">
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
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="日期"
      prop="date"
      sortable
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="标题"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>标题: {{ scope.row.name }}</p>
          <p>描述: {{ scope.row.descript }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作"  >
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          class="delete"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button
          size="mini"
          class="look1"
          type="success"
          @click="handleDelete(scope.$index, scope.row)">查看问卷</el-button>
          <el-button
          size="mini"
          class="look2"
          type="success"
          @click="handleDelete(scope.$index, scope.row)">查看数据</el-button>
      </template>
    </el-table-column>
  </el-table>
      <i class="el-icon-plus"></i>
      <el-button class="reg_button1" type="success" v-on:click.native="nainiu">发布问卷</el-button>
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
      return {
        tableData: [{
          date: '2016-05-02',
          name: '中大睡眠质量调查',
          descript: '这是一份调查中大学生睡眠质量的问卷'
        }, {
          date: '2016-05-04',
          name: '中大食堂调研',
          descript: '这是一份调查中大学生对食堂意见的问卷'
        }, {
          date: '2016-05-01',
          name: '东校区课程难度调查',
          descript: '这是一份调查中大学生对课程安排意见的问卷'
        }, {
          date: '2016-05-03',
          name: '闲钱宝使用体验调查',
          descript: '这是一份调查中大学生对闲钱宝使用体验的问卷'
        }],
        // 充值框显示和隐藏
        dialogVisible1: false,
        dialogVisible2: false
      }
      
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      getCash(){
         this.dialogVisible1 = true;
      },
      withDraw(){
         this.dialogVisible2 = true;
      }
    }
  }
</script>
<style>
.el-icon-setting{
    color: #00b38a;
}
.reg_button1 {
  
  background-color: #ffffff;
  border: 1.5px solid #00b38a;
  color: #00b38a;
  left: 30%;
  border-radius: 4px;
 
}
.delete{
    background-color: #ffffff;
  border: 1.5px solid red;
  color: red;
  border-radius: 4px;
}
.look1{
    background-color: #ffffff;
  border: 1.5px solid #00b38a;
  color: #00b38a;
  border-radius: 4px;
}
.look2{
    background-color: #ffffff;
  border: 1.5px solid #00b38a;
  color: #00b38a;
  border-radius: 4px;
}
</style>
