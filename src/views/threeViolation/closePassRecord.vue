<template>
  <div class="project-page-tree">
    <div class="project-page-tree-right notree">
      <div class="project-page-tree-right-box" ref="topTableArea" style="height: 100%">
        <div style="margin-bottom: 10px;">
          <a-form-model layout="inline" ref="resetForm" :model="topTableSearchInfo">
            <a-form-model-item label="三违人员" prop="violator">
              <a-input placeholder="请输入三违人员" v-model="topTableSearchInfo.violator" />
            </a-form-model-item>
            <a-form-model-item label="三违日期" prop="date">
              <a-date-picker :valueFormat="'YYYY-MM-DD'" placeholder="请选择三违日期" v-model="topTableSearchInfo.date" />
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" icon="search" @click="searchTopData">查询</a-button>
              <a-button type="primary" icon="sync" style="margin-left: 10px;" @click="searchFormReset">重置</a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
        <ProjectTable
            :projectTableScrollNum="12"
            :nowTabInfo="nowTabInfo"
            :projectTableDownloadBtn="true"
            :projectTablePhotoBtn="true"
            :projectTableSubmitBtn="true"
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
    <ProjectPhotoDialog ref="ProjectPhotoDialog" :fileShowType="'show'" :uploadFilesList="uploadFilesList" @fileOperateSuccess="searchUploadFiles" />
  </div>
</template>

<script>
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import ProjectFileDialog from '@/components/ProjectComponents/ProjectFileDialog'
import ProjectPhotoDialog from '@/components/ProjectComponents/ProjectPhotoDialog'
import { uploadFileSearch } from '@/api/api'
import { closePassRecordSearch, closePassRecordSubmit } from '@/api/threeViolation'
import { operateSuccess } from '@/utils/projectUtils'
export default {
  components: {
    ProjectTable,
    ProjectFileDialog,
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
        { title: '三违人员', dataIndex: 'violator', align: 'center', ellipsis: true, width: 120 },
        { title: '三违日期', dataIndex: 'violationDate', align: 'center', ellipsis: true, width: 120 },
        { title: '三违地点', dataIndex: 'violationPlace', align: 'center', ellipsis: true, width: 120 },
        { title: '违章行为', dataIndex: 'illegal', align: 'center', ellipsis: true, width: 120 },
        { title: '安全补课内容', dataIndex: 'safetyLessonStatus', align: 'center', ellipsis: true, width: 160 },
        { title: '安全补课反馈时间', dataIndex: 'safetyLessonSubmitTime', align: 'center', ellipsis: true, width: 160, sorter: true },
        { title: '反思检查内容', dataIndex: 'reflectCheckStatus', align: 'center', ellipsis: true, width: 160 },
        { title: '反思检查反馈时间', dataIndex: 'reflectCheckSubmitTime', align: 'center', ellipsis: true, width: 160, sorter: true },
        { title: '班长谈话内容', dataIndex: 'monitorStatus', align: 'center', ellipsis: true, width: 160 },
        { title: '班长谈话谈话人', dataIndex: 'monitorSubmitter', align: 'center', ellipsis: true, width: 160 },
        { title: '班长谈话反馈时间', dataIndex: 'monitorSubmitTime', align: 'center', ellipsis: true, width: 160, sorter: true },
        { title: '车间主任谈话内容', dataIndex: 'workshopStatus', align: 'center', ellipsis: true, width: 160 },
        { title: '车间主任谈话谈话人', dataIndex: 'workshopSubmitter', align: 'center', ellipsis: true, width: 160 },
        { title: '车间主任谈话反馈时间', dataIndex: 'workshopSubmitTime', align: 'center', ellipsis: true, width: 180, sorter: true },
        { title: '支部书记谈话内容', dataIndex: 'secretaryStatus', align: 'center', ellipsis: true, width: 160 },
        { title: '支部书记谈话谈话人', dataIndex: 'secretarySubmitter', align: 'center', ellipsis: true, width: 160 },
        { title: '支部书记谈话反馈时间', dataIndex: 'secretarySubmitTime', align: 'center', ellipsis: true, width: 180, sorter: true },
        { title: '工会主席谈话内容', dataIndex: 'unionStatus', align: 'center', ellipsis: true, width: 160 },
        { title: '工会主席谈话谈话人', dataIndex: 'unionSubmitter', align: 'center', ellipsis: true, width: 160 },
        { title: '工会主席谈话反馈时间', dataIndex: 'unionSubmitTime', align: 'center', ellipsis: true, width: 180, sorter: true },
        { title: '分管领导谈话内容', dataIndex: 'leaderStatus', align: 'center', ellipsis: true, width: 160 },
        { title: '分管领导谈话谈话人', dataIndex: 'leaderSubmitter', align: 'center', ellipsis: true, width: 160 },
        { title: '分管领导谈话反馈时间', dataIndex: 'leaderSubmitTime', align: 'center', ellipsis: true, width: 180, sorter: true },
        { title: '家属协管内容', dataIndex: 'familyManagementStatus', align: 'center', ellipsis: true, width: 160 },
        { title: '家属协管反馈时间', dataIndex: 'familyManagementSubmitTime', align: 'center', ellipsis: true, width: 180, sorter: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 280, fixed: 'right' }
      ], // 顶部表格表头配置
      topTableData: [], // 顶部表格数据
      topTableTotal: 0, // 顶部表格总数
      topTableScrollHeight: 0, // 顶部表格滚动高度
      topTableFilesList: [], // 顶部表格当前行文件列表
      uploadFilesList: [], // 顶部表格当前行文件列表
      nowTabInfo: { xScroll: true } // 当前tab信息
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
      closePassRecordSearch(this.topTableSearchInfo).then(res => {
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
        this.searchUploadFiles(row.id)
      } else if (type === 'projectTablePhoto') {
        this.$refs.ProjectPhotoDialog.visible = true
        this.$refs.ProjectPhotoDialog.parentId = row.id
        this.searchUploadFiles(row.id)
      } else if (type === 'projectTableSubmit') {
        const params = new FormData()
        params.append('id', row.id)
        closePassRecordSubmit(params).then(res => operateSuccess(this, res, 'top'))
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
