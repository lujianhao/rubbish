<template>
  <div class="project-page-tree">
    <div class="project-page-tree-right notree">
      <div class="project-page-tree-right-box" ref="topTableArea" style="height: 100%">
        <div style="margin-bottom: 10px;">
          <a-form-model layout="inline" ref="resetForm" :model="topTableSearchInfo">
            <a-form-model-item label="培训日期" prop="trainDate">
              <a-date-picker style="width: 100%;" :valueFormat="'YYYY-MM-DD'" placeholder="请输入培训日期" v-model="topTableSearchInfo.trainDate" />
            </a-form-model-item>
            <a-form-model-item label="实施单位" prop="unit">
              <a-input placeholder="请输入实施单位" v-model="topTableSearchInfo.unit" />
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
            :projectTableDownloadBtn="true"
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
    <ProjectFileDialog ref="ProjectFileDialog" :fileShowType="'download'" :uploadFilesList="uploadFilesList" />
  </div>
</template>

<script>
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import ProjectFileDialog from '@/components/ProjectComponents/ProjectFileDialog'
import { uploadFileSearch } from '@/api/api'
import { safetyTrainingSearch } from '@/api/safetyTraining'
export default {
  components: {
    ProjectTable,
    ProjectFileDialog
  },
  data() {
    return {
      topTableSearchInfo: {
        pageNo: 1,
        pageSize: 10,
        trainDate: '',
        unit: ''
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '培训日期', dataIndex: 'trainDate', align: 'center', ellipsis: true },
        { title: '培训内容', dataIndex: 'trainContent', align: 'center', ellipsis: true },
        { title: '培训层级', dataIndex: 'trainLevel', align: 'center', ellipsis: true },
        { title: '实施单位', dataIndex: 'implementationUnit', align: 'center', ellipsis: true },
        { title: '地点', dataIndex: 'trainPlace', align: 'center', ellipsis: true },
        { title: '参加人员', dataIndex: 'participants', align: 'center', ellipsis: true },
        { title: '培训讲师', dataIndex: 'trainer', align: 'center', ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 120 }
      ], // 顶部表格表头配置
      topTableData: [], // 顶部表格数据
      topTableTotal: 0, // 顶部表格总数
      topTableScrollHeight: 0, // 顶部表格滚动高度
      topTableFilesList: [], // 顶部表格当前行文件列表
      uploadFilesList: [], // 顶部表格当前行文件列表
      nowTabInfo: {} // 当前tab信息
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
      safetyTrainingSearch(this.topTableSearchInfo).then(res => {
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
      this.$refs.ProjectFileDialog.visible = true
      this.$refs.ProjectFileDialog.parentId = row.id
      this.searchFiles(row.id)
    },
    // 查询顶部表格当前行文件列表
    searchFiles(id) {
      uploadFileSearch({ id: id }).then(res => {
        if (res) this.uploadFilesList = res
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
