<template>
  <el-main>
    <el-table :data="tableData" v-loading="loading">
      <el-table-column prop="sid" label="答题人ID" sortable></el-table-column>
      <el-table-column prop="ans_time" label="答题日期" sortable width="140"></el-table-column>
      <el-table-column prop="vers" label="审核状态" width="120"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button @click="View(scope.row)" type="primary">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button @click="changedd(scope.row)" type="danger" disabled="scope.row.verify">通过</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible1" width="60%" :before-close="handleClose">
        <Dajuan v-bind:sid="nowsid" v-bind:qid="qid"></Dajuan>
    </el-dialog>
  </el-main>
</template>

<script>
import Dajuan from './Dajuan.vue'
export default {
  name: "Getjob",
  components:{Dajuan},
  data() {
    return {
      tableData: [
      ],
      qid:0,
      nowsid:"",
      dialogVisible1:false,
      loading:false
    };
  },
  methods: {
    getDajuanList: function(vm) {
      if (vm.qid === '') return;
      vm.loading=true;
      var URL = "http://localhost:8082/module/user/answer_get/"+vm.qid;
      var axios = {
        method: "get",
        url: URL,
        widthCredentials: false
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
                  sid: "",
                  ans_time: "",
                  vers: "",
                };
                tempIndex.sid=temp.sid;
                tempIndex.ans_time=temp.ans_time;
                tempIndex.vers=(temp.verify==0)?"未审核":"已通过";
                vm.tableData.push(tempIndex);
              }
              vm.loading=false;
            }
          } else alert("网络出错");
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    View(row) {
      if (row.sid == "") {
        alert("未找到问卷标号为空");
        return;
      }
      this.nowsid=row.sid;
      this.dialogVisible1=true;
    },
    changedd(row) {
      this.changeVerify(row,this);
    },
    changeVerify(row,vm) {
      var URL = "http://localhost:8082/module/user/answer_review";
      var jsondata={qid:this.qid,sid:row.sid,verify:1};
      var axios = {
        method: "put",
        url: URL,
        widthCredentials: false,
        data: jsondata
      };
      vm.$http(axios).then(function(res){
        if(res.status==200) {
          if(res.data.code==200) {
            for(var i=0;i<vm.tableData.length;i++) {
              var t=vm.tableData[i];
              if(t.sid==row.sid) (vm.tableData[i]).vers="已通过";
            }
          }
          else alert(res.data.msg);
        }
      }).catch(function(err){
        console.log(err);
        alert("An Err Happened");
      });
    }
  },
  mounted() {
    this.qid = this.$route.query.ID;
    this.getDajuanList(this);
  }
  
};
</script>

<style scoped>
</style>
