<template>
  <a-modal
      centered
      v-model="visible"
      title="人员选择"
      width="30%"
      @ok="isOk"
  >
    <div>
      <a-radio-group v-model="selectUser" style="width: 100%;">
        <a-row>
          <a-col :span="12" v-for="item in userSelectData" :key="item.id" style="line-height: 40px; border-bottom: 1px solid #f0f0f0;">
            <a-radio :value="item.name + '(' + item.workNum + ')'">{{ item.name }}（{{item.workNum}}）</a-radio>
          </a-col>
        </a-row>
      </a-radio-group>
    </div>
  </a-modal>
</template>

<script>
export default {
  data() {
    return {
      visible: false, // 弹窗控制
      type: '', // 弹窗类型
      userSelectData: [], // 用户选择列表
      selectUser: '' // 当前选择用户
    }
  },
  methods: {
    // 弹窗确认
    isOk() {
      if (this.selectUser === '') {
        this.$message.info('当前人员选择为空！')
      } else {
        this.$emit('userSelectSuccess', this.selectUser, this.type)
        this.selectUser = ''
        this.visible = false
      }
    }
  }
}
</script>
