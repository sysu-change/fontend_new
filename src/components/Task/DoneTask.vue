<template>
  <el-main>
    <h3 align="left">奶牛端</h3>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/User/Part/Putjob'}">问卷任务</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/User/Part/Putjob/TodoTask'}">进行中的任务</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/User/Part/Putjob/DoneTask'}">已完成的任务</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column prop="ID" label="任务编号" sortable width="100"></el-table-column>
      <el-table-column prop="type" label="任务类型">
        <template slot-scope="scope">
          <span style="color:#00b38a" v-if="scope.row.type==2">取快递</span>
          <span style="color:orange" v-if="scope.row.type==3">运动业务</span>
          <span style="color:green" v-if="scope.row.type==4">学习业务</span>
          <span style="color:red" v-if="scope.row.type==5">求夸夸业务</span>
          <span v-if="scope.row.type==6">其他业务</span>
        </template>
      </el-table-column>
      <el-table-column prop="price" sortable label="任务赏金" width="100"></el-table-column>
      <el-table-column prop="number" label="接单者学号" width="150"></el-table-column>
      <el-table-column prop="state" label="任务状态">
        <template slot-scope="scope">
          <span style="color:orange" v-if="scope.row.state==0">进行中</span>
          <span style="color:#00b38a" v-if="scope.row.state==1">已完成</span>
        </template>
      </el-table-column>
      <el-table-column prop="state_s" label="审核状态">
        <template slot-scope="scope">
          <span style="color:orange" v-if="scope.row.state_s==0">未审核</span>
          <span style="color:#00b38a" v-if="scope.row.state_s==1">通过</span>
          <span style="color:red" v-if="scope.row.state_s==2">不通过</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="mini" @click="Pass(scope.row,vm)" v-bind:disabled="scope.row.verify">通过</el-button>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="mini" @click="Reject(scope.row)" v-bind:disabled="scope.row.verify">不通过</el-button>
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
      tableData: [],
      loading: false
    };
  },
  methods: {
    //奶牛端端查看目前系统所有的已完成任务
    getTask: function(vm) {
      if (this.user_id === "") return;
      vm.loading = true;
      var URL = "http://localhost:8082/module/user/provider_task_done";
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
                  type: 0,
                  price: "",
                  number: "",
                  state: 0,
                  state_s: 0
                };
                tempIndex.ID = temp.tid;
                tempIndex.type = temp.type;
                tempIndex.price = "$" + String(temp.reward);
                tempIndex.number = temp.sid;
                tempIndex.state = temp.accept_status;
                tempIndex.state_s = temp.verify;
                tempIndex.verify = temp.verify == 0 ? false : true;
                vm.tableData.push(tempIndex);
              }
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
          vm.loading = false;
        })
        .catch(function(err) {
          vm.loading = false;
          console.log(err);
          vm.$message({
            showClose: true,
            message: "发生了一个异常",
            type: "error"
          });
        });
    },
    PassHttp: function(row, vm) {
      var jsonData = {
        tid: parseInt(row.ID),
        sid: row.number,
        verify: 1
      };
      var axios = {
        method: "put",
        url: "http://localhost:8082/module/user/task_verify",
        widthCredentials: false,
        data: jsonData
      };
      this.$http(axios)
        .then(function(res) {
          if (res.status == 200) {
            if (res.data.msg == "successful") {
              for (var i = 0; i < vm.tableData.length; i++) {
                var t = vm.tableData[i];
                if (t.ID == row.ID) {
                  vm.tableData[i].state_s = 1;
                  vm.tableData[i].verify = true;
                }
              }
              vm.$message({
                showClose: true,
                message: "提交成功",
                type: "success"
              });
            } else {
              vm.$message({
                showClose: true,
                message: res.data.msg,
                type: "error"
              });
            }
            vm.$message({
              showClose: true,
              message: "提交成功",
              type: "success"
            });
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
          vm.$message({
            showClose: true,
            message: "发生了一个异常",
            type: "error"
          });
        });
    },
    Pass: function(row) {
      this.PassHttp(row, this);
    },

    RejectHttp: function(row, vm) {
      var jsonData = {
        tid: parseInt(row.ID),
        sid: row.number,
        verify: 2
      };
      var axios = {
        method: "put",
        url: "http://localhost:8082/module/user/task_verify",
        widthCredentials: false,
        data: jsonData
      };

      this.$http(axios)
        .then(function(res) {
          if (res.status == 200) {
            if (res.data.msg == "successful") {
              for (var i = 0; i < vm.tableData.length; i++) {
                var t = vm.tableData[i];
                if (t.ID == row.ID) {
                  vm.tableData[i].state_s = 2;
                  vm.tableData[i].verify = true;
                }
              }
              vm.$message({
                showClose: true,
                message: "提交成功",
                type: "success"
              });
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
          vm.$message({
            showClose: true,
            message: "发生了一个异常",
            type: "error"
          });
        });
    },

    Reject: function(row) {
      this.RejectHttp(row, this);
    },

    Complain: function(row) {
      this.$router.push({
        name: "Complain",
        params: {
          id: row.ID,
          publisher: row.number
        }
      });
      const h = this.$createElement;
      this.$notify({
        title: "投诉须知",
        message: h(
          "i",
          { style: "color: teal" },
          "您填写的内容对我们的审核结果非常关键，请您尽可能详细的填写，投诉的结果我们将会以邮箱短信的方式告知您和您投诉的人"
        )
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