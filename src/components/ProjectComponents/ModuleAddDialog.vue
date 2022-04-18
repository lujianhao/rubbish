<template>
  <a-modal
      centered
      v-model="visible"
      title="新增二级模块"
      width="50%"
      @ok="isOk"
      @cancel="dialogClose"
  >
    <div v-if="selectList.length === 0" style="display: flex;justify-content: center;font-size: 20px;">暂无可分配模块！</div>
    <div v-else>
      <a-checkbox-group v-model="selectData" style="width: 100%;">
        <a-row>
          <a-col :span="6" v-for="item in selectList" :key="item.id" style="line-height: 40px; border-top: 1px solid #f0f0f0;">
            <a-checkbox :value="item">{{ item.qxlbMc }}</a-checkbox>
          </a-col>
        </a-row>
      </a-checkbox-group>
    </div>
  </a-modal>
</template>

<script>
import { moduleAdd1 } from '@/api/basic'
export default {
  data() {
    return {
      visible: false, // 弹窗控制
      parentId: '', // 父级表格id
      selectList: [], // 选择列表
      selectData: [] // 当前选择数据
    }
  },
  methods: {
    // 弹窗确认
    isOk() {
      if (this.selectData.length === 0) {
        this.$message.info('当前模块选择为空！')
      } else {
        this.selectData.forEach(item => {
          item.qxflId = this.parentId
        })
        moduleAdd1(this.selectData).then(res => {
          if (res) {
            this.$message.success(res)
            this.dialogClose()
            this.visible = false
            this.$emit('selectSuccess')
          }
        })
      }
    },
    // 弹窗关闭
    dialogClose() {
      this.selectList = []
      this.selectData = []
      this.parentId = ''
    }
  }
}
</script>
