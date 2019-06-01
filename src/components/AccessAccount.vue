<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="user-box">
    

  <el-form-item>
    <el-upload
      class="avatar-uploader"
      list-type="picture-card"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </el-form-item>

  <el-form-item label="姓名" prop="name" style="width:50%" >
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>

  <el-tooltip class="item" effect="dark" content="学号作为凭证不能修改" placement="right-start">
    <el-form-item label="学号" prop="sid" style="width:50%">
      <el-input  v-model="ruleForm.sid" disabled="true"></el-input>
    </el-form-item>
  </el-tooltip>
    
       
    <el-form-item label="年龄/年级" >
      <el-col :span="10">
        <el-form-item prop="age">
          <el-select placeholder="选择年龄" v-model="ruleForm.age" style="width: 100%;">
            
            <el-option label="18" value=18></el-option>
            <el-option label="19" value=19></el-option>
            <el-option label="20" value=20></el-option>
            <el-option label="21" value=21></el-option>
            <el-option label="22" value=22></el-option>
            <el-option label="23" value=23></el-option>
            <el-option label="24" value=24></el-option>
            <el-option label="25" value=25></el-option>
            <el-option label="26" value=26></el-option>
            <el-option label="27" value=27></el-option>
            <el-option label="28" value=28></el-option>
            <el-option label="29" value=29></el-option>
            <el-option label="30" value=30></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="5"></el-col>
      <el-col :span="10">
        <el-form-item prop="grade">
          <el-select placeholder="选择年级" v-model="ruleForm.grade" style="width: 100%;">
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
         <el-radio  label="男" class="sex1"></el-radio>
         <el-radio  label="女" class="sex2"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="专业" prop="major"  style="width:60%">
       <el-input v-model="ruleForm.major" ></el-input>
      </el-form-item>

  
      <el-tooltip class="item" effect="dark" content="手机号作为凭证不能修改" placement="right-start">
        <el-form-item label="常用手机号" prop="phone_num" style="width:60%">
        <el-input v-model="ruleForm.phone_num"  disabled="true" ></el-input>
        </el-form-item>
      </el-tooltip>

<el-tooltip class="item" effect="dark" content="邮箱作为凭证不能修改" placement="right-start">
        <el-form-item label="常用邮箱" prop="email" style="width:60%">
        <el-input v-model="ruleForm.email"  disabled="true" ></el-input>
        </el-form-item>
      </el-tooltip>

      <el-form-item label="账户余额"   style="width:30% " class="cash_label">
        <span class="cash" >{{ruleForm.balance}}</span>
      </el-form-item>

<el-form-item label="信誉积分"   style="width:30% " class="cred_label">
        <span class="credibility" >{{ruleForm.Credibility}}</span>
      </el-form-item>

      <el-form-item  class="change" style="width:50%">
       <el-button class="reg_button1" type="success" @click="submitForm('ruleForm')">保存资料</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
export default {
  name:'AccessAccount',
  data() {
    
    return {
      ruleForm: {
        imageUrl: '',
        sid: "1634xxxx",
        name: "唐先生",
        sex: "男",
        age: 20,
        grade: "大三",
        major: "软件工程",
        email:"3478805208@qq.com",
        phone_num: "13684078313",
        balance:60+"¥",
        Credibility:"1000"
      },
       rules: {
        
        name: [{ required: true, message: "请输入姓名", trigger: "change" }],

        age: [{ required: true, message: "请输入年龄", trigger: "change" }],
        semester: [
          { required: true, message: "请选择年级", trigger: "change" }
        ],
        major: [{ required: true, message: "请输入专业", trigger: "change" }],
        
        
      }
    
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
           this.$message({
          message: '修改成功',
          type: 'success'
        });
          this.updateRegister(this);
        } else {
          console.log("更改失败");
          return false;
        }
      });
    },

    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },

    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }, 

    getUserInfo: function(vm) {
      if (this.user_id === "") return;
      var URL = "http://localhost:8082/module/user/userinfo";
      
      var axios = {
        method: "get",
        url: URL,
        widthCredentials: false,
      };
      this.$http(axios)
        .then(function(res) {
          if (res.status == 200) {
            alert(res.data.msg)
            if (res.data.code == 200) {
              vm.name = res.data.name;
              vm.sid = res.data.sid;
              vm.major=res.data.major;
              vm.semester=res.data.grade;
              vm.sex=res.data.sex;
              vm.phone_num=res.data.phone_num;
              vm.email=res.data.email;
              vm.Credibility=res.data.Credibility;
              vm.balance=res.data.balance+"¥";
            } else {
              alert("服务器出错");
            }
          } else alert("网络出错");
        })
        .catch(function(err) {
          console.log(err);
        });
    },
updateRegister:function(vm){
      var jsonData={
        name:this.ruleForm.name,
        age:this.ruleForm.age,
        sex:this.ruleForm.sex,
        grade:this.ruleForm.grade,
        email:this.ruleForm.email,
        phone_num:this.ruleForm.phone_num,
                    
      };
      var axios={method: "put",url: "http://localhost:8082/module/user/userInfo",widthCredentials: false,data:jsonData};
      this.$http(axios).then(function(res){
        if(res.status==200) {
          alert(res.data.msg)
          
          vm.gotoUser();
        }
        else {
          alert("request failed");
          return false;
        }
      }).catch(function(err){
        console.log(err);
      });
    },

  },

   mounted() {
      this.getUserInfo(this);
    }
    
};
</script>
<style scoped>
.user-box{
    margin-left: 25%;
    width: 500px;
    height: 800px;
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
  left: 50%;
  top:10px;
  border-radius: 4px;
  width: 150px;
  height: 40px;
}
.link {
  position: relative;
  left: 20px;
}

.sex1{
  position: relative;
  left:-110px;
}
.sex2{
  position: relative;
  left:-110px;
}

.avatar-uploader{
    position: relative;
    left: -40px;
}

/*账户余额*/
.cash_label{
   position: relative;
   top:10px;
   left:30%;   
}
.cash{
    font: 2em sans-serif;
}
.cred_label{
  position: relative;
  top:-65%;
   left:55%; 
}
.credibility{
  font: 2em sans-serif;
}
</style>

