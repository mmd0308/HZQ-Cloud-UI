<template>
  <div>
    <iframe
      id="show"
      src="http://localhost:10600/swagger-ui.html"
      width="100%"
      height="900px"
      frameborder="0"
      name="showHere"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: '/system/user'
    }
  },
  created() {
    this.url = this.$route.fullPath.substr(6)
  }
}
</script>
