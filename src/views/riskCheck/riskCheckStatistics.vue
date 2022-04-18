<template>
  <div class="project-page-tree">
    <div class="project-page-tree-left" style="padding: 0;">
      <SixFixedList @listClick="listClick" />
    </div>
    <div class="project-page-tree-right">
      <div class="project-page-tree-right-box" ref="topTableArea">
        <div v-if="topTableSearchInfo.id !== ''" style="margin-bottom: 10px;">
          <a-form-model layout="inline" ref="resetForm" :model="topTableSearchInfo">
            <a-form-model-item label="年份" prop="year">
              <a-select
                  model="default"
                  placeholder="请选择年份"
                  :allowClear="true"
                  v-model="topTableSearchInfo.year"
              >
                <a-select-option v-for="item in yearSelectData" :key="item.value" :value="item.value">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="月份" prop="month">
              <a-select
                  model="default"
                  placeholder="请选择月份"
                  :allowClear="true"
                  v-model="topTableSearchInfo.month"
              >
                <a-select-option v-for="item in monthSelectData" :key="item.value" :value="item.value">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" icon="search" @click="listClick(nowLeftItem)">查询</a-button>
              <a-button type="primary" icon="sync" style="margin-left: 10px;" @click="searchFormReset">重置</a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
        <ProjectTable
            :projectTableScrollNum="4"
            :nowTabInfo="tabsData[0]"
            :projectTableSearchInfo="topTableSearchInfo"
            :projectTableScrollHeight="topTableScrollHeight"
            :projectTableColumns="topTableSearchInfo.id === '' ? [] : topTableColumns"
            :projectTableData="topTableData"
            :projectTableTotal="topTableTotal"
            @projectTablePageChange="topTablePageChange"
            @projectTableRowClick="topTableRowClick"
        />
      </div>
      <div class="project-page-tree-right-box" ref="bottomTableArea">
        <ProjectTab v-if="bottomTableSearchInfo.id !== ''" :tabsData="tabsData" @tabChange="tabChange" />
        <ProjectTable
            :projectTableScrollNum="4"
            :nowTabInfo="tabsData[0]"
            :projectTablePhotoBtn="true"
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
    <ProjectPhotoDialog ref="ProjectPhotoDialog" :fileShowType="'show'" :uploadFilesList="uploadFilesList" @fileOperateSuccess="searchUploadFiles" />
  </div>
</template>

