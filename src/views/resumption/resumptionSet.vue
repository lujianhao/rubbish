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
            <a-form-model-item label="职务" prop="position">
              <a-input placeholder="请输入职务" v-model="topTableSearchInfo.position" />
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" icon="search" @click="searchTopData">查询</a-button>
              <a-button type="primary" icon="sync" style="margin-left: 10px;" @click="searchFormReset">重置</a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
        <ProjectTable
            :projectTableScrollNum="3"
            :nowTabInfo="tabsData[1]"
            :projectTableAddBtn="true"
            :projectTableEditBtn="true"
            :projectTableDeleteBtn="true"
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
    <TopTableOperateDialog ref="TopTableOperateDialog" :topTableOperateDialogFlag="'resumptionSet'" @operateSuccess="searchTopData" />
    <BottomTableOperateDialog ref="BottomTableOperateDialog" :nowTabInfo="nowTabInfo" :bottomTableOperateDialogFlag="'resumptionSet'" @operateSuccess="searchBottomTableData" />
    <ResumptionUserDialog ref="ResumptionUserDialog" @addSuccess="searchBottomTableData" />
  </div>
</template>

<script>
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import ProjectTab from '@/components/ProjectComponents/ProjectTab'
import TopTableOperateDialog from '@/components/ProjectComponents/TopTableOperateDialog'
import BottomTableOperateDialog from '@/components/ProjectComponents/BottomTableOperateDialog'
import ResumptionUserDialog from '@/components/ProjectComponents/ResumptionUserDialog'
import { getTabsList } from '@/api/api'
import { resumptionSetSearch, resumptionSetDelete, resumptionSetSearch12, resumptionSetDelete12, resumptionSetUnit3 } from '@/api/resumption'
import { operateSuccess } from '@/utils/projectUtils'
import bottomTableColumns from '@/components/ProjectComponents/BottomTableColumns'
export default {
  components: {
    ProjectTable,
    ProjectTab,
    TopTableOperateDialog,
    BottomTableOperateDialog,
    ResumptionUserDialog
  },
  data() {
    return {
      topTableSearchInfo: {
        id: '',
        pageNo: 1,
        pageSize: 10,
        position: ''
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '车间名称', dataIndex: 'thirdInstitutionsName', align: 'center', ellipsis: true },
        { title: '职务', dataIndex: 'position', align: 'center', ellipsis: true },
        { title: '修订日期', dataIndex: 'revisionDate', align: 'center', ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 160 }
      ], // 顶部表格表头配置
      topTableData: [], // 顶部表格数据
      topTableTotal: 0, // 顶部表格总数
      topTableScrollHeight: 0, // 顶部表格滚动高度
      bottomTableSearchInfo: {
        id: '',
        pageNo: 1,
        pageSize: 10,
        column: '',
        isAsc: false,
        param: ''
      }, // 底部表格查询信息
      bottomTableColumns: [], // 底部表格表头配置
      bottomTableData: [], // 底部表格数据
      bottomTableTotal: 0, // 底部表格总数
      bottomTableScrollHeight: 0, // 底部表格滚动高度
      tabsData: [], // tab数据
      nowTabInfo: {}, // 当前tab信息
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
  },
  methods: {
    // 根据系统二级菜单查询tabs标签数据
    searchTabsData() {
      getTabsList({ menus: 'completeDuty' }).then(res => {
        if (res) {
          res.forEach((item, index) => {
            item.index = index
            item.isActive = index === 0
            item.noEdit = item.param === 'users'
          })
          this.tabsData = res
          this.nowTabInfo = res[0]
          this.bottomTableSearchInfo.param = res[0].param
        }
      })
    },
    // 树数据点击
    treeSelect(selectedKeys) {
      if (selectedKeys[0].split('/').length > 1) {
        this.topTableSearchInfo.id = this.$refs.TopTableOperateDialog.secondId = selectedKeys[0].split('/')[1].split('-')[0]
        this.searchUnit3Data()
        this.searchTopData()
        const unit23 = JSON.parse(localStorage.getItem('unitInfo23'))
        unit23.forEach(item => {
          if (item.id === this.topTableSearchInfo.id) {
            this.$refs.TopTableOperateDialog.cjmcSelectData = item.thirdLevelArchivesList
          }
        })
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
    // 查询三级单位列表数据
    searchUnit3Data() {
      resumptionSetUnit3({ secondArchivesId: this.topTableSearchInfo.id }).then(res => {
        if (res) {
          res.forEach(item => {
            item.isActive = false
          })
          this.$refs.ResumptionUserDialog.unit3List = res
        }
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
      resumptionSetSearch(this.topTableSearchInfo).then(res => {
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
        nowDialog.title = '新增干部履职标准'
        nowDialog.form = { secondArchivesId: this.topTableSearchInfo.id, position: undefined }
      } else if (type === 'projectTableEdit') {
        nowDialog.visible = true
        nowDialog.type = type
        nowDialog.title = '编辑干部履职标准'
        nowDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableDelete') {
        resumptionSetDelete({ id: row.id }).then(res => operateSuccess(this, res, 'top'))
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
      this.bottomTableSearchInfo.param = this.nowTabInfo.param
      resumptionSetSearch12(this.bottomTableSearchInfo).then(res => {
        if (res) {
          this.bottomTableData = res.records
          this.bottomTableTotal = res.total
        }
      })
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
        if (this.nowTabInfo.param === 'users') {
          this.$refs.ResumptionUserDialog.visible = true
          this.$refs.ResumptionUserDialog.parentId = this.bottomTableSearchInfo.id
        } else if (this.nowTabInfo.param === 'workDetails') {
          nowDialog.visible = true
          nowDialog.title = '新增履职内容'
          nowDialog.type = type
          nowDialog.form = {
            completeDutyStandardId: this.bottomTableSearchInfo.id,
            num: 1
          }
        }
      } else if (type === 'projectTableEdit') {
        nowDialog.visible = true
        nowDialog.title = '编辑履职内容'
        nowDialog.type = type
        nowDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableDelete') {
        resumptionSetDelete12({ id: row.id, param: this.nowTabInfo.param }).then(res => operateSuccess(this, res, 'bottom'))
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
