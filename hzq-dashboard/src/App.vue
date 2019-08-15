<template>
  <div id="hzq-dashboard">
    <!-- <h1>app</h1> -->
    <!-- <router-link to="/app1">App1</router-link> |
      <router-link to="/app2">App2</router-link> |
      <router-link to="/system">System</router-link> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'HzqDashboard'
}
</script>

<style>
#hzq-dashboard {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
