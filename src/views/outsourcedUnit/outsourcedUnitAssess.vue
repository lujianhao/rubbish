<template>
  <div class="project-page-tree">
    <div class="project-page-tree-right notree">
      <div class="project-page-tree-right-box" ref="topTableArea">
        <div style="margin-bottom: 10px;">
          <a-form-model layout="inline" ref="resetForm" :model="topTableSearchInfo">
            <a-form-model-item label="单位名称" prop="rUnit">
              <a-input placeholder="请填写单位名称" v-model="topTableSearchInfo.rUnit"/>
            </a-form-model-item>
            <a-form-model-item label="工程名称" prop="proName">
              <a-input placeholder="请填写工程名称" v-model="topTableSearchInfo.proName"/>
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" icon="search" @click="searchTopData">查询</a-button>
              <a-button type="primary" icon="sync" style="margin-left: 10px;" @click="searchFormReset">重置</a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
        <ProjectTable
            :nowTabInfo="tabsData[0]"
            :projectTableScrollNum="4"
            :projectTableSearchInfo="topTableSearchInfo"
            :projectTableScrollHeight="topTableScrollHeight"
            :projectTableColumns="topTableColumns"
            :projectTableData="topTableData"
            :projectTableTotal="topTableTotal"
            @projectTablePageChange="topTablePageChange"
            @projectTableRowClick="topTableRowClick"
        />
      </div>
      <div class="project-page-tree-right-box" ref="bottomTableArea">
        <ProjectTab v-if="bottomTableSearchInfo.id !== ''" :tabsData="tabsData" />
        <ProjectTable
            :nowTabInfo="tabsData[0]"
            :projectTableScrollNum="3"
            :projectTableAddBtn="true"
            :projectTableEditBtn="true"
            :projectTableDeleteBtn="true"
            :projectTableSubmitBtn="true"
            :projectTableUploadBtn="true"
            :projectTableSearchInfo="bottomTableSearchInfo"
            :projectTableScrollHeight="bottomTableScrollHeight"
            :projectTableColumns="bottomTableSearchInfo.id === '' ? [] : bottomTableColumns"
            :projectTableData="bottomTableData"
            :projectTableTotal="bottomTableTotal"
            @projectTableOperate="bottomTableOperate"
            @projectTablePageChange="bottomTablePageChange"
        />
      </div>
    </div>
    <BottomTableOperateDialog ref="BottomTableOperateDialog" :nowTabInfo="tabsData[0]" :bottomTableOperateDialogFlag="'outsourcedUnitAssess'" @operateSuccess="searchBottomTableData" />
    <ProjectFileDialog ref="ProjectFileDialog" :projectFileDialogFlag="'resumptionSubmit'" :fileShowType="'upload'" :uploadFilesList="uploadFilesList" @fileOperateSuccess="searchFiles" />
  </div>
</template>

<script>
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import ProjectTab from '@/components/ProjectComponents/ProjectTab'
import BottomTableOperateDialog from '@/components/ProjectComponents/BottomTableOperateDialog'
import ProjectFileDialog from '@/components/ProjectComponents/ProjectFileDialog'
import { getDictionaryDetails, uploadFileSearch } from '@/api/api'
import { outsourcedUnitAssessSearch, outsourcedUnitAssessSearch1, outsourcedUnitAssessDelete1, outsourcedUnitAssessSubmit1 } from '@/api/outsourcedUnit'
import { operateSuccess } from '@/utils/projectUtils'
import bottomTableColumns from '@/components/ProjectComponents/BottomTableColumns'
export default {
  components: {
    ProjectTable,
    ProjectTab,
    BottomTableOperateDialog,
    ProjectFileDialog
  },
  data() {
    return {
      topTableSearchInfo: {
        pageNo: 1,
        pageSize: 10,
        rUnit: '',
        proName: ''
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '外委单位', dataIndex: 'outsourceUnitName', align: 'center', ellipsis: true },
        { title: '工程名称', dataIndex: 'projectName', align: 'center', ellipsis: true },
        { title: '计划开始日期', dataIndex: 'planStartTime', align: 'center', ellipsis: true, sorter: true },
        { title: '计划截止日期', dataIndex: 'planStopTime', align: 'center', ellipsis: true, sorter: true }
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
      tabsData: [
        { index: 0, isActive: true, name: '工作评估', param: 'outsourcedUnitAssess', isSpecial: true }
      ] // tab数据
    }
  },
  mounted() {
    // 顶部高度需减去（上下padding高度40）（顶部搜索表单高度50）（表格表头高度46）（分页高度42）（边框高度2）
    this.topTableScrollHeight = this.$refs.topTableArea.clientHeight - 40 - 50 - 46 - 42 - 2
    // 底部高度需减去（上下padding高度40）（tab高度55）（顶部表格操作区域42）（表格表头高度46）（分页高度42）（边框高度2）
    this.bottomTableScrollHeight = this.$refs.bottomTableArea.clientHeight - 40 - 55 - 42 - 46 - 42 - 2
    this.searchDict()
    this.searchTopData()
  },
  methods: {
    // 查询数据字典事故清退类型数据
    searchDict() {
      getDictionaryDetails({ name: '事故清退类型' }).then(res => {
        if (res) this.$refs.BottomTableOperateDialog.sgqtlxSelectData = res
      })
    },
    // 查询顶部表格数据
    searchTopData(type) {
      if (type !== 'fy') {
        this.topTableSearchInfo.pageNo = 1
        this.topTableSearchInfo.pageSize = 10
      }
      this.bottomTableSearchInfo.id = ''
      this.bottomTableColumns = []
      this.bottomTableData = []
      outsourcedUnitAssessSearch(this.topTableSearchInfo).then(res => {
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
      this.bottomTableColumns = bottomTableColumns['outsourcedUnitAssess']
      outsourcedUnitAssessSearch1(this.bottomTableSearchInfo).then(res => {
        if (res) {
          this.bottomTableData = res.records
          this.bottomTableTotal = res.total
        }
      })
    },
    // 底部表格操作
    bottomTableOperate(type, row) {
      const nowDialog = this.$refs.BottomTableOperateDialog
      if (type === 'projectTableAdd') {
        nowDialog.visible = true
        nowDialog.title = '新增评估记录'
        nowDialog.type = type
        nowDialog.form.fileListId = this.bottomTableSearchInfo.id
      } else if (type === 'projectTableEdit') {
        nowDialog.visible = true
        nowDialog.title = '编辑评估记录'
        nowDialog.type = type
        nowDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableSubmit') {
        const params = new FormData()
        params.append('id', row.id)
        outsourcedUnitAssessSubmit1(params).then(res => operateSuccess(this, res, 'bottom'))
      } else if (type === 'projectTableDelete') {
        const params = new FormData()
        params.append('id', row.id)
        outsourcedUnitAssessDelete1(params).then(res => operateSuccess(this, res, 'bottom'))
      } else if (type === 'projectTableUpload') {
        this.$refs.ProjectFileDialog.visible = true
        this.$refs.ProjectFileDialog.parentId = row.id
        this.searchFiles(row.id)
      }
    },
    // 查询顶部表格当前行文件列表
    searchFiles(id) {
      uploadFileSearch({ id: id }).then(res => {
        if (res) this.uploadFilesList = res
      })
    },
    // 底部表格分页改变
    bottomTablePageChange(type, value) {
      this.bottomTableSearchInfo[type] = value
      this.searchBottomTableData((type === 'pageNo' || type === 'pageSize') ? 'fy' : undefined)
    }
  }
}
</script>
