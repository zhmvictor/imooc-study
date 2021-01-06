<template>
  <div class="pages-content-scroll">
    <!-- 
      全局回到顶部组件：
        使用置顶的两个条件：
          1.页面内容必须超过屏幕高度
          2.所有的内容必须包在一个外层容器里，且容器的高度撑满整个屏幕
     -->
    <el-backtop target=".pages-content-scroll"></el-backtop>
    <!-- 插槽 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
}
</script>

<style lang="scss" scoped>
.pages-content-scroll {
  // 必须撑满整个屏幕
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-x: hidden;
}
</style>