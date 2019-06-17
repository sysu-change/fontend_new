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
      v-loading="loading">
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
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :current-page="currentPage"
  :page-sizes="[5, 10]" 
  :page-size="pagesize"         
  layout="total, sizes, prev, pager, next, jumper"
  :total="200">
</el-pagination>
  </el-main>
</template>

<script>
export default {
  name: "Task",
  data() {
    return {
      tableData: [],
      loading:false,
      currentPage:1, //初始页
      pagesize:5    //    每页的数据
    };
  },
  methods: {
    //学生端挑选任务，查看到目前系统所有的其他类型任务
    getTask: function(vm) {
      if (this.user_id === "") return;
      vm.loading=true;
      var URL = "http://localhost:8082/module/user/select_task";
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
                  descript: "",
                  count: 0,
                  price: ""
                };
                tempIndex.ID = temp.tid;
                tempIndex.type = temp.type;
                tempIndex.descript = temp.description;
                tempIndex.count = temp.quantity;
                tempIndex.price = "$" + String(temp.reward);
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
    
    //查看任务
    TaskView:function(row){
        if (row.ID == "") {
        alert("未找到问卷标号为空");
        return;
      }
      this.$router.push({
        path: "/TaskDetail",
        query: { ID: parseInt(row.ID) }
      });
    },
    
    //申请任务
    TaskAccept(row){
      
       var jsonData = {
        tid: parseInt(row.ID)
      };
var axios = {
        method: "post",
        url: "http://localhost:8082/module/user/apply",
        widthCredentials: false,
        data: jsonData
      };
     
    this.$http(axios).then(function(res){
          if(res.status==200) {
            if(res.code!=200) alert(res.msg);
            this.$router.push({ path: "Putjob/TodoTask" });
          }
          else alert("网络错误");
        }).catch(function(err){
          console.log(err);
          alert("发生了一个异常");
        });
    },

    handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
        },
  },
   

 created() {
    this.getTask(this);
  },
};
</script>

<style scoped>
</style>