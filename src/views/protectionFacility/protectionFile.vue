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
        <div v-if="topTableSearchInfo.id !== ''" >
          <a-form-model layout="inline" ref="resetForm" :model="topTableSearchInfo">
            <a-form-model-item label="编号" prop="number">
              <a-input placeholder="请输入编号" v-model="topTableSearchInfo.number" />
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" icon="search" @click="searchTopData">查询</a-button>
              <a-button type="primary" icon="sync" style="margin-left: 10px;" @click="searchFormReset">重置</a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
        <ProjectTable
            :projectTableScrollNum="4"
            :nowTabInfo="tabsData[0]"
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
            :projectTableScrollNum="4"
            :nowTabInfo="tabsData[0]"
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
    <TopTableOperateDialog ref="TopTableOperateDialog" :topTableOperateDialogFlag="'protectionFile'" @operateSuccess="searchTopData" />
    <BottomTableOperateDialog ref="BottomTableOperateDialog" :nowTabInfo="nowTabInfo" :bottomTableOperateDialogFlag="'protectionFile'" @operateSuccess="searchBottomTableData" />
    <ProjectImportDialog ref="ProjectImportDialog" @importSuccess="searchTopData" />
  </div>
</template>

<script>
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import ProjectTab from '@/components/ProjectComponents/ProjectTab'
import TopTableOperateDialog from '@/components/ProjectComponents/TopTableOperateDialog'
import BottomTableOperateDialog from '@/components/ProjectComponents/BottomTableOperateDialog'
import ProjectImportDialog from '@/components/ProjectComponents/ProjectImportDialog'
import { getTabsList } from '@/api/api'
import { operateSuccess } from '@/utils/projectUtils'
import bottomTableColumns from '@/components/ProjectComponents/BottomTableColumns'
import { protectionFileSearch,protectionFileDelete,protectionFileSearch1,protectionFileSearch2,protectionFileDelete1,protectionFileDelete2,protectionFilePostSearch } from '@/api/protectionFacility'
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
        id: '',
        pageNo: 1,
        pageSize: 10,
        number: ''
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '编号', dataIndex: 'number', align: 'center', width: 120 },
        { title: '名称', dataIndex: 'facilityName', align: 'center', ellipsis: true },
        { title: '安装位置', dataIndex: 'installLocation', align: 'center', ellipsis: true },
        { title: '使用状态', dataIndex: 'useStatus', align: 'center', ellipsis: true },
        { title: '用途', dataIndex: 'use', align: 'center', ellipsis: true },
        { title: '参数描述', dataIndex: 'parameterDescription', align: 'center', ellipsis: true },
        { title: '责任单位与负责人', dataIndex: 'responsibleUnit', align: 'center', ellipsis: true },
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
      nowTabInfo: {} // 当前tab信息
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
      protectionFilePostSearch({ pageNo: 1, pageSize: 999 }).then(res => {
        if (res) this.$refs.BottomTableOperateDialog.postNameSelectData = res.records
      })
    },
    // 根据系统二级菜单查询tabs标签数据
    searchTabsData() {
      getTabsList({ menus: 'facilitySafetyProtection' }).then(res => {
        if (res) {
          res.forEach((item, index) => {
            item.index = index
            item.isActive = index === 0
            item.isSpecial = item.param === 'facilityInspectionPost'
            item.isImport = true
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
      protectionFileSearch(this.topTableSearchInfo).then(res => {
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
      const erSanData = JSON.parse(localStorage.getItem('unitInfo23'))
      erSanData.forEach(item => {
        if (item.id === this.topTableSearchInfo.id) nowDialog.cjSelectData = item.thirdLevelArchivesList
      })
      if (type === 'projectTableAdd') {
        nowDialog.visible = true
        nowDialog.type = type
        nowDialog.title = '新增防护设施档案'
        nowDialog.form = { secondId: this.topTableSearchInfo.id }
      } else if (type === 'projectTableEdit') {
        nowDialog.visible = true
        nowDialog.type = type
        nowDialog.title = '编辑防护设施档案'
        nowDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableDelete') {
        protectionFileDelete({ id: row.id }).then(res => operateSuccess(this, res, 'top'))
      } else if (type === 'projectTableImport') {
        this.$refs.ProjectImportDialog.visible = true
        this.$refs.ProjectImportDialog.keyword = undefined
        this.$refs.ProjectImportDialog.sheetName = '防护设施清单'
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
      this.bottomTableColumns = bottomTableColumns[this.nowTabInfo.param]
      if (this.nowTabInfo.param === 'facilityInspectionDetails') {
        protectionFileSearch1(this.bottomTableSearchInfo).then(res => {
          if (res) {
            this.bottomTableData = res.records
            this.bottomTableTotal = res.total
          }
        })
      } else {
        protectionFileSearch2(this.bottomTableSearchInfo).then(res => {
          if (res) {
            this.bottomTableData = res.records
            this.bottomTableTotal = res.total
          }
        })
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
      if (type === 'projectTableAdd') {
        nowDialog.visible = true
        nowDialog.title = '新增' + this.nowTabInfo.name
        nowDialog.type = type
        nowDialog.form.safetyId = this.bottomTableSearchInfo.id
      } else if (type === 'projectTableEdit') {
        nowDialog.visible = true
        nowDialog.title = '编辑' + this.nowTabInfo.name
        nowDialog.type = type
        nowDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableDelete') {
        if (this.nowTabInfo.param === 'facilityInspectionDetails') {
          protectionFileDelete1({ id: row.id }).then(res => operateSuccess(this, res, 'bottom'))
        } else {
          protectionFileDelete2({ id: row.id }).then(res => operateSuccess(this, res, 'bottom'))
        }
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
