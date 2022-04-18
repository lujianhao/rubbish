<template>
  <div class="project-page-tree">
    <div class="project-page-tree-right notree">
      <div class="project-page-tree-right-box" ref="topTableArea">
        <div style="margin-bottom: 10px;">
          <a-form-model layout="inline" ref="resetForm" :model="topTableSearchInfo">
            <a-form-model-item label="外委单位" prop="oUnit">
              <a-input placeholder="请输入外委单位" v-model="topTableSearchInfo.oUnit" />
            </a-form-model-item>
            <a-form-model-item label="工程名称" prop="proName">
              <a-input placeholder="请输入工程名称" v-model="topTableSearchInfo.proName" />
            </a-form-model-item>
            <a-form-model-item label="工程状态" prop="proStatus">
              <a-select
                  model="default"
                  placeholder="请选择工程状态"
                  :allowClear="true"
                  v-model="topTableSearchInfo.proStatus"
              >
                <a-select-option value="计划">计划</a-select-option>
                <a-select-option value="施工">施工</a-select-option>
                <a-select-option value="停工">停工</a-select-option>
                <a-select-option value="完工">完工</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="施工单位" prop="rUnit">
              <a-input placeholder="请输入施工单位" v-model="topTableSearchInfo.rUnit" />
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
            :projectTableDetailsBtn="true"
            :projectTableDownloadBtn="true"
            :projectTableSearchInfo="topTableSearchInfo"
            :projectTableScrollHeight="topTableScrollHeight"
            :projectTableColumns="topTableColumns"
            :projectTableData="topTableData"
            :projectTableTotal="topTableTotal"
            @projectTablePageChange="topTablePageChange"
            @projectTableRowClick="topTableRowClick"
            @projectTableOperate="topTableOperate"
        />
      </div>
      <div class="project-page-tree-right-box" ref="bottomTableArea">
        <ProjectTab v-if="bottomTableSearchInfo.id !== ''" :tabsData="tabsData" @tabChange="tabChange" />
        <ProjectTable
            ref="ProjectTable"
            :nowTabInfo="nowTabInfo"
            :projectTableDownloadBtn="true"
            :projectTableScrollNum="3"
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
    <DetailsDialog ref="DetailsDialog" />
    <ProjectFileDialog ref="ProjectFileDialog" :fileShowType="'download'" :uploadFilesList="uploadFilesList" />
  </div>
</template>

<script>
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import ProjectTab from '@/components/ProjectComponents/ProjectTab'
import DetailsDialog from '@/components/ProjectComponents/DetailsDialog'
import ProjectFileDialog from '@/components/ProjectComponents/ProjectFileDialog'
import { getTabsList, uploadFileSearch } from '@/api/api'
import { outsourcedUnitProcessSearch,outsourcedUnitProcessChildSearch,outsourcedUnitProcessSearchSearch } from '@/api/outsourcedUnit'
import bottomTableColumns from '@/components/ProjectComponents/BottomTableColumns'
import detailsData from '@/components/ProjectComponents/DetailsData'
export default {
  components: {
    ProjectTable,
    ProjectTab,
    DetailsDialog,
    ProjectFileDialog
  },
  data() {
    return {
      topTableSearchInfo: {
        pageNo: 1,
        pageSize: 10
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '工程名称', dataIndex: 'projectName', align: 'center', ellipsis: true },
        { title: '签约单位', dataIndex: 'contractingUnit', align: 'center', ellipsis: true },
        { title: '外委单位', dataIndex: 'outsourceUnitName', align: 'center', ellipsis: true },
        { title: '施工单位', dataIndex: 'constructionUnit', align: 'center', ellipsis: true },
        { title: '工程状态', dataIndex: 'projectStatus', align: 'center', width: 120 },
        { title: '开始日期', dataIndex: 'planStartTime', align: 'center', ellipsis: true, sorter: true },
        { title: '结束日期', dataIndex: 'planStopTime', align: 'center', ellipsis: true, sorter: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 180 }

      ], // 顶部表格表头配置
      topTableData: [], // 顶部表格数据
      topTableTotal: 0, // 顶部表格总数
      topTableScrollHeight: 0, // 顶部表格滚动高度
      bottomTableSearchInfo: {
        id:"",
        pageNo: 1,
        pageSize: 10,
        params: ''
      }, // 底部表格查询信息
      tabsData: [], // tab数据
      nowTabInfo: {}, // 当前tab信息
      bottomTableColumns: [], // 底部表格表头配置
      bottomTableData: [], // 底部表格数据
      bottomTableTotal: 0, // 底部表格总数
      bottomTableScrollHeight: 0, // 底部表格滚动高度
      uploadFilesList: [], // 顶部表格当前行文件列表
    }
  },
  mounted() {
    // 顶部高度需减去（上下padding高度40）（顶部搜索表单高度40）（表格表头高度46）（分页高度42）（边框高度2）
    this.topTableScrollHeight = this.$refs.topTableArea.clientHeight - 40 - 40 - 46 - 42 - 2
    // 底部高度需减去（上下padding高度40）（tab高度55）（表格表头高度46）（分页高度42）（边框高度2）
    this.bottomTableScrollHeight = this.$refs.bottomTableArea.clientHeight - 40 - 55 - 46 - 42 - 2
    this.searchTabsData()
    this.searchTopData()
  },
  methods: {
    // 根据系统二级菜单查询tabs标签数据
    searchTabsData() {
      getTabsList({ menus: 'outsourcedConstructionRecords' }).then(res => {
        if (res) {
          res.push({ details: true, index: 0, isActive: true, name: "评估记录", param: "evaluationRecord" })
          res.forEach((item, index) => {
            item.index = index
            item.isActive = index === 0
            item.details = true
          })
          this.tabsData = res
          this.nowTabInfo = res[0]
          this.bottomTableSearchInfo.params = res[0].param
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
      outsourcedUnitProcessSearch(this.topTableSearchInfo).then(res => {
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
      if (type === 'projectTableDetails') {
        this.$refs.DetailsDialog.visible = true
        this.$refs.DetailsDialog.title = '外委单位工程详情'
        this.$refs.DetailsDialog.detailsData = detailsData['outsourcedUnitProcess']
        this.$refs.DetailsDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableDownload') {
        this.$refs.ProjectFileDialog.visible = true
        this.$refs.ProjectFileDialog.parentId = row.id
        this.searchFiles(row.id)
      }
    },
    // 查询顶部表格当前行文件列表
    searchFiles(id) {
      uploadFileSearch({ id: id }).then(res => {
        if (res) {
          this.uploadFilesList = res
        }
      })
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
      this.bottomTableSearchInfo.params = this.nowTabInfo.param
      if (this.bottomTableSearchInfo.params === 'evaluationRecord') {
        outsourcedUnitProcessSearchSearch(this.bottomTableSearchInfo).then(res => this.showBottomResult(res))
      }else {
        outsourcedUnitProcessChildSearch(this.bottomTableSearchInfo).then(res => this.showBottomResult(res))
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
      this.$refs.ProjectFileDialog.visible = true
      this.$refs.ProjectFileDialog.parentId = row.id
      this.searchFiles(row.id)
    },
    //底部表格分页改变
    bottomTablePageChange(type, value) {
      this.bottomTableSearchInfo[type] = value
      this.searchBottomTableData((type === 'pageNo' || type === 'pageSize') ? 'fy' : undefined)
    },
    // 展示结果
    showBottomResult (res) {
      if (res) {
        this.bottomTableData = res.records
        this.bottomTableTotal = res.total
      }
    }
  }
}
</script>
