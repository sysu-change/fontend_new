<template>
  <el-main>
    <h3 align="left">可接受的任务</h3>
      <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/User/Part/Getjob'}">问卷任务</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/User/Part/GetTask'}">其他任务</el-breadcrumb-item>
  <el-breadcrumb-item></el-breadcrumb-item>
</el-breadcrumb>
    <el-table :data="tableData">
      <el-table-column prop="ID" label="任务号" sortable></el-table-column>
      <el-table-column prop="type" label="任务类型" width="120"></el-table-column>
      <el-table-column prop="descript" label="任务简介"></el-table-column>
      <el-table-column prop="count" sortable label="需求量"></el-table-column>
      <el-table-column prop="price" sortable label="赏金"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button  @click="TaskView(scope.row)">任务详情</el-button>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button  @click="TaskAccept(scope.row)">申请任务</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
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
          type: "取快递",
          descript: "帮忙取快递送到明九楼下",
          count: 1,
          price: "$2"
        },
        {
           ID: "102",
          type: "陪运动",
          descript: "东校羽毛球场陪练",
          count: 1,
          price: "$1"
        },
        {
          ID: "103",
          type: "辅导",
          descript: "求计算机网络课程辅导通过考试",
          count: 1,
          price: "$1"
        },
        {
          ID: "104",
          type: "代购",
          descript: "去贝岗买水果，价格到付",
          count: 1,
          price: "$1"
        }
      ]
    };
  },
  methods: {
    TaskView:function(row){
        this.$router.push({
          name: 'TaskDetail',
          params: {
            id: row.ID
          }
        })
    }
  },
 
};
</script>

<style scoped>
</style>