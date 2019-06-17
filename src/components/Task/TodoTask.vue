<template>
  <el-main>
    <h3 align="left">奶牛端</h3>
       <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/User/Part/Putjob'}">问卷任务</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/User/Part/Putjob/TodoTask'}">进行中的任务</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/User/Part/Putjob/DoneTask'}">已完成的任务</el-breadcrumb-item>
  <el-breadcrumb-item></el-breadcrumb-item>
</el-breadcrumb>
    <el-table :data="tableData" v-loading="loading" >
      <el-table-column prop="ID" label="任务编号" sortable></el-table-column>
      <el-table-column prop="type" label="任务类型" >
        <template slot-scope="scope">
         <span style="color:#00b38a"  v-if="scope.row.type==2">取快递</span>
          <span style="color:orange"  v-if="scope.row.type==3">运动业务</span>
          <span style="color:green"  v-if="scope.row.type==4">学习业务</span>
          <span style="color:red"  v-if="scope.row.type==5">求夸夸业务</span>
          <span   v-if="scope.row.type==6">其他业务</span>
         </template>
      </el-table-column>
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
      tableData: []
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

      //创建任务
      Create(){
      this.$router.push('/CreateTask') 
      },

      //奶牛端查看已接单但未完成，和发布中未被接单的任务
    getTask: function(vm) {
      if (this.user_id === "") return;
      vm.loading=true;
      var URL = "http://localhost:8082/module/user/provider_task_in_progress";
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
                  ID: 0,
                  type: "",
                  deadline:"",
                  price: 0.0,
                  need:0,
                  total:0
                };
                tempIndex.ID = temp.tid;
                tempIndex.type = temp.type;
                tempIndex.deadline = temp.deadline;
                tempIndex.price = "$" + String(temp.reward);
                tempIndex.need = temp.quantity;
                tempIndex.total = temp.accept_num;
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
 
 //删除
    Delete: function(row) {
      //alert(row.ID);
      this.$confirm('确定放弃吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        
       this.DeleteDatabase(parseInt(row.ID),this);
       
        this.$message({
          type: 'success',
          message: '已删除任务!'
        })
      })
      
    },
    DeleteDatabase: function(id, vm) {
       var param = { tid: id };
      var URL = "http://localhost:8082/module/user/delete_task";
      var axios = {
        method: "delete",
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
      
    },
  },
 created() {
    this.getTask(this);
  },
};
</script>

<style scoped>
</style>