<script>
import SixFixedList from '@/components/ProjectComponents/SixFixedList'
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import ProjectTab from '@/components/ProjectComponents/ProjectTab'
import ProjectPhotoDialog from '@/components/ProjectComponents/ProjectPhotoDialog'
import { getTabsList, uploadFileSearch } from '@/api/api'
import { riskCheckStatisticsSearch1, riskCheckStatisticsSearch2, riskCheckStatisticsSearch3, riskCheckStatisticsSearch4, riskCheckStatisticsSearch5, riskCheckStatisticsSearch6, riskCheckStatisticsSearchSearch1, riskCheckStatisticsSearchSearch234 } from '@/api/riskCheck'
import bottomTableColumns from '@/components/ProjectComponents/BottomTableColumns'
export default {
  components: {
    SixFixedList,
    ProjectTable,
    ProjectTab,
    ProjectPhotoDialog
  },
  data() {
    return {
      yearSelectData: [], // 年份下拉框数据
      monthSelectData: [], // 月份下拉框数据
      topTableSearchInfo: {
        id: '',
        pageNo: 1,
        pageSize: 10,
        year: undefined,
        month: undefined
      }, // 顶部表格查询信息
      topTableColumns: [], // 顶部表格表头配置
      topTableColumns1: [
        { title: '年份', dataIndex: 'year', align: 'center', width: 100 },
        { title: '月份', dataIndex: 'month', align: 'center', width: 100 },
        { title: '工单数量', dataIndex: 'checkQuantity', align: 'center', sorter: true },
        { title: '已排查数量', dataIndex: 'completeQuantity', align: 'center', sorter: true },
        { title: '未排查数量', dataIndex: 'uncheckedQuantity', align: 'center', sorter: true },
        { title: '正常数量', dataIndex: 'normalQuantity', align: 'center', sorter: true },
        { title: '异常数量', dataIndex: 'abnormalQuantity', align: 'center', sorter: true },
        { title: '完成率%', dataIndex: 'completionRate', align: 'center', sorter: true }
      ], // 顶部表格表头配置-公司月统计
      topTableColumns2: [
        { title: '年份', dataIndex: 'year', align: 'center', width: 100 },
        { title: '月份', dataIndex: 'month', align: 'center', width: 100 },
        { title: '分厂名称', dataIndex: 'branchName', align: 'center', ellipsis: true },
        { title: '排名', dataIndex: 'ranking', align: 'center', width: 80, sorter: true },
        { title: '工单数量', dataIndex: 'checkQuantity', align: 'center', sorter: true },
        { title: '已排查数量', dataIndex: 'completeQuantity', align: 'center', sorter: true },
        { title: '未排查数量', dataIndex: 'uncheckedQuantity', align: 'center', sorter: true },
        { title: '正常数量', dataIndex: 'normalQuantity', align: 'center', sorter: true },
        { title: '异常数量', dataIndex: 'abnormalQuantity', align: 'center', sorter: true },
        { title: '完成率%', dataIndex: 'completionRate', align: 'center', sorter: true }
      ], // 顶部表格表头配置-分厂月统计
      topTableColumns3: [
        { title: '年份', dataIndex: 'year', align: 'center', width: 100 },
        { title: '月份', dataIndex: 'month', align: 'center', width: 100 },
        { title: '分厂名称', dataIndex: 'branchName', align: 'center', ellipsis: true },
        { title: '车间名称', dataIndex: 'workshop', align: 'center', ellipsis: true },
        { title: '排名', dataIndex: 'ranking', align: 'center', width: 80, sorter: true },
        { title: '工单数量', dataIndex: 'checkQuantity', align: 'center', sorter: true },
        { title: '已排查数量', dataIndex: 'completeQuantity', align: 'center', sorter: true },
        { title: '未排查数量', dataIndex: 'uncheckedQuantity', align: 'center', sorter: true },
        { title: '正常数量', dataIndex: 'normalQuantity', align: 'center', sorter: true },
        { title: '异常数量', dataIndex: 'abnormalQuantity', align: 'center', sorter: true },
        { title: '完成率%', dataIndex: 'completionRate', align: 'center', sorter: true }
      ], // 顶部表格表头配置-车间月统计
      topTableColumns4: [
        { title: '年份', dataIndex: 'year', align: 'center', width: 100 },
        { title: '月份', dataIndex: 'month', align: 'center', width: 100 },
        { title: '起始日期', dataIndex: 'startDate', align: 'center', ellipsis: true },
        { title: '截至日期', dataIndex: 'stopDate', align: 'center', ellipsis: true },
        { title: '工单数量', dataIndex: 'checkQuantity', align: 'center', sorter: true },
        { title: '已排查数量', dataIndex: 'completeQuantity', align: 'center', sorter: true },
        { title: '未排查数量', dataIndex: 'uncheckedQuantity', align: 'center', sorter: true },
        { title: '正常数量', dataIndex: 'normalQuantity', align: 'center', sorter: true },
        { title: '异常数量', dataIndex: 'abnormalQuantity', align: 'center', sorter: true },
        { title: '完成率%', dataIndex: 'completionRate', align: 'center', sorter: true }
      ], // 顶部表格表头配置-公司周统计
      topTableColumns5: [
        { title: '年份', dataIndex: 'year', align: 'center', width: 100 },
        { title: '月份', dataIndex: 'month', align: 'center', width: 100 },
        { title: '起始日期', dataIndex: 'startDate', align: 'center', ellipsis: true },
        { title: '截至日期', dataIndex: 'stopDate', align: 'center', ellipsis: true },
        { title: '分厂名称', dataIndex: 'branchName', align: 'center', ellipsis: true },
        { title: '排名', dataIndex: 'ranking', align: 'center', width: 80, sorter: true },
        { title: '工单数量', dataIndex: 'checkQuantity', align: 'center', sorter: true },
        { title: '已排查数量', dataIndex: 'completeQuantity', align: 'center', sorter: true, width: 100 },
        { title: '未排查数量', dataIndex: 'uncheckedQuantity', align: 'center', sorter: true, width: 100 },
        { title: '正常数量', dataIndex: 'normalQuantity', align: 'center', sorter: true },
        { title: '异常数量', dataIndex: 'abnormalQuantity', align: 'center', sorter: true },
        { title: '完成率%', dataIndex: 'completionRate', align: 'center', sorter: true }
      ], // 顶部表格表头配置-分厂周统计
      topTableColumns6: [
        { title: '年份', dataIndex: 'year', align: 'center', width: 100 },
        { title: '月份', dataIndex: 'month', align: 'center', width: 100 },
        { title: '起始日期', dataIndex: 'startDate', align: 'center', ellipsis: true },
        { title: '截至日期', dataIndex: 'stopDate', align: 'center', ellipsis: true },
        { title: '分厂名称', dataIndex: 'branchName', align: 'center', ellipsis: true },
        { title: '车间名称', dataIndex: 'workshop', align: 'center', ellipsis: true },
        { title: '排名', dataIndex: 'ranking', align: 'center', width: 80, sorter: true },
        { title: '工单数量', dataIndex: 'checkQuantity', align: 'center', sorter: true, width: 80 },
        { title: '已排查数量', dataIndex: 'completeQuantity', align: 'center', sorter: true, width: 100 },
        { title: '未排查数量', dataIndex: 'uncheckedQuantity', align: 'center', sorter: true, width: 100 },
        { title: '正常数量', dataIndex: 'normalQuantity', align: 'center', sorter: true, width: 80 },
        { title: '异常数量', dataIndex: 'abnormalQuantity', align: 'center', sorter: true, width: 80 },
        { title: '完成率%', dataIndex: 'completionRate', align: 'center', sorter: true }
      ], // 顶部表格表头配置-车间周统计
      topTableData: [], // 顶部表格数据
      topTableTotal: 0, // 顶部表格总数
      topTableScrollHeight: 0, // 顶部表格滚动高度
      uploadFilesList: [], // 顶部表格文件列表
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
      nowLeftItem: {
        id: 1,
        isClick: true,
        title: '公司月统计'
      } // 当前左侧信息
    }
  },
  mounted() {
    this.yearSelectData = []
    this.monthSelectData = []
    const nowYear = new Date().getFullYear()
    for (let i = nowYear - 4; i <= nowYear; i++) {
      this.yearSelectData.push({ name: i + '年', value: i })
    }
    for (let i = 1; i <= 12; i++) {
      this.monthSelectData.push({ name: i + '月', value: i })
    }
    // 顶部高度需减去（上下padding高度40）（顶部搜索表单高度50）（表格表头高度46）（分页高度42）（边框高度2）
    this.topTableScrollHeight = this.$refs.topTableArea.clientHeight - 40 - 50 - 46 - 42 - 2
    // 底部高度需减去（上下padding高度40）（tab高度55）（表格表头高度46）（分页高度42）（边框高度2）
    this.bottomTableScrollHeight = this.$refs.bottomTableArea.clientHeight - 40 - 55 - 46 - 42 - 2
    this.searchTabsData()
    this.listClick(this.nowLeftItem)
  },
  methods: {
    // 根据系统二级菜单查询tabs标签数据
    searchTabsData() {
      getTabsList({ menus: 'facilityInspectionRecords' }).then(res => {
        if (res) {
          res.forEach((item, index) => {
            item.index = index
            item.isActive = index === 0
          })
          this.tabsData = res
          this.nowTabInfo = res[0]
        }
      })
    },
    // 左侧列表点击
    listClick(item, type) {
      if (type !== 'fy') {
        this.topTableSearchInfo.pageNo = 1
        this.topTableSearchInfo.pageSize = 10
      }
      this.nowLeftItem = JSON.parse(JSON.stringify(item))
      this.topTableSearchInfo.id = item.id
      this.topTableColumns = this[`topTableColumns${item.id}`]
      this.bottomTableSearchInfo.id = ''
      this.bottomTableSearchInfo.tableName = item.title
      this.bottomTableColumns = []
      this.bottomTableData = []
      this.tabsData.forEach((item, index) => {
        item.isActive = index === 0
      })
      this.nowTabInfo = this.tabsData[0]
      switch (item.title) {
        case '公司月统计':
          riskCheckStatisticsSearch1(this.topTableSearchInfo).then(res => this.showResult(res))
          break
        case '分厂月统计':
          riskCheckStatisticsSearch2(this.topTableSearchInfo).then(res => this.showResult(res))
          break
        case '车间月统计':
          riskCheckStatisticsSearch3(this.topTableSearchInfo).then(res => this.showResult(res))
          break
        case '公司周统计':
          riskCheckStatisticsSearch4(this.topTableSearchInfo).then(res => this.showResult(res))
          break
        case '分厂周统计':
          riskCheckStatisticsSearch5(this.topTableSearchInfo).then(res => this.showResult(res))
          break
        case '车间周统计':
          riskCheckStatisticsSearch6(this.topTableSearchInfo).then(res => this.showResult(res))
          break
      }
    },
    // 展示结果
    showResult(res) {
      if (res) {
        this.topTableData = res.records
        this.topTableTotal = res.total
      }
    },
    // 重置查询表单
    searchFormReset() {
      this.$refs.resetForm.resetFields()
      this.listClick(this.nowLeftItem)
    },
    // 顶部表格分页改变
    topTablePageChange(type, value) {
      this.topTableSearchInfo[type] = value
      this.listClick(this.nowLeftItem, (type === 'pageNo' || type === 'pageSize') ? 'fy' : undefined)
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
      switch (this.nowTabInfo.param) {
        case 'riskScreeningClassificationStatistics':
          riskCheckStatisticsSearchSearch1(this.bottomTableSearchInfo).then(res => {
            if (res) {
              this.bottomTableData = res.records
              this.bottomTableTotal = res.total
            }
          })
          break
        case 'facilityInspectionRecord':
          this.bottomTableSearchInfo.status = '正常'
          riskCheckStatisticsSearchSearch234(this.bottomTableSearchInfo).then(res => {
            if (res) {
              this.bottomTableData = res.data
              this.bottomTableTotal = res.count
            }
          })
          break
        case 'notCheckFacilityInspectionRecord':
          this.bottomTableSearchInfo.status = '待检'
          riskCheckStatisticsSearchSearch234(this.bottomTableSearchInfo).then(res => {
            if (res) {
              this.bottomTableData = res.data
              this.bottomTableTotal = res.count
            }
          })
          break
        case 'abnormalFacilityInspectionRecord':
          this.bottomTableSearchInfo.status = '异常'
          riskCheckStatisticsSearchSearch234(this.bottomTableSearchInfo).then(res => {
            if (res) {
              this.bottomTableData = res.data
              this.bottomTableTotal = res.count
            }
          })
          break
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
      this.$refs.ProjectPhotoDialog.visible = true
      this.$refs.ProjectPhotoDialog.parentId = row.id
      this.searchUploadFiles(row.id)
    },
    // 查询底部表格当前行文件列表
    searchUploadFiles(id) {
      uploadFileSearch({ id: id }).then(res => {
        if (res) {
          res.forEach(item => {
            item.showPath = `/public/${item.type === '.mp4' ? 'videoSmallShow' : 'imageShow'}/${item.id}`
          })
          this.uploadFilesList = res
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
