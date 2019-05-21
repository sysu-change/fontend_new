<template>
  <div class="Withdraw-box" width="80%" height="80%">
    <span class="item1">闲钱宝|</span>
    <span class="item2">
      <sub>专注中大学生赚点钱</sub>
    </span>
    <br>
    <br>
    <span class="item3">
      <sub>账户提现</sub>
      <hr style="height:20px;border:none;border-top:1.5px solid #00b38a;width:60%">
    </span>

    <el-form
      ref="WithdrawForm"
      :model="WithdrawForm"
      status-icon
      :rules="rules"
      label-width="80px"
      class="login-box"
    >
      <el-form-item label="提现账户" prop="phone_num">
        <el-input
          class="input_phone"
          type="text"
          placeholder="请输入支付宝账户"
          @input="checkThePhone"
          v-model="WithdrawForm.phone_num"
        />
      </el-form-item>

      <el-form-item label="用户密码" prop="password">
        <el-input
          class="input_password"
          type="password"
          placeholder="请输入密码"
          v-model="WithdrawForm.password"
        />
      </el-form-item>

      <el-form-item label="提现金额" prop="number">
        <el-radio-group v-model="WithdrawForm.number" size="medium">
          <div class="numlayout">
            <el-row :gutter="80">
              <el-col :span="6">
                <el-radio border label="5" class="num1"></el-radio>
              </el-col>
              <el-col :span="6">
                <el-radio border label="10" class="num2"></el-radio>
              </el-col>
              <el-col :span="6">
                <el-radio border label="20" class="num3"></el-radio>
              </el-col>
            </el-row>
            <el-row :gutter="80">
              <el-col :span="6">
                <el-radio border label="50" class="num4"></el-radio>
              </el-col>
              <el-col :span="6">
                <el-radio border label="100" class="num5"></el-radio>
              </el-col>
            </el-row>
          </div>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button class="submit" type="success" v-on:click="onSubmit('WithdrawForm')">立即充值</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>



<script>
export default {
  name: "Withdraw",
  
  data() {
      var validatePass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }
        setTimeout(() => {
          var reg=/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
          if(!reg.test(this.WithdrawForm.phone_num)) {
            callback(new Error('请输入正确格式'));
          }else {
            callback();
          } 
        }, 1000);
      };
    return {
      WithdrawForm: {
        number: "",
        phone_num: "",
        password: ""
      },
      rules: {
        phone_num: [
          { validator: validatePass, trigger: 'blur' }
        ],
        password: [{ required: true, message: "密码不可为空", trigger: "blur" }]
      }
    };
  },

  methods: {
    onSubmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.RechargeforUser(this);
        } else {
          this.dialogVisible = true;
          return false;
        }
      });
    },

    RechargeforUser: function(vm) {
      var jsonData = {
        user_phone: this.WithdrawForm.phone_num,
        money: this.WithdrawForm.money,
        password: this.WithdrawForm.password
      };
      var axios = {
        method: "post",
        url: "http://localhost:8082/user/withdraw",
        widthCredentials: false,
        data: jsonData
      };
      this.$http(axios)
        .then(function(res) {
          if (res.status == 200) {
            alert(res.data.msg);
            
          } else {
            alert("request failed");
            return false;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    
  }
};
</script>

<style scoped>
/* 文字 */
.item1 {
  color: #00b38a;
  font-size: 300%;
  position: relative;
}
.item2 {
  color: #00b38a;
  font-size: 100%;
  position: relative;
}
.item3 {
  color: #00b38a;
  font-size: 100%;
  position: relative;
}

.Withdraw-box {
  background-color: white;
  position: relative;
}
.input_phone {
  width: 60%;
  position: relative;
  left: -10%;
}
.input_password {
  width: 60%;
  position: relative;
  left: -10%;
}

/* 充值金额按钮 */
.el-row {
  margin-left: 15%;
left: -3%;
  margin-bottom: 5%;
}
.el-col {
  border-radius: 6px;
}
.numlayout {
  position: relative;
  left: 0%;
  bottom: -20%;
}

.submit {
  position: relative;
  left: -8.5%;
}
</style>

