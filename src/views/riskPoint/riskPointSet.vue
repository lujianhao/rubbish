<template>
  <div class="project-page-tree">
    <div class="project-page-tree-right notree">
      <div class="project-page-tree-right-box" ref="topTableArea">
        <div>
          <a-form-model layout="inline" ref="resetForm" :model="topTableSearchInfo">
            <a-form-model-item label="地点" prop="place">
              <a-input placeholder="请输入地点" v-model="topTableSearchInfo.place" />
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
            :projectTableColumns="topTableColumns"
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
            ref="ProjectTable"
            :nowTabInfo="nowTabInfo"
            :projectTableScrollNum="3"
            :projectTableDetailsBtn="true"
            :projectTableAddBtn="true"
            :projectTableBatchEditBtn="true"
            :projectTableEditBtn="true"
            :projectTableDeleteBtn="true"
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
    <TopTableOperateDialog ref="TopTableOperateDialog" :topTableOperateDialogFlag="'riskPointSet'" @operateSuccess="searchTopData" />
    <BottomTableOperateDialog ref="BottomTableOperateDialog" :nowTabInfo="nowTabInfo" :bottomTableOperateDialogFlag="'riskPointSet'" @operateSuccess="searchBottomTableData" />
    <BatchEditDialog ref="BatchEditDialog" :BatchEditDialogFlag="'riskPointSet'" @batchEditSuccess="searchBottomTableData" />
    <DetailsDialog ref="DetailsDialog" />
  </div>
</template>

<script>
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import ProjectTab from '@/components/ProjectComponents/ProjectTab'
import TopTableOperateDialog from '@/components/ProjectComponents/TopTableOperateDialog'
import BottomTableOperateDialog from '@/components/ProjectComponents/BottomTableOperateDialog'
import BatchEditDialog from '@/components/ProjectComponents/BatchEditDialog'
import DetailsDialog from '@/components/ProjectComponents/DetailsDialog'
import { getTabsList } from '@/api/api'
import { riskPointSetSearch, riskPointSetDelete, riskPointSetSearch12, riskPointSetDelete1, riskPointSetDelete2 } from '@/api/riskPoint'
import { operateSuccess } from '@/utils/projectUtils'
import bottomTableColumns from '@/components/ProjectComponents/BottomTableColumns'
import detailsData from '@/components/ProjectComponents/DetailsData'
export default {
  components: {
    ProjectTable,
    ProjectTab,
    TopTableOperateDialog,
    BottomTableOperateDialog,
    BatchEditDialog,
    DetailsDialog
  },
  data() {
    return {
      topTableSearchInfo: {
        pageNo: 1,
        pageSize: 10,
        place: ''
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '所在单位', dataIndex: 'currentUnit', align: 'center' },
        { title: '地点', dataIndex: 'location', align: 'center' },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 160 }
      ], // 顶部表格表头配置
      topTableData: [], // 顶部表格数据
      topTableTotal: 0, // 顶部表格总数
      topTableScrollHeight: 0, // 顶部表格滚动高度
      bottomTableSearchInfo: {
        id: '',
        pageNo: 1,
        pageSize: 10,
        param: ''
      }, // 底部表格查询信息
      bottomTableColumns: [], // 底部表格表头配置
      bottomTableData: [], // 底部表格数据
      bottomTableTotal: 0, // 底部表格总数
      bottomTableScrollHeight: 0, // 底部表格滚动高度
      bottomTableSelectData: [], // 底部表格复选框选择数据
      tabsData: [], // tab数据
      nowTabInfo: {} // 当前tab信息
    }
  },
  mounted() {
    // 顶部高度需减去（上下padding高度40）（顶部搜索表单高度40）（顶部表格操作区域42）（表格表头高度46）（分页高度42）（边框高度2）
    this.topTableScrollHeight = this.$refs.topTableArea.clientHeight - 40 - 40 - 42 - 46 - 42 - 2
    // 底部高度需减去（上下padding高度40）（tab高度55）（顶部表格操作区域42）（表格表头高度46）（分页高度42）（边框高度2）
    this.bottomTableScrollHeight = this.$refs.bottomTableArea.clientHeight - 40 - 55 - 42 - 46 - 42 - 2
    this.searchTabsData()
    this.searchTopData()
  },
  methods: {
    // 根据系统二级菜单查询tabs标签数据
    searchTabsData() {
      getTabsList({ menus: 'riskPointSetUp' }).then(res => {
        if (res) {
          res.forEach((item, index) => {
            item.index = index
            item.isActive = index === 0
            item.batchEdit = item.param === 'checkProject'
            item.noEdit = item.param === 'checkProject'
            item.details = item.param === 'cycleSet'
            item.isSpecial = item.param === 'cycleSet'
          })
          this.tabsData = res
          this.nowTabInfo = res[0]
          this.bottomTableSearchInfo.param = res[0].param
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
      riskPointSetSearch(this.topTableSearchInfo).then(res => {
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
        nowDialog.title = '新增重大风险点设置'
        nowDialog.form = { currentUnit: '' }
      } else if (type === 'projectTableEdit') {
        nowDialog.visible = true
        nowDialog.type = type
        nowDialog.title = '编辑重大风险点设置'
        nowDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableDelete') {
        riskPointSetDelete({ id: row.id }).then(res => operateSuccess(this, res, 'top'))
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
      this.$refs.ProjectTable.projectTableSelectKeys = []
      this.$refs.ProjectTable.projectTableSelectData = []
      riskPointSetSearch12(this.bottomTableSearchInfo).then(res => {
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
      if (type === 'projectTableDetails') {
        this.$refs.DetailsDialog.visible = true
        this.$refs.DetailsDialog.title = '周期设置详情'
        this.$refs.DetailsDialog.detailsData = detailsData['riskPointSet']
        this.$refs.DetailsDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableAdd') {
        nowDialog.visible = true
        nowDialog.title = this.nowTabInfo.param === 'checkProject' ? '新增检查项目' : '新增周期设置'
        nowDialog.type = type
        nowDialog.form = {
          informationId: this.bottomTableSearchInfo.id,
          checkCompanyName: '',
          number: 1,
          cycleNumber: 1
        }
      } else if (type === 'projectTableBatchEdit') {
        this.$refs.BatchEditDialog.visible = true
        this.$refs.BatchEditDialog.title = '检查项目编辑'
        this.$refs.BatchEditDialog.columns = this.bottomTableColumns.slice(0, this.bottomTableColumns.length - 1)
        this.$refs.BatchEditDialog.tableData = JSON.parse(JSON.stringify(this.bottomTableSelectData))
      } else if (type === 'projectTableEdit') {
        nowDialog.visible = true
        nowDialog.title = '周期设置编辑'
        nowDialog.type = type
        nowDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableDelete') {
        if (this.nowTabInfo.param === 'checkProject') {
          riskPointSetDelete1({ id: row.id }).then(res => operateSuccess(this, res, 'bottom'))
        } else {
          riskPointSetDelete2({ id: row.id }).then(res => operateSuccess(this, res, 'bottom'))
        }
      }
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
