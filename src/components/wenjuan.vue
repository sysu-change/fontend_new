<template></template>

<script>
export default {
  name: "wenjuan",
  data() {
    return {
      ID: ""
    };
  },
  methods: {
    getWenjuan(vm) {
      var URL = "http://localhost:8082/module/user/wenjuan/" + this.ID;
      var axios = { method: "get", url: URL, widthCredentials: false };
      this.$http(axios)
        .then(function(res) {
          if (res.status == 200) {
            if (res.data.code == 200) {
              if (ID != res.data.ID) {
                vm.$message({
                  showClose: true,
                  message: "服务器问卷返回出错",
                  type: "error"
                });
                return;
              }
              var data = res.data.content;
              var jsonData = JSON.parse(data);
              var number = jsonData.length;
              for (var i = 0; i < number; i++) {
                var choice;
              }
            }
          }
        })
        .catch(function(err) {});
    }
  },
  mounted() {
    this.ID = this.$route.params.ID;
    this.getWenjuan(this);
  }
};
</script>

<style scoped>
</style>
