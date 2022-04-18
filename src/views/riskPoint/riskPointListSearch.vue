<template>
  <div class="project-page-tree">
    <div class="project-page-tree-right notree">
      <div class="project-page-tree-right-box" ref="topTableArea">
        <div style="margin-bottom: 10px;">
          <a-form-model layout="inline" ref="resetForm" :model="topTableSearchInfo">
            <a-form-model-item label="工单日期" prop="orderTime">
              <a-date-picker placeholder="请选择工单日期" v-model="topTableSearchInfo.orderTime" :valueFormat="'YYYY-MM-DD'" />
            </a-form-model-item>
            <a-form-model-item label="工单状态" prop="orderStatus">
              <a-select
                  model="default"
                  placeholder="请选择工单状态"
                  :allowClear="true"
                  v-model="topTableSearchInfo.orderStatus"
              >
                <a-select-option value="待检">待检</a-select-option>
                <a-select-option value="正常">正常</a-select-option>
                <a-select-option value="异常">异常</a-select-option>
              </a-select>
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
            :projectTablePhotoBtn="true"
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
            :projectTableScrollNum="4"
            :projectTableSearchInfo="bottomTableSearchInfo"
            :projectTableScrollHeight="bottomTableScrollHeight"
            :projectTableColumns="bottomTableSearchInfo.id === '' ? [] : bottomTableColumns"
            :projectTableData="bottomTableData"
            :projectTableTotal="bottomTableTotal"
            @projectTablePageChange="bottomTablePageChange"
        />
      </div>
    </div>
    <TopTableOperateDialog ref="TopTableOperateDialog" :topTableOperateDialogFlag="'riskPointListSearch'" @operateSuccess="searchTopData" />
    <DetailsDialog ref="DetailsDialog" />
    <ProjectPhotoDialog ref="ProjectPhotoDialog" :fileShowType="'show'" :uploadFilesList="uploadFilesList" @fileOperateSuccess="searchUploadFiles" />
  </div>
</template>

<script>
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import ProjectTab from '@/components/ProjectComponents/ProjectTab'
import TopTableOperateDialog from '@/components/ProjectComponents/TopTableOperateDialog'
import DetailsDialog from '@/components/ProjectComponents/DetailsDialog'
import ProjectPhotoDialog from '@/components/ProjectComponents/ProjectPhotoDialog'
import { uploadFileSearch } from '@/api/api'
import { riskPointListSearchSearch, riskPointSearchSearchDetails1 } from '@/api/riskPoint'
import bottomTableColumns from '@/components/ProjectComponents/BottomTableColumns'
import detailsData from '@/components/ProjectComponents/DetailsData'
export default {
  components: {
    ProjectTable,
    ProjectTab,
    TopTableOperateDialog,
    DetailsDialog,
    ProjectPhotoDialog
  },
  data() {
    return {
      topTableSearchInfo: {
        pageNo: 1,
        pageSize: 10,
        orderTime: '',
        orderStatus: undefined
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '工单日期', dataIndex: 'orderTime', align: 'center', ellipsis: true },
        { title: '截止日期', dataIndex: 'orderStopTime', align: 'center', ellipsis: true, sorter: true },
        { title: '地点', dataIndex: 'location', align: 'center', ellipsis: true },
        { title: '单位', dataIndex: 'checkCompanyName', align: 'center', ellipsis: true },
        { title: '检查岗位', dataIndex: 'checkWorkName', align: 'center', ellipsis: true },
        { title: '检查人', dataIndex: 'checkPeople', align: 'center', ellipsis: true },
        { title: '检查时间', dataIndex: 'checkTime', align: 'center', ellipsis: true },
        { title: '状态', dataIndex: 'orderStatus', align: 'center', ellipsis: true },
        { title: '是否下隐患单', dataIndex: 'dangerListConfirm', align: 'center', ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 180 }
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
        { index: 0, isActive: true, name: '检查明细', details: true, param: 'riskPointListSearch' }
      ] // tab数据
    }
  },
  mounted() {
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
      riskPointListSearchSearch(this.topTableSearchInfo).then(res => {
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
      if (type === 'projectTableDetails') {
        this.$refs.DetailsDialog.visible = true
        this.$refs.DetailsDialog.title = '风险点检查单详情'
        this.$refs.DetailsDialog.detailsData = detailsData['riskPointListSearch']
        this.$refs.DetailsDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTablePhoto') {
        this.$refs.ProjectPhotoDialog.visible = true
        this.$refs.ProjectPhotoDialog.parentId = row.id
        this.searchUploadFiles(row.id)
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
      this.bottomTableColumns = bottomTableColumns['riskPointListSearch']
      riskPointSearchSearchDetails1(this.bottomTableSearchInfo).then(res => {
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
