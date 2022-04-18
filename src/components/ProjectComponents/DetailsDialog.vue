<template>
  <a-modal
    centered
    v-model="visible"
    :title="title"
    width="50%"
    destroyOnClose
    :footer="null"
  >
    <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-row>
        <a-col :span="12" v-for="(item, index) in detailsData" :key="index">
          <a-form-model-item v-if="item.isBoolean" :label="item.name">
            <a-switch checked-children="是" un-checked-children="否" :default-checked="form[item.value] === '1'" disabled />
          </a-form-model-item>
          <a-form-model-item :label="item.name" v-else>
            <a-input disabled v-model="form[item.value]" />
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </a-modal>
</template>

<script>
export default {
  props: {
    detailsDialogFlag: {
      type: String,
      default: ''
    } // 标记
  },
  data() {
    return {
      visible: false, // 弹窗显示
      title: '', // 弹窗标题
      form: {}, // 表单数据
      labelCol: { span: 6 }, // 表单label宽度
      wrapperCol: { span: 16 }, // 表单内容宽度
      detailsData: [] // 详细数据
    }
  }
}
</script>
