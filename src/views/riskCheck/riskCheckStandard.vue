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
            <a-form-model-item label="地点" prop="place">
              <a-input placeholder="请输入地点" v-model="topTableSearchInfo.place" />
            </a-form-model-item>
            <a-form-model-item label="设备设施" prop="equipment">
              <a-input placeholder="请输入设备设施" v-model="topTableSearchInfo.equipment" />
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
            :projectTableImportTbpczqBtn="true"
            :projectTableDetailsBtn="true"
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
        <ProjectTab v-if="bottomTableSearchInfo.id !== ''" :tabsData="tabsData" />
        <ProjectTable
            :projectTableScrollNum="4"
            :nowTabInfo="tabsData[0]"
            :projectTableDetailsBtn="true"
            :projectTableEditBtn="true"
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
    <TopTableOperateDialog ref="TopTableOperateDialog" :topTableOperateDialogFlag="'riskCheckStandard'" @operateSuccess="searchTopData" />
    <BottomTableOperateDialog ref="BottomTableOperateDialog" :nowTabInfo="tabsData[0]" :bottomTableOperateDialogFlag="'riskCheckStandard'" @operateSuccess="searchBottomTableData" />
    <DetailsDialog ref="DetailsDialog" />
    <ProjectImportDialog ref="ProjectImportDialog" @importSuccess="searchTopData" />
  </div>
</template>

<script>
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import ProjectTab from '@/components/ProjectComponents/ProjectTab'
import TopTableOperateDialog from '@/components/ProjectComponents/TopTableOperateDialog'
import BottomTableOperateDialog from '@/components/ProjectComponents/BottomTableOperateDialog'
import DetailsDialog from '@/components/ProjectComponents/DetailsDialog'
import ProjectImportDialog from '@/components/ProjectComponents/ProjectImportDialog'
import { riskCheckStandardSearch, riskCheckStandardDelete, riskCheckStandardSearch1, riskCheckStandardSync } from '@/api/riskCheck'
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
    ProjectImportDialog
  },
  data() {
    return {
      secondId: '', // 二级机构id
      topTableSearchInfo: {
        id: '',
        pageNo: 1,
        pageSize: 10,
        place: '',
        equipment: ''
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '序号', dataIndex: 'number', align: 'center', width: 100 },
        { title: '地点', dataIndex: 'place', align: 'center', ellipsis: true },
        { title: '设备设施/作业活动', dataIndex: 'equipment', align: 'center', ellipsis: true, width: 150 },
        { title: '排查岗位', dataIndex: 'positionCheck', align: 'center', ellipsis: true },
        { title: '固有等级l', dataIndex: 'inherentRankL', align: 'center', sorter: true },
        { title: '固有等级e', dataIndex: 'inherentRankE', align: 'center', sorter: true },
        { title: '固有等级c', dataIndex: 'inherentRankC', align: 'center', sorter: true },
        { title: '固有等级d', dataIndex: 'inherentRankD', align: 'center', sorter: true },
        { title: '固有等级', dataIndex: 'inherentRank', align: 'center' },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 220 }
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
        { index: 0, isActive: true, name: '排查周期', details: true, isImport: true, isSpecial: true, param: 'riskCheckStandard' }
      ], // tab数据
      tbpczqInfo: {} // 同步排查周期信息
    }
  },
  computed: {
    treeData () {
      return JSON.parse(localStorage.getItem('unitInfo23'))
    }
  },
  mounted() {
    // 顶部高度需减去（上下padding高度40）（顶部搜索表单高度40）（顶部表格操作区域42）（表格表头高度46）（分页高度42）（边框高度2）
    this.topTableScrollHeight = this.$refs.topTableArea.clientHeight - 40 - 40 - 42 - 46 - 42 - 2
    // 底部高度需减去（上下padding高度40）（tab高度55）（表格表头高度46）（分页高度42）（边框高度2）
    this.bottomTableScrollHeight = this.$refs.bottomTableArea.clientHeight - 40 - 55 - 46 - 42 - 2
  },
  methods: {
    // 树数据点击
    treeSelect(selectedKeys) {
      if (selectedKeys[0].split('/').length > 1) {
        this.tbpczqInfo.ejName = selectedKeys[0].split('/')[0].split('-')[1]
        this.tbpczqInfo.sjName = selectedKeys[0].split('/')[1].split('-')[1]
        this.secondId = selectedKeys[0].split('/')[0].split('-')[0]
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
      riskCheckStandardSearch(this.topTableSearchInfo).then(res => {
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
      if (type === 'projectTableTbpczq') {
        riskCheckStandardSync(this.tbpczqInfo).then(res => {
          if (res && res.indexOf('成功') !== -1) {
            this.$message.success('同步成功！')
            this.searchTopData()
          }
        })
      } else if (type === 'projectTableDetails') {
        this.$refs.DetailsDialog.visible = true
        this.$refs.DetailsDialog.title = '风险排查标准详情'
        this.$refs.DetailsDialog.detailsData = detailsData['riskCheckStandard']
        this.$refs.DetailsDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableAdd') {
        nowDialog.visible = true
        nowDialog.type = type
        nowDialog.title = '新增风险排查标准'
        nowDialog.form = { threeInstitutionsId: this.topTableSearchInfo.id }
      } else if (type === 'projectTableEdit') {
        nowDialog.visible = true
        nowDialog.type = type
        nowDialog.title = '编辑风险排查标准'
        nowDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableDelete') {
        const params = new FormData()
        params.append('id', row.id)
        riskCheckStandardDelete(params).then(res => operateSuccess(this, res, 'top'))
      } else if (type === 'projectTableImport') {
        this.$refs.ProjectImportDialog.visible = true
        this.$refs.ProjectImportDialog.keyword = this.topTableSearchInfo.id
        this.$refs.ProjectImportDialog.sheetName = '风险清单'
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
      this.bottomTableColumns = bottomTableColumns['riskCheckStandard']
      riskCheckStandardSearch1(this.bottomTableSearchInfo).then(res => {
        if (res) {
          this.bottomTableData = res.records
          this.bottomTableTotal = res.total
        }
      })
    },
    // 底部表格操作
    bottomTableOperate(type, row) {
      const nowDialog = this.$refs.BottomTableOperateDialog
      if (type === 'projectTableDetails') {
        this.$refs.DetailsDialog.visible = true
        this.$refs.DetailsDialog.title = '用户档案详情'
        this.$refs.DetailsDialog.detailsData = detailsData['riskCheckStandard1']
        this.$refs.DetailsDialog.form = JSON.parse(JSON.stringify(row))
      }else if (type === 'projectTableEdit') {
        nowDialog.visible = true
        nowDialog.title = '编辑排查周期'
        nowDialog.type = type
        nowDialog.form = JSON.parse(JSON.stringify(row))
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
