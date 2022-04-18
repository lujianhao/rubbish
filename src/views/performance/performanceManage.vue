<template>
  <div class="project-page-tree">
    <div class="project-page-tree-left">
      <a-tree
          show-line
          :tree-data="treeData"
          :replaceFields="{ title: 'name', key: 'newKey' }"
          @select="treeSelect"
      />
    </div>
    <div class="project-page-tree-right">
      <div class="project-page-tree-right-box" ref="topTableArea" style="height: 100%">
        <div v-if="topTableSearchInfo.id !== ''">
          <a-form-model layout="inline" ref="resetForm" :model="topTableSearchInfo">
            <a-form-model-item label="一级要素" prop="primaryElement">
              <a-input placeholder="请输入一级要素" v-model="topTableSearchInfo.primaryElement" />
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
            :projectTableAddBtn="true"
            :projectTableEditBtn="true"
            :projectTableDeleteBtn="true"
            :projectTableSearchInfo="topTableSearchInfo"
            :projectTableScrollHeight="topTableScrollHeight"
            :projectTableColumns="topTableSearchInfo.id === '' ? [] : topTableColumns"
            :projectTableData="topTableData"
            :projectTableTotal="topTableTotal"
            @projectTableOperate="topTableOperate"
            @projectTablePageChange="topTablePageChange"
        />
      </div>
    </div>
    <TopTableOperateDialog ref="TopTableOperateDialog" :topTableOperateDialogFlag="'performanceManage'" @operateSuccess="searchTopData" />
  </div>
</template>

<script>
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import TopTableOperateDialog from '@/components/ProjectComponents/TopTableOperateDialog'
import { performanceManageSearch, performanceManageDelete } from '@/api/performance'
import { operateSuccess } from '@/utils/projectUtils'
export default {
  components: {
    ProjectTable,
    TopTableOperateDialog
  },
  data() {
    return {
      topTableSearchInfo: {
        id: '',
        pageNo: 1,
        pageSize: 10,
        primaryElement: ''
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '一级要素', dataIndex: 'primaryElement', align: 'center', ellipsis: true },
        { title: '二级要素', dataIndex: 'secondaryElement', align: 'center', ellipsis: true },
        { title: '评价要点', dataIndex: 'evaluationPoints', align: 'center', ellipsis: true },
        { title: '评价细则', dataIndex: 'evaluationRules', align: 'center', ellipsis: true },
        { title: '标准分值', dataIndex: 'standardScore', align: 'center', ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 160 }
      ], // 顶部表格表头配置
      topTableData: [], // 顶部表格数据
      topTableTotal: 0, // 顶部表格总数
      topTableScrollHeight: 0, // 顶部表格滚动高度
      nowTabInfo: {} // 当前tab信息
    }
  },
  computed: {
    treeData () {
      return JSON.parse(localStorage.getItem('unitInfo12'))
    }
  },
  mounted() {
    // 顶部高度需减去（上下padding高度40）（顶部搜索表单高度40）（顶部表格操作区域42）（表格表头高度46）（分页高度42）（边框高度2）
    this.topTableScrollHeight = this.$refs.topTableArea.clientHeight - 40 - 40 - 42 - 46 - 42 - 2
  },
  methods: {
    // 树数据点击
    treeSelect(selectedKeys) {
      if (selectedKeys[0].split('/').length > 1) {
        this.topTableSearchInfo.id = selectedKeys[0].split('/')[1].split('-')[0]
        this.searchTopData()
      } else {
        this.topTableSearchInfo.id = ''
        this.topTableData = []
      }
    },
    // 查询顶部表格数据
    searchTopData(type) {
      if (type !== 'fy') {
        this.topTableSearchInfo.pageNo = 1
        this.topTableSearchInfo.pageSize = 10
      }
      performanceManageSearch(this.topTableSearchInfo).then(res => {
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
      const nowDialog = this.$refs.TopTableOperateDialog
      if (type === 'projectTableAdd') {
        nowDialog.visible = true
        nowDialog.type = type
        nowDialog.title = '新增绩效管理评价标准'
        nowDialog.form = { secondLevelArchivesId: this.topTableSearchInfo.id }
      } else if (type === 'projectTableEdit') {
        nowDialog.visible = true
        nowDialog.type = type
        nowDialog.title = '编辑绩效管理评价标准'
        nowDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableDelete') {
        performanceManageDelete({ id: row.id }).then(res => operateSuccess(this, res, 'top'))
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
