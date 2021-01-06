<template>
  <div>
    <el-button type="primary" @click="goTo('/backTopOne')">去往页面1</el-button>
    <el-button type="primary" @click="goTo('/backTopTwo')">去往页面2</el-button>
    <el-button type="primary" @click="goTo('/login')">去往登录页</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  methods: {
    goTo(path) {
      this.$router.push(path);
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
