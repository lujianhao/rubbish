<template>
  <div class="project-page-tree">
    <div class="project-page-tree-left">
      <a-tree
          show-line
          :tree-data="treeData"
          :replaceFields="{ title: 'name', key: 'newKey' }"
          @select="treeSelect"
      />
    </div>
    <div class="project-page-tree-right">
      <div class="project-page-tree-right-box" ref="topTableArea">
        <div v-if="topTableSearchInfo.id !== ''">
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
            :nowTabInfo="tabsData[4]"
            :projectTableAddBtn="true"
            :projectTableEditBtn="true"
            :projectTableDeleteBtn="true"
            :projectTableImportBtn="true"
            :projectTableSearchInfo="topTableSearchInfo"
            :projectTableScrollHeight="topTableScrollHeight"
            :projectTableColumns="topTableSearchInfo.id === '' ? [] : topTableColumns"
            :projectTableData="topTableData"
            :projectTableTotal="topTableTotal"
            @projectTableOperate="topTableOperate"
            @projectTablePageChange="topTablePageChange"
            @projectTableRowClick="topTableRowClick"
        />
      </div>
      <div class="project-page-tree-right-box" ref="bottomTableArea">
        <ProjectTab v-if="bottomTableSearchInfo.id !== ''" :tabsData="tabsData" @tabChange="tabChange" />
        <ProjectTable
            :projectTableScrollNum="3"
            :nowTabInfo="nowTabInfo"
            :projectTableDetailsBtn="true"
            :projectTableAddBtn="true"
            :projectTableEditBtn="true"
            :projectTableDeleteBtn="true"
            :projectTableResetBtn="true"
            :projectTableRemoveBtn="true"
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
    <TopTableOperateDialog ref="TopTableOperateDialog" :topTableOperateDialogFlag="'workshop'" @operateSuccess="searchTopData" />
    <BottomTableOperateDialog ref="BottomTableOperateDialog" :nowTabInfo="nowTabInfo" :bottomTableOperateDialogFlag="'workshop'" @operateSuccess="searchBottomTableData" />
    <DetailsDialog ref="DetailsDialog" />
    <RoleAddDialog ref="RoleAddDialog" @selectSuccess="searchBottomTableData" />
    <ProjectImportDialog ref="ProjectImportDialog" @importSuccess="searchTopData" />
    <ProjectUnitDialog ref="ProjectUnitDialog" :unitType="3" :unitSelectType="'single'" @unitSelectSuccess="unitSelectSuccess" />
  </div>
</template>

