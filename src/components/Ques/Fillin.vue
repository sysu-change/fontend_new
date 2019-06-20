
<template>
  <div class="edit-container">
    

    <h2
      type="text"
      readonly="readonly"
      name="qsTitle"
      ref="titleInput"
    >{{titleValue}}</h2>

    <div class="content" v-loading.fullscreen.lock="loading">
      <div class="questions" v-for="(qus, index) in qsItem" >
        <div class="qs-left">
          <p class="qs-title">{{index+1}}. {{qus.question}}{{getMsg(qus.choice_type)}}<span style='color:red' v-if="qus.must_edit">*</span></p>
          <p v-for="(option,index1) in qus.choice_item" class="option">
            <label>
              <input
                type="radio"
                :name="`${index}`"
                :value="`${index1}`"
                v-if="qus.choice_type === 1"
                v-model="(qsItem[index]).indexCh"
              >
              <input
                type="checkbox"
                :name="`${index}`"
                v-if="qus.choice_type === 2"
                v-model="(qsItem[index]).choiced[index1]"
              >
              <span>{{(qsItem[index]).choice_item[index1]}}</span>
              <br>
            </label>
          </p>
          <p v-if="qus.choice_type === 0">
            <textarea v-model="(qsItem[index]).innertext" placeholder="说点什么吧"></textarea>
          </p>
        </div>
      </div>
    </div>
    <footer>
      <span>问卷截止日期</span>
      <div class="btn-box">
        <button class="save" @click="save">提交</button>
        <button class="save" @click="back">返回</button>
      </div>
    </footer>
  </div>
</template>

<script>
/**
 * A module that define qs-edit view
 * @exports qs-edit
 * @author oyh(Reusjs)
 */
export default {
  name: "Create",
  components: {},
  data() {
    return {
      qsItem: [],
      titleChange: false,
      titleValue: "", //问卷标题
      description: "有偿问卷",
      qid: 0,
      edit_status: 0,
      reward: 0.1,
      quantity: 100,
      loading: true
    };
  },
  methods: {
    getMsg(item) {
      let msg = "";
      if (item == 1) {
        msg = "(单选题)";
      } else if (item == 2) {
        msg = "(多选题)";
      } else {
        msg = "(文本题)";
      }
      return item.isNeed ? `${msg} *` : msg;
    },
    back() {
      this.$router.push("/User/Part/Getjob");
    },
    check(vm) {
      for (var i = 0; i < this.qsItem.length; i++) {
        if (vm.qsItem[i].must_edit == true) {
          if (vm.qsItem[i].choice_type == 2) {
            //多选
            var choice_num = 0;
            for (var d = 0; d < vm.qsItem[i].choice_item.length; d++) {
              
                if (vm.qsItem[i].choiced[d]==true){
                  choice_num++;
                }
            
            }
      
            if(choice_num < 1) {
              return false;
            }
          } else if (vm.qsItem[i].choice_type == 1) {
            //单选
            if (vm.qsItem[i].indexCh == -1) {
              return false;
            }
          
          } else {
            if (vm.qsItem[i].innertext == ""){
              return false;
            }
            
          }
        }
      }
      return true;
    },

    save() {
      if (this.check(this)){
        this.uploadWenjuan(this);
      }
      else {
        alert("请完成所有必填项");
      }
    },
    dateToString() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      return "" + year + "-" + month + "-" + day;
    },
    uploadWenjuan(vm) {
      var wenjuan = {
        qid: vm.qid,
        sid: sessionStorage.getItem("user"),
        ans_time: vm.dateToString()
      };
      var ans = [];
      for (var i = 0; i < vm.qsItem.length; i++) {
        var inner = [];
        if (vm.qsItem[i].choice_type == 0) {
          inner.push(vm.qsItem[i].innertext);
          ans.push(inner);
          continue;
        } else if (vm.qsItem[i].choice_type == 1) {
          inner.push(vm.qsItem[i].choice_item[vm.qsItem[i].indexCh]);
          //alert((vm.qsItem[i]).choice_item[(vm.qsItem[i]).indexCh]);
          ans.push(inner);
          continue;
        }
        for (var d = 0; d < vm.qsItem[i].choice_item.length; d++) {
          //alert((vm.qsItem[i]).choice_item[d]+"+"+(vm.qsItem[i]).choiced[d]);
          if (
            vm.qsItem[i].choiced[d] == true &&
            vm.qsItem[i].choice_type == 2
          ) {
            inner.push(vm.qsItem[i].choice_item[d]);
          }
        }
        ans.push(inner);
      }
      wenjuan.content = ans;

      var URL = "http://localhost:8082/module/user/answer_put_forward";
      var axios = {
        method: "post",
        url: URL,
        widthCredentials: false,
        data: wenjuan
      };
      vm.$http(axios)
        .then(function(res) {
          if (res.status == 200) {
            if (res.data.code == 200) {
              alert("成功");
            } else alert(res.data.msg);
            vm.showDialog = false;
            vm.$router.push({ path: "/User/Part/Getjob" });
          } else alert("网络错误");
        })
        .catch(function(err) {
          console.log(err);
          alert("发生了一个异常");
        });
    },
    getWenjuan(vm) {
      var URL = "http://localhost:8082/module/user/questionnaire/" + this.qid;
      var axios = { method: "get", url: URL, widthCredentials: false };
      this.$http(axios)
        .then(function(res) {
          if (res.status == 200) {
            if (res.data.code == 200) {
              vm.titleValue = res.data.content.title;
              vm.description = res.data.content.description;
              vm.reward = res.data.content.reward;
              vm.quantity = res.data.content.quantity;
              vm.status = res.data.content.edit_status;
              var contentjs = res.data.content.content;
              vm.qsItem = contentjs;
              for (var i = 0; i < contentjs.length; i++) {
                if (vm.qsItem[i].choice_type == 2) {
                  vm.qsItem[i].choiced = [];
                  for (var d = 0; d < vm.qsItem[i].choice_item.length; d++) {
                    vm.qsItem[i].choiced.push(false);
                  }
                } else if (vm.qsItem[i].choice_type == 1) {
                  vm.qsItem[i].indexCh = -1;
                } else {
                  vm.qsItem[i].innertext = "";
                }
              }
              vm.loading = false;
            } else alert(res.data.msg);
          } else alert("网络错误");
        })
        .catch(function(err) {
          console.log(err);
          alert("发生了一个异常");
        });
    }
  },
  mounted() {
    this.qid = parseInt(this.$route.query.ID);
    //alert(this.qid);
    this.getWenjuan(this);
  }
};
</script>
<style scoped>
.edit-container {
  width: 60%;
  margin: 1rem auto;
  padding: 1rem;
  color: #666;
  background-color: #fff;
  border-radius: 0.4rem;
  box-shadow: 0 0 1rem #aaa;
}

