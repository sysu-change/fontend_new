<template>
  <el-main>
    <h3 align="left">奶牛端</h3>
       <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/User/Part/Putjob'}">问卷任务</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/User/Part/Putjob/TodoTask'}">进行中的任务</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/User/Part/Putjob/DoneTask'}">已完成的任务</el-breadcrumb-item>
  <el-breadcrumb-item></el-breadcrumb-item>
</el-breadcrumb>
    <el-table :data="tableData">
      <el-table-column prop="ID" label="任务编号" sortable></el-table-column>
      <el-table-column prop="type" label="任务类型" ></el-table-column>
      <el-table-column prop="deadline" sortable label="截止时间"></el-table-column>
      <el-table-column prop="price"  label="任务赏金" ></el-table-column>
      <el-table-column prop="need"  label="需求份数"></el-table-column>
      <el-table-column prop="total"  label="接单人数"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="mini"  @click="TaskView(scope.row)">任务详情</el-button>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="mini" @click="Conact(scope.row)">催单</el-button>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="mini" @click="Delete(scope.row)">删除任务</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="crhead">
      <el-button class="but" @click="Create">+新建任务</el-button>
    </div>
  </el-main>
</template>

<script>
export default {
  name: "TodoTask",
  data() {
    return {
      tableData: [
        {
          ID: "101",
          type: "取快递业务",
          deadline:"2019-6-7",
          price: "$2.5",
          need:"2",
          total:"1"
        },
        {
           ID: "102",
          type: "陪运动业务",
         deadline:"2019-6-9",
          price: "$2.5",
          need:"1",
          total:"0"
        },
        {
          ID: "103",
          type: "辅导业务",
          deadline:"2019-6-5",
          price: "$0.5",
          need:"15",
          total:"4"
        }
      ]
    };
  },
  methods: {
      TaskView(row){
       this.$router.push({
          name: 'TaskDetail',
          params: {
            id: row.ID
          }
        })
      },

      Create(){
      this.$router.push('/User/Part/Putjob/CreateTask') 
        
      }
  },
 
};
</script>

<style scoped>
</style>