<template>
  <el-main>
    <el-table :data="tableData">
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
  </el-main>
</template>

<script>
export default {
  name: "Getjob",
  data() {
    return {
      tableData: [
      ]
    };
  },
  methods: {
    getWenjuan: function(vm) {
      if (this.user_id === "") return;
      var URL = "http://localhost:8082/module/user/questionnaire_pre";
      var jsonData = { offset: 0, number: 15 };
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
        path: "/User/Part/Getjob/Fillin",
        query: { ID: parseInt(row.ID) }
      });
  }
  },
  mounted() {
    this.getWenjuan(this);
  },
  
};
</script>

<style scoped>
</style>

