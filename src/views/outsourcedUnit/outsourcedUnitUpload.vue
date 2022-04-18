<template>
  <div class="project-page-tree">
    <div class="project-page-tree-right notree">
      <div class="project-page-tree-right-box" ref="topTableArea" style="height: 100%">
        <ProjectTable
            :projectTableScrollNum="12"
            :nowTabInfo="nowTabInfo"
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
    <ProjectFileDialog ref="ProjectFileDialog" :projectFileDialogFlag="'outsourcedUnitUpload'" :fileShowType="'upload'" :uploadFilesList="uploadFilesList" @fileOperateSuccess="searchFiles" />
  </div>
</template>

<script>
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import ProjectFileDialog from '@/components/ProjectComponents/ProjectFileDialog'
import { outsourcedUnitUploadSearch } from '@/api/outsourcedUnit'
import { uploadFileSearch } from '@/api/api'
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
    //顶部表格操作
    topTableOperate(type, row) {
      this.$refs.ProjectFileDialog.visible = true
      this.$refs.ProjectFileDialog.parentId = row.id
      this.searchFiles(row.id)
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
