<template>
  <div class="project-page-tree">
    <div class="project-page-tree-right notree">
      <div class="project-page-tree-right-box" ref="topTableArea">
        <div>
          <a-form-model layout="inline" ref="resetForm" :model="topTableSearchInfo">
            <a-form-model-item label="名称" prop="name">
              <a-input placeholder="请输入名称" v-model="topTableSearchInfo.name" />
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" icon="search" @click="searchTopData">查询</a-button>
              <a-button type="primary" icon="sync" style="margin-left: 10px;" @click="searchFormReset">重置</a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
        <ProjectTable
            :projectTableScrollNum="3"
            :nowTabInfo="tabsData[0]"
            :projectTableImportBtn="true"
            :projectTableAddBtn="true"
            :projectTableEditBtn="true"
            :projectTableDeleteBtn="true"
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
            :nowTabInfo="tabsData[0]"
            :projectTableScrollNum="3"
            :projectTableAddBtn="true"
            :projectTableEditBtn="true"
            :projectTableDeleteBtn="true"
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
    <TopTableOperateDialog ref="TopTableOperateDialog" :topTableOperateDialogFlag="'branch'" @operateSuccess="searchTopData" />
    <BottomTableOperateDialog ref="BottomTableOperateDialog" :nowTabInfo="tabsData[0]" :bottomTableOperateDialogFlag="'branch'" @operateSuccess="searchBottomTableData" />
    <ProjectImportDialog ref="ProjectImportDialog" @importSuccess="searchTopData" />
  </div>
</template>

<script>
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import ProjectTab from '@/components/ProjectComponents/ProjectTab'
import TopTableOperateDialog from '@/components/ProjectComponents/TopTableOperateDialog'
import BottomTableOperateDialog from '@/components/ProjectComponents/BottomTableOperateDialog'
import ProjectImportDialog from '@/components/ProjectComponents/ProjectImportDialog'
import { branchSearch, branchDelete, branchSearch1, branchDelete1 } from '@/api/basic'
import { operateSuccess } from '@/utils/projectUtils'
import bottomTableColumns from '@/components/ProjectComponents/BottomTableColumns'
export default {
  components: {
    ProjectTable,
    ProjectTab,
    TopTableOperateDialog,
    BottomTableOperateDialog,
    ProjectImportDialog
  },
  data() {
    return {
      topTableSearchInfo: {
        pageNo: 1,
        pageSize: 10,
        name: ''
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '编号', dataIndex: 'num', align: 'center', width: 120 },
        { title: '名称', dataIndex: 'name', align: 'center', ellipsis: true },
        { title: '风险排查单位', dataIndex: 'riskInvestigationUnit', align: 'center' },
        { title: '安全管理单位', dataIndex: 'safeManagementUnit', align: 'center' },
        { title: '安全天数起始日期', dataIndex: 'safeDate', align: 'center', ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 160 }
      ], // 顶部表格表头配置
      topTableData: [], // 顶部表格数据
      topTableTotal: 0, // 顶部表格总数
      topTableScrollHeight: 0, // 顶部表格滚动高度
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
        { index: 0, isActive: true, name: '三级机构', param: 'branch', isSpecial: true, isImport: true }
      ] // tab数据
    }
  },
  mounted() {
    // 顶部高度需减去（上下padding高度40）（顶部搜索表单高度40）（顶部表格操作区域42）（表格表头高度46）（分页高度42）（边框高度2）
    this.topTableScrollHeight = this.$refs.topTableArea.clientHeight - 40 - 40 - 42 - 46 - 42 - 2
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
      this.bottomTableSearchInfo.id = ''
      this.bottomTableColumns = []
      this.bottomTableData = []
      branchSearch(this.topTableSearchInfo).then(res => {
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
      const nowDialog = this.$refs.TopTableOperateDialog
      if (type === 'projectTableAdd') {
        nowDialog.visible = true
        nowDialog.type = type
        nowDialog.title = '新增二级机构'
      } else if (type === 'projectTableEdit') {
        nowDialog.visible = true
        nowDialog.type = type
        nowDialog.title = '编辑二级机构'
        nowDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableDelete') {
        branchDelete({ id: row.id }).then(res => operateSuccess(this, res, 'top'))
      } else if (type === 'projectTableImport') {
        this.$refs.ProjectImportDialog.visible = true
        this.$refs.ProjectImportDialog.keyword = JSON.parse(localStorage.getItem('unitInfo12'))[0].id
        this.$refs.ProjectImportDialog.sheetName = '二三级机构信息'
      }
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
      this.bottomTableColumns = bottomTableColumns['branch']
      branchSearch1(this.bottomTableSearchInfo).then(res => {
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
        nowDialog.title = '新增三级机构'
        nowDialog.type = type
        nowDialog.form.secondArchivesId = this.bottomTableSearchInfo.id
      } else if (type === 'projectTableEdit') {
        nowDialog.visible = true
        nowDialog.title = '编辑三级机构'
        nowDialog.type = type
        nowDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableDelete') {
        branchDelete1({ id: row.id }).then(res => operateSuccess(this, res, 'bottom'))
      }
    },
    // 底部表格分页改变
    bottomTablePageChange(type, value) {
      this.bottomTableSearchInfo[type] = value
      this.searchBottomTableData((type === 'pageNo' || type === 'pageSize') ? 'fy' : undefined)
    }
  }
}
</script>
