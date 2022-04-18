<template>
  <a-config-provider :locale="locale" :get-popup-container="popContainer">
    <router-view/>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/es/locale-provider/zh_CN'

export default {
  name: 'App',
  data() {
    return {
      locale: zhCN
    }
  },
  methods: {
    popContainer() {
      return document.getElementById("popContainer")
    }
  }
}
</script>
