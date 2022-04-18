<template>
  <div class="project-page-tree">
    <div class="project-page-tree-right notree">
      <div class="project-page-tree-right-box" ref="topTableArea" style="height: 100%">
        <div style="margin-bottom: 10px;">
          <a-form-model layout="inline" ref="resetForm" :model="topTableSearchInfo">
            <a-form-model-item label="隐患日期" prop="hiddenDate">
              <a-date-picker style="width: 100%;" placeholder="请选择隐患日期" v-model="topTableSearchInfo.hiddenDate" :valueFormat="'YYYY-MM-DD'" />
            </a-form-model-item>
            <a-form-model-item label="分厂名称" prop="branch">
              <a-select
                  model="default"
                  placeholder="请选择分厂名称"
                  :allowClear="true"
                  v-model="topTableSearchInfo.branch"
                  @change="fcSelectChange"
              >
                <a-select-option v-for="item in fcSelectData" :key="item.id" :value="item.name">{{item.name}}</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="车间名称" prop="workshop">
              <a-select
                  model="default"
                  placeholder="请选择车间名称"
                  :allowClear="true"
                  v-model="topTableSearchInfo.workshop"
              >
                <a-select-option v-for="item in cjSelectData" :key="item.id" :value="item.name">{{item.name}}</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="处理状态" prop="dealStatus">
              <a-select
                  model="default"
                  placeholder="请选择处理状态"
                  :allowClear="true"
                  v-model="topTableSearchInfo.dealStatus"
              >
                <a-select-option value="上报">上报</a-select-option>
                <a-select-option value="待整改">待整改</a-select-option>
                <a-select-option value="待复查">待复查</a-select-option>
                <a-select-option value="关闭">关闭</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" icon="search" @click="searchTopData">查询</a-button>
              <a-button type="primary" icon="sync" style="margin-left: 10px;" @click="searchFormReset">重置</a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
        <ProjectTable
            :projectTableScrollNum="12"
            :nowTabInfo="tabsData[0]"
            :projectTableDetailsBtn="true"
            :projectTablePhotoBtn="true"
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
    <TopTableOperateDialog ref="TopTableOperateDialog" :topTableOperateDialogFlag="'hiddenDangerRecord'" @operateSuccess="searchTopData" />
    <DetailsDialog ref="DetailsDialog" />
    <ProjectPhotoDialog ref="ProjectPhotoDialog" :fileShowType="'show'" :uploadFilesList="uploadFilesList" @fileOperateSuccess="searchUploadFiles" />
  </div>
</template>

<script>
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import TopTableOperateDialog from '@/components/ProjectComponents/TopTableOperateDialog'
import DetailsDialog from '@/components/ProjectComponents/DetailsDialog'
import ProjectPhotoDialog from '@/components/ProjectComponents/ProjectPhotoDialog'
import { uploadFileSearch } from '@/api/api'
import { hiddenDangerSearch } from '@/api/hiddenDanger'
import detailsData from '@/components/ProjectComponents/DetailsData'
export default {
  components: {
    ProjectTable,
    TopTableOperateDialog,
    DetailsDialog,
    ProjectPhotoDialog
  },
  data() {
    return {
      topTableSearchInfo: {
        pageNo: 1,
        pageSize: 10,
        hiddenDate: '',
        branch: undefined,
        workshop: undefined,
        dealStatus: undefined
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '隐患日期', dataIndex: 'hiddenDate', align: 'center', ellipsis: true },
        { title: '责任单位', dataIndex: 'dutyUnit', align: 'center', ellipsis: true },
        { title: '责任人', dataIndex: 'responsible', align: 'center', ellipsis: true, width: 120 },
        { title: '处理状态', dataIndex: 'recordStatus', align: 'center', ellipsis: true, width: 120 },
        { title: '处理措施', dataIndex: 'dealMeasure', align: 'center', ellipsis: true },
        { title: '整改执行人', dataIndex: 'changerExecutor', align: 'center', ellipsis: true, width: 120 },
        { title: '整改时间', dataIndex: 'changeCompeteTime', align: 'center', ellipsis: true, sorter: true },
        { title: '复查人', dataIndex: 'reviewer', align: 'center', ellipsis: true, width: 120 },
        { title: '复查时间', dataIndex: 'reviewDate', align: 'center', ellipsis: true, sorter: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 160 }
      ], // 顶部表格表头配置
      topTableData: [], // 顶部表格数据
      topTableTotal: 0, // 顶部表格总数
      topTableScrollHeight: 0, // 顶部表格滚动高度
      uploadFilesList: [], // 顶部表格文件列表
      tabsData: [
        { details: true, param: 'hiddenDangerRecord' }
      ], // tab数据
      cjSelectData: [] // 车间名称下拉框数据
    }
  },
  computed: {
    fcSelectData() {
      return JSON.parse(localStorage.getItem('unitInfo12'))[0].secondLevelArchivesList
    } // 分厂名称下拉框数据
  },
  mounted() {
    // 顶部高度需减去（上下padding高度40）（顶部搜索表单高度50）（表格表头高度46）（分页高度42）（边框高度2）
    this.topTableScrollHeight = this.$refs.topTableArea.clientHeight - 40 - 50 - 46 - 42 - 2
    this.searchTopData()
  },
  methods: {
    // 分厂名称下拉框改变
    fcSelectChange(selectedItems) {
      this.cjSelectData = []
      const erSanData = JSON.parse(localStorage.getItem('unitInfo23'))
      erSanData.forEach(item => {
        if (item.name === selectedItems) this.cjSelectData = item.thirdLevelArchivesList
      })
    },
    // 查询顶部表格数据
    searchTopData(type) {
      if (type !== 'fy') {
        this.topTableSearchInfo.pageNo = 1
        this.topTableSearchInfo.pageSize = 10
      }
      hiddenDangerSearch(this.topTableSearchInfo).then(res => {
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
        this.$refs.DetailsDialog.title = '隐患记录详情'
        this.$refs.DetailsDialog.detailsData = detailsData['hiddenDangerRecord']
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
    }
  }
}
</script>
