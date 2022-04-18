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
      <div class="project-page-tree-right-box" ref="topTableArea">
        <div v-if="topTableSearchInfo.id !== ''">
          <a-form-model layout="inline" ref="resetForm" :model="topTableSearchInfo">
            <a-form-model-item label="注册编号" prop="tzsb_sbbh">
              <a-input placeholder="请输入注册编号" v-model="topTableSearchInfo.tzsb_sbbh" />
            </a-form-model-item>
            <a-form-model-item label="设备名称" prop="tzsb_sbmc">
              <a-input placeholder="请输入设备名称" v-model="topTableSearchInfo.tzsb_sbmc" />
            </a-form-model-item>
            <a-form-model-item label="是否超期" prop="tzsb_sfcq">
              <a-select
                  model="default"
                  placeholder="请选择是否超期"
                  :allowClear="true"
                  v-model="topTableSearchInfo.tzsb_sfcq"
              >
                <a-select-option value="是">是</a-select-option>
                <a-select-option value="否">否</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" icon="search" @click="searchTopData">查询</a-button>
              <a-button type="primary" icon="sync" style="margin-left: 10px;" @click="searchFormReset">重置</a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
        <ProjectTable
            :projectTableScrollNum="3"
            :nowTabInfo="tabsData[0]"
            :projectTableDetailsBtn="true"
            :projectTableAddBtn="true"
            :projectTableEditBtn="true"
            :projectTableDeleteBtn="true"
            :projectTableImportBtn="true"
            :projectTableSearchInfo="topTableSearchInfo"
            :projectTableScrollHeight="topTableScrollHeight"
            :projectTableColumns="topTableSearchInfo.id === '' ? [] : topTableColumns"
            :projectTableData="topTableData"
            :projectTableTotal="topTableTotal"
            @projectTableOperate="topTableOperate"
            @projectTablePageChange="topTablePageChange"
            @projectTableRowClick="topTableRowClick"
        />
      </div>
      <div class="project-page-tree-right-box" ref="bottomTableArea">
        <ProjectTab v-if="bottomTableSearchInfo.tzsb_tzsbdaId !== ''" :tabsData="tabsData" />
        <ProjectTable
            :projectTableScrollNum="3"
            :nowTabInfo="tabsData[0]"
            :projectTableAddBtn="true"
            :projectTableEditBtn="true"
            :projectTableDeleteBtn="true"
            :projectTableSearchInfo="bottomTableSearchInfo"
            :projectTableScrollHeight="bottomTableScrollHeight"
            :projectTableColumns="bottomTableSearchInfo.tzsb_tzsbdaId === '' ? [] : bottomTableColumns"
            :projectTableData="bottomTableData"
            :projectTableTotal="bottomTableTotal"
            @projectTableOperate="bottomTableOperate"
            @projectTablePageChange="bottomTablePageChange"
        />
      </div>
    </div>
    <TopTableOperateDialog ref="TopTableOperateDialog" :topTableOperateDialogFlag="'specialEquipmentMaintain'" @operateSuccess="searchTopData" />
    <BottomTableOperateDialog ref="BottomTableOperateDialog" :nowTabInfo="tabsData[0]" :bottomTableOperateDialogFlag="'specialEquipmentMaintain'" @operateSuccess="searchBottomTableData" />
    <DetailsDialog ref="DetailsDialog" />
    <ProjectImportDialog ref="ProjectImportDialog" @importSuccess="searchTopData" />
  </div>
</template>

