<template>
  <div class="project-page-tree">
    <div class="project-page-tree-right notree">
      <div class="project-page-tree-right-box" ref="topTableArea">
        <div>
          <a-form-model layout="inline" ref="resetForm" :model="topTableSearchInfo">
            <a-form-model-item label="专业类型" prop="type">
              <a-input placeholder="请输入专业类型" v-model="topTableSearchInfo.type" />
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
            :projectTableAddBtn="true"
            :projectTableEditBtn="true"
            :projectTableDeleteBtn="true"
            :projectTableSearchInfo="topTableSearchInfo"
            :projectTableScrollHeight="topTableScrollHeight"
            :projectTableColumns="topTableColumns"
            :projectTableData="topTableData"
            :projectTableTotal="topTableTotal"
            @projectTablePageChange="topTablePageChange"
            @projectTableRowClick="topTableRowClick"
            @projectTableOperate="topTableOperate"
        />
      </div>
      <div class="project-page-tree-right-box" ref="bottomTableArea">
        <ProjectTab v-if="bottomTableSearchInfo.id !== ''" :tabsData="tabsData" @tabChange="tabChange" />
        <ProjectTable
            ref="ProjectTable"
            :nowTabInfo="nowTabInfo"
            :projectTableScrollNum="3"
            :projectTableAddBtn="true"
            :projectTableEditBtn="true"
            :projectTableDeleteBtn="true"
            :projectTableSearchInfo="bottomTableSearchInfo"
            :projectTableScrollHeight="bottomTableScrollHeight"
            :projectTableColumns="bottomTableSearchInfo.id === '' ? [] : bottomTableColumns"
            :projectTableData="bottomTableData"
            :projectTableTotal="bottomTableTotal"
            @projectTablePageChange="bottomTablePageChange"
            @projectTableOperate="bottomTableOperate"
        />
      </div>
    </div>
    <TopTableOperateDialog ref="TopTableOperateDialog" :topTableOperateDialogFlag="'majorInsceptionSet'" @operateSuccess="searchTopData" />
    <BottomTableOperateDialog ref="BottomTableOperateDialog" :nowTabInfo="nowTabInfo" :bottomTableOperateDialogFlag="'majorInsceptionSet'" @operateSuccess="searchBottomTableData" />
    <ProjectUserDialog ref="ProjectUserDialog" :userSelectType="'more'" @userSelectSuccess="userSelectSuccess" />
    <ProjectUnitDialog ref="ProjectUnitDialog" :unitType="2" :unitSelectType="'more'" @unitSelectSuccess="unitSelectSuccess" />
  </div>
</template>

