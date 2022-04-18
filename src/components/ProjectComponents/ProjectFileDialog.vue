<template>
  <a-modal
      centered
      v-model="visible"
      :title="fileShowType === 'upload' ? '上传附件' : '下载附件'"
      width="50%"
      ok-text="全部下载"
      :confirmLoading="okBtnLoading"
      @ok="allDownload"
  >
    <div style="text-align: center;" v-if="fileShowType === 'upload'">
      <a-upload
          action=""
          :file-list="[]"
          :before-upload="beforeUpload"
      >
        <a-button> <a-icon type="upload" />点击上传文件</a-button>
      </a-upload>
    </div>
    <div style="font-size: 16px;line-height: 40px;" v-if="fileShowType === 'upload'">已上传文件：</div>
    <a-table
        bordered
        rowKey="id"
        :columns="columns"
        :data-source="uploadFilesList"
        :pagination="false"
    >
      <template slot="operate" slot-scope="text, record">
        <div class="project-table-operate">
          <a-button icon="download" type="link" size="small" @click="downloadFile(record)">下载文件</a-button>
          <a-popconfirm title="确定要删除这条数据吗?" placement="topRight" @confirm="deleteFile(record)" v-if="fileShowType === 'upload'">
            <a-button icon="delete" type="link" size="small" @click="(e) => e.stopPropagation()">删除文件</a-button>
          </a-popconfirm>
        </div>
      </template>
    </a-table>
  </a-modal>
</template>

<script>
import { uploadFile, downloadFileSingle, downloadFileMore, uploadFileDelete } from '@/api/api'
import { fileTypeChange } from '@/utils/projectUtils'
export default {
  props: {
    projectFileDialogFlag: {
      type: String,
      default: ''
    }, // 弹窗标记
    fileShowType: {
      type: String,
      default: 'upload'
    }, // 文件展示类型（'upload','download'）
    uploadFilesList: {
      type: Array,
      default: () => []
    } // 已上传文件列表
  },
  data() {
    return {
      visible: false, // 弹窗显示
      parentId: '', // 当前表格行id
      okBtnLoading: false, // 确定按钮loading
      labelCol: { span: 4 }, // 表单label宽度
      wrapperCol: { span: 18 }, // 表单内容宽度
      columns: [
        {
          title: '文件名称',
          dataIndex: 'fileName',
          align: 'center'
        },
        {
          title: '文件大小（字节）',
          dataIndex: 'size',
          align: 'center'
        },
        {
          title: '上传时间',
          dataIndex: 'uploadTime',
          align: 'center'
        },
        {
          title: '上传人',
          dataIndex: 'uploadUnitName',
          align: 'center'
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'operate' },
          align: 'center',
          width: 160
        }
      ] // 表头配置
    }
  },
  methods: {
    // 文件上传
    beforeUpload(file) {
      const params = new FormData()
      params.append('id', this.parentId)
      params.append('files', file)
      uploadFile(params).then(res => {
        if (res) {
          this.$message.success(res)
          this.$emit('fileOperateSuccess', this.parentId)
        }
      })
      return false
    },
    // 下载单文件
    downloadFile(row) {
      downloadFileSingle(row.id).then(res => {
        if (res) fileTypeChange(res, row.fullName)
      })
    },
    // 删除文件
    deleteFile(row) {
      switch (this.projectFileDialogFlag) {
        case 'resumptionSubmit':
          uploadFileDelete('workDutyReport', [row.id]).then(res => this.deleteFilesResult(res))
          break
        case 'outsourcedUnitUpload':
          uploadFileDelete('outsourcedUnitApplicationAdmission', [row.id]).then(res => this.deleteFilesResult(res))
          break
        case 'outsourcedUnitAssess':
          uploadFileDelete('outsourcedUnitEvaluationRecord', [row.id]).then(res => this.deleteFilesResult(res))
          break
        case 'outsourcedUnitProcess':
          uploadFileDelete('outsourcedConstructionRecords', [row.id]).then(res => this.deleteFilesResult(res))
          break
        case 'feedbackPass':
          uploadFileDelete('threeViolatorsHandlingRecord', [row.id]).then(res => this.deleteFilesResult(res))
          break
        case 'maintainEmergencyPlan':
          uploadFileDelete('emergencyPlanFile', [row.id]).then(res => this.deleteFilesResult(res))
          break
        case 'safetyTrainingRecord':
          uploadFileDelete('safetyTrainingRecords', [row.id]).then(res => this.deleteFilesResult(res))
          break
      }
    },
    // 下载全部文件
    allDownload() {
      if (this.uploadFilesList.length === 0) {
        this.$message.info('暂无可下载文件!')
      } else {
        this.okBtnLoading = true
        downloadFileMore(this.parentId).then(res => {
          this.okBtnLoading = false
          if (res) fileTypeChange(res, '全部文件.zip')
        })
      }
    },
    // 删除文件结果
    deleteFilesResult(res) {
      if (res) {
        this.$message.success(res)
        this.$emit('fileOperateSuccess', this.parentId)
      }
    }
  }
}
</script>
