<template>
  <div>
    <div class="crhead">
      <button class="but" @click="Create">+新建问卷</button>
    </div>
    <el-main>
      <el-table :data="tableData" v-loading="loading">
        <el-table-column prop="ID" label="标号" sortable></el-table-column>
        <el-table-column prop="date" label="日期" sortable width="140"></el-table-column>
        <el-table-column prop="type" label="任务类型" width="120"></el-table-column>
        <el-table-column prop="descript" label="任务描述"></el-table-column>
        <el-table-column prop="count" sortable label="需求量"></el-table-column>
        <el-table-column prop="price" sortable label="赏金"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="Edit(scope.row)"
              v-bind:disabled="scope.row.statuss"
            >编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="Delete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="Check(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" type="info" @click="Statics(scope.row)">数据</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
export default {
  name: "Getjob",
  data() {
    return {
      tableData: [
      ],
      loading:false
    };
  },
  methods: {
    /*跳转到问卷创建页面*/
    Create: function() {
      this.$router.push("/User/Part/Putjob/Create");
    },
    /*进入页面详情页，并进行编辑*/
    Edit: function(row) {
      var ID = row.ID;
      //alert(ID);
      if (ID == "") {
        alert("未找到问卷标号为空");
        return;
      }
      this.$router.push({
        path: "/User/Part/Putjob/Edit",
        query: { ID: parseInt(row.ID) }
      });
    },
    /**查看问卷 */
    Check: function(row) {
      if (row.ID == "") {
        alert("未找到问卷标号为空");
        return;
      }
      this.$router.push({
        path: "/User/Part/Putjob/Check",
        query: { ID: parseInt(row.ID) }
      });
    },
    /**查看已回答问卷的统计数据 */
    Statics: function(row) {
      if (row.ID == "") {
        alert("未找到问卷标号为空");
        return;
      }
      this.$router.push({
        path: "/User/Part/Putjob/Dajuanlist",
        query: { ID: parseInt(row.ID) }
      });
    },
    Delete: function(row) {
      //alert(row.ID);
      this.DeleteDatabase(parseInt(row.ID),this);
    },
    DeleteDatabase: function(id, vm) {
      var param = { qid: id };
      var URL = "http://localhost:8082/module/user/delete_questionnaire";
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
    getQuestionnaire: function(vm) {
      vm.loading=true;
      if (this.user_id === "") return;
      var URL = "http://localhost:8082/module/user/questionnaire_own";
      var axios = { method: "get", url: URL, widthCredentials: false };
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
                  price: "",
                  status: "",
                  statuss: false
                };
                tempIndex.ID = String(temp.qid);
                tempIndex.date = "2016-05-04";
                tempIndex.descript = temp.description;
                tempIndex.type = temp.title;
                tempIndex.price = "$" + String(temp.reward);
                tempIndex.count = temp.quantity;
                if (temp.edit_status == 0) {
                  tempIndex.status = "未发布";
                  tempIndex.statuss = false;
                } else if (temp.edit_status == 1) {
                  tempIndex.status = "已发布";
                  tempIndex.statuss = true;
                } else if (temp.edit_status == 2) {
                  tempIndex.status = "审核中";
                  tempIndex.statuss = true;
                }
                vm.tableData.push(tempIndex);
              }
              vm.loading=false;
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
    this.getQuestionnaire(this);
  }
};
</script>

<style scoped>
.but {
  width: 10%;
  height: 30px;
  border: 0px;
  color: white;
  font-size: 20px;
  border-radius: 3px;
  background-color: #409EFF;
}
.crhead {
  margin-top: 3px;
}
</style>
