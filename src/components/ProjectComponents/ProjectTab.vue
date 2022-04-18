<template>
  <ul class="project-tabs">
    <li v-for="item in tabsData" :key="item.index" :class="item.isActive ? 'active' : ''" @click="tabClick(item)">{{ item.name }}</li>
  </ul>
</template>

<script>
export default {
  props: {
    tabsData: {
      type: Array,
      default: () => []
    } // tab数据
  },
  methods: {
    // tab切换
    tabClick(item) {
      if (!item.isActive) this.$emit('tabChange', item)
    }
  }
}
</script>
