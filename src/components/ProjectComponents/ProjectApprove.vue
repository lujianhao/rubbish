<template>
  <a-modal
      class="special-table-dialog"
      centered
      v-model="visible"
      :title="title"
      width="35%"
      destroyOnClose
      :confirmLoading="okBtnLoading"
      @ok="isOk"
      @cancel="dialogClose"
  >
    <a-form-model ref="ruleForm" :model="form" :rules="rules">
      <a-row :gutter="16" v-if="ProjectApproveFlag === 'outsourcedUnitAnhuan' || ProjectApproveFlag === 'outsourcedUnitBaowei'">
        <a-col :span="24">
          <a-form-model-item label="审批意见" prop="opinion">
            <a-textarea placeholder="请输入审批意见" v-model="form.opinion" :auto-size="{ minRows:2, maxRows: 6 }" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="审批结果" prop="result">
            <a-select
                model="default"
                placeholder="请选择审批结果"
                :allowClear="true"
                v-model="form.result"
            >
              <a-select-option value="通过">通过</a-select-option>
              <a-select-option value="退回">退回</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </a-modal>
</template>
<script>
import { outsourcedUnitAnhuanApprover, outsourcedUnitBaoweiApprover } from '@/api/outsourcedUnit'
export default {
  props: {
    ProjectApproveFlag: {
      type: String,
      default: ''
    }, // 标记
  },
  data() {
    return {
      visible: false, // 弹窗显示
      title: '', // 弹窗标题
      type: '', // 弹窗类型
      form: {}, // 表单数据
      okBtnLoading: false, // 确定按钮loading
      labelCol: { span: 5 }, // 表单label宽度
      wrapperCol: { span: 18 }, // 表单内容宽度
      rules: {
        result: [{ required: true, message: '审批结果不能为空！', whitespace: true }],
      } // 表单验证规则
    }
  },
  methods: {
    isOk() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.okBtnLoading = true
          const params = new FormData()
          params.append('id', this.form.id)
          params.append('result', this.form.result)
          params.append('opinion', this.form.opinion)
          if (this.ProjectApproveFlag === 'outsourcedUnitAnhuan') {
            outsourcedUnitAnhuanApprover(params).then(res => this.operateResult(res))
          } else if (this.ProjectApproveFlag === 'outsourcedUnitBaowei') {
            outsourcedUnitBaoweiApprover(params).then(res => this.operateResult(res))
          }
        }
      })
    },
    // 操作结果
    operateResult(res) {
      this.okBtnLoading = false
      if (res) {
        this.$message.success(res)
        this.$emit('operateSuccess')
        this.visible = false
        this.dialogClose()
      } else {
        this.$message.info(res.message)
      }
    },
    // 弹窗关闭
    dialogClose() {
      this.form = {}
    }
  }
}
</script>
