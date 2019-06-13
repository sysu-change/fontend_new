<template class="cc">
	
	<div>
    <el-form ref="loginForm" :model="form" status-icon :rules="rules" label-width="80px" class="login-box" >
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="手机号" prop="phone_num" >
        <el-input type="text" placeholder="请输入手机号" @input="checkThePhone"  v-model="form.phone_num"/>
        
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input type="text" placeholder="请输入验证码" v-model="form.code"/>
      </el-form-item>
        <el-form-item>
          <el-divider direction="vertical"></el-divider>
           
        </el-form-item>
      <el-form-item>
        <el-button class="submit" type="success" v-on:click="onSubmit('loginForm')">登录</el-button>
      </el-form-item>
       
       <router-link to='/Register'>
       <el-link class="link" type="success"  >还没有账号？立即注册！</el-link>
       </router-link>
       
    </el-form>

    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>请输入正确信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
	
</template>


<script>
export default{
	data() {
    var validatePass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }
        setTimeout(() => {
          var reg=/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
          if(!reg.test(this.form.phone_num)) {
            callback(new Error('请输入正确格式'));
          }else {
            callback();
          } 
        }, 1000);
      };
		return { 
			    form: {
          phone_num: '',
          password: '',
          code:''
        },
        rules: {
          phone_num: [
            
            {validator: validatePass, trigger: 'blur' }
          ],
          password: [
            {required: true, message: '密码不可为空', trigger: 'blur'}
          ],
          code:[
            { required: true, message: '验证码不可为空', trigger: 'blur'}
        ]
        },
        // 对话框显示和隐藏
        dialogVisible: false
		}
	},
	methods:{
    Sign:function() {
      alert(this.phone_num+" "+this.password+" "+this.code);
    },
    
    onSubmit(formName) {
        // 为表单绑定验证功能
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.SigninforUser(this);
          } else {
            this.dialogVisible = true;
            return false;
          }
        });
      },
    SigninforUser:function(vm){
      var jsonData={phone_num:vm.form.phone_num,password:String(require("crypto")
          .createHash("sha512")
          .update(vm.form.password)
          .digest("hex")
          .toUpperCase())};
      var axios={method: "post",url: "http://localhost:8082/module/login",widthCredentials: false,data:jsonData};
      vm.$http(axios).then(function(res){
        if(res.status==200) {
          if(res.data.code==200) {
            vm.gotoUser();
          }
          else alert(res.data.msg);
        }
        else {
          alert("request failed");
        }
      }).catch(function(err){
        console.log(err);
      });
    },
    gotoUser:function() {
      this.$router.push('/User');
    }
  }
}
</script>

<style scoped>
  
  .link{
    top: -10px;
     position: relative;
     left: 15px;
     top:-70px;
  }
  
  .login-box {
    border: 1px solid #DCDFE6;
    width: 400px;
    height:300px;
    margin: 60px auto;
    padding: 0px 35px 20px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }
  .submit{
    position: relative;
    
    width: 200px;
    top:-60px;
    left: -25px;
  }
  
 
.login-title {
    text-align: left;
    font: 1em sans-serif;
    color: #00b38a;
  }
.login_button{
  position: absolute;
  left: 150px;
  width: 150px;
  height: 40px;
  top: 260px;
}
.cc{
  background-color: azure;
}
</style>
