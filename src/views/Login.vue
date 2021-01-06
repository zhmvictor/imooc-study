<template>
  <div class="login">
    <h1>普通登录组件</h1>
    <account-login class="account"
      :ruleForm="ruleForm"
      :rules="rules"
      @submit="submit"
      @errorHandle="errorHandle"
    ></account-login>
    <h1>短信验证码登录组件</h1>
    <phone-login class="phone"
      :ruleForm="phoneForm"
      @send="send"
      @submit="submit"
      @errorHandle="errorHandle"
    ></phone-login>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {},
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          {required: true, message: '用户名不能为空', trigger: 'blur'},
          {min: 2, max: 6, message: '用户名在2-6个字符之间', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {min: 6, max: 15, message: '密码在6-15个字符之间', trigger: 'blur'}
        ],
      },
      phoneForm: {
        phone: '',
        code: '',
      },
    };
  },
  methods: {
    submit() {
      this.$message.success('提交成功');
    },
    errorHandle() {
      this.$message.error('表单填写有误，请检查');
    },
    send() {
      // 调API发送验证码逻辑
      this.$message.info('发送验证码成功');
    },
  },
  mounted() {
  },
}
</script>

<style lang="scss" scoped>
.login {
  margin-top: 30px;
  margin-left: 30px;
}
.account {
  width: 500px;
}
.phone {
  width: 500px;
}
</style>