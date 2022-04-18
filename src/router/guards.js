import NProgress from 'nprogress'
import { message } from 'ant-design-vue'

NProgress.configure({ showSpinner: false })

/**
 * 进度条开始
 * @param to
 * @param form
 * @param next
 */
const progressStart = (to, from, next) => {
  if (!NProgress.isStarted()) {
    NProgress.start()
  }
  next()
}

/**
 * 混合导航模式下一级菜单跳转重定向
 * @param to
 * @param from
 * @param next
 * @param options
 * @returns {*}
 */
const redirectGuard = (to, from, next, options) => {
  const {store} = options
  const getFirstChild = (routes) => {
    const route = routes[0]
    if (!route.children || route.children.length === 0) {
      return route
    }
    return getFirstChild(route.children)
  }
  if (store.state.setting.layout === 'mix') {
    const firstMenu = store.getters['setting/firstMenu']
    if (firstMenu.find(item => item.fullPath === to.fullPath)) {
      store.commit('setting/setActivatedFirst', to.fullPath)
      const subMenu = store.getters['setting/subMenu']
      if (subMenu.length > 0) {
        const redirect = getFirstChild(subMenu)
        return next({path: redirect.fullPath})
      }
    }
  }
  next()
}

// const pageChange = (to, from, next) => {
//   if (window.location.href.indexOf('code=') !== -1) {
//     const code = window.location.href.split('code=')[1].split('#')[0]
//     next()
//   }
// }
const pageChange = (to, from, next) => {
  if (from.path === '/login') {
    if ((to.path === '/login' || to.path === '/statisticsCompany' || to.path === '/statisticsBranch' || to.path === '/statisticsWorkshop') && localStorage.getItem('token')) {
      next()
    } else {
      message.error('登录状态已失效，请重新登录！', 1)
      NProgress.done()
      next('login')
    }
  } else {
    if (to.path === '/login') {
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('userMenus')
      localStorage.removeItem('systemInfo')
      localStorage.removeItem('unitInfo123')
      localStorage.removeItem('unitInfo12')
      localStorage.removeItem('unitInfo23')
      next()
    } else {
      if (localStorage.getItem('token')) {
        next()
      } else {
        message.error('登录状态已失效，请重新登录！', 1)
        NProgress.done()
        next('login')
      }
    }
  }
}

/**
 * 进度条结束
 * @param to
 * @param form
 * @param options
 */
const progressDone = () => {
  NProgress.done()
}

export default {
  beforeEach: [progressStart, redirectGuard, pageChange],
  afterEach: [progressDone]
}
