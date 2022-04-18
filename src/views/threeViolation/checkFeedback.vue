<template>
  <div class="project-page-tree">
    <div class="project-page-tree-right notree">
      <div class="project-page-tree-right-box" ref="topTableArea" style="height: 100%">
        <div style="margin-bottom: 10px;">
          <a-form-model layout="inline" ref="resetForm" :model="topTableSearchInfo">
            <a-form-model-item label="日期" prop="date">
              <a-date-picker :valueFormat="'YYYY-MM-DD'" placeholder="请选择日期" v-model="topTableSearchInfo.date" />
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
            :projectTableEditBtn="true"
            :projectTableSubmitBtn="true"
            :projectTableUploadBtn="true"
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
    <TopTableOperateDialog ref="TopTableOperateDialog" :topTableOperateDialogFlag="'checkFeedback'" @operateSuccess="searchTopData" />
    <ProjectFileDialog ref="ProjectFileDialog" :projectFileDialogFlag="'feedbackPass'" :fileShowType="'upload'" :uploadFilesList="uploadFilesList" @fileOperateSuccess="searchFiles" />
  </div>
</template>

<script>
import TopTableOperateDialog from '@/components/ProjectComponents/TopTableOperateDialog'
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import ProjectFileDialog from '@/components/ProjectComponents/ProjectFileDialog'
import { uploadFileSearch } from '@/api/api'
import { checkFeedbackSearch,checkFeedbackSubmit } from '@/api/threeViolation'
import { operateSuccess } from '@/utils/projectUtils'
export default {
  components: {
    ProjectTable,
    TopTableOperateDialog,
    ProjectFileDialog
  },
  data() {
    return {
      topTableSearchInfo: {
        pageNo: 1,
        pageSize: 10,
        column: '',
        isAsc: false,
        date:''
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '日期', dataIndex: 'violationDate', align: 'center' },
        { title: '地点', dataIndex: 'violationPlace', align: 'center', ellipsis: true },
        { title: '违章行为', dataIndex: 'illegal', align: 'center', ellipsis: true },
        { title: '反思检查情况', dataIndex: 'reflectCheckStatus', align: 'center', ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 240 }
      ], // 顶部表格表头配置
      topTableData: [], // 顶部表格数据
      topTableTotal: 0, // 顶部表格总数
      topTableScrollHeight: 0, // 顶部表格滚动高度
      topTableFilesList: [], // 顶部表格当前行文件列表
      uploadFilesList: [], // 顶部表格当前行文件列表
      nowTabInfo: {}, // 当前tab信息
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
      checkFeedbackSearch(this.topTableSearchInfo).then(res => {
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
      const nowDialog = this.$refs.TopTableOperateDialog
      if (type === 'projectTableEdit') {
        nowDialog.visible = true
        nowDialog.type = type
        nowDialog.title = '编辑反馈反思检查关'
        nowDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableUpload') {
        this.$refs.ProjectFileDialog.visible = true
        this.$refs.ProjectFileDialog.parentId = row.id
        this.searchFiles(row.id)
      } else if (type === 'projectTableSubmit') {
        const params = new FormData()
        params.append('id', row.id)
        checkFeedbackSubmit(params).then(res => operateSuccess(this, res, 'top'))
      }
    },
    // 查询顶部表格当前行文件列表
    searchFiles(id) {
      uploadFileSearch({ id: id }).then(res => {
        if (res) this.uploadFilesList = res
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
