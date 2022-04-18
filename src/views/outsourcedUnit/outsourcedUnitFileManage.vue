<template>
  <div class="project-page-tree">
    <div class="project-page-tree-right notree">
      <div class="project-page-tree-right-box" ref="topTableArea">
        <div style="margin-bottom: 10px;">
          <a-form-model layout="inline" ref="resetForm" :model="topTableSearchInfo">
            <a-form-model-item label="外委单位" prop="oUnit">
              <a-input placeholder="请输入外委单位" v-model="topTableSearchInfo.oUnit" />
            </a-form-model-item>
            <a-form-model-item label="单位状态" prop="unitStatus">
              <a-input placeholder="请输入单位状态" v-model="topTableSearchInfo.unitStatus" />
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
            :projectTableEditBtn="true"
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
            :projectTableScrollNum="4"
            :nowTabInfo="tabsData[0]"
            :projectTableEditBtn="true"
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
    <TopTableOperateDialog ref="TopTableOperateDialog" :topTableOperateDialogFlag="'outsourcedUnitFileManage'" @operateSuccess="searchTopData" />
    <BottomTableOperateDialog ref="BottomTableOperateDialog" :nowTabInfo="tabsData[0]" :bottomTableOperateDialogFlag="'outsourcedUnitFileManage'" @operateSuccess="searchBottomTableData" />
  </div>
</template>

<script>
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import ProjectTab from '@/components/ProjectComponents/ProjectTab'
import TopTableOperateDialog from '@/components/ProjectComponents/TopTableOperateDialog'
import BottomTableOperateDialog from '@/components/ProjectComponents/BottomTableOperateDialog'
import { getDictionaryDetails } from '@/api/api'
import { outsourcedUnitFileManageSearch,outsourcedUnitFileManageChildSearch } from '@/api/outsourcedUnit'
import bottomTableColumns from '@/components/ProjectComponents/BottomTableColumns'
export default {
  components: {
    ProjectTable,
    ProjectTab,
    TopTableOperateDialog,
    BottomTableOperateDialog
  },
  data() {
    return {
      yearSelectData: [], // 年份下拉框数据
      monthSelectData: [], // 月份下拉框数据
      topTableSearchInfo: {
        pageNo: 1,
        pageSize: 10
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '单位名称', dataIndex: 'unitName', align: 'center', ellipsis: true },
        { title: '单位状态', dataIndex: 'unitStatus', align: 'center', width: 120 },
        { title: '单位地址', dataIndex: 'unitLocation', align: 'center', ellipsis: true },
        { title: '单位类型', dataIndex: 'unitType', align: 'center', width: 120 },
        { title: '单位负责人', dataIndex: 'principle', align: 'center', ellipsis: true },
        { title: '单位联系人', dataIndex: 'contact', align: 'center', ellipsis: true },
        { title: '联系方式', dataIndex: 'contactInformation', align: 'center', ellipsis: true },
        { title: '清退或停工的原因', dataIndex: 'downtimeReason', align: 'center', ellipsis: true },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 120 }
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
        { index: 0, isActive: true, name: '施工记录', param: 'outsourcedUnitFileManage', isSpecial: true }
      ] // tab数据
    }
  },
  mounted() {
    // 顶部高度需减去（上下padding高度40）（顶部搜索表单高度50）（表格表头高度46）（分页高度42）（边框高度2）
    this.topTableScrollHeight = this.$refs.topTableArea.clientHeight - 40 - 50 - 46 - 42 - 2
    // 底部高度需减去（上下padding高度40）（tab高度55）（表格表头高度46）（分页高度42）（边框高度2）
    this.bottomTableScrollHeight = this.$refs.bottomTableArea.clientHeight - 40 - 55 - 46 - 42 - 2
    this.searchDict()
    this.searchTopData()
  },
  methods: {
    // 查询数据字典外委单位类型数据
    searchDict() {
      getDictionaryDetails({ name: '外委单位类型' }).then(res => {
        if (res) this.$refs.TopTableOperateDialog.dwlxSelectData = res
      })
    },
    // 查询顶部表格数据
    searchTopData(type) {
      if (type !== 'fy') {
        this.topTableSearchInfo.pageNo = 1
        this.topTableSearchInfo.pageSize = 10
      }
      outsourcedUnitFileManageSearch(this.topTableSearchInfo).then(res => {
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
      nowDialog.visible = true
      nowDialog.type = type
      nowDialog.title = '编辑外委单位档案记录'
      nowDialog.form = JSON.parse(JSON.stringify(row))
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
      this.bottomTableColumns = bottomTableColumns['outsourcedUnitFileManage']
      outsourcedUnitFileManageChildSearch(this.bottomTableSearchInfo).then(res => {
        if (res) {
          this.bottomTableData = res.records
          this.bottomTableTotal = res.total
        }
      })
    },
    // 底部表格操作
    bottomTableOperate(type, row) {
      const nowDialog = this.$refs.BottomTableOperateDialog
      nowDialog.visible = true
      nowDialog.title = '编辑检查情况'
      nowDialog.type = type
      nowDialog.form = JSON.parse(JSON.stringify(row))
    },
    // 底部表格分页改变
    bottomTablePageChange(type, value) {
      this.bottomTableSearchInfo[type] = value
      this.searchBottomTableData((type === 'pageNo' || type === 'pageSize') ? 'fy' : undefined)
    }
  }
}
</script>
