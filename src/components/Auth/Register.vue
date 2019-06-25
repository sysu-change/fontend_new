<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="regist-box">
      <span class="headder">请填写基本信息</span>

      <el-form-item label="学号" prop="number" style="width:50%">
        <el-input v-model="ruleForm.number"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name" style="width:50%">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="年龄/年级" required>
        <el-col :span="10">
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
        <el-col class="line" :span="5"></el-col>
        <el-col :span="10">
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
        <el-radio-group v-model="ruleForm.sex">
          <el-radio border label="男" class="sex1"></el-radio>
          <el-radio border label="女" class="sex2"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="专业" prop="major">
        <el-input v-model="ruleForm.major" placeholder="请输入专业"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="常用邮箱" prop="email">
        <el-col :span="11">
        <el-input v-model="ruleForm.email"></el-input></el-col>
          <el-col :span="8">
        <el-button @click="authority" :disabled="haveSend" type="success">{{codeInfo}}</el-button></el-col>
      </el-form-item>
      <el-form-item label="验证码" prop="code" style="width:50%">
        <el-input v-model="ruleForm.code" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="常用手机号" prop="phone_num">
        <el-input v-model="ruleForm.phone_num" autocomplete="off"></el-input>
      </el-form-item>
      

      <el-form-item>
        <el-button class="regist-button" type="success" @click="submitForm('ruleForm')">注册</el-button>
        
      </el-form-item>
      <el-link class="link" type="success" @click="onLogin">已有账号？立即登录！</el-link>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      setTimeout(() => {
        var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (!reg.test(this.ruleForm.phone_num)) {
          callback(new Error("请输入正确格式"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      ruleForm: {
        number: "",
        name: "",
        sex: "男",
        age: 20,
        semester: "",
        major: "",
        pass: "",
        checkPass: "",
        phone_num: "",
        code: "",
        email: ""
      },
      authCode: "",
      haveSend: false,
      codeInfo: "发送验证码",
      total: Number(60),
      rules: {
        number: [
          { required: true, message: "请输入8位学号", trigger: "change" },
          { min: 8, max: 8, message: "请输入8位学号", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "change" }],
        age: [{ required: true, message: "请输入年龄", trigger: "change" }],
        semester: [
          { required: true, message: "请选择年级", trigger: "change" }
        ],
        major: [{ required: true, message: "请输入专业", trigger: "change" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        phone_num: [
          { required: true, message: "请输入手机号", trigger: "change" },
          { validator: validatePass3 }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "请输入合法的邮箱",
            trigger: "blur"
          }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.authCode == this.ruleForm.code) this.updateRegister(this);
          else {
            this.$message({
              showClose: true,
              message: "验证码错误",
              type: "error"
            });
          }
        } else {
          this.$message({
            showClose: true,
            message: "表单验证未通过",
            type: "error"
          });
          return false;
        }
      });
    },
    countDown(vm) {
      vm.total = Number(60);
      let clock = window.setInterval(() => {
        vm.total--;
        vm.codeInfo = vm.total + "s后重新发送";
        if (vm.total <= 0) window.clearInterval(clock);
      }, 1000);
    },
    authority() {
      if (this.checkEmail(this)) this.getCode(this);
      else {
        this.$message({
          showClose: true,
          message: "邮箱格式有误",
          type: "error"
        });
      }
    },
    getCode: function(vm) {
      vm.haveSend = true;
      vm.countDown(this);
      var axios = {
        method: "post",
        url: "http://localhost:8082/module/user/sent_verify",
        widthCredentials: false,
        data: { email: this.ruleForm.email }
      };
      vm.$message({
        showClose: true,
        message: "验证码已发送到你所填的邮箱当中，注意查收"
      });
      vm.$http(axios)
        .then(function(res) {
          if (res.status == 200) {
            if (res.data.code == 200) {
              vm.authCode = res.data.verify_code;
            } else {
              vm.$message({
                showClose: true,
                message: "操作失败",
                type: "error"
              });
            }
          } else {
            vm.$message({
              showClose: true,
              message: "网络异常",
              type: "error"
            });
          }
        })
        .catch(function(err) {
          vm.$message({
            showClose: true,
            message: "发生了一个异常",
            type: "error"
          });
          console.log(err);
        });
    },
    checkEmail: function(vm) {
      var reg = new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$");
      if (vm.ruleForm.email === "") {
        vm.$message({
          showClose: true,
          message: "邮箱格式有误",
          type: "error"
        });
        return false;
      } else return reg.test(vm.ruleForm.email);
    },
    updateRegister: function(vm) {
      var jsonData = {
        sid: this.ruleForm.number,
        name: this.ruleForm.name,
        age: parseInt(this.ruleForm.age),
        sex: parseInt(this.ruleForm.sex === "男" ? "0" : "1"),
        grade: parseInt(this.ruleForm.semester),
        major: this.ruleForm.major,
        phone_num: this.ruleForm.phone_num,
        password: String(
          require("crypto")
            .createHash("sha512")
            .update(this.ruleForm.pass)
            .digest("hex")
            .toUpperCase()
        ),
        email: this.ruleForm.email
      };
      var axios = {
        method: "post",
        url: "http://localhost:8082/module/register",
        widthCredentials: false,
        data: jsonData
      };
      this.$http(axios)
        .then(function(res) {
          if (res.status == 200) {
            vm.$message({
              showClose: true,
              message: res.data.msg,
              type: "success"
            });
            if (res.data.msg == "successful") {
              vm.$router.push("/Signin");
            }
          } else {
            vm.$message({
              showClose: true,
              message: "操作失败",
              type: "error"
            });
          }
        })
        .catch(function(err) {
          vm.$message({
            showClose: true,
            message: "发生了一个异常",
            type: "error"
          });
          console.log(err);
        });
    },
    onLogin() {
      this.$router.push("/Signin");
    }
  },
  watch: {
    total: function() {
      if (this.total == 0) {
        this.haveSend = false;
        this.codeInfo = "重新发送";
        this.total = Number(60);
      }
    }
  }
};
</script>
<style scoped>
.regist-box {
  margin: 5px auto;
  width: 500px;
  padding: 0px 50px 20px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
  overflow: hidden;
}
.regist-button {
  position: relative;
  background-color: #ffffff;
  border: 1.5px solid #00b38a;
  color: #00b38a;
  left: -15px;
  width: 60%;
}
.link {
  position: relative;
  left: 20px;
}
.sex1 {
  position: relative;
  left: -110px;
}
.sex2 {
  position: relative;
  left: -110px;
}
.headder {
  color: #85ce61;
  text-align: center;
}
div {
  height: 30%;
  background-color: #fff;
}
</style>