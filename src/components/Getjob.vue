<template>
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
</template>

<script>
export default {
    name:'Getjob',
    data() {
        return {tableData: [{
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
        }]
        }
    }
}
</script>

<style scoped>

</style>

