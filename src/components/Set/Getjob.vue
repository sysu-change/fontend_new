<template>
  <el-main>
    <h3 align="left">可接受的问卷</h3>
    <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/User/Part/Getjob' }">问卷任务</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/User/Part/GetTask' }">其他任务</el-breadcrumb-item>
  <el-breadcrumb-item></el-breadcrumb-item>
</el-breadcrumb>
    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" v-loading="loading">
      <el-table-column prop="ID" label="标号" sortable></el-table-column>
      <el-table-column prop="date" label="日期" sortable width="140"></el-table-column>
      <el-table-column prop="type" label="任务类型" width="120"></el-table-column>
      <el-table-column prop="descript" label="任务描述"></el-table-column>
      <el-table-column prop="count" sortable label="需求量"></el-table-column>
      <el-table-column prop="price" sortable label="赏金"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button @click="Edit(scope.row)">开始答题</el-button>
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
  :total="1000">
</el-pagination>
  </el-main>
</template>

<script>
export default {
  name: "Getjob",
  data() {
    return {
      tableData: [
      ],
      loading:false,
      currentPage:1, //初始页
      pagesize:5,    //    每页的数据
    };
  },
  methods: {
    getWenjuan: function(vm) {
      if (this.user_id === "") return;
      vm.loading=true;
      var URL = "http://localhost:8082/module/user/questionnaire_pre";
      var jsonData = { offset: 0, number: 500 };
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
                  date: "",
                  type: "",
                  descript: "",
                  count: 0,
                  price: ""
                };
                tempIndex.ID = String(temp.qid);
                tempIndex.date = "2016-05-04";
                tempIndex.count = temp.quantity;
                tempIndex.descript = temp.description;
                tempIndex.type = temp.title;
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
    Edit(row) {
    if (row.ID == "") {
        alert("未找到问卷标号为空");
        return;
      }
    this.$router.push({
        path: "/Fillin",
        query: { ID: parseInt(row.ID) }
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
    this.getWenjuan(this);
  },
  
};
</script>

<style scoped>
</style>

