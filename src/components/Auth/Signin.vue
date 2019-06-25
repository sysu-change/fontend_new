<template>
  <el-container>
    <div class="back">
      <div id="name" class="name">
        <span class="item1">闲钱宝|</span>
        <span class="item2">
          <sub>专注中大学生赚点钱</sub>
        </span>
      </div>

      <div class="info">
        <el-row>
          <el-col :span="6">
            <i class="el-icon-location"></i>
            <br>
            <span class="item3">坐标中大</span>
          </el-col>
          <el-col :span="6">
            <i class="el-icon-s-comment"></i>
            <br>
            <span class="item3">活跃的社区</span>
          </el-col>
          <el-col :span="6">
            <i class="el-icon-s-order"></i>
            <br>
            <span class="item3">在线获取任务</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <i class="el-icon-user-solid"></i>
            <br>
            <span class="item3">可切换的角色</span>
          </el-col>
          <el-col :span="6">
            <i class="el-icon-time"></i>
            <br>
            <span class="item3">掌握你的闲余时间</span>
          </el-col>
        </el-row>
      </div>

      <div class="imgblock">
        <img class="img1" src="../../assets/icon1.png">
        <div>
          <el-form
            ref="loginForm"
            :model="form"
            status-icon
            :rules="rules"
            label-width="80px"
            class="login-box"
          >
            <el-form-item label="手机号" prop="phone_num">
              <el-input
                type="text"
                placeholder="请输入手机号"
                @input="checkThePhone"
                v-model="form.phone_num"
              />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
              <verify v-on:passedVerify="havePassed"></verify>
            </el-form-item>
            <el-form-item>
              <el-divider direction="vertical"></el-divider>
            </el-form-item>
            <el-form-item>
              <el-button
                class="submit"
                type="success"
                v-on:click="onSubmit('loginForm')"
                :disabled="!form.havepass"
              >登录</el-button>
            </el-form-item>

            <router-link to="/Register">
              <el-link class="link" type="success">还没有账号？立即注册！</el-link>
            </router-link>
          </el-form>

          <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="30%">
            <span>请输入正确信息</span>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
    </div>
  </el-container>
</template>



<script>
import verify from "./verify";
export default {
  components: { verify },
  data() {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      setTimeout(() => {
        var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (!reg.test(this.form.phone_num)) {
          callback(new Error("请输入正确格式"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      form: {
        phone_num: "",
        password: "",
        havepass: false
      },
      rules: {
        phone_num: [{ validator: validatePass, trigger: "blur" }],
        password: [{ required: true, message: "密码不可为空", trigger: "blur" }]
      },
      // 对话框显示和隐藏
      dialogVisible: false
    };
  },
  methods: {
    onSubmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.SigninforUser(this);
        } else {
          this.dialogVisible = true;
          return false;
        }
      });
    },
    havePassed(pass) {
      this.form.havepass = pass;
    },
    SigninforUser: function(vm) {
      var jsonData = {
        phone_num: vm.form.phone_num,
        password: String(
          require("crypto")
            .createHash("sha512")
            .update(vm.form.password)
            .digest("hex")
            .toUpperCase()
        )
      };
      var axios = {
        method: "post",
        url: "http://localhost:8082/module/login",
        widthCredentials: false,
        data: jsonData
      };
      vm.$http(axios)
        .then(function(res) {
          if (res.status == 200) {
            if (res.data.code == 200) {
              vm.gotoUser();
            } else {
              vm.$router.go(0);
            }
          } else {
            vm.$message({
              showClose: true,
              message: "request failed",
              type: "error"
            });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    gotoUser: function() {
      this.$router.push("/User");
    }
  }
};
</script>

<style scoped>
.link {
  top: -10px;
  position: relative;
  left: 15px;
  top: -70px;
}

.login-box {
  position: relative;
  width: 90%;
  height: 70%;
  
  
  
}
.submit {
  position: relative;

  width: 200px;
  top: -60px;
  left: -25px;
}

.login-title {
  text-align: left;
  font: 1em sans-serif;
  color: #00b38a;
}
.login_button {
  position: absolute;
  left: 150px;
  width: 150px;
  height: 40px;
  top: 260px;
}
.cc {
  background-color: azure;
}

/* 布局容器 */

.back {
  position: absolute;
  background-color: #ffffff;
  border: 1.5px solid #00b38a;
  border-radius: 16px;
  color: #00b38a;
  width: 50%;
  height: 70%;
  margin-top: 5%;
  margin-left: 22%;
  margin-right: 20%;
  box-shadow: 5px 5px 20px #909090;
}
.el-container {
  padding: 0, 0, 0, 0;
  background-color: #00b38a;
  margin-bottom: 0px;
  width: 100%;
  height: 60vh;
  z-index: 1;
}

.backcolor {
  background-color: #ffffff;
  color: #ffffff;
  z-index: 1;
}
.name {
  position: relative;
  margin-top: 2%;
  margin-left: 1%;
  margin-bottom: 5%;
  float: left;
  width: 300px;
  height: 60px;
  clear: left, right;
}
.imgblock {
  position: relative;
  margin-top: 0%;
  margin-right: 5%;
  width: 40%;
  height: 40%;
  float: right;
  top: -53%;
}
/* 布局 */
.el-row {
  margin-left: 0%;
  margin-bottom: 5%;
}
.el-col {
  border-radius: 6px;
}
.info {
  position: relative;
  margin-top: 20%;
  width: 50%;
  margin-right: 3%;
}

/* 文字 */
.item1 {
  color: #00b38a;
  font-size: 300%;
  position: relative;
  margin-left: 4%;
  margin-top: 2%;
}
.item2 {
  color: #00b38a;
  font-size: 100%;
  position: relative;
  margin-top: 2%;
  margin-left: 0%;
}
.item3 {
  color: #00b38a;
  font-size: 80%;
  position: relative;
  margin: 2%;
  left: 0%;
}
.item4 {
  color: #8e868b;
  font-size: 80%;
  position: relative;
  left: 0%;
}
.item5 {
  color: #00b38a;
  font-size: 80%;
  position: relative;
  left: 0%;
}

/* 图片 */
.img1 {
  position: relative;
  width: 70%;
  height: 70%;
  left: 0%;
  top: 0%;
}

/* 图标 */
.el-icon-location {
  color: #00b38a;

  font-size: 300%;
}
.el-icon-s-comment {
  color: #00b38a;
  font-size: 300%;
}
.el-icon-s-order {
  color: #00b38a;
  font-size: 300%;
}
.el-icon-user-solid {
  color: #00b38a;
  font-size: 300%;
}
.el-icon-time {
  color: #00b38a;
  font-size: 300%;
}

.reg_button1 {
  position: relative;
  background-color: #ffffff;
  border: 1.5px solid #00b38a;
  color: #00b38a;
  left: 0%;
  border-radius: 4px;
  width: 60%;
  height: 40px;
}
</style>
