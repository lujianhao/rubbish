<template>
  <div class="project-page-tree">
    <div class="project-page-tree-right notree">
      <div class="project-page-tree-right-box" ref="topTableArea">
        <div style="margin-bottom: 10px;">
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
            <a-form-model-item label="单位名称" prop="unitName">
              <a-input placeholder="请输入单位名称" v-model="topTableSearchInfo.unitName" />
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
        <ProjectTab v-if="bottomTableSearchInfo.id !== ''" :tabsData="tabsData" />
        <ProjectTable
            :projectTableScrollNum="4"
            :nowTabInfo="tabsData[0]"
            :projectTableSearchInfo="bottomTableSearchInfo"
            :projectTableScrollHeight="bottomTableScrollHeight"
            :projectTableColumns="bottomTableSearchInfo.id === '' ? [] : bottomTableColumns"
            :projectTableData="bottomTableData"
            :projectTableTotal="bottomTableTotal"
            @projectTablePageChange="bottomTablePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import ProjectTab from '@/components/ProjectComponents/ProjectTab'
import { performanceSearchSearch, performanceSearchSearch1 } from '@/api/performance'
import bottomTableColumns from '@/components/ProjectComponents/BottomTableColumns'
export default {
  components: {
    ProjectTable,
    ProjectTab
  },
  data() {
    return {
      yearSelectData: [], // 年份下拉框数据
      monthSelectData: [], // 月份下拉框数据
      topTableSearchInfo: {
        pageNo: 1,
        pageSize: 10,
        year: undefined,
        month: undefined,
        unitName: ''
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '年份', dataIndex: 'year', align: 'center' },
        { title: '月份', dataIndex: 'month', align: 'center' },
        { title: '排名', dataIndex: 'ranking', align: 'center', sorter: true },
        { title: '单位名称', dataIndex: 'secondUnitName', align: 'center' },
        { title: '总分', dataIndex: 'totalScore', align: 'center', sorter: true }
      ], // 顶部表格表头配置
      topTableData: [], // 顶部表格数据
      topTableTotal: 0, // 顶部表格总数
      topTableScrollHeight: 0, // 顶部表格滚动高度
      bottomTableSearchInfo: {
        id: '',
        pageNo: 1,
        pageSize: 10,
        column: '',
        isAsc: false
      }, // 底部表格查询信息
      bottomTableColumns: [], // 底部表格表头配置
      bottomTableData: [], // 底部表格数据
      bottomTableTotal: 0, // 底部表格总数
      bottomTableScrollHeight: 0, // 底部表格滚动高度
      tabsData: [
        { index: 0, isActive: true, name: '评分明细', param: 'performanceSearch' }
      ] // tab数据
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
      performanceSearchSearch(this.topTableSearchInfo).then(res => {
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
      this.bottomTableColumns = bottomTableColumns['performanceSearch']
      performanceSearchSearch1(this.bottomTableSearchInfo).then(res => {
        if (res) {
          this.bottomTableData = res.records
          this.bottomTableTotal = res.total
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
