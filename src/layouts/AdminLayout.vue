<template>
  <a-layout :class="['admin-layout', 'beauty-scroll']">
    <drawer v-if="isMobile" v-model="drawerOpen">
      <side-menu :theme="theme.mode" :menuData="menuData" :collapsed="false" :collapsible="false" @menuSelect="onMenuSelect"/>
    </drawer>
    <side-menu :class="[fixedSideBar ? 'fixed-side' : '']" :theme="theme.mode" v-else-if="layout === 'side' || layout === 'mix'" :menuData="sideMenuData" :collapsed="collapsed" :collapsible="true" />
    <div v-if="fixedSideBar && !isMobile" :style="`width: ${sideMenuWidth}; min-width: ${sideMenuWidth};max-width: ${sideMenuWidth};`" class="virtual-side"></div>
    <drawer v-if="!hideSetting" v-model="showSetting" placement="right">
      <div class="setting" slot="handler">
        <a-icon :type="showSetting ? 'close' : 'setting'"/>
      </div>
      <setting />
    </drawer>
    <div class="new-header">
      <div class="new-header-left">
        <a-icon style="font-size: 20px;margin-right: 20px;" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggleCollapse"/>
        <img :src="systemLogo" alt="" width="35" height="35">
        <span style="font-size: 20px;margin-left: 10px;">{{ systemName }}</span>
      </div>
      <div class="new-header-right">
        <div class="new-header-right-item" style="height: 100%;justify-content: center;">
          <a-dropdown placement="bottomCenter">
            <div style="display: flex;flex-direction: column;align-items: center;justify-content: center;cursor:pointer;">
              <a-icon type="user" style="font-size: 20px;" />
              <span>{{ userName }}</span>
            </div>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="mbxz">模板下载</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="gdgn">更多功能</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="xgkl">修改口令</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="tcdl">退出登录</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
        <div class="new-header-line"></div>
        <div class="new-header-right-item">
          <span style="font-size: 20px;">{{ time2 }}</span>
          <span>{{ time1 }}</span>
        </div>
      </div>
    </div>
    <a-layout class="admin-layout-main beauty-scroll">
      <a-layout-header :class="['virtual-header', {'fixed-tabs' : fixedTabs, 'fixed-header': fixedHeader, 'multi-page': multiPage}]" v-show="fixedHeader"></a-layout-header>
      <a-layout-content class="admin-layout-content" :style="`min-height: ${minHeight}px;`">
        <div style="position: relative">
          <slot></slot>
        </div>
      </a-layout-content>
    </a-layout>
    <a-modal
        centered
        v-model="visible"
        title="修改口令"
        width="20%"
        @ok="isOk"
        @cancel="dialogClose"
    >
      <a-form-model ref="ruleForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
        <a-form-model-item label="原口令" prop="oPassword">
          <a-input placeholder="请输入原口令"  v-model="form.oPassword" />
        </a-form-model-item>
        <a-form-model-item label="新口令" prop="nPassword">
          <a-input placeholder="请输入新口令"  v-model="form.nPassword" />
        </a-form-model-item>
        <a-form-model-item label="确认口令" prop="qrkl">
          <a-input placeholder="请输入确认口令"  v-model="form.qrkl" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </a-layout>
</template>

<script>
import { downloadTemplate, updatePassword } from '@/api/api'
import { fileTypeChange } from '@/utils/projectUtils'
import Drawer from '../components/tool/Drawer'
import SideMenu from '../components/menu/SideMenu'
import Setting from '../components/setting/Setting'
import {mapState, mapMutations, mapGetters} from 'vuex'

