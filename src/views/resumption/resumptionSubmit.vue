<template>
  <div class="project-page-tree">
    <div class="project-page-tree-right notree">
      <div class="project-page-tree-right-box" ref="topTableArea">
        <ProjectTable
            :projectTableScrollNum="5"
            :nowTabInfo="tabsData[0]"
            :projectTableEditBtn="true"
            :projectTableUploadBtn="true"
            :projectTableSubmitBtn="true"
            :projectTableSearchInfo="topTableSearchInfo"
            :projectTableScrollHeight="topTableScrollHeight"
            :projectTableColumns="topTableColumns"
            :projectTableData="topTableData"
            :projectTableTotal="topTableTotal"
            @projectTableOperate="topTableOperate"
            @projectTablePageChange="topTablePageChange"
            @projectTableRowClick="topTableRowClick"
        />
      </div>
      <div class="project-page-tree-right-box" ref="bottomTableArea">
        <ProjectTab v-if="bottomTableSearchInfo.id !== ''" :tabsData="tabsData" />
        <ProjectTable
            ref="ProjectTable"
            :projectTableScrollNum="4"
            :nowTabInfo="tabsData[0]"
            :projectTableBatchEditBtn="true"
            :projectTableSearchInfo="bottomTableSearchInfo"
            :projectTableScrollHeight="bottomTableScrollHeight"
            :projectTableColumns="bottomTableSearchInfo.id === '' ? [] : bottomTableColumns"
            :projectTableData="bottomTableData"
            :projectTableTotal="bottomTableTotal"
            @projectTableOperate="bottomTableOperate"
            @projectTablePageChange="bottomTablePageChange"
            @projectTableSelectChange="bottomTableSelectChange"
        />
      </div>
    </div>
    <TopTableOperateDialog ref="TopTableOperateDialog" :topTableOperateDialogFlag="'resumptionSubmit'" @operateSuccess="searchTopData" />
    <ProjectFileDialog ref="ProjectFileDialog" :projectFileDialogFlag="'resumptionSubmit'" :fileShowType="'upload'" :uploadFilesList="uploadFilesList" @fileOperateSuccess="searchFiles" />
    <BatchEditDialog ref="BatchEditDialog" :BatchEditDialogFlag="'resumptionSubmit'" @batchEditSuccess="searchBottomTableData" />
  </div>
</template>

