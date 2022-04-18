<template>
  <a-modal
      centered
      v-model="visible"
      title="图标选择"
      width="50%"
      :footer="null"
  >
    <IconSelector @change="iconChange" />
  </a-modal>
</template>

<script>
import IconSelector from '@/components/IconSelector/IconSelector'
export default {
  components: {
    IconSelector
  },
  data() {
    return {
      visible: false // 弹窗控制
    }
  },
  methods: {
    // 图标选择
    iconChange(icon) {
      this.$emit('iconSelectSuccess', icon)
      this.visible = false
    }
  }
}
</script>
