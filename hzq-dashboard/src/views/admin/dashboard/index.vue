<template>
  <div class="dashboard-container">
    <div> dashboard-111111 </div>
    <el-button type="primary" @click="toAdmin">后端管理系统</el-button>
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([])
  },

  method: {
    toAdmin() {
      alert('l')
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
