<template>
  <div class="project-page-tree">
    <div class="project-page-tree-right notree">
      <div class="project-page-tree-right-box" ref="topTableArea">
        <div style="margin-bottom: 10px;">
          <a-form-model layout="inline" ref="resetForm" :model="topTableSearchInfo">
            <a-form-model-item label="年份" prop="year">
              <a-select
                  model="default"
                  placeholder="请选择年份"
                  :allowClear="true"
                  v-model="topTableSearchInfo.year"
              >
                <a-select-option v-for="item in yearSelectData" :key="item.value" :value="item.value">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="月份" prop="month">
              <a-select
                  model="default"
                  placeholder="请选择月份"
                  :allowClear="true"
                  v-model="topTableSearchInfo.month"
              >
                <a-select-option v-for="item in monthSelectData" :key="item.value" :value="item.value">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="专业" prop="subject">
              <a-input placeholder="请输入专业" v-model="topTableSearchInfo.subject" />
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
            :projectTableScrollNum="4"
            :nowTabInfo="tabsData[0]"
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
    <CheckDetailsDialog ref="CheckDetailsDialog" :checkDetailsColumns="checkDetailsColumns" :checkDetailsTableData="checkDetailsTableData" :checkDetailsTableTotal="checkDetailsTableTotal" :checkDetailsSearchInfo="checkDetailsSearchInfo" @checkDetailsTablePageChange="checkDetailsTablePageChange" />
    <ProjectPhotoDialog ref="ProjectPhotoDialog" :fileShowType="'show'" :uploadFilesList="uploadFilesList" @fileOperateSuccess="searchUploadFiles" />
  </div>
</template>

<script>
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import ProjectTab from '@/components/ProjectComponents/ProjectTab'
import CheckDetailsDialog from '@/components/ProjectComponents/CheckDetailsDialog'
import ProjectPhotoDialog from '@/components/ProjectComponents/ProjectPhotoDialog'
import { uploadFileSearch } from '@/api/api'
import { majorInsceptionCollectSearch, majorInsceptionSubmitSearch1, majorInsceptionSearch } from '@/api/majorInsception'
import bottomTableColumns from '@/components/ProjectComponents/BottomTableColumns'
export default {
  components: {
    ProjectTable,
    ProjectTab,
    CheckDetailsDialog,
    ProjectPhotoDialog
  },
  data() {
    return {
      yearSelectData: [], // 年份下拉框数据
      monthSelectData: [], // 月份下拉框数据
      topTableSearchInfo: {
        pageNo: 1,
        pageSize: 10,
        year: undefined,
        month: undefined
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '年份', dataIndex: 'year', align: 'center', width: 120 },
        { title: '月份', dataIndex: 'month', align: 'center', width: 120 },
        { title: '被检查单位', dataIndex: 'checkedUnit', align: 'center', ellipsis: true },
        { title: '专业', dataIndex: 'professionalType', align: 'center', ellipsis: true },
        { title: '得分', dataIndex: 'score', align: 'center', sorter: true }
      ], // 顶部表格表头配置
      topTableData: [], // 顶部表格数据
      topTableTotal: 0, // 顶部表格总数
      topTableScrollHeight: 0, // 顶部表格滚动高度
      topTableFilesList: [], // 顶部表格当前行文件列表
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
        { index: 0, isActive: true, name: '检查单', param: 'majorInsceptionCollect' }
      ], // tab数据
      checkDetailsSearchInfo: {
        id: '',
        pageNo: 1,
        pageSize: 10,
        column: '',
        isAsc: false,
        checkerUnit:''
      }, // 检查明细查询信息
      checkDetailsColumns: [
        { title: '序号', dataIndex: 'number', align: 'center' },
        { title: '要素', dataIndex: 'element', align: 'center' },
        { title: '项目', dataIndex: 'project', align: 'center' },
        { title: '项目总分', dataIndex: 'projectScore', align: 'center' },
        { title: '工作要求', dataIndex: 'workRequirements', align: 'center' },
        { title: '评价标准', dataIndex: 'evaluationStandard', align: 'center' },
        { title: '扣分', dataIndex: 'decduction', align: 'center' },
        { title: '备注', dataIndex: 'note', align: 'center' }
      ],  // 检查明细表头配置
      checkDetailsTableData: [], // 检查明细表格数据
      checkDetailsTableTotal: 0 // 检查明细表格总数
    }
  },
  mounted() {
    this.yearSelectData = []
    this.monthSelectData = []
    const nowYear = new Date().getFullYear()
    for (let i = nowYear - 4; i <= nowYear; i++) {
      this.yearSelectData.push({ name: i + '年', value: i })
    }
    for (let i = 1; i <= 12; i++) {
      this.monthSelectData.push({ name: i + '月', value: i })
    }
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
      majorInsceptionCollectSearch(this.topTableSearchInfo).then(res => {
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
      this.bottomTableSearchInfo.checkerUnit = row.checkedUnit
      this.searchBottomTableData()
    },
    // 查询底部表格数据
    searchBottomTableData(type) {
      if (type !== 'fy') {
        this.bottomTableSearchInfo.pageNo = 1
        this.bottomTableSearchInfo.pageSize = 10
      }
      this.bottomTableColumns = bottomTableColumns['majorInsceptionCollect']
      majorInsceptionSearch(this.bottomTableSearchInfo).then(res => {
        if (res) {
          this.bottomTableData = res.records
          this.bottomTableTotal = res.total
        }
      })
    },
    // 底部表格操作
    bottomTableOperate(type, row) {
      if (type === 'projectTableCheckDetails') {
        this.$refs.CheckDetailsDialog.visible = true
        this.$refs.CheckDetailsDialog.title = '专业检查明细列表'
        this.checkDetailsSearchInfo.id = row.id
        this.searchCheckDetailsData()
      } else if (type === 'projectTablePhoto') {
        this.$refs.ProjectPhotoDialog.visible = true
        this.$refs.ProjectPhotoDialog.parentId = row.id
        this.searchUploadFiles(row.id)
      }
    },
    // 查询检查明细数据
    searchCheckDetailsData() {
      majorInsceptionSubmitSearch1(this.checkDetailsSearchInfo).then(res => {
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
    },
    // 底部表格分页改变
    bottomTablePageChange(type, value) {
      this.bottomTableSearchInfo[type] = value
      this.searchBottomTableData((type === 'pageNo' || type === 'pageSize') ? 'fy' : undefined)
    }
  }
}
</script>

