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
        {
          ID: "1237",
          date: "2016-05-02",
          type: "问卷调查",
          descript: "这是一份调查中大学生对食堂意见的问卷",
          count: 400,
          price: "$2"
        },
        {
          ID: "1237",
          date: "2016-05-04",
          type: "问卷调查",
          descript: "这是一份调查中大学生对课程安排意见的问卷",
          count: 500,
          price: "$5"
        },
        {
          ID: "1237",
          date: "2016-05-01",
          type: "问卷调查",
          descript: "这是一份调查中大学生对闲钱宝使用体验的问卷",
          count: 1000,
          price: "$3"
        },
        {
          ID: "1237",
          date: "2016-05-03",
          type: "问卷调查",
          descript: "这是一份针对中山大学学生睡眠情况的调查问卷",
          count: 400,
          price: "$4"
        }
      ]
    };
  },
  methods: {
    getWenjuan: function(vm) {
      if (this.user_id === "") return;
      var URL = "http://localhost:8082/module/user/questionnaire_pre";
      var jsonData = { offset: 0, number: 5 };
      var axios = {
        method: "get",
        url: URL,
        widthCredentials: false,
        params: jsonData
      };
      this.$http(axios)
        .then(function(res) {
          if (res.status == 200) {
            alert(res.data.msg)
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
              alert("服务器出错");
            }
          } else alert("网络出错");
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getWenjuan(this);
  }
};
</script>

<style scoped>
</style>

