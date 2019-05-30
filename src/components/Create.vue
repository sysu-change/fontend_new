
<template>
  <div class="edit-container">
    <h2 class="h2" @click="titleClick" v-if="!titleChange">{{qsItem.title}}</h2>

    <input
      type="text"
      name="qsTitle"
      v-if="titleChange"
      v-model="titleValue"
      @blur="onblur"
      @keyup.enter="onsubmit"
      ref="titleInput"
    >

    <div class="content">
      <div class="questions" v-for="(qus, index) in qsItem">
        <div class="qs-left">
          <p class="qs-title">{{qs.num}}&nbsp;{{qs.title}}&nbsp;{{getMsg(qs)}}</p>
          <p v-for="option in qs.options" class="option">
            <label>
              <input type="radio" :name="`${qs.num}-${qs.title}`" v-if="qs.type === 'radio'">
              <input type="checkbox" :name="`${qs.num}-${qs.title}`" v-if="qs.type === 'checkbox'">
              {{option}}
            </label>
          </p>
          <textarea v-if="qs.type === 'textarea'"></textarea>
        </div>
        <div class="qs-right">
          <label>
            <input type="checkbox" :value="qs.isNeed" v-model="qs.isNeed">
            此题是否必填
          </label>
          <p>
            <span v-if="index !== 0" @click="goUp(index)">上移</span>
            <span v-if="index !== qsItem.length - 1" @click="goDown(index)">下移</span>
            <span @click="copy(index, qs)">复用</span>
            <span @click="del(index)">删除</span>
          </p>
        </div>
      </div>
      <div class="add">
        <transition name="slide">
          <div class="add-option" v-if="showBtn">
            <button @click="addRadio">单选</button>
            <button @click="addCheckbox">多选</button>
            <button @click="addTextarea">文本框</button>
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
          输入题目标题
          <input type="text" v-model="qsInputTitle">
        </label>
        <label v-if="showAddOptionInput">
          输入选项
          <input type="text" v-model="qsInputOptions">
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
          <button class="yes" @click="iterator.next()">确定</button>
          <button @click="cancel">取消</button>
        </div>
      </div>
    </div>
    <footer>
      <span>问卷截止日期</span>
      <div class="btn-box">
        <button class="save" @click="iterator = save(); iterator.next()">保存问卷</button>
        <button class="issue" @click="iterator = issueQs(); iterator.next()">发布问卷</button>
      </div>
    </footer>
  </div>
</template>

<script>
//import storage from "../store/store.js";
/**
 * A module that define qs-edit view
 * @exports qs-edit
 * @author oyh(Reusjs)
 */
