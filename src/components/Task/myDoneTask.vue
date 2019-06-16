<template>
  <el-main>
      <h2 align="left">已完成的任务:</h2>
    <el-table :data="tableData">
      <el-table-column prop="ID" label="任务编号" sortable></el-table-column>
      <el-table-column prop="type" label="任务类型" width="120"></el-table-column>
      <el-table-column prop="publisher" label="发布者"></el-table-column>
      <el-table-column prop="deadline" sortable label="截止时间"></el-table-column>
      <el-table-column prop="price" sortable label="赏金"></el-table-column>

      <el-table-column prop="getPay" sortable label="是否到账">
        <template slot-scope="scope">
          <i style="color:#00b38a" class="el-icon-check" v-if="scope.row.getPay=='是'"></i>
          <i style="color:red" class="el-icon-close" v-if="scope.row.getPay=='否'"></i>
          <span style="margin-left: 10px">{{ scope.row.getPay }}</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button  @click="TaskView(scope.row)">任务详情</el-button>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button  @click="Complain(scope.row)">投诉</el-button>
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
          price:"2.5¥",
          getPay:'是'
        },
        {
           ID: "102",
          type: "取快递",
          publisher:"16341018",
          deadline:"2019-7-5",
          price:"2.5¥",
          getPay:'否'
        },
        {
          ID: "103",
          type: "辅导",
          publisher:"16341018",
          deadline:"2019-7-5",
          price:"2.5¥",
          getPay:'是'
        },
        {
          ID: "104",
         type: "取快递",
          publisher:"16341018",
          deadline:"2019-7-5",
          price:"2.5¥",
          getPay:'否'
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

  mounted:{
      //获取数据
  }
 
};
</script>

<style scoped>
</style>