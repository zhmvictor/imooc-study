# vuex-demo

## 启动项目

```
# Project setup
yarn install

# Compiles and hot-reloads for development
yarn serve

# Compiles and minifies for production
yarn build
```

## 笔记

### 1. 概念

> 官方概念

- Vuex 是一个专为 VUe.js 应用程序开发的**状态管理模式**。
- 采用**集中式存储**管理应用的所有组件的状态。
- 并以相应的规则保证状态以一种**可预测**的方式发生变化。

> 总结

- 只能用于 Vue 项目，管理前端的状态。
- 类似于把所有状态放在全局对象里统一管理。
- 响应式的状态变化。

**Vuex 是一个类似于全局对象，存储了所有组件里的状态，并且是响应式的数据状态。**

---


### 2. 应用场景

1. 多个视图依赖于同一状态：多组件之间数据状态共享。
2. 来自不同视图的行为需要改变同一状态：不同组件页面的不同操作，可以操作同一个数据状态。

Vuex 的最大应用场景就是**多组件间的数据状态共享**。这里，共享包括读和写。

Vuex 更适用于中、大型项目或者特别复杂的单页面应用程序。

---

### 3. Vuex 核心

> Vuex 的组成

- State -- 数据仓库
    - 庞大的JSON对象，存储所有状态数据
- getter -- 用来获取数据
- Mutation -- 用来修改数据
    - 同步的
    - 本质是一个 function
- Action -- 用来提交mutation

> 安装及使用 Vuex

- [Vuex官网](https://vuex.vuejs.org/zh/)



