<template>
  <div id="app">
    <router-view ></router-view>
    <router-link to="/HelloWorld" tag="button" class="mainPage" router-link-active> 返回首页 </router-link>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html, body, #app {
  height: 90%;
}

.mainPage{
  color:#00B38A;
  margin: auto;
  border-radius: 6px,6px,6px,6px;
  border-style: solid;
  border-width: 2px;
  width:80px;
  border-color:#00B38A;
}
</style>
