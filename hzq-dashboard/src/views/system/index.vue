<template>
  <div>
    <iframe
id="show"
            :src="url"
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
    console.log('-------' + this.url)
  }
}
</script>
