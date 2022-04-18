<template>
  <div class="project-page-tree">
    <div class="project-page-tree-right notree">
      <div class="project-page-tree-right-box" ref="topTableArea">
        <div style="margin-bottom: 10px;">
          <a-form-model layout="inline" ref="resetForm" :model="topTableSearchInfo">
            <a-form-model-item label="工单日期" prop="orderTime">
              <a-date-picker placeholder="请选择工单日期" v-model="topTableSearchInfo.orderTime" :valueFormat="'YYYY-MM-DD'" />
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
            :projectTableDetailsBtn="true"
            :projectTableEditBtn="true"
            :projectTableUploadPhotoBtn="true"
            :projectTableSubmitBtn="true"
            :projectTableSearchInfo="topTableSearchInfo"
            :projectTableScrollHeight="topTableScrollHeight"
            :projectTableColumns="topTableColumns"
            :projectTableData="topTableData"
            :projectTableTotal="topTableTotal"
            @projectTableOperate="topTableOperate"
            @projectTablePageChange="topTablePageChange"
            @projectTableRowClick="topTableRowClick"
        />
      </div>
      <div class="project-page-tree-right-box" ref="bottomTableArea">
        <ProjectTab v-if="bottomTableSearchInfo.id !== ''" :tabsData="tabsData" />
        <ProjectTable
            ref="ProjectTable"
            :nowTabInfo="tabsData[0]"
            :projectTableScrollNum="3"
            :projectTableEditBtn="true"
            :projectTableNormalBtn="true"
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
    <TopTableOperateDialog ref="TopTableOperateDialog" :topTableOperateDialogFlag="'riskPointCheck'" @operateSuccess="searchTopData" />
    <BottomTableOperateDialog ref="BottomTableOperateDialog" :nowTabInfo="tabsData[0]" :bottomTableOperateDialogFlag="'riskPointCheck'" @operateSuccess="searchBottomTableData" />
    <DetailsDialog ref="DetailsDialog" />
    <ProjectPhotoDialog ref="ProjectPhotoDialog" :projectPhotoDialogFlag="'riskPointCheck'" :fileShowType="'upload'" :uploadFilesList="uploadFilesList" :uploadFileMaxNumber="5" @fileOperateSuccess="searchUploadFiles" />
  </div>
</template>

