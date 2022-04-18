<template>
  <a-modal
      centered
      v-model="visible"
      :title="title"
      width="60%"
      :confirmLoading="okBtnLoading"
      @ok="isOk"
  >
    <a-table
        bordered
        rowKey="id"
        :columns="columns"
        :data-source="tableData"
        :pagination="false"
    >
      <template slot="score" slot-scope="text, record">
        <a-input-number :min="1" :precision="0" placeholder="请输入得分" v-model="record.score" />
      </template>
      <template slot="note" slot-scope="text, record">
        <a-textarea placeholder="请输入备注" v-model="record.note" :auto-size="{ minRows:1, maxRows: 4 }" />
      </template>
      <template slot="number" slot-scope="text, record">
        <a-input-number :min="1" :precision="0" placeholder="请输入序号" v-model="record.number" />
      </template>
      <template slot="checkProject" slot-scope="text, record">
        <a-input placeholder="请输入检查项目" v-model="record.checkProject" />
      </template>
      <template slot="checkStandard" slot-scope="text, record">
        <a-textarea placeholder="请输入检查标准" v-model="record.checkStandard" :auto-size="{ minRows:1, maxRows: 4 }" />
      </template>
      <template slot="checkPoint" slot-scope="text, record">
        <a-input placeholder="请输入检查点" v-model="record.checkPoint" />
      </template>
      <template slot="checkContent" slot-scope="text, record">
        <a-textarea placeholder="请输入检查内容" v-model="record.checkContent" :auto-size="{ minRows:1, maxRows: 4 }" />
      </template>
    </a-table>
  </a-modal>
</template>

<script>
import { resumptionSubmitEdit1 } from '@/api/resumption'
import { riskPointSetEdit1 } from '@/api/riskPoint'

export default {
  props: {
    BatchEditDialogFlag: {
      type: String,
      default: ''
    } // 标记
  },
  data() {
    return {
      visible: false, // 弹窗显示
      title: '', // 弹窗标题
      okBtnLoading: false, // 确定按钮loading
      columns: [], // 表头配置
      tableData: [] // 表格数据
    }
  },
  methods: {
    // 确定
    isOk() {
      let [scoreCheck, noteCheck, numberCheck, checkProjectCheck, checkStandardCheck, checkPointCheck, checkContentCheck] = []
      this.tableData.forEach(item => {
        if (!item.score) scoreCheck = true
        if (item.note && item.note.length >= 200) noteCheck = true
        if (!item.number) numberCheck = true
        if (!item.checkProject) checkProjectCheck = true
        if (item.checkStandard && item.checkStandard.length >= 200) checkStandardCheck = true
        if (item.checkPoint && item.checkPoint.length >= 50) checkPointCheck = true
        if (item.checkContent && item.checkContent.length >= 200) checkContentCheck = true
      })
      if (this.BatchEditDialogFlag === 'resumptionSubmit') {
        if (scoreCheck) {
          this.$message.info('得分不能为空！')
        } else if (noteCheck) {
          this.$message.info('备注最多200个字！')
        } else {
          this.okBtnLoading = true
          resumptionSubmitEdit1(this.tableData).then(res => this.showResult(res))
        }
      } else if (this.BatchEditDialogFlag === 'riskPointSet') {
        if (numberCheck) {
          this.$message.info('序号不能为空！')
        } else if (checkProjectCheck) {
          this.$message.info('检查项目不能为空！')
        } else if (checkStandardCheck) {
          this.$message.info('检查标准最多200个字！')
        } else if (checkPointCheck) {
          this.$message.info('检查点最多50个字！')
        } else if (checkContentCheck) {
          this.$message.info('检查内容最多200个字！')
        } else {
          this.okBtnLoading = true
          riskPointSetEdit1(this.tableData).then(res => this.showResult(res))
        }
      }
    },
    // 展示结果
    showResult(res) {
      this.okBtnLoading = false
      if (res) {
        this.$message.success(res)
        this.$emit('batchEditSuccess')
        this.visible = false
      }
    }
  }
}
</script>
