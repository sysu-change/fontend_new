<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="user-box">
    
  <span>欢迎回来，{{username}}！</span>

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
    <el-form-item label="学号" prop="number" style="width:50%">
      <el-input  v-model="ruleForm.number" disabled="true"></el-input>
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
        <el-form-item label="常用邮箱" prop="mail" style="width:60%">
        <el-input v-model="ruleForm.mail"  disabled="true" ></el-input>
        </el-form-item>
      </el-tooltip>

      <el-form-item label="账户余额"   style="width:30% " class="cash_label">
        <span class="cash" >¥60</span>
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
        number: "1634xxxx",
        name: "唐先生",
        sex: "男",
        age: 20,
        semester: "大三",
        major: "软件工程",
        mail:"3478805208@qq.com",
        phone_num: "13684078313",
        coin:"60¥"
        
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
          alert("更改成功");
          this.updateRegister();
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
    } 
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
</style>

