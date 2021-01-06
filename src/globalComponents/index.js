import Vue from 'vue'
import BackTop from '../components/backTop/BackTop.vue'
import AccountLogin from '../components/accountLogin/AccountLogin.vue'
import PhoneLogin from '../components/phoneLogin/PhoneLogin.vue';

const globalComponents = [
  BackTop,
  AccountLogin,
  PhoneLogin,
];

globalComponents.forEach(comp => {
  // 注册全局组件
  Vue.component(comp.name, comp);
});