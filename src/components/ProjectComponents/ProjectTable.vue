<template>
  <div>
    <div class="project-table-top-operate" v-if="projectTableSearchInfo.id !== '' && (projectTableImportBtn || projectTableAddBtn || projectTableBatchEditBtn || projectTableNormalBtn || projectTableImportTbpczqBtn)">
      <a-button v-if="projectTableImportTbpczqBtn" type="primary" icon="sync" style="margin-left: 10px;" @click="projectTableOperate($event, 'projectTableTbpczq')">同步排查周期</a-button>
      <a-button v-if="projectTableImportBtn && nowTabInfo.isImport" type="primary" icon="import" style="margin-left: 10px;" @click="projectTableOperate($event, 'projectTableImport')">导入</a-button>
      <a-button v-if="projectTableAddBtn" type="primary" icon="plus" style="margin-left: 10px;" @click="projectTableOperate($event, 'projectTableAdd')">新增</a-button>
      <a-button v-if="projectTableBatchEditBtn && nowTabInfo.batchEdit" type="primary" icon="edit" style="margin-left: 10px;" :disabled="projectTableSelectData.length === 0" @click="projectTableOperate($event, 'projectTableBatchEdit')">批量编辑</a-button>
      <a-button v-if="projectTableNormalBtn && nowTabInfo.normal" type="primary" icon="edit" style="margin-left: 10px;" :disabled="projectTableData.length === 0" @click="projectTableOperate($event, 'projectTableNormal')">全部正常</a-button>
    </div>
    <a-table
        bordered
        rowKey="id"
        :row-selection="(projectTableBatchEditBtn && nowTabInfo.batchEdit) ? { selectedRowKeys: projectTableSelectKeys, onChange: projectTableSelectChange } : null"
        :class="projectTableData.length > projectTableScrollNum ? 'project-table-border' : ''"
        :columns="projectTableColumns"
        :data-source="projectTableData"
        :pagination="false"
        :scroll="{ y: projectTableData.length > projectTableScrollNum ? projectTableScrollHeight : 0, x: (nowTabInfo && nowTabInfo.xScroll) ? 1000 : 0 }"
        :customRow="projectTableRowClick"
        @change="projectTableSorterChange"
    >
      <template slot="icon" slot-scope="text"><a-icon :type="text" /></template>
      <template slot="isBoolean" slot-scope="text">{{ text === '1' ? '是' : '否' }}</template>
      <template slot="operate" slot-scope="text, record">
        <div class="project-table-operate">
          <a-button v-if="projectTableDetailsBtn && nowTabInfo.details" icon="more" type="link" size="small" @click="projectTableOperate($event, 'projectTableDetails', record)">详情</a-button>
          <a-button v-if="projectTableCheckDetailsBtn" icon="container" type="link" size="small" @click="projectTableOperate($event, 'projectTableCheckDetails', record)">检查明细</a-button>
          <a-button v-if="projectTablePhotoBtn" icon="camera" type="link" size="small" @click="projectTableOperate($event, 'projectTablePhoto', record)">查看照片</a-button>
          <a-button v-if="projectTableEditBtn && !nowTabInfo.noEdit" icon="edit" type="link" size="small" @click="projectTableOperate($event, 'projectTableEdit', record)">编辑</a-button>
          <a-button v-if="projectTableUploadBtn" icon="upload" type="link" size="small" @click="projectTableOperate($event, 'projectTableUpload', record)">上传文件</a-button>
          <a-button v-if="projectTableUploadPhotoBtn" icon="upload" type="link" size="small" @click="projectTableOperate($event, 'projectTableUploadPhoto', record)">上传照片</a-button>
          <a-button v-if="projectTableDownloadBtn" icon="download" type="link" size="small" @click="projectTableOperate($event, 'projectTableDownload', record)">下载文件</a-button>
          <a-popconfirm v-if="projectTableSubmitBtn" title="确定要提交这条数据吗?" placement="topRight" @confirm="projectTableOperate($event, 'projectTableSubmit', record)">
            <a-button icon="check" type="link" size="small" @click="(e) => e.stopPropagation()">提交</a-button>
          </a-popconfirm>
          <a-button v-if="projectTableExportBtn" icon="export" type="link" size="small" @click="projectTableOperate($event, 'projectTableExport', record)">导出</a-button>
          <a-button v-if="projectTableApproveBtn" icon="check" type="link" size="small" @click="projectTableOperate($event, 'projectTableApprove', record)">审批</a-button>
          <a-popconfirm v-if="projectTableResetBtn && nowTabInfo.isReset" title="确定要重置口令吗?" placement="topRight" @confirm="projectTableOperate($event, 'projectTableReset', record)">
            <a-button icon="redo" type="link" size="small" @click="(e) => e.stopPropagation()">重置口令</a-button>
          </a-popconfirm>
          <a-popconfirm v-if="projectTableAccessBtn" title="确定要准入确认吗?" placement="topRight" @confirm="projectTableOperate($event, 'projectTableAccess', record)">
            <a-button icon="check" type="link" size="small" @click="(e) => e.stopPropagation()">准入确认</a-button>
          </a-popconfirm>
          <a-button v-if="projectTableRemoveBtn && nowTabInfo.isRemove" icon="retweet" type="link" size="small" @click="projectTableOperate($event, 'projectTableRemove', record)">移动单位</a-button>
          <a-popconfirm v-if="projectTableDeleteBtn" title="确定要删除这条数据吗?" placement="topRight" @confirm="projectTableOperate($event, 'projectTableDelete', record)">
            <a-button icon="delete" type="link" size="small" @click="(e) => e.stopPropagation()">删除</a-button>
          </a-popconfirm>
        </div>
      </template>
    </a-table>
    <div class="project-table-pagination" v-if="projectTableSearchInfo.id !== ''">
      <a-pagination
          show-size-changer
          :page-size-options="['10', '20', '30', '40', '50']"
          show-quick-jumper
          :current="projectTableSearchInfo.pageNo"
          :page-size="projectTableSearchInfo.pageSize"
          :total="projectTableTotal"
          :show-total="total => `共${total}条数据`"
          @showSizeChange="projectTablePageSizeChange"
          @change="projectTablePageChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nowTabInfo: {
      type: Object,
      default: () => {}
    }, // 当前tab信息
    projectTableScrollNum: {
      type: Number,
      default: 0
    }, // 表格需要滚动个数
    projectTableDetailsBtn: {
      type: Boolean,
      default: false
    }, // 表格详情按钮
    projectTableCheckDetailsBtn: {
      type: Boolean,
      default: false
    }, // 表格检查明细按钮
    projectTablePhotoBtn: {
      type: Boolean,
      default: false
    }, // 表格查看照片按钮
    projectTableAddBtn: {
      type: Boolean,
      default: false
    }, // 表格新增按钮
    projectTableBatchEditBtn: {
      type: Boolean,
      default: false
    }, // 表格批量编辑按钮
    projectTableEditBtn: {
      type: Boolean,
      default: false
    }, // 表格编辑按钮
    projectTableDeleteBtn: {
      type: Boolean,
      default: false
    }, // 表格删除按钮
    projectTableUploadBtn: {
      type: Boolean,
      default: false
    }, // 表格上传按钮
    projectTableUploadPhotoBtn: {
      type: Boolean,
      default: false
    }, // 表格上传图片按钮
    projectTableDownloadBtn: {
      type: Boolean,
      default: false
    }, // 表格下载按钮
    projectTableSubmitBtn: {
      type: Boolean,
      default: false
    }, // 表格提交按钮
    projectTableNormalBtn: {
      type: Boolean,
      default: false
    }, // 表格全部正常按钮
    projectTableImportBtn: {
      type: Boolean,
      default: false
    }, // 表格导入按钮
    projectTableExportBtn: {
      type: Boolean,
      default: false
    }, // 表格导出按钮
    projectTableApproveBtn: {
      type: Boolean,
      default: false
    },// 表格审批按钮
    projectTableAccessBtn: {
      type: Boolean,
      default: false
    },// 表格准入确认按钮
    projectTableResetBtn: {
      type: Boolean,
      default: false
    },// 表格重置口令按钮
    projectTableRemoveBtn: {
      type: Boolean,
      default: false
    },// 表格移动单位按钮
    projectTableImportTbpczqBtn: {
      type: Boolean,
      default: false
    },// 表格同步排查周期按钮
    projectTableSearchInfo: {
      type: Object,
      default: () => {}
    }, // 表格查询信息
    projectTableScrollHeight: {
      type: Number,
      default: 0
    }, // 表格滚动高度
    projectTableColumns: {
      type: Array,
      default: () => []
    }, // 表格表头配置
    projectTableData: {
      type: Array,
      default: () => []
    }, // 表格数据
    projectTableTotal: {
      type: Number,
      default: 0
    } // 表格总数
  },
  data() {
    return {
      projectTableRowClick: record => ({
        on: {
          click: (e) => {
            e.path[2].querySelectorAll('tr').forEach(item => item.style.backgroundColor = 'inherit')
            e.path[1].style.backgroundColor = '#f0faff'
            this.$emit('projectTableRowClick', record)
          }
        }
      }), // 表格行点击
      projectTableSelectKeys: [], // 表格复选框选择数据key
      projectTableSelectData: [] // 表格复选框选择数据
    }
  },
  methods: {
    // 表格操作
    projectTableOperate(e, type, row) {
      e.stopPropagation()
      this.$emit('projectTableOperate', type, row)
    },
    // 表格排序改变
    projectTableSorterChange(pagination, filters, sorter) {
      this.$emit('projectTablePageChange', 'column', sorter.order ? sorter.columnKey : undefined)
      this.$emit('projectTablePageChange', 'isAsc', sorter.order ? sorter.order === 'ascend' : (sorter.order === 'descend' ? false : undefined))
    },
    // 表格分页尺寸改变
    projectTablePageSizeChange(pageNo, pageSize) {
      this.$emit('projectTablePageChange', 'pageNo', pageNo)
      this.$emit('projectTablePageChange', 'pageSize', pageSize)
    },
    // 表格分页页码改变
    projectTablePageChange(pageNo) {
      this.$emit('projectTablePageChange', 'pageNo', pageNo)
    },
    // 表格复选框改变
    projectTableSelectChange(selectedRowKeys, selectedRows) {
      this.projectTableSelectKeys = selectedRowKeys
      this.projectTableSelectData = selectedRows
      this.$emit('projectTableSelectChange', selectedRows)
    }
  }
}
</script>
