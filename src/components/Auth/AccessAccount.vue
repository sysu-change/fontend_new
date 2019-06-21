<template>
  <div class="background">
    <br>
    <br>
    <br>
    <br>
    <el-row>
      <el-col :span="11">
        <h3 align="left">个人设置</h3>
      </el-col>
    </el-row>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="user-box">
      <div class="avatar">
        <img class="icon" src="/static/user.jpg">
      </div>

      <el-form-item label="姓名" prop="name" style="width:40%">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-tooltip class="item" effect="dark" content="学号作为凭证不能修改" placement="right-start">
        <el-form-item label="学号" prop="number" style="width:40%">
          <el-input v-model="ruleForm.number" disabled="true"></el-input>
        </el-form-item>
      </el-tooltip>

      <el-form-item label="年龄/年级">
        <el-col :span="5">
          <el-form-item prop="age">
            <el-select placeholder="选择年龄" v-model="ruleForm.age" style="width: 100%;">
              <el-option label="18" value="18"></el-option>
              <el-option label="19" value="19"></el-option>
              <el-option label="20" value="20"></el-option>
              <el-option label="21" value="21"></el-option>
              <el-option label="22" value="22"></el-option>
              <el-option label="23" value="23"></el-option>
              <el-option label="24" value="24"></el-option>
              <el-option label="25" value="25"></el-option>
              <el-option label="26" value="26"></el-option>
              <el-option label="27" value="27"></el-option>
              <el-option label="28" value="28"></el-option>
              <el-option label="29" value="29"></el-option>
              <el-option label="30" value="30"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="1">-</el-col>
        <el-col :span="5">
          <el-form-item prop="semester">
            <el-select placeholder="选择年级" v-model="ruleForm.semester" style="width: 100%;">
              <el-option label="大一" value="1"></el-option>
              <el-option label="大二" value="2"></el-option>
              <el-option label="大三" value="3"></el-option>
              <el-option label="大四" value="4"></el-option>
              <el-option label="研一" value="5"></el-option>
              <el-option label="研二" value="6"></el-option>
              <el-option label="研三" value="7"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-col :span="8">
          <el-radio-group v-model="ruleForm.sex" style="width:100%">
            <el-radio border label="男" class="sex1"></el-radio>
            <el-radio border label="女" class="sex2"></el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>

      <el-form-item label="专业" prop="major" style="width:60%">
        <el-input v-model="ruleForm.major"></el-input>
      </el-form-item>

      <el-tooltip class="item" effect="dark" content="手机号作为凭证不能修改" placement="right-start">
        <el-form-item label="常用手机号" prop="phone_num" style="width:60%">
          <el-input v-model="ruleForm.phone_num" disabled="true"></el-input>
        </el-form-item>
      </el-tooltip>

      <el-tooltip class="item" effect="dark" content="邮箱作为凭证不能修改" placement="right-start">
        <el-form-item label="常用邮箱" prop="email" style="width:60%">
          <el-input v-model="ruleForm.email" disabled="true"></el-input>
        </el-form-item>
      </el-tooltip>

      <el-form-item label="信誉积分" style="width:30% " class="cred_label">
        <el-col :span="10">
          <span class="credibility">{{ruleForm.Credibility}}</span>
        </el-col>
      </el-form-item>

      <el-form-item label="账户余额" style="width:30% " class="cash_label">
        <el-col :span="10">
          <span class="cash">{{ruleForm.coin}}¥</span>
        </el-col>
      </el-form-item>

      <el-form-item class="change" style="width:50%">
        <el-button @click="$router.go(-1)">返回</el-button>
        <el-button class="reg_button1" type="success" @click="submitForm('ruleForm')">保存资料</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AccessAccount",
  data() {
    return {
      ruleForm: {
        imageUrl: "",
        number: "16340211",
        name: "唐先生",
        sex: "男",
        age: 20,
        semester: 1,
        major: "软件工程",
        phone_num: "13684078313",
        coin: 0,
        email: "",
        Credibility: 100
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "change" }],
        age: [{ required: true, message: "请输入年龄", trigger: "change" }],
        semester: [
          { required: true, message: "请选择年级", trigger: "change" }
        ],
        major: [{ required: true, message: "请输入专业", trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updateUserInfo(this);
        }
      });
    },
    updateUserInfo(vm) {
      var jsonData = {
        name: vm.ruleForm.name,
        age: parseInt(vm.ruleForm.age),
        sex: 0,
        grade: parseInt(vm.ruleForm.semester),
        email: vm.ruleForm.email,
        major: vm.ruleForm.major
      };
      jsonData.sex = parseInt(vm.ruleForm.sex == "男" ? 0 : 1);
      var axios = {
        method: "put",
        url: "http://localhost:8082/module/user/userInfo",
        widthCredentials: false,
        data: jsonData
      };
      vm.$http(axios)
        .then(function(res) {
          if (res.status == 200) {
            if (res.data.code != 200) {
              vm.$message({
                showClose: true,
                message: res.data.msg,
                type: "error"
              });
            } else {
              vm.$message({
                showClose: true,
                message: "保存成功",
                type: "success"
              });
              vm.$router.go(-1);
            }
          }
        })
        .catch(function(err) {
          console.log(err);
          vm.$message({
            showClose: true,
            message: "An Err Happened",
            type: "error"
          });
        });
    },

    getUserinfo(vm) {
      var axios = {
        method: "get",
        url: "http://localhost:8082/module/user/userinfo",
        widthCredentials: false
      };
      vm.$http(axios)
        .then(function(res) {
          if (res.status == 200) {
            vm.ruleForm.number = res.data.sid;
            vm.ruleForm.coin = res.data.balance;
            vm.ruleForm.semester = String(res.data.grade);
            vm.ruleForm.name = res.data.name;
            vm.ruleForm.major = res.data.major;
            vm.ruleForm.age = res.data.age;
            vm.ruleForm.phone_num = res.data.phone_num;
            vm.ruleForm.sex = res.data.sex;
            vm.ruleForm.email = res.data.email;
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
            message: "An Err Happened",
            type: "error"
          });
        });
    }
  },
  mounted() {
    this.getUserinfo(this);
  }
};
</script>
<style scoped>
.background {
  position: relative;
  width: 500px;
  height: 600px;
  margin-left: 20%;
  margin-right: 20%;
  top: -10%;
}

.user-box {
  width: 150%;
  height: 100%;
  padding: 0px 50px 20px 35px;
  border: 2px;
  border-radius: 16px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}
.reg_button1 {
  position: relative;
  background-color: #ffffff;
  border: 1.5px solid #00b38a;
  color: #00b38a;
  left: 30%;
  top: 0px;
  border-radius: 4px;
  width: 150px;
  height: 40px;
}
.change {
  position: relative;
  top: -19%;
}
.link {
  position: relative;
  left: 20px;
}

.sex1 {
  position: relative;
  left: 0px;
}
.sex2 {
  position: relative;
  left: 0px;
}

.avatar {
  position: relative;
  width: 70px;
  height: 70px;
  left: 75%;
  top: 10%;
}

/*账户余额*/
.cash_label {
  position: relative;
  top: -30%;
  left: 70%;
}
.cash {
  font: 2em sans-serif;
}

.cred_label {
  position: relative;
  left: 70%;
  top: -35%;
}
.credibility {
  font: 2em sans-serif;
}
</style>

