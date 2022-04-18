<template>
  <div class="project-page-tree">
    <div class="project-page-tree-right notree">
      <div class="project-page-tree-right-box" ref="topTableArea" style="height: 100%">
        <div style="margin-bottom: 10px;">
          <a-form-model layout="inline" ref="resetForm" :model="topTableSearchInfo">
            <a-form-model-item label="三违人员" prop="violator">
              <a-input placeholder="请输入三违人员" v-model="topTableSearchInfo.violator" />
            </a-form-model-item>
            <a-form-model-item label="过关状态" prop="state">
              <a-select
                  model="default"
                  placeholder="请选择过关状态"
                  :allowClear="true"
                  v-model="topTableSearchInfo.state"
              >
                <a-select-option value="全部">全部</a-select-option>
                <a-select-option value="待过关">待过关</a-select-option>
                <a-select-option value="已过关">已过关</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" icon="search" @click="searchTopData">查询</a-button>
              <a-button type="primary" icon="sync" style="margin-left: 10px;" @click="searchFormReset">重置</a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
        <ProjectTable
            :projectTableScrollNum="10"
            :nowTabInfo="nowTabInfo"
            :projectTableDownloadBtn="true"
            :projectTableDetailsBtn="true"
            :projectTablePhotoBtn="true"
            :projectTableSearchInfo="topTableSearchInfo"
            :projectTableScrollHeight="topTableScrollHeight"
            :projectTableColumns="topTableColumns"
            :projectTableData="topTableData"
            :projectTableTotal="topTableTotal"
            @projectTableOperate="topTableOperate"
            @projectTablePageChange="topTablePageChange"
        />
      </div>
    </div>
    <ProjectFileDialog ref="ProjectFileDialog" :fileShowType="'download'" :uploadFilesList="uploadFilesList" />
    <DetailsDialog ref="DetailsDialog" />
    <ProjectPhotoDialog ref="ProjectPhotoDialog" :fileShowType="'show'" :uploadFilesList="uploadFilesList" @fileOperateSuccess="searchUploadFiles" />
  </div>
</template>

<script>
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import ProjectFileDialog from '@/components/ProjectComponents/ProjectFileDialog'
import DetailsDialog from '@/components/ProjectComponents/DetailsDialog'
import ProjectPhotoDialog from '@/components/ProjectComponents/ProjectPhotoDialog'
import { uploadFileSearch } from '@/api/api'
import { passRecordCheckSearch } from '@/api/threeViolation'
import detailsData from '@/components/ProjectComponents/DetailsData'
export default {
  components: {
    ProjectTable,
    ProjectFileDialog,
    DetailsDialog,
    ProjectPhotoDialog
  },
  data() {
    return {
      topTableSearchInfo: {
        pageNo: 1,
        pageSize: 10,
        violator:'',
        state:''
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '三违人员', dataIndex: 'violator', align: 'center', ellipsis: true },
        { title: '三违日期', dataIndex: 'violationDate', align: 'center', ellipsis: true },
        { title: '三违地点', dataIndex: 'violationPlace', align: 'center', ellipsis: true },
        { title: '违章行为', dataIndex: 'illegal', align: 'center', ellipsis: true },
        { title: '记录状态', dataIndex: 'dealStatus', align: 'center', ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 280 }
      ], // 顶部表格表头配置
      topTableData: [], // 顶部表格数据
      topTableTotal: 0, // 顶部表格总数
      topTableScrollHeight: 0, // 顶部表格滚动高度
      topTableFilesList: [], // 顶部表格当前行文件列表
      uploadFilesList: [], // 顶部表格当前行文件列表
      nowTabInfo: { details: true } // 当前tab信息
    }
  },
  mounted() {
    // 顶部高度需减去（上下padding高度40）（顶部搜索表单高度50）（表格表头高度46）（分页高度42）（边框高度2）
    this.topTableScrollHeight = this.$refs.topTableArea.clientHeight - 40 - 50 - 46 - 42 - 2
    this.searchTopData()
  },
  methods: {
    // 查询顶部表格数据
    searchTopData(type) {
      if (type !== 'fy') {
        this.topTableSearchInfo.pageNo = 1
        this.topTableSearchInfo.pageSize = 10
      }
      passRecordCheckSearch(this.topTableSearchInfo).then(res => {
        if (res) {
          this.topTableData = res.records
          this.topTableTotal = res.total
        }
      })
    },
    // 重置查询表单
    searchFormReset() {
      this.$refs.resetForm.resetFields()
      this.searchTopData()
    },
    //顶部表格操作
    topTableOperate(type, row) {
      if (type === 'projectTableDownload') {
        this.$refs.ProjectFileDialog.visible = true
        this.$refs.ProjectFileDialog.parentId = row.id
        this.searchFiles(row.id)
      } else if (type === 'projectTableDetails') {
        this.$refs.DetailsDialog.visible = true
        this.$refs.DetailsDialog.title = '过关记录详情'
        this.$refs.DetailsDialog.detailsData = detailsData['passRecordCheck']
        this.$refs.DetailsDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTablePhoto') {
        this.$refs.ProjectPhotoDialog.visible = true
        this.$refs.ProjectPhotoDialog.parentId = row.id
        this.searchUploadFiles(row.id)
      }
    },
    // 查询顶部表格当前行文件列表
    searchUploadFiles(id) {
      uploadFileSearch({ id: id }).then(res => {
        if (res) {
          res.forEach(item => {
            item.showPath = `/public/${item.type === '.mp4' ? 'videoSmallShow' : 'imageShow'}/${item.id}`
          })
          this.uploadFilesList = res
        }
      })
    },
    // 顶部表格分页改变
    topTablePageChange(type, value) {
      this.topTableSearchInfo[type] = value
      this.searchTopData((type === 'pageNo' || type === 'pageSize') ? 'fy' : undefined)
    }
  }
}
</script>
