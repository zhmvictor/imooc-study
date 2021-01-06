<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
      <el-form-item prop="username">
        <el-input 
          v-model="ruleForm.username"
          placeholder="请输入用户名"
          prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="ruleForm.password"
          placeholder="请输入密码"
          show-password 
          prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AccountLogin',
  props: {
    ruleForm: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {};
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('submit');
        } else {
          this.$emit('errorHandle');
        }
      });
    }
  }
}
</script>

<style>

</style>