<script>
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import ProjectTab from '@/components/ProjectComponents/ProjectTab'
import TopTableOperateDialog from '@/components/ProjectComponents/TopTableOperateDialog'
import BottomTableOperateDialog from '@/components/ProjectComponents/BottomTableOperateDialog'
import DetailsDialog from '@/components/ProjectComponents/DetailsDialog'
import ProjectImportDialog from '@/components/ProjectComponents/ProjectImportDialog'
import { specialEquipmentMaintainSearch, specialEquipmentMaintainOperate, specialEquipmentMaintainSearch1, specialEquipmentMaintainOperate1 } from '@/api/specialEquipment'
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
    ProjectImportDialog
  },
  data() {
    return {
      topTableSearchInfo: {
        id: '',
        tzsb_ejdwId: '',
        pageNo: 1,
        pageSize: 10,
        tzsb_sbbh: '',
        tzsb_sbmc: '',
        tzsb_sfcq: undefined
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '注册编号', dataIndex: 'zcbh', align: 'center', width: 120, ellipsis: true },
        { title: '设备名称', dataIndex: 'sbmc', align: 'center', width: 120, ellipsis: true },
        { title: '规格型号', dataIndex: 'ggxh', align: 'center', width: 120, ellipsis: true },
        { title: '安装地点', dataIndex: 'azdd', align: 'center', width: 120, ellipsis: true },
        { title: '设备代码', dataIndex: 'sbdm', align: 'center', width: 120, ellipsis: true },
        { title: '用途', dataIndex: 'yt', align: 'center', width: 120, ellipsis: true },
        { title: '使用状态', dataIndex: 'syzt', align: 'center', width: 120, ellipsis: true },
        { title: '生产单位', dataIndex: 'scdw', align: 'center', width: 120, ellipsis: true },
        { title: '出厂日期', dataIndex: 'ccrq', align: 'center', width: 120, ellipsis: true },
        { title: '检验状态', dataIndex: 'jyzt', align: 'center', width: 120, ellipsis: true },
        { title: '上次检验日期', dataIndex: 'scjyrq', align: 'center', width: 120, ellipsis: true },
        { title: '下次检验日期', dataIndex: 'xcjyrq', align: 'center', width: 120, ellipsis: true },
        { title: '是否超期', dataIndex: 'sfcq', align: 'center', width: 120, ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 240, fixed: 'right' }
      ], // 顶部表格表头配置
      topTableData: [], // 顶部表格数据
      topTableTotal: 0, // 顶部表格总数
      topTableScrollHeight: 0, // 顶部表格滚动高度
      bottomTableSearchInfo: {
        id: '',
        tzsb_tzsbdaId: '',
        pageNo: 1,
        pageSize: 10
      }, // 底部表格查询信息
      bottomTableColumns: [], // 底部表格表头配置
      bottomTableData: [], // 底部表格数据
      bottomTableTotal: 0, // 底部表格总数
      bottomTableScrollHeight: 0, // 底部表格滚动高度
      tabsData: [
        { index: 0, isActive: true, name: '检定记录', details: true, isSpecial: true, isImport: true, xScroll: true, param: 'specialEquipmentMaintain' }
      ] // tab数据
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
    // 底部高度需减去（上下padding高度40）（tab高度55）（顶部表格操作区域42）（表格表头高度46）（分页高度42）（边框高度2）
    this.bottomTableScrollHeight = this.$refs.bottomTableArea.clientHeight - 40 - 55 - 42 - 46 - 42 - 2
  },
  methods: {
    // 树数据点击
    treeSelect(selectedKeys) {
      if (selectedKeys[0].split('/').length > 1) {
        this.topTableSearchInfo.id = this.topTableSearchInfo.tzsb_ejdwId = selectedKeys[0].split('/')[1].split('-')[0]
        this.searchTopData()
      } else {
        this.topTableSearchInfo.id = this.topTableSearchInfo.tzsb_ejdwId = ''
        this.topTableData = []
      }
      this.bottomTableSearchInfo.id = this.bottomTableSearchInfo.tzsb_tzsbdaId = ''
      this.bottomTableColumns = []
      this.bottomTableData = []
    },
    // 查询顶部表格数据
    searchTopData(type) {
      if (type !== 'fy') {
        this.topTableSearchInfo.pageNo = 1
        this.topTableSearchInfo.pageSize = 10
      }
      this.bottomTableSearchInfo.id = this.bottomTableSearchInfo.tzsb_tzsbdaId = ''
      this.bottomTableColumns = []
      this.bottomTableData = []
      specialEquipmentMaintainSearch(this.topTableSearchInfo).then(res => {
        if (res) {
          if (res.records.length > 0) {
            res.records.forEach(item => {
              item.id = item.tzsbdaid
            })
          }
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
        this.$refs.DetailsDialog.title = '特种设备档案详情'
        this.$refs.DetailsDialog.detailsData = detailsData['specialEquipmentMaintain']
        this.$refs.DetailsDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableAdd') {
        nowDialog.visible = true
        nowDialog.type = type
        nowDialog.title = '新增特种设备档案'
        nowDialog.form.status = 'insert'
        nowDialog.form.ejjgdaId = this.topTableSearchInfo.tzsb_ejdwId
        nowDialog.form.loginUserId = JSON.parse(localStorage.getItem('userInfo')).id
      } else if (type === 'projectTableEdit') {
        nowDialog.visible = true
        nowDialog.type = type
        nowDialog.title = '编辑特种设备档案'
        nowDialog.form = JSON.parse(JSON.stringify(row))
        nowDialog.form.status = 'update'
        nowDialog.form.loginUserId = JSON.parse(localStorage.getItem('userInfo')).id
      } else if (type === 'projectTableDelete') {
        row.status = 'delete'
        row.loginUserId = JSON.parse(localStorage.getItem('userInfo')).id
        specialEquipmentMaintainOperate(row).then(res => operateSuccess(this, res, 'top'))
      } else if (type === 'projectTableImport') {
        this.$refs.ProjectImportDialog.visible = true
        this.$refs.ProjectImportDialog.keyword = this.topTableSearchInfo.id
        this.$refs.ProjectImportDialog.sheetName = '特种设备'
      }
    },
    // 顶部表格分页改变
    topTablePageChange(type, value) {
      this.topTableSearchInfo[type] = value
      this.searchTopData((type === 'pageNo' || type === 'pageSize') ? 'fy' : undefined)
    },
    // 顶部表格行点击
    topTableRowClick(row) {
      this.bottomTableSearchInfo.id = this.bottomTableSearchInfo.tzsb_tzsbdaId = row.tzsbdaid
      this.searchBottomTableData()
    },
    // 查询底部表格数据
    searchBottomTableData(type) {
      if (type !== 'fy') {
        this.bottomTableSearchInfo.pageNo = 1
        this.bottomTableSearchInfo.pageSize = 10
      }
      this.bottomTableColumns = bottomTableColumns['specialEquipmentMaintain']
      const params = new FormData()
      for (const item in this.bottomTableSearchInfo) {
        params.append(item, this.bottomTableSearchInfo[item])
      }
      specialEquipmentMaintainSearch1(params).then(res => {
        if (res) {
          if (res.records && res.records.length > 0) {
            res.records.forEach(item => {
              item.id = item.p_tzsbjdjl_id
            })
          }
          this.bottomTableData = res.records
          this.bottomTableTotal = res.total
        }
      })
    },
    // 底部表格操作
    bottomTableOperate(type, row) {
      const nowDialog = this.$refs.BottomTableOperateDialog
      if (type === 'projectTableAdd') {
        nowDialog.visible = true
        nowDialog.type = type
        nowDialog.title = '新增特种设备档案检定记录'
        nowDialog.form.status = 'insert'
        nowDialog.form.tzsbdaId = this.bottomTableSearchInfo.tzsb_tzsbdaId
      } else if (type === 'projectTableEdit') {
        nowDialog.visible = true
        nowDialog.title = '编辑特种设备档案检定记录'
        nowDialog.type = type
        nowDialog.form = JSON.parse(JSON.stringify(row))
        nowDialog.form.status = 'update'
      } else if (type === 'projectTableDelete') {
        row.status = 'delete'
        specialEquipmentMaintainOperate1(row).then(res => operateSuccess(this, res, 'bottom'))
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
