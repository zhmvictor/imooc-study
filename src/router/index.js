import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName: "index" */ '../views/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
  },
  {
    path: '/userCenter',
    name: 'userCenter',
    component: () => import(/* webpackChunkName: "userCenter" */ '../views/userCenter.vue'),
  },
  {
    path: '/course/:id',
    name: 'course',
    component: () => import(/* webpackChunkName: "course" */ '../views/course.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
