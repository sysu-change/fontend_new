<template>
  <div>
    <el-main>
       <h3 align="left">奶牛端</h3>
      <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/User/Part/Putjob' }">问卷任务</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/User/Part/Putjob/TodoTask' }">进行中的任务</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/User/Part/Putjob/DoneTask' }">已完成的任务</el-breadcrumb-item>
  <el-breadcrumb-item></el-breadcrumb-item>
      </el-breadcrumb>
      <el-table :data="tableData" v-loading="loading">
        <el-table-column prop="ID" label="标号" sortable></el-table-column>
        <el-table-column prop="date" label="日期" sortable width="100"></el-table-column>
        <el-table-column prop="type" label="标题" width="120"></el-table-column>
        <el-table-column prop="descript" label="任务描述"></el-table-column>
        <el-table-column prop="count" sortable label="需求量" width="100"></el-table-column>
        <el-table-column prop="price" sortable label="赏金"></el-table-column>
        <el-table-column prop="status" label="状态" width="120">
         <template slot-scope="scope">
          <i style="color:#00b38a" class="el-icon-check" v-if="scope.row.status=='已发布'"></i>
          <i style="color:orange" class="el-icon-time" v-if="scope.row.status=='未发布'"></i>
          <span style="margin-left: 10px">{{ scope.row.status }}</span>
        </template>
        </el-table-column>
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
            <el-button size="mini" type="info" @click="Statics(scope.row)">审核</el-button>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="Check(scope.row)">查看</el-button>
          </template>
        </el-table-column>
       
        
      </el-table>
      <div class="crhead">
      <el-button   class="but" @click="Create">+新建问卷</el-button>
    </div>
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
      this.$router.push("/Create");
    },
    /*进入页面详情页，并进行编辑*/
    Edit: function(row) {
      var ID = row.ID;
      if (ID == "") {
        this.$message({
          showClose: true,
          message: "未找到问卷标号为空",
          type: "warning"
        });
        return;
      }
      this.$router.push({
        path: "/Edit",
        query: { ID: parseInt(row.ID) }
      });
    },
    /**查看问卷 */
    Check: function(row) {
      if (row.ID == "") {
        this.$message({
          showClose: true,
          message: "未找到问卷标号为空",
          type: "warning"
        });
        return;
      }
      this.$router.push({
        path: "/Check",
        query: { ID: parseInt(row.ID) }
      });
    },
    /**查看已回答问卷的统计数据 */
    Statics: function(row) {
      if (row.ID == "") {
        this.$message({
          showClose: true,
          message: "未找到问卷标号为空",
          type: "warning"
        });
        return;
      }
      this.$router.push({
        path: "/User/Part/Putjob/Dajuanlist",
        query: { ID: parseInt(row.ID) }
      });
    },
    Delete: function(row) {
      this.$confirm('确定放弃吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        
       this.DeleteDatabase(parseInt(row.ID),this);
       
        this.$message({
          type: 'success',
          message: '已放弃任务!'
        })
      })
      
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
    }
  },
  mounted() {
    this.getQuestionnaire(this);
  }
};
</script>

<style scoped>
.but {
  position: relative;
  border: 1px solid #00b38a;
  color: #00b38a;
  background-color: #ffffff;
  left: 0%;
  border-radius: 4px;
  width: 130px;
  height: 40px;
  margin: 3%;
}
.but:hover{
  color:#00b38a
}
.crhead {
  margin-top: 3px;
}
</style>
