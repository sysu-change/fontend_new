<template>
  <el-main>
      <h2 align="left">已完成的任务:</h2>
    <el-table :data="tableData"  v-loading="loading">
      <el-table-column prop="ID" label="任务编号" sortable></el-table-column>
      <el-table-column prop="type" label="任务类型" width="120"></el-table-column>
      <el-table-column prop="publisher" label="发布者"></el-table-column>
      <el-table-column prop="deadline" sortable label="截止时间"></el-table-column>
      <el-table-column prop="price" sortable label="赏金"></el-table-column>

      <el-table-column prop="getpay"  label="是否到账">
        <template slot-scope="scope">
          <i style="color:#00b38a" class="el-icon-check" v-if="scope.row.getpay=='是'"></i>
          <i style="color:red" class="el-icon-close" v-if="scope.row.getpay=='否'"></i>
          <span style="margin-left: 10px">{{ scope.row.getpay }}</span>
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
        
      ]
    };
  },
  methods: {
    //学生查看已完成的任务，查看到目前系统所有的其他类型任务
    getTask: function(vm) {
      if (this.user_id === "") return;
      vm.loading=true;
      var URL = "http://localhost:8082/module/user/student_task_done";
      var jsonData = { offset: 0, number: 100 };
      var axios = {
        method: "get",
        url: URL,
        widthCredentials: false,
        params: jsonData
      };
      this.$http(axios)
        .then(function(res) {
          if (res.status == 200) {
            if (res.data.code == 200) {
              var number = res.data.number;
              var content = res.data.content;
              var jsonContent = content;
              for (var i = 0; i < number; i++) {
                var temp = jsonContent[i];
                var tempIndex = {
                  ID: "",
                  type: "",
                  publisher: "",
                  deadline:"",
                  price: "",
                  getpay:""
                };
                tempIndex.ID = String(temp.tid);
                tempIndex.type = temp.type;
                tempIndex.publisher = temp.sid;
                tempIndex.deadline = temp.deadline;
                tempIndex.price = "$" + String(temp.reward);
                if(temp.reward_status==0){
                  tempIndex.getpay="否"
                }else{
                  tempIndex.getpay="是"
                }
                
                vm.tableData.push(tempIndex);
              }
              vm.loading=false;
            } else {
              alert(res.data.msg);
            }
          } else alert("网络出错");
        })
        .catch(function(err) {
          console.log(err);
        });
    },

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

  created() {
    this.getTask(this);
  },
 
};
</script>

<style scoped>
</style>