<script>
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import ProjectTab from '@/components/ProjectComponents/ProjectTab'
import TopTableOperateDialog from '@/components/ProjectComponents/TopTableOperateDialog'
import BottomTableOperateDialog from '@/components/ProjectComponents/BottomTableOperateDialog'
import ProjectUserDialog from '@/components/ProjectComponents/ProjectUserDialog'
import ProjectUnitDialog from '@/components/ProjectComponents/ProjectUnitDialog'
import { getTabsList } from '@/api/api'
import { majorInsceptionSetSearch,majorInsceptionSetSearch1,majorInsceptionDelete1,majorInsceptionDelete2,majorInsceptionDelete3,majorInsceptionSetDelete,majorInsceptionAdd3,majorInsceptionAdd2 } from '@/api/majorInsception'
import { operateSuccess } from '@/utils/projectUtils'
import bottomTableColumns from '@/components/ProjectComponents/BottomTableColumns'
export default {
  components: {
    ProjectTable,
    ProjectTab,
    TopTableOperateDialog,
    BottomTableOperateDialog,
    ProjectUserDialog,
    ProjectUnitDialog
  },
  data() {
    return {
      topTableSearchInfo: {
        pageNo: 1,
        pageSize: 10,
        type: ''
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '序号', dataIndex: 'num', align: 'center', width: 120 },
        { title: '专业类型', dataIndex: 'professionalType', align: 'center' },
        { title: '检查单位', dataIndex: 'fillUnit', align: 'center' },
        { title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center', width: 160 }
      ], // 顶部表格表头配置
      topTableData: [], // 顶部表格数据
      topTableTotal: 0, // 顶部表格总数
      topTableScrollHeight: 0, // 顶部表格滚动高度
      bottomTableSearchInfo: {
        id:"",
        pageNo: 1,
        pageSize: 10,
        moduleName: ''
      }, // 底部表格查询信息
      bottomTableColumns: [], // 底部表格表头配置
      bottomTableData: [], // 底部表格数据
      bottomTableTotal: 0, // 底部表格总数
      bottomTableScrollHeight: 0, // 底部表格滚动高度
      tabsData: [], // tab数据
      nowTabInfo: {} // 当前tab信息
    }
  },
  mounted() {
    // 顶部高度需减去（上下padding高度40）（顶部搜索表单高度40）（顶部表格操作区域42）（表格表头高度46）（分页高度42）（边框高度2）
    this.topTableScrollHeight = this.$refs.topTableArea.clientHeight - 40 - 40 - 42 - 46 - 42 - 2
    // 底部高度需减去（上下padding高度40）（tab高度55）（顶部表格操作区域42）（表格表头高度46）（分页高度42）（边框高度2）
    this.bottomTableScrollHeight = this.$refs.bottomTableArea.clientHeight - 40 - 55 - 42 - 46 - 42 - 2
    this.searchTabsData()
    this.searchTopData()
  },
  methods: {
    // 根据系统二级菜单查询tabs标签数据
    searchTabsData() {
      getTabsList({ menus: 'checkTypeSetUp' }).then(res => {
        if (res) {
          res.forEach((item, index) => {
            item.index = index
            item.isActive = index === 0
            item.noEdit = item.param === 'checkedUnit' || item.param === 'checkPersonal'
          })
          this.tabsData = res
          this.nowTabInfo = res[0]
          this.bottomTableSearchInfo.moduleName = res[0].param
        }
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
      majorInsceptionSetSearch(this.topTableSearchInfo).then(res => {
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
      if (type === 'projectTableAdd') {
        nowDialog.visible = true
        nowDialog.type = type
        nowDialog.title = '新增专业检查类型'
        nowDialog.form = { num: 1, fillUnit: '' }
      } else if (type === 'projectTableEdit') {
        nowDialog.visible = true
        nowDialog.type = type
        nowDialog.title = '编辑专业检查类型'
        nowDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableDelete') {
        majorInsceptionSetDelete([ row.id ]).then(res => operateSuccess(this, res, 'top'))
      }
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
      this.bottomTableColumns = bottomTableColumns[this.nowTabInfo.param]
      this.bottomTableSearchInfo.moduleName = this.nowTabInfo.param
      majorInsceptionSetSearch1(this.bottomTableSearchInfo).then(res => {
        if (res) {
          this.bottomTableData = res.records
          this.bottomTableTotal = res.total
        }
      })
    },
    // tab切换
    tabChange(item) {
      this.nowTabInfo = item
      this.tabsData.forEach((itm, idx) => {
        itm.isActive = idx === item.index
      })
      this.searchBottomTableData()
    },
    // 底部表格操作
    bottomTableOperate(type, row) {
      const nowDialog = this.$refs.BottomTableOperateDialog
      if (type === 'projectTableAdd') {
        if (this.nowTabInfo.param === 'checkPersonal') {
          this.$refs.ProjectUserDialog.visible = true
        } else if (this.nowTabInfo.param === 'CheckListDetail') {
          nowDialog.visible = true
          nowDialog.title = '新增专业评分标准'
          nowDialog.type = type
          nowDialog.form = {
            professionalInspectionTypeId: this.bottomTableSearchInfo.id,
            num: 1
          }
        } else if (this.nowTabInfo.param === 'checkedUnit') {
          this.$refs.ProjectUnitDialog.visible = true
        }
      } else if (type === 'projectTableEdit') {
        nowDialog.visible = true
        nowDialog.title = '编辑专业评分标准'
        nowDialog.type = type
        nowDialog.form = JSON.parse(JSON.stringify(row))
      } else if (type === 'projectTableDelete') {
        if (this.nowTabInfo.param === 'CheckListDetail') {
          majorInsceptionDelete1([ row.id ]).then(res => operateSuccess(this, res, 'bottom'))
        } else if (this.nowTabInfo.param === 'checkedUnit') {
          majorInsceptionDelete2([row.id]).then(res => operateSuccess(this, res, 'bottom'))
        }else {
          majorInsceptionDelete3([ row.id ]).then(res => operateSuccess(this, res, 'bottom'))
        }
      }
    },
    //人员选择成功
    userSelectSuccess(users) {
      const usersData = []
      users.forEach(item => {
        usersData.push({
          workNum: item.workNum,
          userName: item.name,
          threeInstitutionsId: item.threeInstitutionsId,
          professionalInspectionTypeId: this.bottomTableSearchInfo.id
        })
      })
      majorInsceptionAdd3(usersData).then(res => operateSuccess(this, res, 'bottom'))
    },
    //单位选择成功
    unitSelectSuccess(unit) {
      const unitData = []
      unit.forEach(item => {
        unitData.push({
          unitName:item.split('-')[2],
          professionalInspectionTypeId: this.bottomTableSearchInfo.id
        })
      })
      majorInsceptionAdd2(unitData).then(res => operateSuccess(this, res, 'bottom'))
    },
    // 底部表格分页改变
    bottomTablePageChange(type, value) {
      this.bottomTableSearchInfo[type] = value
      this.searchBottomTableData((type === 'pageNo' || type === 'pageSize') ? 'fy' : undefined)
    }
  }
}
</script>