<script>
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import ProjectTab from '@/components/ProjectComponents/ProjectTab'
import TopTableOperateDialog from '@/components/ProjectComponents/TopTableOperateDialog'
import BottomTableOperateDialog from '@/components/ProjectComponents/BottomTableOperateDialog'
import DetailsDialog from '@/components/ProjectComponents/DetailsDialog'
import RoleAddDialog from '@/components/ProjectComponents/RoleAddDialog'
import ProjectImportDialog from '@/components/ProjectComponents/ProjectImportDialog'
import ProjectUnitDialog from '@/components/ProjectComponents/ProjectUnitDialog'
import { getTabsList, getDictionaryDetails } from '@/api/api'
import { branchSearch1, branchDelete1, workshopSearch1, workshopDelete1, workshopSearch2, workshopDelete2, workshopReset, workshopRemove, workshopSearch3, workshopDelete3, workshopSearch4, workshopDelete4, workshopSearch5, workshopDelete5 } from '@/api/basic'
import { operateSuccess } from '@/utils/projectUtils'
import bottomTableColumns from '@/components/ProjectComponents/BottomTableColumns'
import detailsData from '@/components/ProjectComponents/DetailsData'
export default {
  components: {
    ProjectTable,
    ProjectTab,
    TopTableOperateDialog,
    BottomTableOperateDialog,
    DetailsDialog,
    RoleAddDialog,
    ProjectImportDialog,
    ProjectUnitDialog
  },
  data() {
    return {
      topTableSearchInfo: {
        id: '',
        pageNo: 1,
        pageSize: 10,
        name: ''
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '编号', dataIndex: 'num', align: 'center', width: 120 },
        { title: '名称', dataIndex: 'name', align: 'center', ellipsis: true },
        { title: '安全管理单位', dataIndex: 'safeManagementUnit', align: 'center' },
        { title: '风险排查单位', dataIndex: 'riskInvestigationUnit', align: 'center' },
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
      tabsData: [], // tab数据
      nowTabInfo: {}, // 当前tab信息
      unitRemoveInfo: {} // 单位移动信息
    }
  },
  computed: {
    treeData () {
      return JSON.parse(localStorage.getItem('unitInfo12'))
    }
  },
  mounted() {
    // 顶部高度需减去（上下padding高度40）（顶部搜索表单高度40）（顶部表格操作区域42）（表格表头高度46）（分页高度42）（边框高度2）
    this.topTableScrollHeight = this.$refs.topTableArea.clientHeight - 40 - 40 - 42 - 46 - 42 - 2
    // 底部高度需减去（上下padding高度40）（tab高度55）（顶部表格操作区域42）（表格表头高度46）（分页高度42）（边框高度2）
    this.bottomTableScrollHeight = this.$refs.bottomTableArea.clientHeight - 40 - 55 - 42 - 46 - 42 - 2
    this.searchTabsData()
    this.searchSelectData()
  },
  methods: {
    // 查询子表新增下拉框数据
    searchSelectData() {
      workshopSearch1({ pageNo: 1, pageSize: 999 }).then(res => {
        if (res) this.$refs.BottomTableOperateDialog.szbzSelectData = res.records
      })
      workshopSearch4({ pageNo: 1, pageSize: 999 }).then(res => {
        if (res) this.$refs.BottomTableOperateDialog.gwgzSelectData = res.records
      })
      workshopSearch5({ pageNo: 1, pageSize: 999 }).then(res => {
        if (res) this.$refs.BottomTableOperateDialog.zwSelectData = res.records
      })
      getDictionaryDetails({ name: '人员级别' }).then(res => {
        if (res) this.$refs.BottomTableOperateDialog.ryjbSelectData = res
      })
      getDictionaryDetails({ name: '排查级别' }).then(res => {
        if (res) this.$refs.BottomTableOperateDialog.pcjbSelectData = res
      })
    },
    // 根据系统二级菜单查询tabs标签数据
    searchTabsData() {
      getTabsList({ menus: 'thirdLevelArchives' }).then(res => {
        if (res) {
          res.forEach((item, index) => {
            item.index = index
            item.isActive = index === 0
            item.noEdit = item.param === 'thirdLevelOrganization'
            item.details = item.isSpecial = item.isImport = item.isReset = item.isRemove = item.param === 'userProfile'
          })
          this.tabsData = res
          this.nowTabInfo = res[0]
        }
      })
    },
    // 树数据点击
    treeSelect(selectedKeys) {
      if (selectedKeys[0].split('/').length > 1) {
        this.topTableSearchInfo.id = selectedKeys[0].split('/')[1].split('-')[0]
        this.searchTopData()
      } else {
        this.topTableSearchInfo.id = ''
        this.topTableData = []
      }
      this.tabsData.forEach((itm, idx) => itm.isActive = idx === 0)
      this.nowTabInfo = this.tabsData[0]
      this.bottomTableSearchInfo.id = ''
      this.bottomTableColumns = []
      this.bottomTableData = []
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
      branchSearch1(this.topTableSearchInfo).then(res => {
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
        nowDialog.title = '新增车间信息'
        nowDialog.form = { secondArchivesId: this.topTableSearchInfo.id }
      } else if (type === 'projectTableEdit') {
        nowDialog.visible = true
        nowDialog.type = type
        nowDialog.title = '编辑车间信息'
        nowDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableDelete') {
        branchDelete1({ id: row.id }).then(res => operateSuccess(this, res, 'top'))
      } else if (type === 'projectTableImport') {
        if (this.bottomTableSearchInfo.id === '') {
          this.$message.info('请选择三级单位！')
        } else {
          this.$refs.ProjectImportDialog.visible = true
          this.$refs.ProjectImportDialog.keyword = `${this.bottomTableSearchInfo.id};${this.topTableSearchInfo.id}`
          this.$refs.ProjectImportDialog.sheetName = '班组信息人员信息'
        }
      }
    },
    // 顶部表格分页改变
    topTablePageChange(type, value) {
      this.topTableSearchInfo[type] = value
      this.searchTopData((type === 'pageNo' || type === 'pageSize') ? 'fy' : undefined)
    },
    // 顶部表格行点击
    topTableRowClick(row) {
      this.bottomTableSearchInfo.id = this.$refs.RoleAddDialog.parentId = row.id
      this.searchBottomTableData()
    },
    // 查询底部表格数据
    searchBottomTableData(type) {
      if (type !== 'fy') {
        this.bottomTableSearchInfo.pageNo = 1
        this.bottomTableSearchInfo.pageSize = 10
      }
      this.bottomTableColumns = bottomTableColumns[this.nowTabInfo.param]
      switch (this.nowTabInfo.param) {
        case 'teamFile':
          workshopSearch1(this.bottomTableSearchInfo).then(res => this.bottomShowResult(res))
          break
        case 'userProfile':
          workshopSearch2(this.bottomTableSearchInfo).then(res => this.bottomShowResult(res))
          break
        case 'thirdLevelOrganization':
          workshopSearch3(this.bottomTableSearchInfo).then(res => {
            if (res) {
              this.bottomTableData = res.data
              this.bottomTableTotal = res.count
            }
          })
          break
        case 'thirdLevelJob':
          workshopSearch4(this.bottomTableSearchInfo).then(res => this.bottomShowResult(res))
          break
        case 'thirdLevelPosition':
          workshopSearch5(this.bottomTableSearchInfo).then(res => this.bottomShowResult(res))
          break
      }
    },
    // 底部表格结果展示
    bottomShowResult(res) {
      if (res) {
        this.bottomTableData = res.records
        this.bottomTableTotal = res.total
      }
    },
    // tab切换
    tabChange(item) {
      this.nowTabInfo = item
      this.tabsData.forEach((itm, idx) => {
        itm.isActive = idx === item.index
      })
      this.searchBottomTableData()
    },
    // 底部表格操作
    bottomTableOperate(type, row) {
      const nowDialog = this.$refs.BottomTableOperateDialog
      if (type === 'projectTableDetails') {
        this.$refs.DetailsDialog.visible = true
        this.$refs.DetailsDialog.title = '用户档案详情'
        this.$refs.DetailsDialog.detailsData = detailsData['workshop']
        this.$refs.DetailsDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableAdd') {
        if (this.nowTabInfo.param === 'thirdLevelOrganization') {
          this.$refs.RoleAddDialog.visible = true
          this.$refs.RoleAddDialog.form.id = this.bottomTableSearchInfo.id
          this.$refs.RoleAddDialog.title = '所属权限选择'
          this.$refs.RoleAddDialog.type = 'workshopPermission'
          this.$refs.RoleAddDialog.searchData(this.$refs.RoleAddDialog.type)
        } else {
          nowDialog.visible = true
          switch (this.nowTabInfo.param) {
            case 'teamFile':
              nowDialog.title = '新增班组档案'
              break
            case 'userProfile':
              nowDialog.title = '新增用户档案'
              break
            case 'thirdLevelJob':
              nowDialog.title = '新增岗位记录'
              break
            case 'thirdLevelPosition':
              nowDialog.title = '新增职务记录'
              break
          }
          nowDialog.form = { threeInstitutionsId: this.bottomTableSearchInfo.id }
          nowDialog.type = type
        }
      } else if (type === 'projectTableEdit') {
        nowDialog.visible = true
        nowDialog.title = '编辑履职内容'
        nowDialog.type = type
        nowDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableDelete') {
        switch (this.nowTabInfo.param) {
          case 'teamFile':
            workshopDelete1({ id: row.id }).then(res => operateSuccess(this, res, 'bottom'))
            break
          case 'userProfile':
            workshopDelete2({ id: row.id }).then(res => operateSuccess(this, res, 'bottom'))
            break
          case 'thirdLevelOrganization':
            workshopDelete3({ id: row.id }).then(res => operateSuccess(this, res, 'bottom'))
            break
          case 'thirdLevelJob':
            workshopDelete4({ id: row.id }).then(res => operateSuccess(this, res, 'bottom'))
            break
          case 'thirdLevelPosition':
            workshopDelete5({ id: row.id }).then(res => operateSuccess(this, res, 'bottom'))
            break
        }
      } else if (type === 'projectTableReset') {
        const params = new FormData()
        params.append('id', row.id)
        workshopReset(params).then(res => {
          if (res) {
            this.$message.success(res)
            this.searchBottomTableData()
          }
        })
      } else if (type === 'projectTableRemove') {
        this.$refs.ProjectUnitDialog.visible = true
        this.unitRemoveInfo.userId = row.id
      }
    },
    //单位选择成功
    unitSelectSuccess(unit) {
      this.unitRemoveInfo.thirdId = unit[0].split('/')[2].split('-')[0]
      const params = new FormData()
      for (const item in this.unitRemoveInfo) {
        params.append(item, this.unitRemoveInfo[item])
      }
      workshopRemove(params).then(res => {
        if (res) {
          this.$message.success(res)
          this.searchBottomTableData()
        }
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
