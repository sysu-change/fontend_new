<template>
    <div class="layout">
        <div class="title">闲钱包 | 专注中大学生赚点钱</div>
        <div class="linker">
            <nav>
                <el-dropdown>
                <span class="el-dropdown-link">
                    {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-on:click.native="accountMoney">账户充值</el-dropdown-item>
                    <el-dropdown-item v-on:click.native="accessAccount">资料编辑</el-dropdown-item>
                    <el-dropdown-item v-on:click.native="accountGet">账户提现</el-dropdown-item>
                    <el-dropdown-item v-on:click.native="signout">注销</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown> | <router-link  to="/Getjob">{{message1}}</router-link> | 
                <router-link to="/Putjob">{{message2}}</router-link> | 
                <router-link  to="/Signout">{{message3}}</router-link>
            </nav>
        </div>
        <router-view > </router-view>
    </div>
</template>


<script>
export default {
name:'User',
data() {
    return {
        username:"唐先生",
        activeIndex:'1',
        activeIndex1:"1",
        message1:"兼职任务",
        message2:"发布任务",
        message3:"注销"
    }
},
methods:{
    accountMoney:function() {
        alert("充值");
        this.$router.push({path:'/Recharge'});
    },
    accountGet:function() {
        alert("提现");
        this.$router.push({path:'/Withdraw'});
    },
    accessAccount:function() {
        alert("编辑");
        this.$router.push({path:'/AccessAccount'});
    },
    signout:function() {
        alert("登出");
        this.$router.push({path:'/Signout'});
    }

}


}
</script>

<style scoped>
.layout{
    color:white;
}
.title{
    width:50%;
    text-align: left;
    background-color:black;
    float: left;
    height: 30px;
    padding-top:2px;
}
.linker{
    width:50%;
    text-align: right;
    color:white;
    background-color: black;
    float:right;
    height: 30px;
    padding-top:2px;
}
.el-menu-demo{
    background-color: black;
}
.spanblock{
   display: inline;
}
.el-dropdown-link {
    cursor: pointer;
    color:white;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>

