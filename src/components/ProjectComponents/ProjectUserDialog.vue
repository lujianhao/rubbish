<template>
  <a-modal
      centered
      v-model="visible"
      title="人员选择"
      width="40%"
      destroyOnClose
      @ok="isOk"
      @cancel="dialogClose"
  >
    <div class="user-box">
      <div class="user-box-left">
        <a-tree
            show-line
            :tree-data="unitTreeData"
            :replaceFields="{ title: 'name', key: 'newKey' }"
            @select="treeSelect"
        />
      </div>
      <div class="user-box-right">
        <template v-if="userSelectType === 'single'">
          <a-radio-group v-model="selectUser" style="width: 100%;">
            <div v-for="item in userSelectData" class="user-list" :key="item.id"><a-radio :value="item">{{ item.name }}（{{item.workNum}}）</a-radio></div>
          </a-radio-group>
        </template>
        <template v-else>
          <a-checkbox-group v-model="selectUsers" style="width: 100%;">
            <div v-for="item in userSelectData" class="user-list" :key="item.id"><a-checkbox :value="item">{{ item.name }}（{{item.workNum}}）</a-checkbox></div>
          </a-checkbox-group>
        </template>
      </div>
    </div>
  </a-modal>
</template>

<script>
import { getUnit3Users } from '@/api/api'
export default {
  props: {
    userSelectType: {
      type: String,
      default: 'single'
    } // 用户选择类型（'single','more'）
  },
  data() {
    return {
      visible: false, // 弹窗控制
      type: '', // 弹窗类型
      userSelectData: [], // 用户列表
      selectUser: {}, // 单选当前选择人员
      selectUsers: [] // 多选当前选择人员
    }
  },
  computed: {
    unitTreeData () {
      return JSON.parse(localStorage.getItem('unitInfo123'))
    } // 单位树状结构数据
  },
  methods: {
    // 树数据点击
    treeSelect(selectedKeys) {
      if (selectedKeys[0].split('/').length === 3) {
        getUnit3Users({ thirdLevelArchivesId: selectedKeys[0].split('/')[2].split('-')[0] }).then(res => {
          if (res) this.userSelectData = res
        })
      }
    },
    // 弹窗确认
    isOk() {
      if (this.userSelectType === 'single') {
        if (JSON.stringify(this.selectUser) === '{}') {
          this.$message.info('人员选择不能为空！')
        } else {
          this.$emit('userSelectSuccess', this.selectUser, this.type)
          this.visible = false
          this.dialogClose()
        }
      } else {
        if (this.selectUsers.length === 0) {
          this.$message.info('人员选择不能为空！')
        } else {
          this.$emit('userSelectSuccess', this.selectUsers, this.type)
          this.visible = false
          this.dialogClose()
        }
      }
    },
    // 弹窗关闭
    dialogClose() {
      this.userSelectData = []
      this.selectUser = ''
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
      max-height: 500px;
      border: 1px solid #f0f0f0;
      overflow: auto;
    }
    .user-box-right{
      border-left: 0;
      .user-list{
        padding: 0 10px;
        line-height: 40px;
        border-bottom: 1px solid #f0f0f0;
      }
    }
  }
</style>
