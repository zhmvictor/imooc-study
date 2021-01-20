import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// 导航守卫
router.beforeEach((to, from, next) => {
  console.log('store.state: ', store.state);
  if (store.state.userInfo || to.path === '/login') {
    next();
  } else {
    next({
      path: '/login',
    });
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
