<template>
  <div>
    <div v-for="(item, index) in datalist" :key="index">{{item}}</div>
  </div>
</template>

<script>
export default {
  name: 'BackTopOne',
  components: {},
  props: {},
  data() {
    return {
      datalist: [],
    };
  },
  methods: {
    initData() {
      for(let i = 0; i < 100; i++) {
        this.datalist.push(`这是回到顶部页面1-${i}`);
      }
    }
  },
  mounted() {
    this.initData();
  },
}
</script>

<style lang="scss" scoped>

</style>