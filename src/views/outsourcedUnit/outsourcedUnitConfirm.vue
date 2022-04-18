<template>
  <div class="project-page-tree">
    <div class="project-page-tree-right notree">
      <div class="project-page-tree-right-box" ref="topTableArea" style="height: 100%">
        <ProjectTable
            :projectTableScrollNum="10"
            :nowTabInfo="nowTabInfo"
            :projectTableDownloadBtn="true"
            :projectTableAccessBtn="true"
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
  </div>
</template>

<script>
import ProjectFileDialog from '@/components/ProjectComponents/ProjectFileDialog'
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import { uploadFileSearch } from '@/api/api'
import { outsourcedUnitUploadSearch, outsourcedUnitConfirm } from '@/api/outsourcedUnit'
import { operateSuccess } from '@/utils/projectUtils'
export default {
  components: {
    ProjectTable,
    ProjectFileDialog,
  },
  data() {
    return {
      topTableSearchInfo: {
        pageNo: 1,
        pageSize: 10
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '外委队名称', dataIndex: 'outsourceUnitName', align: 'center', ellipsis: true },
        { title: '施工单位', dataIndex: 'constructionUnit', align: 'center', ellipsis: true },
        { title: '单位类型', dataIndex: 'unitType', align: 'center', ellipsis: true },
        { title: '单位地点', dataIndex: 'unitLocation', align: 'center', ellipsis: true },
        { title: '工程名称', dataIndex: 'projectName', align: 'center', ellipsis: true },
        { title: '状态', dataIndex: 'requestStatus', align: 'center', width: 120 },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 240 }
      ], // 顶部表格表头配置
      topTableData: [], // 顶部表格数据
      topTableTotal: 0, // 顶部表格总数
      topTableScrollHeight: 0, // 顶部表格滚动高度
      uploadFilesList: [], // 顶部表格当前行文件列表
      nowTabInfo: {}, // 当前tab信息
    }
  },
  mounted() {
    // 顶部高度需减去（上下padding高度40）（表格表头高度46）（分页高度42）（边框高度2）
    this.topTableScrollHeight = this.$refs.topTableArea.clientHeight - 40 - 46 - 42 - 2
    this.searchTopData()
  },
  methods: {
    // 查询顶部表格数据
    searchTopData(type) {
      if (type !== 'fy') {
        this.topTableSearchInfo.pageNo = 1
        this.topTableSearchInfo.pageSize = 10
      }
      outsourcedUnitUploadSearch(this.topTableSearchInfo).then(res => {
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
    // 顶部表格操作
    topTableOperate(type, row) {
      if (type === 'projectTableDownload') {
        this.$refs.ProjectFileDialog.visible = true
        this.$refs.ProjectFileDialog.parentId = row.id
        this.searchFiles(row.id)
      } else if (type === 'projectTableAccess') {
        const params = new FormData()
        params.append('id', row.id)
        outsourcedUnitConfirm(params).then(res => operateSuccess(this, res, 'top'))
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
