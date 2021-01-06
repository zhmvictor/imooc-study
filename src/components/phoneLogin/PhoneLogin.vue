<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
      <el-form-item prop="phone">
        <el-input 
          v-model="ruleForm.phone"
          placeholder="请输入手机号"
          prefix-icon="el-icon-phone"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-row :gutter="20">
          <el-col :span="18">
            <el-input 
              v-model="ruleForm.code"
              placeholder="请输入验证码"
              prefix-icon="el-icon-tickets"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <el-button @click="sendCode" :disabled="disabled">{{btnText}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="phoneLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'PhoneLogin',
  props: {
    ruleForm: {
      type: Object,
      required: true,
    },
    // 倒计时时间
    countDown: {
      type: Number,
      default: 60,
    }
  },
  data() {
    let checkPhone = (rule, value, callback) => {
      if(!value) {
        return callback(new Error('手机号不能为空'));
      } else {
        let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if(reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入正确的手机号'));
        }
      }
    }
    return {
      rules: {
        phone: [
          {validator: checkPhone, trigger: 'blur'}
        ],
        code: [
          {required: true, message: '验证码不能为空', trigger: 'blur'}
        ],
      },
      disabled: false,
      btnText: '发送验证码',
      time: 0,
    };
  },
  methods: {
    sendCode() {
      // 1.手机号必须输入正确，如果不正确就提示
      this.$refs.ruleForm.validateField('phone', errorMessage => {
        if(errorMessage) {
          console.log(errorMessage);
          this.$message.error(errorMessage);
        } else {
          // 2.倒计时
          // 2.1时间开始倒数
          // 2.2按钮进入禁用状态
          // 2.3如果倒计时结束，按钮恢复可用状态，按钮文字变成重新发送，重置倒计时时间
          // 2.4倒计时过程中，按钮文字为：xx s后重新发送
          let timer = setInterval(() => {
            this.time--;
            this.btnText = `${this.time}s后重新发送`;
            this.disabled = true;
            if(this.time === 0) {
              this.disabled = false;
              this.btnText = '重新发送';
              this.time = this.countDown;
              clearInterval(timer);
            }
          }, 1000);
          this.$emit('send');
        }
      });
    },
    phoneLogin() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('submit');
        } else {
          this.$emit('errorHandle');
        }
      });
    }
  },
  mounted() {
    this.time = this.countDown;
  }
}
</script>

<style>

</style>