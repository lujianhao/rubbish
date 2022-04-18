<template>
  <div class="project-page-tree">
    <div class="project-page-tree-right notree">
      <div class="project-page-tree-right-box" ref="topTableArea" style="height: 100%;">
        <div style="margin-bottom: 10px;">
          <a-form-model layout="inline">
            <a-form-model-item label="检查日期">
              <a-range-picker v-model="searchDate" :valueFormat="'YYYY-MM-DD'" />
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" icon="search" @click="searchTopData">查询</a-button>
              <a-button type="primary" icon="sync" style="margin-left: 10px;" @click="searchFormReset">重置</a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
        <ProjectTable
            :projectTableScrollNum="13"
            :nowTabInfo="{}"
            :projectTableSearchInfo="topTableSearchInfo"
            :projectTableScrollHeight="topTableScrollHeight"
            :projectTableColumns="topTableColumns"
            :projectTableData="topTableData"
            :projectTableTotal="topTableTotal"
            @projectTablePageChange="topTablePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import { safeCheckMaintainSearch } from '@/api/safeCheck'
export default {
  components: {
    ProjectTable
  },
  data() {
    return {
      searchDate: [], // 查询日期
      topTableSearchInfo: {
        pageNo: 1,
        pageSize: 10
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '检查日期', dataIndex: 'jcrq', align: 'center', ellipsis: true },
        { title: '检查类型', dataIndex: 'jclx', align: 'center', ellipsis: true },
        { title: '检查单位', dataIndex: 'jcdw', align: 'center', ellipsis: true },
        { title: '检查人', dataIndex: 'jcr', align: 'center', ellipsis: true },
        { title: '检查地点', dataIndex: 'jcdd', align: 'center', ellipsis: true },
        { title: '被检查单位', dataIndex: 'bjcdw', align: 'center', ellipsis: true },
        { title: '检查内容', dataIndex: 'jcnr', align: 'center', ellipsis: true, width: 200 },
        { title: '检查结果', dataIndex: 'jcjg', align: 'center', ellipsis: true, width: 200 }
      ], // 顶部表格表头配置
      topTableData: [], // 顶部表格数据
      topTableTotal: 0, // 顶部表格总数
      topTableScrollHeight: 0 // 顶部表格滚动高度
    }
  },
  mounted() {
    // 顶部高度需减去（上下padding高度40）（顶部搜索表单高度50）（表格表头高度46）（分页高度42）（边框高度2）
    this.topTableScrollHeight = this.$refs.topTableArea.clientHeight - 40 - 50 - 46 - 42 - 2
    this.searchTopData()
  },
  methods: {
    // 查询顶部表格数据
    searchTopData(type) {
      if (type !== 'fy') {
        this.topTableSearchInfo.pageNo = 1
        this.topTableSearchInfo.pageSize = 10
      }
      if (this.searchDate.length > 0) {
        this.topTableSearchInfo.aqjc_startDate = this.searchDate[0]
        this.topTableSearchInfo.aqjc_endDate = this.searchDate[1]
      } else {
        delete this.topTableSearchInfo.aqjc_startDate
        delete this.topTableSearchInfo.aqjc_endDate
      }
      safeCheckMaintainSearch(this.topTableSearchInfo).then(res => {
        if (res) {
          this.topTableData = res.records
          this.topTableTotal = res.total
        }
      })
    },
    // 重置查询表单
    searchFormReset() {
      this.searchDate = []
      this.searchTopData()
    },
    // 顶部表格分页改变
    topTablePageChange(type, value) {
      this.topTableSearchInfo[type] = value
      this.searchTopData((type === 'pageNo' || type === 'pageSize') ? 'fy' : undefined)
    }
  }
}
</script>
