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
            <a-form-model-item label="工号" prop="code">
              <a-input placeholder="请输入工号" v-model="topTableSearchInfo.code" />
            </a-form-model-item>
            <a-form-model-item label="姓名" prop="name">
              <a-input placeholder="请输入姓名" v-model="topTableSearchInfo.name" />
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
        <ProjectTab v-if="bottomTableSearchInfo.id !== ''" :tabsData="tabsData" @tabChange="tabChange" style="margin-bottom: 8px;" />
        <ProjectTable
            :projectTableScrollNum="3"
            :nowTabInfo="nowTabInfo"
            :projectTableAddBtn="true"
            :projectTableEditBtn="true"
            :projectTableDeleteBtn="true"
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
    <BottomTableOperateDialog ref="BottomTableOperateDialog" :nowTabInfo="nowTabInfo" :bottomTableOperateDialogFlag="'healthMaintain'" @operateSuccess="searchBottomTableData" />
    <ProjectImportDialog ref="ProjectImportDialog" @importSuccess="searchTopData" />
  </div>
</template>

<script>
import ProjectTable from '@/components/ProjectComponents/ProjectTable'
import ProjectTab from '@/components/ProjectComponents/ProjectTab'
import BottomTableOperateDialog from '@/components/ProjectComponents/BottomTableOperateDialog'
import ProjectImportDialog from '@/components/ProjectComponents/ProjectImportDialog'
import { getDictionaryDetails, getTabsList } from '@/api/api'
import { workshopSearch2 } from '@/api/basic'
import { healthMaintainSearch1, healthMaintainSearch2, healthMaintainOperate1, healthMaintainOperate2 } from '@/api/health'
import { operateSuccess } from '@/utils/projectUtils'
import bottomTableColumns from '@/components/ProjectComponents/BottomTableColumns'
export default {
  components: {
    ProjectTable,
    ProjectTab,
    BottomTableOperateDialog,
    ProjectImportDialog
  },
  data() {
    return {
      topTableSearchInfo: {
        id: '',
        pageNo: 1,
        pageSize: 10,
        code: '',
        name: ''
      }, // 顶部表格查询信息
      topTableColumns: [
        { title: '工号', dataIndex: 'workNum', align: 'center' },
        { title: '姓名', dataIndex: 'name', align: 'center' },
        { title: '岗位', dataIndex: 'jobs', align: 'center' },
        { title: '职务', dataIndex: 'position', align: 'center' },
        { title: '所在班组', dataIndex: 'teamName', align: 'center' }
      ], // 顶部表格表头配置
      topTableData: [], // 顶部表格数据
      topTableTotal: 0, // 顶部表格总数
      topTableScrollHeight: 0, // 顶部表格滚动高度
      bottomTableSearchInfo: {
        id: '',
        pageNo: 1,
        pageSize: 10
      }, // 底部表格查询信息
      bottomTableColumns: [], // 底部表格表头配置
      bottomTableData: [], // 底部表格数据
      bottomTableTotal: 0, // 底部表格总数
      bottomTableScrollHeight: 0, // 底部表格滚动高度
      tabsData: [], // tab数据
      nowTabInfo: {}, // 当前tab信息
    }
  },
  computed: {
    treeData () {
      return JSON.parse(localStorage.getItem('unitInfo23'))
    }
  },
  mounted() {
    // 顶部高度需减去（上下padding高度40）（顶部搜索表单高度40）（顶部表格操作区域42）（表格表头高度46）（分页高度42）（边框高度2）
    this.topTableScrollHeight = this.$refs.topTableArea.clientHeight - 40 - 40 - 42 - 46 - 42 - 2
    // 底部高度需减去（上下padding高度40）（tab高度55）（顶部表格操作区域42）（表格表头高度46）（分页高度42）（边框高度2）
    this.bottomTableScrollHeight = this.$refs.bottomTableArea.clientHeight - 40 - 55 - 42 - 46 - 42 - 2
    this.searchDict()
    this.searchTabsData()
  },
  methods: {
    // 查询数据字典外委单位类型数据
    searchDict() {
      getDictionaryDetails({ name: '安全证书类型' }).then(res => {
        if (res) this.$refs.BottomTableOperateDialog.zslxSelectData = res
      })
    },
    // 根据系统二级菜单查询tabs标签数据
    searchTabsData() {
      getTabsList({ menus: 'occupationalHealth' }).then(res => {
        if (res) {
          res.forEach((item, index) => {
            item.index = index
            item.isActive = index === 0
            item.isImport = true
            item.isSpecial = item.xScroll = item.param === 'certificateHolding'
          })
          this.tabsData = res
          this.nowTabInfo = res[0]
        }
      })
    },
    // 树数据点击
    treeSelect(selectedKeys) {
      if (selectedKeys[0].split('/').length > 1) {
        this.topTableSearchInfo.id = selectedKeys[0].split('/')[1].split('-')[0]
        this.searchTopData()
      } else {
        this.topTableSearchInfo.id = ''
        this.topTableData = []
      }
      this.tabsData.forEach((itm, idx) => itm.isActive = idx === 0)
      this.nowTabInfo = this.tabsData[0]
      this.bottomTableSearchInfo.id = this.bottomTableSearchInfo.zyjk_userId = ''
      this.bottomTableColumns = []
      this.bottomTableData = []
    },
    // 查询顶部表格数据
    searchTopData(type) {
      if (type !== 'fy') {
        this.topTableSearchInfo.pageNo = 1
        this.topTableSearchInfo.pageSize = 10
      }
      this.bottomTableSearchInfo.id = this.bottomTableSearchInfo.zyjk_userId = ''
      this.bottomTableColumns = []
      this.bottomTableData = []
      workshopSearch2(this.topTableSearchInfo).then(res => {
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
    topTableOperate() {
      this.$refs.ProjectImportDialog.visible = true
      this.$refs.ProjectImportDialog.keyword = this.topTableSearchInfo.id
      this.$refs.ProjectImportDialog.sheetName = '职业健康'
    },
    // 顶部表格分页改变
    topTablePageChange(type, value) {
      this.topTableSearchInfo[type] = value
      this.searchTopData((type === 'pageNo' || type === 'pageSize') ? 'fy' : undefined)
    },
    // 顶部表格行点击
    topTableRowClick(row) {
      this.bottomTableSearchInfo.id = this.bottomTableSearchInfo.zyjk_userId = row.id
      this.searchBottomTableData()
    },
    // 查询底部表格数据
    searchBottomTableData(type) {
      if (type !== 'fy') {
        this.bottomTableSearchInfo.pageNo = 1
        this.bottomTableSearchInfo.pageSize = 10
      }
      this.bottomTableColumns = bottomTableColumns[this.nowTabInfo.param]
      switch (this.nowTabInfo.param) {
        case 'physicalExaminationRecord':
          healthMaintainSearch1(this.bottomTableSearchInfo).then(res => this.bottomShowResult(res))
          break
        case 'certificateHolding':
          healthMaintainSearch2(this.bottomTableSearchInfo).then(res => this.bottomShowResult(res))
          break
      }
    },
    // 底部表格结果展示
    bottomShowResult(res) {
      if (res) {
        this.bottomTableData = res.records
        this.bottomTableTotal = res.total
      }
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
        nowDialog.visible = true
        nowDialog.type = type
        nowDialog.title = this.nowTabInfo.param === 'physicalExaminationRecord' ? '新增体检记录' : '新增持证情况'
        nowDialog.form.status = 'insert'
        nowDialog.form.loginUserId = JSON.parse(localStorage.getItem('userInfo')).id
        nowDialog.form.userId = this.bottomTableSearchInfo.id
      } else if (type === 'projectTableEdit') {
        nowDialog.visible = true
        nowDialog.type = type
        nowDialog.title = this.nowTabInfo.param === 'physicalExaminationRecord' ? '编辑体检记录' : '编辑持证情况'
        nowDialog.form = JSON.parse(JSON.stringify(row))
        nowDialog.form.status = 'update'
        nowDialog.form.loginUserId = JSON.parse(localStorage.getItem('userInfo')).id
        nowDialog.form.userId = this.bottomTableSearchInfo.id
      } else if (type === 'projectTableDelete') {
        row.status = 'delete'
        row.loginUserId = JSON.parse(localStorage.getItem('userInfo')).id
        switch (this.nowTabInfo.param) {
          case 'physicalExaminationRecord':
            healthMaintainOperate1(row).then(res => operateSuccess(this, res, 'bottom'))
            break
          case 'certificateHolding':
            healthMaintainOperate2(row).then(res => operateSuccess(this, res, 'bottom'))
            break
        }
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
