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
            :nowTabInfo="{ xScroll: true }"
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
            :projectTableDetailsBtn="true"
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
    <DetailsDialog ref="DetailsDialog" />
    <ProjectPhotoDialog ref="ProjectPhotoDialog" :fileShowType="'show'" :uploadFilesList="uploadFilesList" @fileOperateSuccess="searchUploadFiles" />
  </div>
</template>

<script>
import SixFixedList from '@/components/ProjectComponents/SixFixedList'
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import ProjectTab from '@/components/ProjectComponents/ProjectTab'
import DetailsDialog from '@/components/ProjectComponents/DetailsDialog'
import ProjectPhotoDialog from '@/components/ProjectComponents/ProjectPhotoDialog'
import { getTabsList, uploadFileSearch } from '@/api/api'
import { hiddenDangerStatisticsSearch1, hiddenDangerStatisticsSearch2, hiddenDangerStatisticsSearch3, hiddenDangerStatisticsSearch4, hiddenDangerStatisticsSearch5, hiddenDangerStatisticsSearch6, hiddenDangerStatisticsSearchSearch1, hiddenDangerStatisticsSearchSearch23 } from '@/api/hiddenDanger'
import bottomTableColumns from '@/components/ProjectComponents/BottomTableColumns'
import detailsData from '@/components/ProjectComponents/DetailsData'
export default {
  components: {
    SixFixedList,
    ProjectTable,
    ProjectTab,
    DetailsDialog,
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
        { title: '隐患数量', dataIndex: 'hiddenTotal', align: 'center', sorter: true, width: 120 },
        { title: '已整改数量', dataIndex: 'closeNum', align: 'center', sorter: true, width: 140 },
        { title: '未整改数量', dataIndex: 'uncloseNum', align: 'center', sorter: true, width: 140 },
        { title: '整改率%', dataIndex: 'changeRate', align: 'center', sorter: true, width: 120 },
        { title: '公司级数量', dataIndex: 'companyLevel', align: 'center', sorter: true, width: 140 },
        { title: '公司级占比%', dataIndex: 'companyPercentage', align: 'center', sorter: true, width: 140 },
        { title: '分厂级数量', dataIndex: 'branchLevel', align: 'center', sorter: true, width: 140 },
        { title: '分厂级占比%', dataIndex: 'branchPercentage', align: 'center', sorter: true, width: 140 },
        { title: '车间级数量', dataIndex: 'workshopLevel', align: 'center', sorter: true, width: 140 },
        { title: '车间级占比%', dataIndex: 'workshopPercentage', align: 'center', sorter: true, width: 140 }
      ], // 顶部表格表头配置-公司月统计
      topTableColumns2: [
        { title: '年份', dataIndex: 'year', align: 'center', width: 100 },
        { title: '月份', dataIndex: 'month', align: 'center', width: 100 },
        { title: '分厂名称', dataIndex: 'branchName', align: 'center', width: 140 },
        { title: '排名', dataIndex: 'ranking', align: 'center', width: 120, sorter: true },
        { title: '隐患数量', dataIndex: 'hiddenTotal', align: 'center', width: 120, sorter: true },
        { title: '已整改数量', dataIndex: 'closeNum', align: 'center', width: 140, sorter: true },
        { title: '未整改数量', dataIndex: 'uncloseNum', align: 'center', width: 140, sorter: true },
        { title: '整改率%', dataIndex: 'changeRate', align: 'center', width: 120, sorter: true },
        { title: '公司级数量', dataIndex: 'companyLevel', align: 'center', width: 140, sorter: true },
        { title: '公司级占比%', dataIndex: 'companyPercentage', align: 'center', width: 140, sorter: true },
        { title: '分厂级数量', dataIndex: 'branchLevel', align: 'center', width: 140, sorter: true },
        { title: '分厂级占比%', dataIndex: 'branchPercentage', align: 'center', width: 140, sorter: true },
        { title: '车间级数量', dataIndex: 'workshopLevel', align: 'center', width: 140, sorter: true },
        { title: '车间级占比%', dataIndex: 'workshopPercentage', align: 'center', width: 140, sorter: true }
      ], // 顶部表格表头配置-分厂月统计
      topTableColumns3: [
        { title: '年份', dataIndex: 'year', align: 'center', width: 100 },
        { title: '月份', dataIndex: 'month', align: 'center', width: 100 },
        { title: '分厂名称', dataIndex: 'branchName', align: 'center', width: 140 },
        { title: '车间名称', dataIndex: 'workshopName', align: 'center', width: 140 },
        { title: '排名', dataIndex: 'ranking', align: 'center', width: 120, sorter: true },
        { title: '隐患数量', dataIndex: 'hiddenTotal', align: 'center', width: 120, sorter: true },
        { title: '已整改数量', dataIndex: 'closeNum', align: 'center', width: 140, sorter: true },
        { title: '未整改数量', dataIndex: 'uncloseNum', align: 'center', width: 140, sorter: true },
        { title: '整改率%', dataIndex: 'changeRate', align: 'center', width: 120, sorter: true },
        { title: '公司级数量', dataIndex: 'companyLevel', align: 'center', width: 140, sorter: true },
        { title: '公司级占比%', dataIndex: 'companyPercentage', align: 'center', width: 140, sorter: true },
        { title: '分厂级数量', dataIndex: 'branchLevel', align: 'center', width: 140, sorter: true },
        { title: '分厂级占比%', dataIndex: 'branchPercentage', align: 'center', width: 140, sorter: true },
        { title: '车间级数量', dataIndex: 'workshopLevel', align: 'center', width: 140, sorter: true },
        { title: '车间级占比%', dataIndex: 'workshopPercentage', align: 'center', width: 140, sorter: true }
      ], // 顶部表格表头配置-车间月统计
      topTableColumns4: [
        { title: '年份', dataIndex: 'year', align: 'center', width: 100 },
        { title: '月份', dataIndex: 'month', align: 'center', width: 100 },
        { title: '起始日期', dataIndex: 'startDate', align: 'center', width: 160 },
        { title: '截至日期', dataIndex: 'stopDate', align: 'center', width: 160 },
        { title: '隐患数量', dataIndex: 'hiddenTotal', align: 'center', width: 120, sorter: true },
        { title: '已整改数量', dataIndex: 'closeNum', align: 'center', width: 140, sorter: true },
        { title: '未整改数量', dataIndex: 'uncloseNum', align: 'center', width: 140, sorter: true },
        { title: '整改率%', dataIndex: 'changeRate', align: 'center', width: 120, sorter: true },
        { title: '公司级数量', dataIndex: 'companyLevel', align: 'center', width: 140, sorter: true },
        { title: '公司级占比%', dataIndex: 'companyPercentage', align: 'center', width: 140, sorter: true },
        { title: '分厂级数量', dataIndex: 'branchLevel', align: 'center', width: 140, sorter: true },
        { title: '分厂级占比%', dataIndex: 'branchPercentage', align: 'center', width: 140, sorter: true },
        { title: '车间级数量', dataIndex: 'workshopLevel', align: 'center', width: 140, sorter: true },
        { title: '车间级占比%', dataIndex: 'workshopPercentage', align: 'center', width: 140, sorter: true }
      ], // 顶部表格表头配置-公司周统计
      topTableColumns5: [
        { title: '年份', dataIndex: 'year', align: 'center', width: 100 },
        { title: '月份', dataIndex: 'month', align: 'center', width: 100 },
        { title: '起始日期', dataIndex: 'startDate', align: 'center', width: 160 },
        { title: '截至日期', dataIndex: 'stopDate', align: 'center', width: 160 },
        { title: '分厂名称', dataIndex: 'branchName', align: 'center', width: 140 },
        { title: '隐患数量', dataIndex: 'hiddenTotal', align: 'center', width: 120, sorter: true },
        { title: '已整改数量', dataIndex: 'closeNum', align: 'center', width: 140, sorter: true },
        { title: '未整改数量', dataIndex: 'uncloseNum', align: 'center', width: 140, sorter: true },
        { title: '整改率%', dataIndex: 'changeRate', align: 'center', width: 120, sorter: true },
        { title: '公司级数量', dataIndex: 'companyLevel', align: 'center', width: 140, sorter: true },
        { title: '公司级占比%', dataIndex: 'companyPercentage', align: 'center', width: 140, sorter: true },
        { title: '分厂级数量', dataIndex: 'branchLevel', align: 'center', width: 140, sorter: true },
        { title: '分厂级占比%', dataIndex: 'branchPercentage', align: 'center', width: 140, sorter: true },
        { title: '车间级数量', dataIndex: 'workshopLevel', align: 'center', width: 140, sorter: true },
        { title: '车间级占比%', dataIndex: 'workshopPercentage', align: 'center', width: 140, sorter: true }
      ], // 顶部表格表头配置-分厂周统计
      topTableColumns6: [
        { title: '年份', dataIndex: 'year', align: 'center', width: 100 },
        { title: '月份', dataIndex: 'month', align: 'center', width: 100 },
        { title: '起始日期', dataIndex: 'startDate', align: 'center', width: 160 },
        { title: '截至日期', dataIndex: 'stopDate', align: 'center', width: 160 },
        { title: '分厂名称', dataIndex: 'branchName', align: 'center', width: 140 },
        { title: '车间名称', dataIndex: 'workshopName', align: 'center', width: 140 },
        { title: '隐患数量', dataIndex: 'hiddenTotal', align: 'center', width: 120, sorter: true },
        { title: '已整改数量', dataIndex: 'closeNum', align: 'center', width: 140, sorter: true },
        { title: '未整改数量', dataIndex: 'uncloseNum', align: 'center', width: 140, sorter: true },
        { title: '整改率%', dataIndex: 'changeRate', align: 'center', width: 120, sorter: true },
        { title: '公司级数量', dataIndex: 'companyLevel', align: 'center', width: 140, sorter: true },
        { title: '公司级占比%', dataIndex: 'companyPercentage', align: 'center', width: 140, sorter: true },
        { title: '分厂级数量', dataIndex: 'branchLevel', align: 'center', width: 140, sorter: true },
        { title: '分厂级占比%', dataIndex: 'branchPercentage', align: 'center', width: 140, sorter: true },
        { title: '车间级数量', dataIndex: 'workshopLevel', align: 'center', width: 140, sorter: true },
        { title: '车间级占比%', dataIndex: 'workshopPercentage', align: 'center', width: 140, sorter: true }
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
      getTabsList({ menus: 'hiddenClassificationStatistics' }).then(res => {
        if (res) {
          res.forEach((item, index) => {
            item.index = index
            item.isActive = index === 0
            item.details = true
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
          hiddenDangerStatisticsSearch1(this.topTableSearchInfo).then(res => this.showResult(res))
          break
        case '分厂月统计':
          hiddenDangerStatisticsSearch2(this.topTableSearchInfo).then(res => this.showResult(res))
          break
        case '车间月统计':
          hiddenDangerStatisticsSearch3(this.topTableSearchInfo).then(res => this.showResult(res))
          break
        case '公司周统计':
          hiddenDangerStatisticsSearch4(this.topTableSearchInfo).then(res => this.showResult(res))
          break
        case '分厂周统计':
          hiddenDangerStatisticsSearch5(this.topTableSearchInfo).then(res => this.showResult(res))
          break
        case '车间周统计':
          hiddenDangerStatisticsSearch6(this.topTableSearchInfo).then(res => this.showResult(res))
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
        case 'hiddenClassificationStatistics':
          delete this.bottomTableSearchInfo.status
          hiddenDangerStatisticsSearchSearch1(this.bottomTableSearchInfo).then(res => {
            if (res) {
              this.bottomTableData = res.records
              this.bottomTableTotal = res.total
            }
          })
          break
        case 'hiddenDangerDetails':
          delete this.bottomTableSearchInfo.status
          hiddenDangerStatisticsSearchSearch23(this.bottomTableSearchInfo).then(res => {
            if (res) {
              this.bottomTableData = res.data
              this.bottomTableTotal = res.count
            }
          })
          break
        case 'uncloseSecurityHazardsList':
          this.bottomTableSearchInfo.status = '关闭'
          hiddenDangerStatisticsSearchSearch23(this.bottomTableSearchInfo).then(res => {
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
      if (type === 'projectTableDetails') {
        this.$refs.DetailsDialog.visible = true
        this.$refs.DetailsDialog.title = '隐患明细详情'
        this.$refs.DetailsDialog.detailsData = detailsData['hiddenDangerRecord']
        this.$refs.DetailsDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTablePhoto') {
        this.$refs.ProjectPhotoDialog.visible = true
        this.$refs.ProjectPhotoDialog.parentId = row.id
        this.searchUploadFiles(row.id)
      }
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
