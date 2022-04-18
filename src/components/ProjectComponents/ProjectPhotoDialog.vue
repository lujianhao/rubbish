<template>
  <a-modal
      centered
      v-model="visible"
      :title="fileShowType === 'show' ? '查看图片和视频' : '上传图片和视频'"
      width="60%"
      :footer="null"
  >
    <div style="text-align: center;" v-if="fileShowType === 'upload'">
      <a-upload
          action=""
          :file-list="[]"
          :before-upload="beforeUpload"
      >
        <a-button> <a-icon type="upload" />点击上传</a-button>
      </a-upload>
    </div>
    <div style="font-size: 16px;line-height: 40px;" v-if="fileShowType === 'upload'">已上传文件：</div>
    <a-table
        bordered
        rowKey="id"
        :columns="fileShowType === 'show' ? columns.slice(0, columns.length - 1) : columns"
        :data-source="uploadFilesList"
        :pagination="false"
    >
      <template slot="fileType" slot-scope="text">{{text}}</template>
      <template slot="fileShow" slot-scope="text, record">
        <img :src="nowPath + record.showPath" alt="" width="100" style="cursor:pointer;" @click="showFileInfo = record">
      </template>
      <template slot="operate" slot-scope="text, record">
        <div class="project-table-operate">
          <a-button icon="download" type="link" size="small" @click="downloadFile(record)">下载文件</a-button>
          <a-popconfirm title="确定要删除这条数据吗?" placement="topRight" @confirm="deleteFile(record)">
            <a-button icon="delete" type="link" size="small" @click="(e) => e.stopPropagation()">删除文件</a-button>
          </a-popconfirm>
        </div>
      </template>
    </a-table>
    <div class="show-box" v-if="JSON.stringify(showFileInfo) !== '{}'" @click="showFileInfo = {}">
      <div v-if="showFileInfo.type === '.mp4'">
        <video :src="nowPath + `/public/videoShow/${showFileInfo.id}`" autoplay controls />
      </div>
      <div v-else>
        <img :src="nowPath + showFileInfo.showPath" alt="">
      </div>
    </div>
  </a-modal>
</template>

<script>
import { downloadFileSingle, uploadFile, uploadFileDelete } from '@/api/api'
import { fileTypeChange, getNowDate } from '@/utils/projectUtils'

export default {
  props: {
    projectPhotoDialogFlag: {
      type: String,
      default: ''
    }, // 弹窗标记
    fileShowType: {
      type: String,
      default: 'show'
    }, // 文件展示类型（'show','upload'）
    uploadFilesList: {
      type: Array,
      default: () => []
    }, // 已上传文件列表
    uploadFileMaxNumber: {
      type: Number,
      default: 9
    } // 上传文件最大数量（5,9）
  },
  data() {
    return {
      visible: false, // 弹窗显示
      parentId: '', // 父级表格当前行id
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
          title: '文件类型',
          dataIndex: 'type',
          align: 'center',
          scopedSlots: { customRender: 'fileType' }
        },
        {
          title: '文件预览',
          align: 'center',
          scopedSlots: { customRender: 'fileShow' }
        },
        {
          title: '上传人',
          dataIndex: 'uploadUnitName',
          align: 'center'
        },
        {
          title: '上传时间',
          dataIndex: 'uploadTime',
          align: 'center'
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'operate' },
          align: 'center',
          width: 160
        }
      ], // 表头配置
      showFileInfo: {} // 当前展示文件
    }
  },
  computed: {
    nowPath () {
      return process.env.VUE_APP_API_BASE_URL
    } // 当前域名地址
  },
  methods: {
    // 文件上传
    beforeUpload(file) {
      let videoNum = 0
      let imgNum = 0
      this.uploadFilesList.forEach(item => {
        if (item.type === '.mp4') {
          videoNum++
        } else {
          imgNum++
        }
      })
      if (file.type.indexOf('video') === -1 && file.type.indexOf('image') === -1) {
        this.$message.info('请上传图片或者视频格式文件！')
        return false
      } else {
        if (file.type.indexOf('video') !== -1) { // 视频文件
          if (videoNum === 1) {
            this.$message.info('最多上传一个视频文件！')
            return false
          } else {
            this.uploadFile(file)
            return false
          }
        } else { // 图片文件
          if (imgNum === this.uploadFileMaxNumber - 1) {
            this.$message.info('最多上传' + imgNum + '张图片文件！')
            return false
          } else {
            return new Promise((resolve, reject) => {
              this.transformFile(file).then(res => {
                this.uploadFile(res)
                return false
              }).catch(error => {
                reject(error)
              })
            })
          }
        }
      }
    },
    // 转换文件
    transformFile(file) {
      return new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          const canvas = document.createElement('canvas')
          const img = document.createElement('img')
          img.src = reader.result
          img.onload = () => {
            const ctx = canvas.getContext('2d')
            let width = img.width
            let height = img.height
            canvas.width = width
            canvas.height = height
            ctx.drawImage(img, 0, 0, width, height)
            ctx.fillStyle = 'blank'
            ctx.font = '20px Arial'
            ctx.fillText(JSON.parse(localStorage.getItem('userInfo')).name, 20, 40)
            ctx.fillText(getNowDate(), 20, 70)
            let dataUrl = canvas.toDataURL("image/jpeg", 1)
            resolve(this.dataURLtoFile(dataUrl, file.name))
          }
        }
      })
    },
    // 将裁剪base64的图片转换为file文件
    dataURLtoFile(dataurl, filename) {
      let arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n)
      while (n--) u8arr[n] = bstr.charCodeAt(n)
      return new File([u8arr], filename, {type: mime})
    },
    // 上传文件
    uploadFile (file) {
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
    deleteFile (row) {
      switch (this.projectPhotoDialogFlag) {
        case 'riskPointCheck':
          uploadFileDelete('riskPointTaskList', [row.id]).then(res => this.deleteFilesResult(res))
          break
        case 'majorInsceptionSubmit':
          uploadFileDelete('professionalInspectionTaskList', [row.id]).then(res => this.deleteFilesResult(res))
          break
        case 'familyFeedback':
          uploadFileDelete('threeViolatorsHandlingRecord', [row.id]).then(res => this.deleteFilesResult(res))
          break
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

<style scoped lang="less">
  .show-box{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: rgba(0, 0, 0, .5);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    video{
      width: 100%;
      height: 100%;
    }
    img{
      max-height: 100%;
      cursor: pointer;
    }
  }
</style>
