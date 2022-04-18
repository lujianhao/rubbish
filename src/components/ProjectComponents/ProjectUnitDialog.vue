<template>
  <a-modal
      centered
      v-model="visible"
      title="单位选择"
      width="40%"
      destroyOnClose
      @ok="isOk"
      @cancel="dialogClose"
  >
    <div class="unit-box">
      <div class="unit-box-left">
        <a-tree
            show-line
            :checkable="unitSelectType !== 'single'"
            :tree-data="unitList"
            :replaceFields="{ title: 'name', key: 'newKey' }"
            @select="treeSelect"
            @check="treeCheck"
        />
      </div>
      <div class="unit-box-right">
        <div style="padding: 0 10px;font-size: 16px;border-bottom: 1px solid #f0f0f0;line-height: 40px;">当前已选择：</div>
        <ul class="unit-select-list">
          <li v-for="(item, index) in selectTreeData" :key="index">
            {{ unitType === 2 ? item.split('/')[0].split('-')[1] + '/' + item.split('/')[1].split('-')[1] : item.split('/')[0].split('-')[1] + '/' + item.split('/')[1].split('-')[1] + '/' + item.split('/')[2].split('-')[1] }}
          </li>
        </ul>
      </div>
    </div>
  </a-modal>
</template>

<script>
export default {
  props: {
    unitType: {
      type: Number,
      default: 3
    }, // 单位类型（2,3）
    unitSelectType: {
      type: String,
      default: 'single'
    } // 单位选择类型（'single','more'）
  },
  data() {
    return {
      visible: false, // 控制弹窗
      selectTreeData: [] // 已选择树数据
    }
  },
  computed: {
    unitList () {
      return this.unitType === 2 ? JSON.parse(localStorage.getItem('unitInfo12')) : JSON.parse(localStorage.getItem('unitInfo123'))
    }
  },
  methods: {
    // 树数据点击
    treeSelect(selectedKeys) {
      if (this.unitSelectType === 'single') {
        if (selectedKeys[0].split('/').length === this.unitType) {
          this.selectTreeData = selectedKeys
        } else {
          this.selectTreeData = []
        }
      }
    },
    // 树数据改变
    treeCheck(checkedKeys) {
      if (this.unitSelectType === 'more') {
        this.selectTreeData = checkedKeys.filter(item => {
          return item.split('/').length === this.unitType
        })
      }
    },
    // 弹窗确认
    isOk() {
      if (this.selectTreeData.length === 0) {
        this.$message.info('单位选择不能为空！')
      } else {
        this.$emit('unitSelectSuccess', this.selectTreeData)
        this.visible = false
        this.dialogClose()
      }
    },
    // 弹窗关闭
    dialogClose() {
      this.selectTreeData = []
    }
  }
}
</script>

<style scoped lang="less">
  .unit-box{
    display: flex;
    width: 100%;
    .unit-box-left, .unit-box-right{
      flex: 1;
      max-height: 400px;
      border: 1px solid #f0f0f0;
      overflow: auto;
    }
    .unit-box-right{
      border-left: 0;
      .unit-select-list{
        li{
          padding: 0 10px;
          line-height: 40px;
          border-bottom: 1px solid #f0f0f0;
        }
      }
    }
  }
</style>