<script>
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import ProjectTab from '@/components/ProjectComponents/ProjectTab'
import TopTableOperateDialog from '@/components/ProjectComponents/TopTableOperateDialog'
import BatchEditDialog from '@/components/ProjectComponents/BatchEditDialog'
import ProjectFileDialog from '@/components/ProjectComponents/ProjectFileDialog'
import { resumptionSubmitSearch, resumptionSubmitSubmit, resumptionSubmitSearch1, resumptionSubmitFileSearch } from '@/api/resumption'
import { operateSuccess } from '@/utils/projectUtils'
import bottomTableColumns from '@/components/ProjectComponents/BottomTableColumns'
export default {
  components: {
    ProjectTable,
    ProjectTab,
    TopTableOperateDialog,
    BatchEditDialog,
    ProjectFileDialog
  },
  data() {
    return {
      topTableSearchInfo: {
        pageNo: 1,
        pageSize: 10
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '年份', dataIndex: 'year', align: 'center' },
        { title: '月份', dataIndex: 'month', align: 'center' },
        { title: '总分', dataIndex: 'score', align: 'center', sorter: true },
        { title: '描述', dataIndex: 'note', align: 'center', width: 600, ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 240 }
      ], // 顶部表格表头配置
      topTableData: [], // 顶部表格数据
      topTableTotal: 0, // 顶部表格总数
      topTableScrollHeight: 0, // 顶部表格滚动高度
      uploadFilesList: [], // 顶部表格当前行文件列表
      bottomTableSearchInfo: {
        id: '',
        pageNo: 1,
        pageSize: 10
      }, // 底部表格查询信息
      bottomTableColumns: [], // 底部表格表头配置
      bottomTableData: [], // 底部表格数据
      bottomTableTotal: 0, // 底部表格总数
      bottomTableScrollHeight: 0, // 底部表格滚动高度
      bottomTableSelectData: [], // 底部表格复选框选择数据
      tabsData: [
        { index: 0, isActive: true, name: '评分明细', batchEdit: true, param: 'resumptionSubmit' }
      ] // tab数据
    }
  },
  mounted() {
    // 顶部高度需减去（上下padding高度40）（表格表头高度46）（分页高度42）（边框高度2）
    this.topTableScrollHeight = this.$refs.topTableArea.clientHeight - 40 - 46 - 42 - 2
    // 底部高度需减去（上下padding高度40）（tab高度55）（顶部表格操作区域42）（表格表头高度46）（分页高度42）（边框高度2）
    this.bottomTableScrollHeight = this.$refs.bottomTableArea.clientHeight - 40 - 55 - 42 - 46 - 42 - 2
    this.searchTopData()
  },
  methods: {
    // 查询顶部表格数据
    searchTopData(type) {
      if (type !== 'fy') {
        this.topTableSearchInfo.pageNo = 1
        this.topTableSearchInfo.pageSize = 10
      }
      resumptionSubmitSearch(this.topTableSearchInfo).then(res => {
        if (res) {
          this.topTableData = res.records
          this.topTableTotal = res.total
        }
      })
    },
    // 顶部表格操作
    topTableOperate(type, row) {
      if (type === 'projectTableEdit') {
        const nowDialog = this.$refs.TopTableOperateDialog
        nowDialog.visible = true
        nowDialog.type = type
        nowDialog.title = '编辑履职报告'
        nowDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableUpload') {
        this.$refs.ProjectFileDialog.visible = true
        this.$refs.ProjectFileDialog.parentId = row.id
        this.searchFiles(row.id)
      } else if (type === 'projectTableSubmit') {
        const params = new FormData()
        params.append('id', row.id)
        resumptionSubmitSubmit(params).then(res => operateSuccess(this, res, 'top'))
      }
    },
    // 查询顶部表格当前行文件列表
    searchFiles(id) {
      resumptionSubmitFileSearch({ workDutyReportId: id }).then(res => {
        if (res) this.uploadFilesList = res
      })
    },
    // 顶部表格分页改变
    topTablePageChange(type, value) {
      this.topTableSearchInfo[type] = value
      this.searchTopData((type === 'pageNo' || type === 'pageSize') ? 'fy' : undefined)
    },
    // 顶部表格行点击
    topTableRowClick(row) {
      this.bottomTableSearchInfo.id = row.id
      this.searchBottomTableData()
    },
    // 查询底部表格数据
    searchBottomTableData(type) {
      if (type !== 'fy') {
        this.bottomTableSearchInfo.pageNo = 1
        this.bottomTableSearchInfo.pageSize = 10
      }
      this.bottomTableColumns = bottomTableColumns['resumptionSubmit']
      this.$refs.ProjectTable.projectTableSelectKeys = []
      this.$refs.ProjectTable.projectTableSelectData = []
      resumptionSubmitSearch1(this.bottomTableSearchInfo).then(res => {
        if (res) {
          this.bottomTableData = res.records
          this.bottomTableTotal = res.total
        }
      })
    },
    // 底部表格操作
    bottomTableOperate() {
      this.$refs.BatchEditDialog.visible = true
      this.$refs.BatchEditDialog.title = '编辑评分明细'
      this.$refs.BatchEditDialog.columns = this.bottomTableColumns
      this.$refs.BatchEditDialog.tableData = JSON.parse(JSON.stringify(this.bottomTableSelectData))
    },
    // 底部表格分页改变
    bottomTablePageChange(type, value) {
      this.bottomTableSearchInfo[type] = value
      this.searchBottomTableData((type === 'pageNo' || type === 'pageSize') ? 'fy' : undefined)
    },
    // 底部表格复选框改变
    bottomTableSelectChange(arr) {
      this.bottomTableSelectData = arr
    }
  }
}
</script>
