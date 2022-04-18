<template>
  <div class="project-page-tree">
    <div class="project-page-tree-right notree">
      <div class="project-page-tree-right-box" ref="topTableArea" style="height: 100%">
        <div>
          <a-form-model layout="inline" ref="resetForm" :model="topTableSearchInfo">
            <a-form-model-item label="三违人员" prop="name">
              <a-input placeholder="请输入三违人员" v-model="topTableSearchInfo.name" />
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
            :projectTableAddBtn="true"
            :projectTableEditBtn="true"
            :projectTableDeleteBtn="true"
            :projectTableSubmitBtn="true"
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
    <TopTableOperateDialog ref="TopTableOperateDialog" :topTableOperateDialogFlag="'threeViolationSubmit'" @operateSuccess="searchTopData" />
    <DetailsDialog ref="DetailsDialog" />
  </div>
</template>

<script>
import TopTableOperateDialog from '@/components/ProjectComponents/TopTableOperateDialog'
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import DetailsDialog from '@/components/ProjectComponents/DetailsDialog'
import { threeViolationSubmitSearch,threeViolationSubmitSubmit,threeViolationSubmitDelete } from '@/api/threeViolation'
import { operateSuccess } from '@/utils/projectUtils'
import detailsData from '@/components/ProjectComponents/DetailsData'
export default {
  components: {
    ProjectTable,
    TopTableOperateDialog,
    DetailsDialog
  },
  data() {
    return {
      topTableSearchInfo: {
        pageNo: 1,
        pageSize: 10,
        name:''
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '三违日期', dataIndex: 'violationDate', align: 'center', ellipsis: true },
        { title: '三违人员', dataIndex: 'personFullName', align: 'center', ellipsis: true },
        { title: '三违地点', dataIndex: 'violationPlace', align: 'center', ellipsis: true },
        { title: '反思检查人', dataIndex: 'reflectCheckSubmitter', align: 'center', ellipsis: true },
        { title: '班长谈话提交人', dataIndex: 'monitorSubmitter', align: 'center', ellipsis: true },
        { title: '车间主任谈话提交人', dataIndex: 'workshopSubmitter', align: 'center', ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 280 }
      ], // 顶部表格表头配置
      topTableData: [], // 顶部表格数据
      topTableTotal: 0, // 顶部表格总数
      topTableScrollHeight: 0, // 顶部表格滚动高度
      topTableFilesList: [], // 顶部表格当前行文件列表
      nowTabInfo: { details: true }, // 当前tab信息
    }
  },
  mounted() {
    // 顶部高度需减去（上下padding高度40）（顶部搜索表单高度40）（顶部表格操作区域42）（表格表头高度46）（分页高度42）（边框高度2）
    this.topTableScrollHeight = this.$refs.topTableArea.clientHeight - 40 - 40 - 42 - 46 - 42 - 2
    this.searchTopData()
  },
  methods: {
    // 查询顶部表格数据
    searchTopData(type) {
      if (type !== 'fy') {
        this.topTableSearchInfo.pageNo = 1
        this.topTableSearchInfo.pageSize = 10
      }
      threeViolationSubmitSearch(this.topTableSearchInfo).then(res => {
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
      const nowDialog = this.$refs.TopTableOperateDialog
      if (type === 'projectTableDetails') {
        this.$refs.DetailsDialog.visible = true
        this.$refs.DetailsDialog.title = '三违记录详情'
        this.$refs.DetailsDialog.detailsData = detailsData['threeViolationSubmit']
        this.$refs.DetailsDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableAdd') {
        nowDialog.visible = true
        nowDialog.type = type
        nowDialog.title = '新增三违记录'
        nowDialog.form = {
          personFullName: '',
          reflectCheckSubmitter: '',
          monitorSubmitter: '',
          workshopSubmitter: '',
          unionSubmitter: '',
          secretarySubmitter: '',
          leaderSubmitter: ''
        }
      } else if (type === 'projectTableEdit') {
        nowDialog.visible = true
        nowDialog.type = type
        nowDialog.title = '编辑三违记录'
        nowDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableSubmit') {
        threeViolationSubmitSubmit({ id: row.id }).then(res => operateSuccess(this, res, 'top'))
      } else if (type === 'projectTableDelete') {
        const params = new FormData()
        params.append('id', row.id)
        threeViolationSubmitDelete(params).then(res => operateSuccess(this, res, 'top'))
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