export default {
  name: "qsEdit",
  components: {},
  data() {
    return {
      qsItem: [],
      qsList: [],//storage.get(),
      isError: false,
      showBtn: false,
      titleChange: false,
      titleValue: "",
      showAddQsDialog: false,
      showAddOptionInput: true,
      qsInputTitle: "",
      qsInputOptions: [],
      info: "",
      selectTime: "",
      addOptionType: "",
      limit: {},
      showDialog: false,
      iterator: {},
      isGoIndex: false
    };
  },
  
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.limit = {
        minYear: new Date().getFullYear(),
        minMonth: new Date().getMonth() + 1,
        minDay: new Date().getDate(),
        maxYear: 2030,
        maxMonth: 3,
        maxDay: 20
      };
      if (this.$route.params.num == 0) {
        let item = {};
        item.num = this.qsList.length + 1;
        item.title = "这里是标题";
        item.time = "";
        item.state = "noissue";
        item.question = [];
        item.stateTitle = "未发布";
        item.checked = false;
        this.qsItem = item;
        this.qsList.push(this.qsItem);
      } else {
        let i = 0;
        for (let length = this.qsList.length; i < length; i++) {
          if (this.qsList[i].num == this.$route.params.num) {
            this.qsItem = this.qsList[i];
            break;
          }
        }
        if (i === this.qsList.length) this.isError = true;
      }
    },
    getMsg(item) {
      let msg = "";
      if (item.type === "radio") {
        msg = "(单选题)";
      } else if (item.type === "checkbox") {
        msg = "(多选题)";
      } else {
        msg = "(文本题)";
      }

      return item.isNeed ? `${msg} *` : msg;
    },
    onblur() {
      this.titleValue = this.titleValue.trim();
      this.qsItem.title =
        this.titleValue === "" ? this.qsItem.title : this.titleValue;
      this.titleChange = false;
    },
    onsubmit() {
      this.titleValue = this.titleValue.trim();
      this.qsItem.title =
        this.titleValue === "" ? this.qsItem.title : this.titleValue;
      this.titleChange = false;
    },
    titleClick() {
      this.titleChange = !this.titleChange;
      setTimeout(() => {
        this.$refs.titleInput.focus();
      }, 150);
    },
    swapItems(oldIndex, newIndex) {
      let [newVal] = this.qsItem.splice(
        newIndex,
        1,
        this.qsItem[oldIndex]
      );
      this.qsItem.splice(oldIndex, 1, newVal);
    },
    goUp(index) {
      this.swapItems(index, index - 1);
    },
    goDown(index) {
      this.swapItems(index, index + 1);
    },
    copy(index, qs) {
      if (this.questionLength === 10) return alert("问卷已满！");
      qs = Object.assign({}, qs);
      this.qsItem.splice(index, 0, qs);
    },
    del(index) {
      this.qsItem.splice(index, 1);
    },
    addItemClick() {
      if (this.showBtn === false) {
        this.questionLength === 10
          ? alert("问卷已满！")
          : (this.showBtn = !this.showBtn);
      } else {
        this.showBtn = !this.showBtn;
      }
    },
    showAddDialog(msg, showOption) {
      this.showAddQsDialog = true;
      this.showAddOptionInput = showOption;
      this.info = msg;
      this.qsInputTitle = "";
      this.qsInputOptions = "";
    },
    addRadio() {
      if (this.questionLength === 10) return alert("问卷已满！");
      this.showAddDialog(
        '分别在下面的输入框中输入问题的名称以及选项, 选项用半角逗号","分隔开',
        true
      );
      this.addOptionType = "radio";
    },
    addCheckbox() {
      if (this.questionLength === 10) return alert("问卷已满！");
      this.showAddDialog(
        '分别在下面的输入框中输入问题的名称以及选项, 选项用半角逗号","分隔开',
        true
      );
      this.addOptionType = "checkbox";
    },
    addTextarea() {
      if (this.questionLength === 10) return alert("问卷已满！");
      this.showAddDialog("在输入框中输入问题名称", false);
      this.addOptionType = "textarea";
    },
    validateAddQs() {
      let qsTitle = this.qsInputTitle.trim();
      if (qsTitle === "") return alert("题目不能为空");
      if (this.showAddOptionInput) {
        let qsOptions = this.qsInputOptions.trim();
        if (qsOptions === "") return alert("选项不能为空！");
        qsOptions = qsOptions.split(",");
        for (let i = 0, length = qsOptions.length; i < length; i++) {
          if (qsOptions[i].trim() === "") {
            return alert("存在某个选项内容为空");
          }
        }
        this.qsItem.push({
          num: this.qsItem.length - 1,
          title: qsTitle,
          type: this.addOptionType,
          isNeed: true,
          options: qsOptions
        });
        this.showAddQsDialog = false;
      } else {
        this.qsItem.push({
          num: this.qsItem.length - 1,
          title: qsTitle,
          type: "textarea",
          isNeed: true
        });
        this.showAddQsDialog = false;
      }
    },
    getValue(selectTime) {
      this.selectTime = selectTime;
      this.qsItem.time = this.selectTime;
    },
    *save() {
      this.showDialog = true;
      this.info = "确认保存?";
      yield;
      if (this.qsItem.length === 0) {
        this.showDialog = false;
        alert("问卷为空无法保存");
      } else {
        storage.save(this.qsList);
        this.info = "是否发布?";
        this.isGoIndex = true;
      }

      yield;
      this.qsItem.state = "inissue";
      this.qsItem.stateTitle = "发布中";
      storage.save(this.qsList);
      this.showDialog = false;
      this.$router.push({ path: "/" });
    },
    *issueQs() {
      this.showDialog = true;
      this.info = "确认发布?";
      yield;
      if (this.qsItem.length === 0) {
        this.showDialog = false;
        alert("问卷为空无法保存");
      } else {
        this.qsItem.state = "inissue";
        this.qsItem.stateTitle = "发布中";
        storage.save(this.qsList);
        this.showDialog = false;
        this.$router.push({ path: "/" });
      }
    },
    cancel() {
      this.showDialog = false;
      if (this.isGoIndex === true) {
        this.$router.push({ path: "/" });
      }
    }
  },
  computed: {
    questionLength() {
      return this.qsItem.length;
    }
  },
  watch: {
    $route: "fetchData",
    qsItem: {
      handler(newVal) {
        newVal.question.forEach((item, index) => {
          item.num = `Q${index + 1}`;
        });
      },
      deep: true
    }
  }
};
</script>
<style scoped>

.edit-container {
  width: 60rem;
  margin: 1rem auto;
  padding: 1rem;
  color: #666;
  background-color: #fff;
  border-radius: 0.4rem;
  box-shadow: 0 0 1rem #aaa;
}


h2 {
  height: 6rem;
  margin-bottom: 3rem;
  line-height: 6rem;
  text-align: center;
  font-size: 2rem;
  color: #555;
  cursor: pointer;
}


h2:hover {
  background-color: #fcf0e5;
}


input[name="qsTitle"] {
  height: 6rem;
  width: 100%;
  margin-bottom: 3rem;
  font-size: 2rem;
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
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
}
.questions:hover {
    background-color: #fcf0e5;
}
.questions p {
    margin-top:1.5rem;
    margin-bottom: 1.5rem;
}
.questions textarea {
    width: 35rem;
    height: 15rem;
    margin-left: 2.5rem;
}
.questions .qs-title {
    font-size: 1.6rem;
    font-weight: 700;
    color: #333;
}
.questions .option {
    margin-left: 2.5rem;
}
.questions .qs-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 20rem;
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
  border: 0.2rem solid #ccc;
}


.add-option {
  height: 8rem;
  line-height: 8rem;
  text-align: center;
}
.add-option:hover{
    box-shadow: 0 0 0.4rem #aaa;
}
.add-option button{
    height: 3rem;
    width: 8rem;
    margin-left: 4rem;
    border: 0.2rem solid #ccc;
    background-color: #eee;
    cursor: pointer;
}


.add-item {
  height: 8rem;
  line-height: 8rem;
  text-align: center;
  background-color: #eee;
  cursor: pointer;
}
.add-item span {
    font-size: 1.6rem;
}



footer {
  position: relative;
  height: 6rem;
  margin-top: 3rem;
  line-height: 6rem;
}
footer .btn-box {
    position: absolute;
    right: 2rem;
    display: inline-block;
}
footer .save,.issue {
    width: 10rem;
    height: 3rem;
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
</style>
