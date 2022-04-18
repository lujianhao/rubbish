<template>
  <a-modal
      centered
      v-model="visible"
      title="模板导入"
      width="40%"
      destroyOnClose
      :confirmLoading="okBtnLoading"
      @ok="isOk"
      @cancel="dialogClose"
  >
    <div>
      <a-upload
          action=""
          :file-list="fileList"
          :before-upload="beforeUpload"
          :remove="removeFile"
      >
        <a-button icon="import" type="primary">请上传模板</a-button>
      </a-upload>
    </div>
  </a-modal>
</template>

<script>
import { uploadTemplate } from '@/api/api'
export default {
  data() {
    return {
      visible: false,
      okBtnLoading: false,
      fileList: [],
      keyword: '',
      sheetName: ''
    }
  },
  methods: {
    beforeUpload(file) {
      this.fileList = []
      this.fileList.push(file)
      return false
    },
    removeFile() {
      this.fileList = []
    },
    isOk() {
      if (this.fileList.length === 0) {
        this.$message.info('请上传导入模板！')
      } else {
        this.okBtnLoading = true
        const infos = {
          file: this.fileList[0],
          sheetName: this.sheetName,
          status: 1
        }
        if (this.keyword) infos.keyword = this.keyword
        if (infos.sheetName === '职业健康') {
          const params = new FormData()
          for (const item in infos) {
            params.append(item, infos[item])
          }
          uploadTemplate(params).then(res => {
            if (typeof res === 'string') {
              infos.sheetName = '职工证书记录'
              const params = new FormData()
              for (const item in infos) {
                params.append(item, infos[item])
              }
              uploadTemplate(params).then(res => {
                this.okBtnLoading = false
                if (typeof res === 'string') {
                  this.$message.success('职业健康数据录入成功！')
                  this.$emit('importSuccess')
                  this.visible = false
                  this.dialogClose()
                } else {
                  this.$message.info(res.message)
                }
              })
            } else {
              this.$message.info(res.message)
            }
          })
        } else {
          const params = new FormData()
          for (const item in infos) {
            params.append(item, infos[item])
          }
          uploadTemplate(params).then(res => {
            this.okBtnLoading = false
            if (typeof res === 'string') {
              this.$message.success(res)
              this.$emit('importSuccess')
              this.visible = false
              this.dialogClose()
            } else {
              this.$message.info(res.message)
            }
          })
        }
      }
    },
    dialogClose() {
      this.okBtnLoading = false
      this.fileList = []
    }
  }
}
</script>
