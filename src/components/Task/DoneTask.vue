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
      <el-table-column prop="ID" label="任务编号" sortable  width="100"></el-table-column>
      <el-table-column prop="type" label="任务类型" ></el-table-column>
      <el-table-column prop="price" sortable label="任务赏金" width="100"></el-table-column>
      <el-table-column prop="number"  label="接单者学号" width="150"></el-table-column>
      <el-table-column prop="state"  label="任务状态"></el-table-column>
      <el-table-column prop="state_s"  label="审核状态"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="mini"  @click="Pass(scope.row)">通过</el-button>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="mini" @click="Reject(scope.row)">不通过</el-button>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="mini" @click="Complain(scope.row)">投诉</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
export default {
  name: "Task",
  data() {
    return {
      tableData: [
        {
          ID: "101",
          type: "取快递业务",
          price: "$2.5",
          number:"16341018",
          state:"已完成",
          state_s:"未审核"
        },
        {
           ID: "102",
          type: "陪运动业务",
         price: "$2.5",
          number:"16341018",
          state:"已完成",
          state_s:"审核通过"
        },
        {
          ID: "103",
          type: "辅导业务",
          price: "$2.5",
          number:"16341018",
          state:"已完成",
          state_s:"审核不通过"
        }
      ]
    };
  },
  methods: {
    Pass:function(row){
       
    },
    Reject:function(row){
      
    },

    Complain:function(row){
        this.$router.push({
          path: '/Complain',
          params: {
            id: row.ID
          }
        })
      
      const h = this.$createElement;
        this.$notify({
          title: '投诉须知',
          message: h('i', { style: 'color: teal'}, 
          '您填写的内容对我们的审核结果非常关键，请您尽可能详细的填写，投诉的结果我们将会以邮箱短信的方式告知您和您投诉的人'),
        });
    }
  },
 
};
</script>

<style scoped>
</style>