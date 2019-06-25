<template>
  <div class="container">
    <h2>答题人:{{sid}}</h2>
    <span class="sp1">答题时间:{{ans_time}}</span>
    <br>
    <p v-for="(value,index) in tableData">
      <span class="sp2">问题{{index+1}}:</span>
      <br>
      <span v-for="(va,index1) in tableData[index]">{{va}}、</span>
    </p>
    <footer class="ff">
      <el-button size="mini" type="primary" @click="changedd" v-bind:disabled="verifyed">通过</el-button>
    </footer>
  </div>
</template>


<script>
export default {
  props: ["qid", "sid"],
  data() {
    return {
      tableData: [[]],
      verify: 0,
      ans_time: "2018-1-1",
      verifyed: false
    };
  },
  methods: {
    getDajuan: function(vm) {
      var axios = {
        method: "get",
        url: "http://localhost:8082/module/user/get_sid_answer",
        widthCredentials: false,
        params: { qid: parseInt(vm.qid), sid: vm.sid }
      };
      vm.$http(axios)
        .then(function(res) {
          if (res.status == 200) {
            if (res.data.code == 200) {
              vm.ans_time = res.data.content.ans_time;
              vm.verify = res.data.content.verify;
              vm.verifyed = vm.verify == 0 ? false : true;
              vm.tableData = res.data.content.content;
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
    changeVerify(vm) {
      var URL = "http://localhost:8082/module/user/answer_review";
      var jsondata = {
        qid: parseInt(vm.qid),
        sid: vm.sid,
        verify: parseInt(1)
      };
      var axios = {
        method: "put",
        url: URL,
        widthCredentials: false,
        data: jsondata
      };
      vm.$http(axios)
        .then(function(res) {
          if (res.status == 200) {
            if (res.data.code == 200) {
              for (var i = 0; i < vm.tableData.length; i++) {
                var t = vm.tableData[i];
                if (t.sid == vm.sid) vm.tableData[i].vers = "已通过";
              }
            } else {
              vm.$message({
                showClose: true,
                message: res.data.msg,
                type: "error"
              });
            }
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
    changedd() {
      this.changeVerify(this);
    }
  },

  mounted() {
    this.getDajuan(this);
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  text-align: left;
}
p {
  border: 1px solid white;
  border-radius: 3px;
  box-shadow: -1px -1px 5px #888888;
}
.ff {
  text-align: center;
}
</style>