export default {
  name: 'AdminLayout',
  components: {Setting, SideMenu, Drawer},
  data () {
    let validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("新口令不能为空!"))
      } else {
        if (this.form.qrkl !== '') {
          this.$refs.ruleForm.validateField('qrkl')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("确认口令不能为空!"))
      } else if (value !== this.form.nPassword) {
        callback(new Error("确认口令与新口令不一致!"))
      } else {
        callback()
      }
    }
    return {
      minHeight: window.innerHeight - 64,
      collapsed: false,
      showSetting: false,
      drawerOpen: false,
      time1: '',
      time2: '',
      visible: false,
      form: {
        oPassword: '',
        nPassword: '',
        qrkl: ''
      },
      labelCol: { span: 6 },
      wrapperCol: { span: 17 },
      rules: {
        oPassword: [{ required: true, message: '原口令不能为空！', whitespace: true }],
        nPassword: [{ required: true, validator: validatePass1, trigger: 'change' }],
        qrkl: [{ required: true, validator: validatePass2, trigger: 'change' }]
      }
    }
  },
  provide() {
    return {
      adminLayout: this
    }
  },
  watch: {
    $route(val) {
      this.setActivated(val)
    },
    layout() {
      this.setActivated(this.$route)
    },
    isMobile(val) {
      if(!val) {
        this.drawerOpen = false
      }
    }
  },
  computed: {
    ...mapState('setting', ['isMobile', 'theme', 'layout', 'footerLinks', 'copyright', 'fixedHeader', 'fixedSideBar',
      'fixedTabs', 'hideSetting', 'multiPage']),
    ...mapGetters('setting', ['firstMenu', 'subMenu', 'menuData']),
    sideMenuWidth() {
      return this.collapsed ? '80px' : '256px'
    },
    headerStyle() {
      let width = (this.fixedHeader && this.layout !== 'head' && !this.isMobile) ? `calc(100% - ${this.sideMenuWidth})` : '100%'
      let position = this.fixedHeader ? 'fixed' : 'static'
      return `width: ${width}; position: ${position};`
    },
    sideMenuData() {
      const {layout, menuData, subMenu} = this
      return layout === 'mix' ? subMenu : menuData
    },
    userName() {
      return JSON.parse(localStorage.getItem('userInfo')).name
    },
    systemName () {
      return JSON.parse(localStorage.getItem('systemInfo')).systemMainName
    },
    systemLogo () {
      return `${process.env.VUE_APP_API_BASE_URL}/public/imageShow/${JSON.parse(localStorage.getItem('systemInfo')).systemBt}`
    }
  },
  methods: {
    mbxz() {
      downloadTemplate().then(res => {
        if (res) fileTypeChange(res, '数据模板.xlsx')
      })
    },
    gdgn() {
      window.open(`${process.env.VUE_APP_URL_PORT}aqglweb/bigScence/index.jsp?code=${JSON.parse(localStorage.getItem('userInfo')).workNum}`)
    },
    xgkl() {
      this.visible = true
    },
    tcdl() {
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('userMenus')
      localStorage.removeItem('systemInfo')
      localStorage.removeItem('unitInfo123')
      localStorage.removeItem('unitInfo12')
      localStorage.removeItem('unitInfo23')
      this.$router.push('/login')
    },
    isOk() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.form.id = JSON.parse(localStorage.getItem('userInfo')).id
          const params = new FormData()
          for (const item in this.form) {
            params.append(item, this.form[item])
          }
          updatePassword(params).then(res => {
            if (res) {
              this.$message.success(res)
              this.visible = false
              this.dialogClose()
            }
          })
        }
      })
    },
    dialogClose() {
      this.form = {}
    },
    ...mapMutations('setting', ['correctPageMinHeight', 'setActivatedFirst']),
    toggleCollapse () {
      this.collapsed = !this.collapsed
    },
    onMenuSelect () {
      this.toggleCollapse()
    },
    setActivated(route) {
      if (this.layout === 'mix') {
        let matched = route.matched
        matched = matched.slice(0, matched.length - 1)
        const {firstMenu} = this
        for (let menu of firstMenu) {
          if (matched.findIndex(item => item.path === menu.fullPath) !== -1) {
            this.setActivatedFirst(menu.fullPath)
            break
          }
        }
      }
    }
  },
  created() {
    this.correctPageMinHeight(this.minHeight - 24)
    this.setActivated(this.$route)
    setInterval(() => {
      const nowTime = new Date()
      const nowYear = nowTime.getFullYear()
      const nowMonth = (nowTime.getMonth() + 1) < 10 ? '0' + (nowTime.getMonth() + 1) : nowTime.getMonth() + 1
      const nowDate = nowTime.getDate() < 10 ? '0' + nowTime.getDate() : nowTime.getDate()
      const nowHour = nowTime.getHours() < 10 ? '0' + nowTime.getHours() : nowTime.getHours()
      const nowMinutes = nowTime.getMinutes() < 10 ? '0' + nowTime.getMinutes() : nowTime.getMinutes()
      const nowSeconds = nowTime.getSeconds() < 10 ? '0' + nowTime.getSeconds() : nowTime.getSeconds()
      const nowDay = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][nowTime.getDay()]
      this.time1 = nowYear + '/' + nowMonth + '/' + nowDate + ' ' + nowDay
      this.time2 = nowHour + ':' + nowMinutes + ':' + nowSeconds
    }, 1000)
  },
  beforeDestroy() {
    this.correctPageMinHeight(-this.minHeight + 24)
  }
}
</script>

<style lang="less" scoped>
  .new-header{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 64px;
    background-color: #1373E1;
    background: -webkit-linear-gradient(left, #1373E1, #409EFE);
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    z-index: 999;
    color: #fff;
    .new-header-left{
      display: flex;
      align-items: center;
    }
    .new-header-right{
      display: flex;
      align-items: center;
      .new-header-right-item{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 10px;
        font-size: 16px;
        line-height: 24px;
        &:nth-last-child(1){
          margin: 0;
        }
      }
    }
    .new-header-line{
      width: 2px;
      height: 70%;
      margin: 0 10px;
      background-color: #fff;
    }
  }
  .admin-layout{
    .side-menu{
      &.fixed-side{
        position: fixed;
        height: 100vh;
        left: 0;
        top: 0;
      }
    }
    .virtual-side{
      transition: all 0.2s;
    }
    .virtual-header{
      transition: all 0.2s;
      opacity: 0;
      &.fixed-tabs.multi-page:not(.fixed-header){
        height: 0;
      }
    }
    .admin-layout-main{
      .admin-header{
        top: 0;
        right: 0;
        overflow: hidden;
        transition: all 0.2s;
        &.fixed-tabs.multi-page:not(.fixed-header){
          height: 0;
        }
      }
    }
    .admin-layout-content{
      padding: 24px 24px 0;
      /*overflow-x: hidden;*/
      /*min-height: calc(100vh - 64px - 122px);*/
    }
    .setting{
      background-color: @primary-color;
      color: @base-bg-color;
      border-radius: 5px 0 0 5px;
      line-height: 40px;
      font-size: 22px;
      width: 40px;
      height: 40px;
      box-shadow: -2px 0 8px @shadow-color;
    }
  }
</style>
