<template>
  <el-main>
     <h2 align="left">正在进行的任务:</h2>
    <el-table :data="tableData">
      <el-table-column prop="ID" label="任务编号" sortable></el-table-column>
      <el-table-column prop="type" label="任务类型" width="120"></el-table-column>
      <el-table-column prop="publisher" label="发布者"></el-table-column>
      <el-table-column prop="deadline" sortable label="截止时间"></el-table-column>
      <el-table-column prop="price" sortable label="赏金"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button  @click="TaskView(scope.row)">任务详情</el-button>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button  @click="TaskComplete(scope.row)">完成任务</el-button>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button  @click="TaskDrop(scope.row)">放弃任务</el-button>
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
          type: "取快递",
          publisher:"16341018",
          deadline:"2019-7-5",
          price:"2.5¥"
        },
        {
           ID: "102",
          type: "取快递",
          publisher:"16341018",
          deadline:"2019-7-5",
          price:"2.5¥"
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
         type: "取快递",
          publisher:"16341018",
          deadline:"2019-7-5",
          price:"2.5¥"
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

    TaskComplete(row){
        
    },

    TaskDrop(row){
       this.$confirm('确定放弃吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        
       
        //本地数据更新
        //localStorage.setItem('tempList', JSON.stringify(this.tempList))
        this.$message({
          type: 'success',
          message: '已放弃任务!'
        })
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: err
        })
      })
    }
  },
 
};
</script>

<style scoped>
</style>