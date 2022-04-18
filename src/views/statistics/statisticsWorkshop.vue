<template>
  <div class="project-page-tree">
    <div class="project-page-tree-right notree">
      <div class="project-page-tree-right-box" ref="topTableArea" style="height: 100%">
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
import { getHiddenDanger } from '@/api/api'
export default {
  components: {
    ProjectTable
  },
  data() {
    return {
      topTableSearchInfo: {
        pageNo: 1,
        pageSize: 10,
        zhtj_userId: JSON.parse(localStorage.getItem('userInfo')).id,
        token: JSON.parse(localStorage.getItem('token')),
        column: 'reporttime',
        isAsc: false
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '隐患日期', dataIndex: 'hiddendate', align: 'center', width: 120 },
        { title: '隐患地点', dataIndex: 'hiddenplace', align: 'center', ellipsis: true },
        { title: '隐患内容', dataIndex: 'hiddencontent', align: 'center', ellipsis: true },
        { title: '隐患分类', dataIndex: 'hiddenclassification', align: 'center', ellipsis: true },
        { title: '隐患级别', dataIndex: 'hiddenlevel', align: 'center', ellipsis: true },
        { title: '上报时间', dataIndex: 'reporttime', align: 'center', width: 160 },
        { title: '处置时间', dataIndex: 'disposaltime', align: 'center', width: 160 },
        { title: '整改时间', dataIndex: 'changecompetetime', align: 'center', width: 160 },
        { title: '复查时间', dataIndex: 'reviewdate', align: 'center', width: 160 }
      ], // 顶部表格表头配置
      topTableData: [], // 顶部表格数据
      topTableTotal: 0, // 顶部表格总数
      topTableScrollHeight: 0 // 顶部表格滚动高度
    }
  },
  mounted() {
    // 顶部高度需减去（上下padding高度40）（表格表头高度46）（分页高度42）（边框高度2）
    this.topTableScrollHeight = this.$refs.topTableArea.clientHeight - 40 - 46 - 42 - 2
    this.searchTopData()
    setInterval(() => {
      this.searchTopData()
    }, 900000)
  },
  methods: {
    // 查询顶部表格数据
    searchTopData(type) {
      if (type !== 'fy') {
        this.topTableSearchInfo.pageNo = 1
        this.topTableSearchInfo.pageSize = 10
      }
      getHiddenDanger(this.topTableSearchInfo).then(res => {
        if (res) {
          this.topTableData = res.records
          this.topTableTotal = res.total
        }
      })
    },
    // 顶部表格分页改变
    topTablePageChange(type, value) {
      this.topTableSearchInfo[type] = value
      this.searchTopData((type === 'pageNo' || type === 'pageSize') ? 'fy' : undefined)
    }
  }
}
</script>
