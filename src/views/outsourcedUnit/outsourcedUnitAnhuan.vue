<template>
  <div class="project-page-tree">
    <div class="project-page-tree-right notree">
      <div class="project-page-tree-right-box" ref="topTableArea" style="height: 100%">
        <div style="margin-bottom: 10px;">
          <a-form-model layout="inline" ref="resetForm" :model="topTableSearchInfo">
            <a-form-model-item label="外委队名称" prop="name">
              <a-input placeholder="请输入外委队名称" v-model="topTableSearchInfo.name" />
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" icon="search" @click="searchTopData">查询</a-button>
              <a-button type="primary" icon="sync" style="margin-left: 10px;" @click="searchFormReset">重置</a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
        <ProjectTable
            :projectTableScrollNum="12"
            :nowTabInfo="nowTabInfo"
            :projectTableDetailsBtn="true"
            :projectTableApproveBtn="true"
            :projectTableSearchInfo="topTableSearchInfo"
            :projectTableScrollHeight="topTableScrollHeight"
            :projectTableColumns="topTableColumns"
            :projectTableData="topTableData"
            :projectTableTotal="topTableTotal"
            @projectTableOperate="topTableOperate"
            @projectTablePageChange="topTablePageChange"
        />
      </div>
    </div>
    <DetailsDialog ref="DetailsDialog" />
    <ProjectApprove ref="ProjectApprove" :ProjectApproveFlag="'outsourcedUnitAnhuan'" @operateSuccess="searchTopData" />
  </div>
</template>

<script>
import ProjectApprove from '@/components/ProjectComponents/ProjectApprove'
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import DetailsDialog from '@/components/ProjectComponents/DetailsDialog'
import { outsourcedUnitAnhuanSearch } from '@/api/outsourcedUnit'
import detailsData from '@/components/ProjectComponents/DetailsData'
export default {
  components: {
    ProjectTable,
    DetailsDialog,
    ProjectApprove
  },
  data() {
    return {
      topTableSearchInfo: {
        pageNo: 1,
        pageSize: 10,
        name: ''
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '外委队名称', dataIndex: 'outsourceUnitName', align: 'center', ellipsis: true },
        { title: '施工单位', dataIndex: 'constructionUnit', align: 'center', ellipsis: true },
        { title: '单位类型', dataIndex: 'unitType', align: 'center', ellipsis: true },
        { title: '单位地点', dataIndex: 'unitLocation', align: 'center', ellipsis: true },
        { title: '工程名称', dataIndex: 'projectName', align: 'center', ellipsis: true },
        { title: '状态', dataIndex: 'requestStatus', align: 'center', width: 120 },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 160 }
      ], // 顶部表格表头配置
      topTableData: [], // 顶部表格数据
      topTableTotal: 0, // 顶部表格总数
      topTableScrollHeight: 0, // 顶部表格滚动高度
      nowTabInfo: { details: true }, // 当前tab信息
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
      outsourcedUnitAnhuanSearch(this.topTableSearchInfo).then(res => {
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
        this.$refs.DetailsDialog.title = '安环部审核外委准入申请详情'
        this.$refs.DetailsDialog.detailsData = detailsData['outsourcedUnitAnhuanBaowei']
        this.$refs.DetailsDialog.form = JSON.parse(JSON.stringify(row))
      } else if(type === 'projectTableApprove') {
        this.$refs.ProjectApprove.visible = true
        this.$refs.ProjectApprove.type = type
        this.$refs.ProjectApprove.title = '安环部审核外委准入申请审批'
        this.$refs.ProjectApprove.form = JSON.parse(JSON.stringify(row))
      }
    },
    // 顶部表格分页改变
    topTablePageChange(type, value) {
      this.topTableSearchInfo[type] = value
      this.searchTopData((type === 'pageNo' || type === 'pageSize') ? 'fy' : undefined)
    }
  }
}
</script>
