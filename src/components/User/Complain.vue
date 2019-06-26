<template>
  <div>
    <br>
    <el-row>
      <el-col :span="11" style="left:10%">
        <h3>投诉系统</h3>
      </el-col>
    </el-row>

    <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="complain_box">
      <el-form-item label="投诉任务号" style="width:100%">
        <el-input disabled v-model="form.tid"></el-input>
      </el-form-item>

      <el-form-item label="投诉人学号" style="width:100%">
        <el-input disabled v-model="form.sid1"></el-input>
      </el-form-item>
      <el-form-item label="被投诉人学号" style="width:100%">
        <el-input disabled v-model="form.sid2"></el-input>
      </el-form-item>
      <el-form-item label="投诉原因" prop="reason" style="height:100px">
        <el-input type="textarea" v-model="form.reason" style="height:100%"></el-input>
      </el-form-item>

      <el-form-item label="截图">
        <el-upload
          :action="uploadUrl()"
          :data="data"
          ref="upload"
          :http-request="imgRequest"
          list-type="picture-card"
          :limit="1"
          :on-exceed="handleExceed"
          :on-change="getFile"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :before-upload="beforeUpload"
          :auto-upload="false"
        >
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不能超过1m</div>
        </el-upload>
        <el-button
          style="margin-left: 10px;"
          size="small"
          type="success"
          @click="submitUpload"
        >上传图片</el-button>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="submitForm('form')" class="submit">提交</el-button>
        <el-button @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      uploadImg: false,
      form: {
        tid: 0,
        sid1: "",
        sid2: "",
        reason: ""
      },
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      rules: {
        reason: [{ required: true, message: "必填", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            showClose: true,
            message: "提交投诉申请中",
            type: "success"
          });
          this.updateComplain(this);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //投诉
    updateComplain: function(vm) {
      if (this.uploadImg == false) {
        this.$message({
          showClose: true,
          message: "未上传图片",
          type: "warning"
        });
        return;
      }
      var jsonData = this.form;
      var axios = {
        method: "post",
        url: "http://localhost:8082/module/user/complaint",
        widthCredentials: false,
        data: jsonData
      };
      this.$http(axios)
        .then(function(res) {
          if (res.status == 200) {
            if (res.data.msg == "successful") {
              vm.$message({
                showClose: true,
                message: "投诉成功",
                type: "success"
              });
              vm.back();
            } else {
              vm.$message({
                showClose: true,
                message: res.data.msg,
                type: "error"
              });
            }
          } else {
            vm.$message({
              showClose: true,
              message: "failed",
              type: "error"
            });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    //图片处理
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    handleExceed(files, fileList) {
      this.$message.warning("最多上传 1 个文件");
    },
    //上传图片
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    },

    getFile(file) {
      const isIMAGE =
        file.raw.type === "image/jpeg" || file.raw.type === "image/png";
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isIMAGE) {
        this.$message.error("只能上传jpg/png图片!");
        return false;
      }
      if (!isLt1M) {
        this.$message.error("上传文件大小不能超过 1MB!");
        return false;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function(e) {
        console.log(this.result); //图片的base64数据
      };
    },

    uploadUrl: function() {
      return "http://localhost:8082/module/picture/upload";
    },

    submitUpload() {
      this.$refs.upload.submit();
    },
    imgRequest(options) {
      let file = options.file;
      let filename = file.name;
      if (file) {
        this.fileReader.readAsDataURL(file);
      }
      this.fileReader.onload = () => {
        this.updateImg(this);
      };
    },
    updateImg(vm) {
      let base64Str = this.fileReader.result;
      var axios = {
        method: "post",
        url: "http://localhost:8082/module/picture/upload",
        widthCredentials: false,
        // file: file,
        data: {
          tid: this.form.tid,
          sid1: this.form.sid1,
          sid2: this.form.sid2,
          photo: base64Str.split(",")[1]
        }
      };
      this.$http(axios)
        .then(function(res) {
          if (res.status == 200) {
            if (res.data.msg == "successful") {
              vm.$message({
                showClose: true,
                message: "上传成功",
                type: "success"
              });
              vm.uploadImg = true;
            } else {
              vm.$message({
                showClose: true,
                message: res.data.msg,
                type: "error"
              });
            }
          } else {
            vm.$message({
              showClose: true,
              message: "failed",
              type: "error"
            });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //返回
    back() {
      this.$router.push("/User/Part/myDoneTask");
    }
  },
  mounted() {
    if (!window.FileReader) {
      console.error("Your browser does not support FileReader API!");
    }
    this.fileReader = new FileReader();
  },
  created() {
    this.form.tid = parseInt(this.$route.params.id);
    this.form.sid2 = this.$route.params.publisher;
    this.form.sid1 = sessionStorage.getItem("user");
  }
};
</script>

<style scope>
.complain_box {
  position: relative;
  border: 1.5px solid #eee;
  left: 20%;
  width: 50%;
  height: 50%;
  padding: 10px 50px 20px 35px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.upload-demo {
  position: relative;
  left: -40%;
}
.subpict {
  background-color: #ffffff;
  border: 1.5px solid #00b38a;
  color: #00b38a;
}
.submit {
  background-color: #ffffff;
  border: 1.5px solid #00b38a;
  color: #00b38a;
}
</style>