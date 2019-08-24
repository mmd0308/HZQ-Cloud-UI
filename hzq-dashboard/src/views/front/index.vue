<template>
  <div>
    <h1> 前台展示入口 </h1>
    <el-button type="primary" @click="toAdmin">后端管理系统</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    toAdmin() {
      this.$router.push('/admin')
    }
  }
}
</script>