<script>
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import ProjectTab from '@/components/ProjectComponents/ProjectTab'
import TopTableOperateDialog from '@/components/ProjectComponents/TopTableOperateDialog'
import BottomTableOperateDialog from '@/components/ProjectComponents/BottomTableOperateDialog'
import DetailsDialog from '@/components/ProjectComponents/DetailsDialog'
import ProjectPhotoDialog from '@/components/ProjectComponents/ProjectPhotoDialog'
import { getUnit3, getDictionaryDetails, uploadFileSearch } from '@/api/api'
import { riskPointCheckSearch, riskPointCheckSearch1, riskPointCheckNormal1, riskPointCheckSubmit } from '@/api/riskPoint'
import { operateSuccess } from '@/utils/projectUtils'
import bottomTableColumns from '@/components/ProjectComponents/BottomTableColumns'
import detailsData from '@/components/ProjectComponents/DetailsData'
export default {
  components: {
    ProjectTable,
    ProjectTab,
    TopTableOperateDialog,
    BottomTableOperateDialog,
    DetailsDialog,
    ProjectPhotoDialog
  },
  data() {
    return {
      topTableSearchInfo: {
        pageNo: 1,
        pageSize: 10,
        orderTime: ''
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '工单日期', dataIndex: 'orderTime', align: 'center', ellipsis: true },
        { title: '截至日期', dataIndex: 'orderStopTime', align: 'center', ellipsis: true, sorter: true },
        { title: '所在单位', dataIndex: 'riskPointCompany', align: 'center', ellipsis: true },
        { title: '地点', dataIndex: 'location', align: 'center', ellipsis: true },
        { title: '检查岗位', dataIndex: 'checkWorkName', align: 'center', ellipsis: true },
        { title: '检查单位', dataIndex: 'checkCompanyName', align: 'center', ellipsis: true },
        { title: '是否下整改通知单', dataIndex: 'dangerListConfirm', align: 'center', ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 320 }
      ], // 顶部表格表头配置
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
      tabsData: [
        { index: 0, isActive: true, name: '检查明细', details: true, normal: true, param: 'riskPointCheck', isSpecial: true }
      ] // tab数据
    }
  },
  mounted() {
    // 顶部高度需减去（上下padding高度40）（顶部搜索表单高度50）（表格表头高度46）（分页高度42）（边框高度2）
    this.topTableScrollHeight = this.$refs.topTableArea.clientHeight - 40 - 50 - 46 - 42 - 2
    // 底部高度需减去（上下padding高度40）（tab高度55）（顶部表格操作区域42）（表格表头高度46）（分页高度42）（边框高度2）
    this.bottomTableScrollHeight = this.$refs.bottomTableArea.clientHeight - 40 - 55 - 42 - 46 - 42 - 2
    this.searchDict()
    this.searchTopData()
  },
  methods: {
    // 查询数据字典数据
    searchDict() {
      getDictionaryDetails({ name: '隐患分类' }).then(res => {
        if (res) this.$refs.TopTableOperateDialog.yhflSelectData = res
      })
      getDictionaryDetails({ name: '隐患分级' }).then(res => {
        if (res) this.$refs.TopTableOperateDialog.yhflSelectData = res
      })
    },
    // 查询顶部表格数据
    searchTopData(type) {
      if (type !== 'fy') {
        this.topTableSearchInfo.pageNo = 1
        this.topTableSearchInfo.pageSize = 10
      }
      this.bottomTableSearchInfo.id = ''
      this.bottomTableColumns = []
      this.bottomTableData = []
      riskPointCheckSearch(this.topTableSearchInfo).then(res => {
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
      if (type === 'projectTableDetails') {
        this.$refs.DetailsDialog.visible = true
        this.$refs.DetailsDialog.title = '重大风险点检查详情'
        this.$refs.DetailsDialog.detailsData = detailsData['riskPointCheck']
        this.$refs.DetailsDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableEdit') {
        nowDialog.visible = true
        nowDialog.type = type
        nowDialog.title = '重大风险点检查编辑'
        nowDialog.form = JSON.parse(JSON.stringify(row))
        getUnit3({ name: row.riskPointCompany }).then(res => {
          if (res) nowDialog.zrbmSelectData = res
        })
      } else if (type === 'projectTableUploadPhoto') {
        this.$refs.ProjectPhotoDialog.visible = true
        this.$refs.ProjectPhotoDialog.parentId = row.id
        this.searchUploadFiles(row.id)
      } else if (type === 'projectTableSubmit') {
        const params = new FormData()
        params.append('id', row.id)
        riskPointCheckSubmit(params).then(res => operateSuccess(this, res, 'top'))
      }
    },
    // 查询顶部表格当前行文件列表
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
      this.bottomTableColumns = bottomTableColumns['riskPointCheck']
      riskPointCheckSearch1(this.bottomTableSearchInfo).then(res => {
        if (res) {
          this.bottomTableData = res.records
          this.bottomTableTotal = res.total
        }
      })
    },
    // 底部表格操作
    bottomTableOperate(type, row) {
      const nowDialog = this.$refs.BottomTableOperateDialog
      if (type === 'projectTableEdit') {
        nowDialog.visible = true
        nowDialog.title = '检查明细编辑'
        nowDialog.type = type
        nowDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableNormal') {
        const params = new FormData()
        params.append('taskId', this.bottomTableSearchInfo.id)
        riskPointCheckNormal1(params).then(res => operateSuccess(this, res, 'bottom'))
      }
    },
    // 底部表格分页改变
    bottomTablePageChange(type, value) {
      this.bottomTableSearchInfo[type] = value
      this.searchBottomTableData((type === 'pageNo' || type === 'pageSize') ? 'fy' : undefined)
    }
  }
}
</script>
