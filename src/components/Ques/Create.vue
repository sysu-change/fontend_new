
<template>
  <div class="edit-container">
    <input
      type="text"
      name="qsTitle"
      v-model="titleValue"
      ref="titleInput"
      placeholder="问卷标题"
    >
    <div class="des">
      <h4>问卷描述</h4>
      <textarea v-model="description" placeholder="问卷描述"></textarea>
    </div> 
    <div class="content">
      <div class="questions" v-for="(qus, index) in qsItem">
        <div class="qs-left">
          <p class="qs-title">{{index+1}}. {{qus.question}}{{getMsg(qus.choice_type)}} <button class="addb"  @click="addmore(index)" v-if="qus.choice_type != 0">+添加选项</button></p>
          <p v-for="(option,index1) in qus.choice_item" class="option">
            <label>
              <input type="radio" :name="`${index}`" v-if="qus.choice_type === 1" >
              <input type="checkbox" :name="`${index}`" v-if="qus.choice_type === 2">
              <input class="qsitem" placeholder="选项内容" type="text" v-model="(qsItem[index]).choice_item[index1]">
            </label>
          </p>
          <p v-if="qus.choice_type === 0">
            <textarea></textarea>
          </p>
        </div>
        <div class="qs-right">
          <label>
            <input type="checkbox" :value="qus.must_edit" v-model="qus.must_edit">
            此题是否必填
          </label>
          <p>
            <span v-if="index !== 0" @click="goUp(index)">上移</span>
            <span v-if="index !== qsItem.length - 1" @click="goDown(index)">下移</span>
            <span @click="copy(index, qus)">复用</span>
            <span @click="del(index)">删除</span>
          </p>
        </div>
      </div>

      <div class="add">
        <transition name="slide">
          <div class="add-option" v-if="showBtn">
            <button @click="addRadio">单选</button>
            <button @click="addCheckbox">多选</button>
            <button @click="addTextarea">文本</button>
          </div>
        </transition>
        <div class="add-item" @click="addItemClick">
          <span class="add-icon">+</span>
          <span>添加问题</span>
        </div>
      </div>
    </div>

    <div class="shadow" v-if="showAddQsDialog">
      <div class="add-qs-dialog">
        <header>
          <span>提示</span>
          <span class="close-btn" @click="showAddQsDialog = false">X</span>
        </header>
        <p>{{info}}</p>
        <label>
          请输入问题:
          <input type="text" v-model="qsInputTitle">
        </label>
        <div class="btn-box">
          <button class="yes" @click="validateAddQs">确定</button>
          <button @click="showAddQsDialog = false">取消</button>
        </div>
      </div>
    </div>

    <div class="shadow" v-if="showDialog">
      <div class="dialog">
        <header>
          <span>提示</span>
          <span class="close-btn" @click="cancel">X</span>
        </header>
        <p>{{info}}</p>
        <div class="btn-box">
          <button class="yes" @click="jump">确定</button>
          <button @click="cancel">取消</button>
        </div>
      </div>
    </div>

    <footer>
      <div class="btn-box">
        <label>
          <span>问卷总数(份)<input type="text" v-model="quantity" placeholder="100"/></span><br/>
          <span>每份奖励(¥)<input type="text" v-model="reward" placeholder="1.0"/></span><br/>
        </label>
        <button class="save" @click="save">保存问卷</button>
        <button class="issue" @click="issueQs">发布问卷</button>
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
      showBtn: false,
      titleChange: false,
      titleValue: "",
      showAddQsDialog: false,
      qsInputTitle: "",
      qsInputOptions: [],
      info: "",
      addOptionType: 0,
      showDialog: false,
      description:"有偿问卷",
      putForward:0,
      quantity:"100",
      reward:"1.5"
    };
  },
  methods: {

    //依据相应的题目类型返回对应的文本
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

   

    //交换相邻的两个选项
    swapItems(oldIndex, newIndex) {
      let [newVal] = this.qsItem.splice(
        newIndex,
        1,
        this.qsItem[oldIndex]
      );
      this.qsItem.splice(oldIndex, 1, newVal);
    },

    //将某个指定的问题上移
    goUp(index) {
      this.swapItems(index, index - 1);
    },

    //将某个问题下移
    goDown(index) {
      this.swapItems(index, index + 1);
    },

    //复制某个指定的问题
    copy(index, qs) {
      if (this.questionLength === 10) return alert("问卷已满！");
      qs = Object.assign({}, qs);
      this.qsItem.splice(index, 0, qs);
    },

    //删除某个指定的问题
    del(index) {
      this.qsItem.splice(index, 1);
    },

    //显示Item
    addItemClick() {
      this.showBtn = !this.showBtn;
    },

    //显示添加域
    showAddDialog(msg, showOption) {
      this.showAddQsDialog = true;
      this.info = msg;               //info:用来提示其中创建问题所需的要的信息
      this.qsInputTitle = "";
    },

    //添加新的单选题
    addRadio() {
      if (this.questionLength === 10) return alert("问卷已满！");
      this.showAddDialog(
        '输入问题的名称',
        true
      );
      this.addOptionType = 1;
    },

    //添加新的多选题
    addCheckbox() {
      if (this.questionLength === 10) return alert("问卷已满！");
      this.showAddDialog(
        '输入问题的名称',
        true
      );
      this.addOptionType = 2;
    },

    //添加文本域
    addTextarea() {
      if (this.questionLength === 10) return alert("问卷已满！");
      this.showAddDialog("输入问题名称", false);
      this.addOptionType = 0;
    },

    //为指定的问题添加新的选项
    addmore(index) {
      (this.qsItem[index]).choice_item.push("");
      //(this.qsItem[index]).choiced.push(false);
    },
    
    //添加新的问题
    validateAddQs() {
      let qsTitle = this.qsInputTitle.trim();
      if (qsTitle === "") return alert("题目不能为空");
      if (true) {
        var neww={
          question: qsTitle,
          choice_type: this.addOptionType,
          must_edit: true,
          choice_item:[]
        };
        this.qsItem.push(neww);
        this.showAddQsDialog = false;
      }
    },

    //保存问卷
    save() {
      this.showDialog = true;
      this.info = "确认保存?";
      this.putForward=0;
    },

    //发布问卷
    issueQs() {
      this.showDialog = true;
      this.info = "确认发布?";
      this.putForward=1;
    },

    //取消
    cancel() {
      this.showDialog = false;
      this.putForward=0;
    },
    dateToString() {
      var date=new Date();
      var year=date.getFullYear();
      var month=date.getMonth()+1;
      var day=date.getDate();
      return ""+year+"-"+month+"-"+day;
    },
    //上传问卷
    uploadWenjuan(vm) {
        var dda=vm.dateToString();
        var wenjuan={type:1,title:vm.titleValue,description:vm.description,edit_status:vm.putForward,reward:parseFloat(vm.reward),
        quantity:parseInt(vm.quantity),pub_time:dda};
        wenjuan.content=vm.qsItem;
        var URL="http://localhost:8082/module/user/create_questionnaire";
        var axios={method:"post",url:URL,widthCredentials:false,data:wenjuan};
        vm.$http(axios).then(function(res){
          if(res.status==200) {
            if(res.data.code!=200) alert(res.data.msg);
            vm.showDialog = false;
            vm.$router.push({ path: "/User/Part/Putjob" });
          }
          else alert("网络错误");
        }).catch(function(err){
          console.log(err);
          alert("发生了一个异常");
        });
    },
    //检查问卷
    checkRight() {
      if(this.titleValue==="") {
        alert("标题不能为空");
        return false;
      }
      else {
        if(this.putForward==1) {
          if(this.qsItem.length==0) {
            alert("问卷为空不能发布");
            return false;
          }
        }
      }
      if(parseInt(this.quantity).toString() == "NaN") {
        alert("问卷数量请输入整数数字");
        return false;
      }
      else if(parseInt(this.quantity)==0&&this.putForward==1) {
        alert("问卷数不能为0");
        return false;
      }
      if(parseFloat(this.reward).toString() == "NaN") {
        alert("问卷数量请输入数字");
        return false;
      }
      return true;
    },
    //上传问卷并跳转回发布页面
    jump() {
      if(this.checkRight()) this.uploadWenjuan(this);
    }

  },
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
  width: 60%;
  margin-bottom: 2px;
  font-size: 20px;
  text-align: center;
  border: 1px solid #ccc;
  background-color: #ffffff;
}


