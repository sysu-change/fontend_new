<template>
<div>
  <br/>
  <el-row >
    <el-col :span="11" style="left:10%">
    <h3 >投诉系统</h3>
    </el-col>
  </el-row>
  
<el-form ref="form" :model="form" label-width="100px" class="complain_box">
  <el-form-item label="投诉任务号" style="width:40%">
    <el-input v-model="form.ID"></el-input>
  </el-form-item>
  <el-form-item label="投诉人学号" style="width:40%">
    <el-input v-model="form.from_number"></el-input>
  </el-form-item>
  <el-form-item label="被投诉人学号">
   <el-input v-model="form.to_number"></el-input>
  </el-form-item>
  <el-form-item label="投诉原因" style="height:100px">
    <el-input type="textarea"  v-model="form.desc" style="height:100%"></el-input>
  </el-form-item>

<el-form-item >
  <el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  list-type="picture">
  <el-button size="small" class="subpict" type="success">上传图片</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
</el-form-item>

  <el-form-item>
    <el-button type="success" @click="submitForm('form')" class="submit">提交</el-button>
    <el-button  @click="back()">返回</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          ID:"",
          from_number:"",
          to_number:'',
          desc:"",
        fileList: ''
        }
      }
    },
    methods: {
      onSubmit() {
         this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit");
          this.updateComplain();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      },

      back(){
          
          this.$router.push("/User/Part/myDoneTask");
      },

      //提交投诉
      updateComplain(){

      }
    }
  }
</script>

<style scope>
  .complain_box{
    position: relative;
    border: 1.5px solid #eee;
    left: 20%;
    width:50%;
    height: 50%;
    padding: 10px 50px 20px 35px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
  .upload-demo{
    position: relative;
    left: -40%;
  }
  .subpict{
     background-color: #ffffff;
  border: 1.5px solid #00b38a;
  color: #00b38a;
  }
  .submit{
    background-color: #ffffff;
  border: 1.5px solid #00b38a;
  color: #00b38a;
  }
</style>