h2 {
  height: 2rem;
  margin-bottom: 2px;
  line-height: 15px;
  text-align: center;
  font-size: 20px;
  color: #555;
  cursor: pointer;
}



input[name="qsTitle"] {
  height: 20px;
  width: 100%;
  margin-bottom: 2px;
  font-size: 20px;
  text-align: center; 
}

.content {
  padding: 3rem;
  border-top: 0.2rem solid #ccc;
  border-bottom: 0.2rem solid #ccc;
}

.questions {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 2px 2px;
  margin-bottom: 5px;
 
}

.questions p {
  margin-top: 2px;
  margin-bottom: 2px;
}
.questions textarea {
  width: 100%;
  height: 60px;
  margin-left: 2px;
  border-radius: 5px;
}
.questions .qs-title {
  width: 100%;
  font-size: 1rem;
  font-weight: 700;
  color: #333;
  text-align: left;
}
.questions .option {
  text-align: left;
  margin-left: 5px;
}
.questions .qs-left {
  width: 50%;
}
.questions .qs-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
}
.questions .qs-right label {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.questions .qs-right p {
  bottom: 1rem;
}
.questions .qs-right p span {
  cursor: pointer;
}


.add {
  border: 0.2rem solid #cccccc;
}

.add-option {
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
}

.add-option button {
  height: 25px;
  width: 50px;
  margin-left: 4rem;
  border: 0.2rem solid #ccc;
  background-color: #eee;
  cursor: pointer;
}

.add-item {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  background-color: #eee;
  cursor: pointer;
}
.add-item span {
  font-size: 5px;
}

footer {
  position: relative;
  height: 6rem;
  margin-top: 2px;
  line-height: 2rem;
}
footer .btn-box {
  width: 100%;
}
footer .save,
.issue {
  width: 15%;
  height: 2rem;
  line-height: 100%;
  color: #777;
  border: 0.1rem solid #aaa;
  border-radius: 0.2rem;
  background-color: #fff;
  cursor: pointer;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
}
footer .save:hover {
  box-shadow: 0 0 0.5rem #aaa;
}
footer .issue {
  margin-left: 4rem;
  color: #fff;
  border: 0.1rem solid orange;
  background-color: orange;
}
footer .issue:hover {
  box-shadow: 0 0 0.5rem orange;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter-active {
  height: 8rem;
}
.slide-enter,
.slide-leave-active {
  opacity: 0;
  height: 0;
  transform: translateY(-3rem);
}

button {
  width: 7rem;
  height: 2.5rem;
  line-height: 100%;
  color: #777;
  border: 1px solid #555;
  border-radius: 0.2rem;
  background-color: #fff;
  cursor: pointer;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
}
button:hover {
  box-shadow: 0 0 5px #bbb;
}

.shadow {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background: rgba(85, 85, 85, 0.7);
}
.shadow .add-qs-dialog,
.dialog {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 40rem;
  height: 28rem;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 0.5rem;
  box-shadow: 0 0 5px #555;
  background-color: #fff;
}
.shadow header {
  height: 5rem;
  padding-left: 3rem;
  padding-right: 3rem;
  line-height: 5rem;
  border-radius: 0.5rem;
  background-color: #f7f7f7;
}
.shadow header span:nth-of-type(1) {
  font-weight: 700;
}

.shadow label {
  display: block;
  margin-left: 3rem;
  margin-bottom: 2rem;
}
.shadow label:nth-of-type(2) {
  margin-left: 5.7rem;
}
.shadow label input {
  margin-left: 1rem;
}
.shadow .btn-box {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 6rem;
  text-align: center;
  line-height: 6rem;
}


.addb {
  width: 80px;
  height: 20px;
  border: 1px solid white;
}
</style>
