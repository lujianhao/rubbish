<template>
  <div class="project-page-tree">
    <div class="project-page-tree-right notree">
      <div class="project-page-tree-right-box" ref="topTableArea">
        <div style="margin-bottom: 10px;">
          <a-form-model layout="inline" ref="resetForm" :model="topTableSearchInfo">
            <a-form-model-item label="地点" prop="place">
              <a-input placeholder="请输入地点" v-model="topTableSearchInfo.place" />
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
            :projectTableColumns="topTableColumns"
            :projectTableData="topTableData"
            :projectTableTotal="topTableTotal"
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
            :projectTableDetailsBtn="true"
            :projectTableCheckDetailsBtn="true"
            :projectTablePhotoBtn="true"
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
    <DetailsDialog ref="DetailsDialog" />
    <CheckDetailsDialog ref="CheckDetailsDialog" :checkDetailsColumns="checkDetailsColumns" :checkDetailsTableData="checkDetailsTableData" :checkDetailsTableTotal="checkDetailsTableTotal" :checkDetailsSearchInfo="checkDetailsSearchInfo" @checkDetailsTablePageChange="checkDetailsTablePageChange" />
    <ProjectPhotoDialog ref="ProjectPhotoDialog" :fileShowType="'show'" :uploadFilesList="uploadFilesList" @fileOperateSuccess="searchUploadFiles" />
  </div>
</template>

<script>
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import ProjectTab from '@/components/ProjectComponents/ProjectTab'
import DetailsDialog from '@/components/ProjectComponents/DetailsDialog'
import CheckDetailsDialog from '@/components/ProjectComponents/CheckDetailsDialog'
import ProjectPhotoDialog from '@/components/ProjectComponents/ProjectPhotoDialog'
import { uploadFileSearch } from '@/api/api'
import { riskPointSearchSearch, riskPointSearchSearch1, riskPointSearchSearchDetails1 } from '@/api/riskPoint'
import bottomTableColumns from '@/components/ProjectComponents/BottomTableColumns'
import detailsData from '@/components/ProjectComponents/DetailsData'
export default {
  components: {
    ProjectTable,
    ProjectTab,
    DetailsDialog,
    CheckDetailsDialog,
    ProjectPhotoDialog
  },
  data() {
    return {
      topTableSearchInfo: {
        pageNo: 1,
        pageSize: 10,
        place: ''
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '所在单位', dataIndex: 'currentUnit', align: 'center' },
        { title: '地点', dataIndex: 'location', align: 'center' }
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
        { index: 0, isActive: true, name: '检查单', details: true, param: 'riskPointSearch' }
      ], // tab数据
      checkDetailsSearchInfo: {
        id: '',
        pageNo: 1,
        pageSize: 10
      }, // 检查明细查询信息
      checkDetailsColumns: [
        { title: '检查项目', dataIndex: 'checkProject', align: 'center', ellipsis: true },
        { title: '检查标准', dataIndex: 'checkStandard', align: 'center', ellipsis: true },
        { title: '检查点', dataIndex: 'checkPoint', align: 'center', ellipsis: true },
        { title: '检查内容', dataIndex: 'checkContent', align: 'center', ellipsis: true },
        { title: '检查情况', dataIndex: 'checkCondition', align: 'center', ellipsis: true },
        { title: '问题描述', dataIndex: 'questionDescription', align: 'center', ellipsis: true }
      ], // 检查明细表头配置
      checkDetailsTableData: [], // 检查明细表格数据
      checkDetailsTableTotal: 0 // 检查明细表格总数
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
      riskPointSearchSearch(this.topTableSearchInfo).then(res => {
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
      this.bottomTableColumns = bottomTableColumns['riskPointSearch']
      riskPointSearchSearch1(this.bottomTableSearchInfo).then(res => {
        if (res) {
          this.bottomTableData = res.records
          this.bottomTableTotal = res.total
        }
      })
    },
    // 底部表格操作
    bottomTableOperate(type, row) {
      if (type === 'projectTableDetails') {
        this.$refs.DetailsDialog.visible = true
        this.$refs.DetailsDialog.title = '检查单详情'
        this.$refs.DetailsDialog.detailsData = detailsData['riskPointSearch']
        this.$refs.DetailsDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableCheckDetails') {
        this.$refs.CheckDetailsDialog.visible = true
        this.$refs.CheckDetailsDialog.title = '检查单检查明细'
        this.checkDetailsSearchInfo.id = row.id
        this.searchCheckDetailsData()
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
    // 底部表格分页改变
    bottomTablePageChange(type, value) {
      this.bottomTableSearchInfo[type] = value
      this.searchBottomTableData((type === 'pageNo' || type === 'pageSize') ? 'fy' : undefined)
    },
    // 查询检查明细数据
    searchCheckDetailsData() {
      riskPointSearchSearchDetails1(this.checkDetailsSearchInfo).then(res => {
        if (res) {
          this.checkDetailsTableData = res.records
          this.checkDetailsTableTotal = res.total
        }
      })
    },
    // 检查明细表格分页改变
    checkDetailsTablePageChange(type, value) {
      this.checkDetailsSearchInfo[type] = value
      this.searchCheckDetailsData()
    }
  }
}
</script>
