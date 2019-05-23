<template>
     <div>
      <div class="crhead"><button class="but" @click="Create">+新建问卷</button></div>
     <el-main>
        <el-table :data="tableData">
		  <el-table-column prop="ID" label="标号" sortable>
		  </el-table-column>
          <el-table-column prop="date" label="日期"  sortable width="140">
          </el-table-column>
          <el-table-column prop="type" label="任务类型" width="120">
          </el-table-column>
          <el-table-column prop="descript" label="任务描述">
          </el-table-column>
          <el-table-column prop="count" sortable  label="需求量">
          </el-table-column>
          <el-table-column prop="price" sortable label="赏金">
          </el-table-column>
          </el-table-column>
          <el-table-column prop="status" label="状态">
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="Edit(scope.row)" v-bind:disabled="scope.row.statuss">编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="Delete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="Check(scope.row)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button size="mini" type="info" @click="Statics(scope.row)">数据</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main> 
     </div>
</template>

<script>
export default {
    name:'Getjob',
    data() {
        return {tableData: [{
		  ID:'1234',
          date: '2016-05-02',
          type: '问卷调查',
          descript: '这是一份调查中大学生对食堂意见的问卷',
          count:400,
          price:'$2',
          status:"已发布",
          statuss:true
        }, {
		ID:'1235',
          date: '2016-05-04',
          type: '问卷调查',
          descript: '这是一份调查中大学生对课程安排意见的问卷',
          count:500,
          price:'$5',
          status:"审核中",
          statuss:true
        }, {
		  ID:'1236',
          date: '2016-05-01',
          type: '问卷调查',
          descript: '这是一份调查中大学生对闲钱宝使用体验的问卷',
          count:1000,
          price:'$3',
          status:"未发布",
          statuss:false
        }, {
		  ID:'1237',
          date: '2016-05-03',
          type: '问卷调查',
          descript: '这是一份针对中山大学学生睡眠情况的调查问卷',
          count:400,
          price:'$4',
          status:"未发布",
          statuss:false
        }],
		ID:[]
        }
    },
    methods:{
      /*跳转到问卷创建页面*/
      create:function() {
		this.$router.push("/User/Part/Create");
      },
      /*进入页面详情页，并进行编辑*/
    Edit:function(row) {
      var ID=row.ID;
      if(ID=="") {
			  alert("未找到问卷标号为空");
			  return;
		  }
		  this.$router.push({path:"/User/Part/"})
		  
      },
      /**查看问卷 */
      Check:function(row) {
        alert(row.ID);
      },
      /**查看已回答问卷的统计数据 */
      Statics:function(row) {
        alert(row.ID);
      },
      Delete:function(row) {
        alert(row.ID);
      },
	  getQuestionnaire:function(nainiu) {
        if(this.user_id==="") return;
        var URL="http://localhost:8082/module/user/";
        URL+=nainiu?"questionnaire_own":"questionnaire_pre";
        var jsonData={user_id:this.user_id,number:5};
        var axios={method:"post",url:URL,widthCredentials:false,data:jsonData};
        this.$http(axios).then(function(res){
          if(res.status==200) {
            if(res.data.code==200) {
              var number=res.data.number;
              var content=res.data.content;
			  var jsonContent=content    //字符串转函数
              for(var i=0;i<number;i++) {
                this.tableData.push(jsonContent[i]);
              }
            }
            else {
              alert("服务器出错");
            }
          }
          else alert("网络出错");
        }).catch(function(err){
          console.log(err);
        });
      }
    }
}
</script>

<style scoped>
.but{
  width:10%;
  height: 30px;
  border:0px;
  color:white;
  font-size:20px;
  border-radius: 3px;
  background-color: #ee7141;
}
.crhead{
  margin-top: 3px;
}
</style>