.content {
  padding: 3rem;
  border-top: 0.1rem dashed #ccc;
  border-bottom: 0.1rem solid #ccc;
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
.qsitem {
  margin: 1%;
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
  border: 0.1rem solid #a9a9a9;
  width: 60%;
  margin-left: 20%;
}


.add-option {
  width:100%;
  height: 3rem;
   margin-left: -10%;
  line-height: 3rem;
  text-align: center;
}

.add-option button{
    height: 25px;
    width: 50px;
    margin-left: 4rem;
    border: 0.1rem solid #a9a9a9;
    background-color: #ffffff;
    cursor: pointer;
}


.add-item {
  width:100%;
  height:1.5rem;
  
  background-color: #ffffff;
  cursor: pointer;
}
.add-item span {
    font-size: 15px;
}

.des textarea{
  width:60%;
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
    color: #00b38a;
    border: 0.1rem solid #00b38a;
    background-color:#ffffff;
}
footer .issue:hover {
    box-shadow: 0 0 0.5rem #00b38a;
}



.slide-enter-active,.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter-active {
  height: 4rem;
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
    width: 34rem;
    height: 22rem;
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
    margin-left: 2rem;
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
    color: #00b38a;
    background-color: #ffffff;
    border: 1px solid #00b38a;
}
.shadow .btn-box .yes:hover {
    box-shadow: 0 0 5px #00b38a;
}

.addb{
  width:80px;
  height:20px;
  border: 1px solid white;
}
</style>
