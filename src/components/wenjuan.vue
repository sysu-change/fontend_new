<template>
    
</template>

<script>
export default {
    name:"wenjuan",
    data() {
        return {

        }
    },
    methods:{

    },
    mounted() {
        
        var ID=this.$route.params.ID;
        var URL="http://localhost:8082/module/user/wenjuan/"+ID;
		var axios={method:"get",url:URL,widthCredentials:false};
        this.$http(axios).then(function(res){
			if(res.status==200) {
				if(res.data.code==200) {
          if(ID!=res.data.ID) {
            alert("服务器问卷返回出错");
            return;
          }
					var data=res.data.content;
					var jsonData=JSON.parse(data);
          var number=jsonData.length;
          for(var i=0;i<number;i++) {
            var choice
          }
				}
			}
		}).catch(function(err){
			
		});
    }
}
</script>

<style scoped>

</style>
