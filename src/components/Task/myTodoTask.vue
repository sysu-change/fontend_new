<template>
  <el-main>
    <h2 align="left">正在进行的任务:</h2>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column prop="ID" label="任务编号" sortable>
        <template slot-scope="scope">
          <i style="color:#00b38a" class="el-icon-s-order"></i>
          <span style="margin-left: 10px">{{ scope.row.ID }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="任务类型" width="120">
        <template slot-scope="scope">
          <span style="color:#00b38a" v-if="scope.row.type==2">取快递</span>
          <span style="color:orange" v-if="scope.row.type==3">运动业务</span>
          <span style="color:green" v-if="scope.row.type==4">学习业务</span>
          <span style="color:red" v-if="scope.row.type==5">求夸夸业务</span>
          <span v-if="scope.row.type==6">其他业务</span>
        </template>
      </el-table-column>
      <el-table-column prop="publisher" label="发布者"></el-table-column>
      <el-table-column prop="deadline" sortable label="截止时间"></el-table-column>
      <el-table-column prop="price" sortable label="赏金"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button @click="TaskView(scope.row)">任务详情</el-button>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button @click="TaskComplete(scope.row)">完成任务</el-button>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button @click="TaskDrop(scope.row)">放弃任务</el-button>
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
      tableData: [],
      loading: false
    };
  },
  methods: {
    //学生查看已完成的任务，查看到目前系统所有的其他类型任务
    getTask: function(vm) {
      if (vm.user_id === "") return;
      vm.loading = true;
      var URL = "http://localhost:8082/module/user/student_task_in_progress";
      var jsonData = { offset: 0, number: 100 };
      var axios = {
        method: "get",
        url: URL,
        widthCredentials: false,
        params: jsonData
      };
      vm.$http(axios)
        .then(function(res) {
          if (res.status == 200) {
            if (res.data.code == 200) {
              var number = res.data.number;
              var content = res.data.content;
              var jsonContent = content;
              for (var i = 0; i < number; i++) {
                var temp = jsonContent[i];
                var tempIndex = {
                  ID: 0,
                  type: "",
                  publisher: "",
                  deadline: "",
                  price: "",
                  getpay: ""
                };
                tempIndex.ID = temp.tid;
                tempIndex.type = temp.type;
                tempIndex.publisher = temp.sid;
                tempIndex.deadline = temp.deadline;
                tempIndex.price = "$" + String(temp.reward);
                vm.tableData.push(tempIndex);
              }
              vm.loading = false;
            } else {
              vm.$message({
                showClose: true,
                message: res.data.msg,
                type: "error"
              });
            }
          } else {
            vm.$message({
              showClose: true,
              message: "网络错误",
              type: "error"
            });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    //查看任务
    TaskView(row) {
      this.$router.push({
        name: "TaskDetail",
        params: {
          id: row.ID
        }
      });
    },

    //完成任务
    TaskComplete(row) {
      var jsonData = { tid: parseInt(row.ID) };

      var axios = {
        method: "post",
        url: "http://localhost:8082/module/user/task_finish",
        widthCredentials: false,
        data: jsonData
      };
      this.$http(axios)
        .then(function(res) {
          if (res.status == 200) {
            ("已提交");

            var table = this.tableData;
            for (var i = 0; i < table.length; i++) {
              if (table[i].ID == id) {
                this.tableData.splice(i, 1);
                break;
              }
            }
          } else {
            ("request failed");
            return false;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    //放弃任务
    TaskDrop: function(row) {

      this.$confirm("确定放弃吗？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.ApplyDatabase(parseInt(row.ID), this);

        this.$message({
          type: "success",
          message: "已放弃任务!"
        });
      });
    },
    ApplyDatabase: function(id, vm) {
      var param = { tid: id };
      var URL = "http://localhost:8082/module/user/task_give_up";
      var axios = {
        method: "post",
        url: URL,
        widthCredentials: false,
        data: param
      };
      vm.$http(axios)
        .then(function(res) {
          if (res.status == 200) {
            if (res.data.code == 200) {
              var table = vm.tableData;
              for (var i = 0; i < table.length; i++) {
                if (table[i].ID == id) {
                  vm.tableData.splice(i, 1);
                  break;
                }
              }
            }
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },

  created() {
    this.getTask(this);
  }
};
</script>

<style scoped>
</style>