<template>
  <el-main>
    <h3 align="left">可接受的任务</h3>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/User/Part/Getjob'}">问卷任务</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/User/Part/GetTask'}">其他任务</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      v-loading="loading"
    >
      <el-table-column prop="ID" label="任务号" sortable></el-table-column>
      <el-table-column prop="type" label="任务类型" width="120">
        <template slot-scope="scope">
          <span style="color:#00b38a" v-if="scope.row.type==2">取快递</span>
          <span style="color:orange" v-if="scope.row.type==3">运动业务</span>
          <span style="color:green" v-if="scope.row.type==4">学习业务</span>
          <span style="color:red" v-if="scope.row.type==5">求夸夸业务</span>
          <span v-if="scope.row.type==6">其他业务</span>
        </template>
      </el-table-column>
      <el-table-column prop="descript" label="任务简介"></el-table-column>
      <el-table-column prop="count" sortable label="需求量"></el-table-column>
      <el-table-column prop="price" sortable label="赏金"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button @click="TaskView(scope.row)">任务详情</el-button>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button @click="TaskAccept(scope.row)" v-bind:disabled="scope.row.verify">申请任务</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="200"
    ></el-pagination>
  </el-main>
</template>

<script>
export default {
  name: "Task",
  data() {
    return {
      tableData: [],
      loading: false,
      currentPage: 1, //初始页
      pagesize: 5 //    每页的数据
    };
  },
  methods: {
    //学生端挑选任务，查看到目前系统所有的其他类型任务
    getTask: function(vm) {
      if (vm.user_id === "") return;
      vm.loading = true;
      var URL = "http://localhost:8082/module/user/select_task";
      var jsonData = { offset: Number(0), number: Number(100) };
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
                  descript: "",
                  count: 0,
                  price: ""
                };
                tempIndex.ID = temp.tid;
                tempIndex.type = temp.type;
                tempIndex.descript = temp.description;
                tempIndex.count = temp.quantity;
                tempIndex.price = "$" + String(temp.reward);
                 
               if( tempIndex.count!= 0){
                  vm.tableData.push(tempIndex);
                }
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
    TaskView: function(row) {
      if (row.ID == "") {
        this.$message({
          showClose: true,
          message: "未找到问卷标号为空",
          type: "warning"
        });
        return;
      }
      this.$router.push({
        name: "TaskDetail",
        params: {
          id: row.ID
        }
      });
    },

    //申请任务
    TaskAccept(row) {
     this.apply(row,this);
      this.$message({
            showClose: true,
            message: "申请成功",
            type: "success"
          });
    },

    apply(row,vm){
       var jsonData = {
        tid: parseInt(row.ID)
      };
      var axios = {
        method: "post",
        url: "http://localhost:8082/module/user/apply",
        widthCredentials: false,
        data: jsonData
      };

      this.$http(axios)
        .then(function(res) {
          if (res.status == 200) {
            vm.$router.push('/User/Part/myTodoTask');
          } else  {vm.$message({
              showClose: true,
              message: "网络错误",
              type: "error"
            });}
        })
        .catch(function(err) {
          console.log(err);
          alert("发生了一个异常");
        });
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    }
  },

  created() {
    this.getTask(this);
  }
};
</script>

<style scoped>
</style>