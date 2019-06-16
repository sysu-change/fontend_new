
<template>
  <div class="edit-container">
    <h2 class="h2" v-if="!titleChange">{{qsItem.title}}</h2>

    <input
      type="text"
      readonly="readonly"
      name="qsTitle"
      v-if="titleChange"
      v-model="titleValue"
      ref="titleInput"
    >
    <div class="des">
      <h4>问卷描述</h4>
      <textarea v-model="description" readonly="readonly"></textarea>
    </div>
    <div class="content">
      <div class="questions" v-for="(qus, index) in qsItem">
        <div class="qs-left">
          <p class="qs-title">{{index+1}}. {{qus.question}}{{getMsg(qus.choice_type)}}</p>
          <p v-for="(option,index1) in qus.choice_item" class="option">
            <label>
              <input type="radio" :name="`${index}`" v-if="qus.choice_type === 1">
              <input type="checkbox" :name="`${index}`" v-if="qus.choice_type === 2">
              <span>{{(qsItem[index]).choice_item[index1]}}</span><br/>
            </label>
          </p>
          <p v-if="qus.choice_type === 0">
            <textarea readonly="readonly"></textarea>
          </p>
        </div>
      </div>
    </div>
    <footer>
      <div class="btn-box">
        <label>
          <span>问卷总数(份):{{quantity}}</span><br/>
          <span>每份奖励(￥):{{reward}}</span><br/>
        </label>
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
      quantity: 100
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
      this.$router.push("/User/Part/Putjob");
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
    this.qid = this.$route.query.ID;
    this.getWenjuan(this);
  }
};
</script>
<style scoped>
.edit-container {
  width: 80%;
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


h2:hover {
  background-color: #fcf0e5;
}


input[name="qsTitle"] {
  height: 20px;
  width: 100%;
  margin-bottom: 2px;
  font-size: 20px;
  text-align: center;
  border: 1px solid #ccc;
  background-color: #ccc;
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
  border:solid 1px #CCCCCC;
  border-radius:5px;
}
.questions:hover {
    background-color: #fcf0e5;
}
.questions p {
    margin-top:2px;
    margin-bottom: 2px;
}
.questions textarea {
    width:100%;
    height: 60px;
    margin-left: 2px;
    border-radius: 5px;
}
.questions .qs-title {
    width:100%;
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
  width:50%;
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
.questions .qs-right p span{
    cursor: pointer;
}
.questions .qs-right p span:hover {
    color: orange;
}

.add {
  border: 0.2rem solid #cccccc;
}


.add-option {
  width:100%;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
}
.add-option:hover{
    box-shadow: 0 0 0.4rem #aaa;
}
.add-option button{
    height: 25px;
    width: 50px;
    margin-left: 4rem;
    border: 0.2rem solid #ccc;
    background-color: #eee;
    cursor: pointer;
}


.add-item {
  width:100%;
  height:1rem;
  line-height: 1rem;
  text-align: center;
  background-color: #eee;
  cursor: pointer;
}
.add-item span {
    font-size: 5px;
}

.des textarea{
  width:80%;
  border-radius: 5px;
}


footer {
  position: relative;
  height: 7.5rem;
  margin-top: 2px;
  line-height: 2rem;
}
footer .btn-box {
    width:100%;
}
footer .save,.issue {
    width: 15%;
    height: 2rem;
    line-height: 100%;
    color: #777;
    border: 0.1rem solid #aaa;
    border-radius: 0.2rem;
    background-color: #fff;
    cursor: pointer;
    padding-top:0.3rem;
    padding-bottom: 0.3rem;
}
footer .save:hover {
    box-shadow: 0 0 0.5rem #aaa;
}
footer .issue{
    margin-left: 4rem;
    color: #fff;
    border: 0.1rem solid orange;
    background-color: orange;
}
footer .issue:hover {
    box-shadow: 0 0 0.5rem orange;
}



.slide-enter-active,.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter-active {
  height: 8rem;
}
.slide-enter,.slide-leave-active {
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
  padding-top:0.3rem;
  padding-bottom: 0.3rem;
}
button:hover{
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
.shadow .add-qs-dialog,.dialog {
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
.shadow header{
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
.shadow header .close-btn {
    position: absolute;
    right: 3rem;
    color: #bbb;
    cursor: pointer;
}
.shadow header .close-btn:hover {
    color: orange;
}
.shadow .add-qs-dialog p,.dialog p {
    margin: 3rem 0 2rem 3rem;
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
.shadow .btn-box .yes {
    margin-right: 1rem;
    color: #fff;
    background-color: #ee7419;
    border: 1px solid orange;
}
.shadow .btn-box .yes:hover {
    box-shadow: 0 0 5px orange;
}

.addb{
  width:80px;
  height:20px;
  border: 1px solid white;
}
</style>
