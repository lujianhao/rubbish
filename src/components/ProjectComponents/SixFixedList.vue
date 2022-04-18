<template>
  <ul class="list-box">
    <li class="list-item" :class="item.isClick ? 'click' : ''" v-for="item in listData" :key="item.id" @click="listClick(item)">{{ item.title }}</li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      listData: [
        { id: 1, title: '公司月统计', isClick: true },
        { id: 2, title: '分厂月统计', isClick: false },
        { id: 3, title: '车间月统计', isClick: false },
        { id: 4, title: '公司周统计', isClick: false },
        { id: 5, title: '分厂周统计', isClick: false },
        { id: 6, title: '车间周统计', isClick: false }
      ]
    }
  },
  methods: {
    listClick(item) {
      if (!item.isClick) {
        this.listData.forEach((itm, idx) => {
          itm.isClick = item.id === (idx + 1)
        })
        this.$emit('listClick', item)
      }
    }
  }
}
</script>

<style scoped lang="less">
  .list-box{
    .list-item{
      line-height: 40px;
      padding: 0 10px;
      border-bottom: 1px solid #f0f0f0;
      font-size: 16px;
      cursor: pointer;
      &.click{
        background-color: #2C8CF2;
        color: #fff;
      }
    }
  }
</style>
