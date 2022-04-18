<template>
  <div class="project-page-tree">
    <div class="project-page-tree-right notree">
      <div class="project-page-tree-right-box" ref="topTableArea" style="height: 100%;">
        <div style="margin-bottom: 10px;">
          <a-form-model layout="inline">
            <a-form-model-item label="事故日期">
              <a-range-picker v-model="searchDate" :valueFormat="'YYYY-MM-DD'" />
            </a-form-model-item>
            <a-form-model-item label="类型">
              <a-input placeholder="请输入类型" v-model="topTableSearchInfo.aqsg_lx" />
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
import { safeAccidentMaintainSearch } from '@/api/safeAccident'
export default {
  components: {
    ProjectTable
  },
  data() {
    return {
      searchDate: [], // 查询日期
      topTableSearchInfo: {
        pageNo: 1,
        pageSize: 10,
        aqsg_lx: ''
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '事故日期', dataIndex: 'f_sgrq', align: 'center', ellipsis: true },
        { title: '事故单位', dataIndex: 'f_sgdw', align: 'center', ellipsis: true },
        { title: '事故经过', dataIndex: 'f_sgjg', align: 'center', ellipsis: true, width: 300 },
        { title: '类型', dataIndex: 'f_lx', align: 'center', ellipsis: true },
        { title: '性质', dataIndex: 'f_xz', align: 'center', ellipsis: true },
        { title: '死亡人数', dataIndex: 'f_swrs', align: 'center', ellipsis: true, sorter: true },
        { title: '重伤人数', dataIndex: 'f_zsrs', align: 'center', ellipsis: true, sorter: true },
        { title: '轻伤人数', dataIndex: 'f_qsrs', align: 'center', ellipsis: true, sorter: true },
        { title: '直接损失', dataIndex: 'f_zjss', align: 'center', ellipsis: true , sorter: true},
        { title: '损失工作日期', dataIndex: 'f_ssgzr', align: 'center', ellipsis: true }
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
        this.topTableSearchInfo.aqsg_startDate = this.searchDate[0]
        this.topTableSearchInfo.aqsg_endDate = this.searchDate[1]
      } else {
        delete this.topTableSearchInfo.aqsg_startDate
        delete this.topTableSearchInfo.aqsg_endDate
      }
      safeAccidentMaintainSearch(this.topTableSearchInfo).then(res => {
        if (res) {
          if (res.records.length > 0) {
            res.records.forEach(item => {
              item.id = item.p_aqsgjl_id
            })
          }
          this.topTableData = res.records
          this.topTableTotal = res.total
        }
      })
    },
    // 重置查询表单
    searchFormReset() {
      this.searchDate = []
      this.topTableSearchInfo.aqsg_lx = ''
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
