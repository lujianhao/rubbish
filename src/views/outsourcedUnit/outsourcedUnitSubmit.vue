<template>
  <div class="project-page-tree">
    <div class="project-page-tree-right notree">
      <div class="project-page-tree-right-box" ref="topTableArea" style="height: 100%">
        <div>
          <a-form-model layout="inline" ref="resetForm" :model="topTableSearchInfo">
            <a-form-model-item label="外委队名称" prop="unitName">
              <a-input placeholder="请输入外委队名称" v-model="topTableSearchInfo.unitName" />
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
            :projectTableAddBtn="true"
            :projectTableEditBtn="true"
            :projectTableDeleteBtn="true"
            :projectTableSubmitBtn="true"
            :projectTableUploadBtn="true"
            :projectTableDetailsBtn="true"
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
    <TopTableOperateDialog ref="TopTableOperateDialog" :topTableOperateDialogFlag="'outsourcedUnitSubmit'" @operateSuccess="searchTopData" />
    <ProjectFileDialog ref="ProjectFileDialog" :projectFileDialogFlag="'outsourcedUnitSubmit'" :fileShowType="'upload'" :uploadFilesList="uploadFilesList" @fileOperateSuccess="searchFiles" />
    <DetailsDialog ref="DetailsDialog" />
  </div>
</template>

<script>
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import TopTableOperateDialog from '@/components/ProjectComponents/TopTableOperateDialog'
import ProjectFileDialog from '@/components/ProjectComponents/ProjectFileDialog'
import DetailsDialog from '@/components/ProjectComponents/DetailsDialog'
import { uploadFileSearch, getDictionaryDetails } from '@/api/api'
import { outsourcedUnitSubmitSearch, outsourcedUnitSubmitDelete, outsourcedUnitSubmitSubmit } from '@/api/outsourcedUnit'
import { operateSuccess } from '@/utils/projectUtils'
import detailsData from '@/components/ProjectComponents/DetailsData'
export default {
  components: {
    ProjectTable,
    TopTableOperateDialog,
    ProjectFileDialog,
    DetailsDialog
  },
  data() {
    return {
      topTableSearchInfo: {
        pageNo: 1,
        pageSize: 10,
        unitName: ''
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '外委队名称', dataIndex: 'outsourceUnitName', align: 'center', ellipsis: true },
        { title: '施工单位', dataIndex: 'constructionUnit', align: 'center', ellipsis: true },
        { title: '单位类型', dataIndex: 'unitType', align: 'center', ellipsis: true },
        { title: '单位地点', dataIndex: 'unitLocation', align: 'center', ellipsis: true },
        { title: '工程名称', dataIndex: 'projectName', align: 'center', ellipsis: true },
        { title: '状态', dataIndex: 'requestStatus', align: 'center', width: 120 },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 400 }
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
    // 顶部高度需减去（上下padding高度40）（顶部搜索表单高度40）（顶部表格操作区域42）（表格表头高度46）（分页高度42）（边框高度2）
    this.topTableScrollHeight = this.$refs.topTableArea.clientHeight - 40 - 40 - 42 - 46 - 42 - 2
    this.searchDict()
    this.searchTopData()
  },
  methods: {
    // 查询数据字典外委单位类型数据
    searchDict() {
      getDictionaryDetails({ name: '外委单位类型' }).then(res => {
        if (res) this.$refs.TopTableOperateDialog.dwlxSelectData = res
      })
    },
    // 查询顶部表格数据
    searchTopData(type) {
      if (type !== 'fy') {
        this.topTableSearchInfo.pageNo = 1
        this.topTableSearchInfo.pageSize = 10
      }
      outsourcedUnitSubmitSearch(this.topTableSearchInfo).then(res => {
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
      if (type === 'projectTableDetails') {
        this.$refs.DetailsDialog.visible = true
        this.$refs.DetailsDialog.title = '外委准入申请单详情'
        this.$refs.DetailsDialog.detailsData = detailsData['outsourcedUnitSubmit']
        this.$refs.DetailsDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableAdd') {
        nowDialog.visible = true
        nowDialog.type = type
        nowDialog.title = '新增外委准入申请单'
        nowDialog.form = { constructionUnit: '' }
      } else if (type === 'projectTableEdit') {
        nowDialog.visible = true
        nowDialog.type = type
        nowDialog.title = '编辑外委准入申请单'
        nowDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableUpload') {
        this.$refs.ProjectFileDialog.visible = true
        this.$refs.ProjectFileDialog.parentId = row.id
        this.searchFiles(row.id)
      } else if (type === 'projectTableSubmit') {
        const params = new FormData()
        params.append('id', row.id)
        outsourcedUnitSubmitSubmit(params).then(res => operateSuccess(this, res, 'top'))
      } else if (type === 'projectTableDelete') {
        const params = new FormData()
        params.append('id', row.id)
        outsourcedUnitSubmitDelete(params).then(res => operateSuccess(this, res, 'top'))
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
