<template>
  <a-modal
    centered
    v-model="visible"
    :title="title"
    width="60%"
    destroyOnClose
    :footer="null"
  >
    <a-table
        bordered
        rowKey="id"
        :columns="checkDetailsColumns"
        :data-source="checkDetailsTableData"
        :pagination="false"
        @change="tableSorterChange"
    />
    <div class="project-table-pagination">
      <a-pagination
          :current="checkDetailsSearchInfo.pageNo"
          :page-size="checkDetailsSearchInfo.pageSize"
          :total="checkDetailsTableTotal"
          :show-total="total => `共${total}条数据`"
          @change="tablePageChange"
      />
    </div>
  </a-modal>
</template>

<script>
export default {
  props: {
    checkDetailsSearchInfo: {
      type: Object,
      default: () => {}
    }, // 表头配置
    checkDetailsColumns: {
      type: Array,
      default: () => []
    }, // 表头配置
    checkDetailsTableData: {
      type: Array,
      default: () => []
    }, // 表格数据
    checkDetailsTableTotal: {
      type: Number,
      default: 0
    } // 表格总数
  },
  data() {
    return {
      visible: false, // 弹窗显示
      title: '' // 弹窗标题
    }
  },
  methods: {
    // 表格排序改变
    tableSorterChange(pagination, filters, sorter) {
      this.$emit('checkDetailsTablePageChange', 'column', sorter.order ? sorter.columnKey : '')
      this.$emit('checkDetailsTablePageChange', 'isAsc', sorter.order ? sorter.order === 'ascend' : false)
    },
    // 表格分页页码改变
    tablePageChange(pageNo) {
      this.$emit('checkDetailsTablePageChange', 'pageNo', pageNo)
    },
  }
}
</script>
