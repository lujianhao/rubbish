<template>
  <a-modal
      centered
      v-model="visible"
      title="人员选择"
      width="40%"
      :confirmLoading="okBtnLoading"
      @ok="isOk"
      @cancel="dialogClose"
  >
    <div class="user-box">
      <div class="user-box-left">
        <ul class="unit-list">
          <li v-for="item in unit3List" :key="item.id" :class="item.isActive ? 'active' : ''" @click="unitClick(item)">{{ item.name }}</li>
        </ul>
      </div>
      <div class="user-box-right">
        <a-checkbox-group v-model="selectUsers" style="width: 100%;">
          <div v-for="item in userList" class="user-list" :key="item.id"><a-checkbox :value="item.id">{{ item.name }}</a-checkbox></div>
        </a-checkbox-group>
      </div>
    </div>
  </a-modal>
</template>

<script>
import { resumptionSetUnit3Users, resumptionSetAdd2 } from '@/api/resumption'
export default {
  data() {
    return {
      visible: false, // 弹窗控制
      okBtnLoading: false, // 确定按钮loading
      parentId: '', // 父级表格当前行id
      unit3List: [], // 三级单位列表
      userList: [], // 用户列表
      selectUsers: [] // 当前选择用户
    }
  },
  methods: {
    // 三级单位切换
    unitClick(item) {
      this.unit3List.forEach(itm => {
        itm.isActive = item.id === itm.id
      })
      this.unit3List = [...this.unit3List]
      resumptionSetUnit3Users({ dutyId: this.parentId, thirdArchivesId: item.id }).then(res => {
        if (res) this.userList = res
      })
    },
    // 弹窗确认
    isOk() {
      if (this.selectUsers.length === 0) {
        this.$message.info('用户选择为空！')
      } else {
        this.okBtnLoading = true
        const params = new FormData()
        params.append('userIds', this.selectUsers.join(','))
        params.append('dutyId', this.parentId)
        resumptionSetAdd2(params).then(res => {
          this.okBtnLoading = false
          if (res) {
            this.$message.success(res)
            this.$emit('addSuccess')
            this.visible = false
            this.dialogClose()
          }
        })
      }
    },
    // 弹窗关闭
    dialogClose() {
      this.unit3List.forEach(itm => {
        itm.isActive = false
      })
      this.userList = []
      this.selectUsers = []
    }
  }
}
</script>

<style scoped lang="less">
  .user-box{
    display: flex;
    width: 100%;
    .user-box-left, .user-box-right{
      flex: 1;
      max-height: 400px;
      border: 1px solid #f0f0f0;
      overflow: auto;
    }
    .user-box-left{
      border-right: 0;
      .unit-list{
        li{
          padding: 0 10px;
          line-height: 40px;
          border-bottom: 1px solid #f0f0f0;
          cursor: pointer;
          &.active{
            background-color: #f0faff;
          }
        }
      }
    }
    .user-box-right{
      .user-list{
        padding: 0 10px;
        line-height: 40px;
        border-bottom: 1px solid #f0f0f0;
      }
    }
  }
</style>
