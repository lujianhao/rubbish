<template>
  <div class="login">
    <div class="login-left">
      <img src="@/assets/image/login-img.png" alt="">
    </div>
    <div class="login-right">
      <div>
        <div class="login-right-title">欢迎使用安全管理系统</div>
        <a-form-model ref="ruleForm" :model="form" :rules="rules" style="min-height: 260px;margin-top: 50px;">
          <a-form-model-item label="账户名称" prop="workNum">
            <a-input placeholder="请输入账户名称" autocomplete v-model="form.workNum" allowClear />
          </a-form-model-item>
          <a-form-model-item label="登录密码" prop="password">
            <a-input placeholder="请输入登录密码" type="password" autocomplete v-model="form.password" allowClear />
          </a-form-model-item>
        </a-form-model>
        <a-button class="login-btn" type="primary" shape="round" :loading="btnLoading" @click="login">登录</a-button>
      </div>
      <div class="login-qrcode">
        <div>
          <img src="@/assets/image/qrcode-android.jpg" alt="" width="100">
          <span>安卓APP下载</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, getUserInfo, getSystemInfo, getUserMenuInfo, getUnitTree123, getUnitTree12, getUnitTree23 } from '@/api/api'
import { loadRoutes } from '@/utils/routerUtil'
export default {
  data() {
    return {
      form: {},
      rules: {
        workNum: [{ required: true, message: '账户名称不能为空！', whitespace: true }],
        password: [{ required: true, message: '登录密码不能为空！', whitespace: true }],
      },
      btnLoading: false
    }
  },
  mounted() {
    const that = this
    window.addEventListener('keydown', that.keyClick)
  },
  beforeDestroy() {
    const that = this
    window.removeEventListener('keydown', that.keyClick)
  },
  methods: {
    keyClick(e) {
      if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        if (this.$route.path === '/login') this.login()
      }
    },
    login() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.btnLoading = true
          const params = new FormData()
          for (const item in this.form) {
            params.append(item, this.form[item])
          }
          login(params).then(loginRes => {
            if (typeof loginRes === 'string') {
              localStorage.setItem('token', JSON.stringify(loginRes))
              this.$message.success('登录成功！', 0.5)
              getUserInfo({ token: loginRes }).then(userRes => {
                if (userRes) {
                  localStorage.setItem('userInfo', JSON.stringify(userRes))
                  getUserMenuInfo({ userId: userRes.id, xtfl: '安全' }).then(menuRes => {
                    if (menuRes) {
                      localStorage.setItem('userMenus', JSON.stringify(menuRes))
                      const newRouter = [
                        {
                          router: "root",
                          children: []
                        }
                      ]
                      if (userRes.operatingRange === '公司级') {
                        newRouter[0].children.push(
                            {
                              router: "statisticsCompany",
                              path: "statisticsCompany",
                              name: '公司隐患列表',
                              icon: 'unordered-list'
                            }
                        )
                      } else if (userRes.operatingRange === '分厂级') {
                        newRouter[0].children.push(
                            {
                              router: "statisticsBranch",
                              path: "statisticsBranch",
                              name: '分厂隐患列表',
                              icon: 'unordered-list'
                            }
                        )
                      } else if (userRes.operatingRange === '车间级') {
                        newRouter[0].children.push(
                            {
                              router: "statisticsWorkshop",
                              path: "statisticsWorkshop",
                              name: '车间隐患列表',
                              icon: 'unordered-list'
                            }
                        )
                      }
                      menuRes.forEach(item => {
                        item.childData.forEach(itm => {
                          itm.router = itm.qxlbMcurl
                          itm.path = itm.qxlbMcurl
                          itm.name = itm.qxlbMc
                        })
                        newRouter[0].children.push(
                          {
                            router: item.qxflMkurl,
                            redirect: item.qxflMkurl + '/' + item.childData[0].qxlbMcurl,
                            name: item.qxflMc,
                            icon: item.qxflMktb ? item.qxflMktb : 'setting',
                            children: item.childData
                          }
                        )
                      })
                      loadRoutes(newRouter)
                      this.$router.push(newRouter[0].children[0].router)
                    }
                  })
                }
              })
              getSystemInfo().then(systemRes => {
                if (systemRes) localStorage.setItem('systemInfo', JSON.stringify(systemRes))
              })
              getUnitTree123().then(unit123Res => {
                if (unit123Res) {
                  unit123Res.forEach(item => {
                    item.newKey = item.id + '-' + item.name
                    if (item.secondLevelArchivesList) {
                      item.secondLevelArchivesList.forEach(item2 => {
                        item2.newKey = item.id + '-' + item.name + '/' + item2.id + '-' + item2.name
                        if (item2.thirdLevelArchivesList) {
                          item2.thirdLevelArchivesList.forEach(item3 => {
                            item3.newKey = item.id + '-' + item.name + '/' + item2.id + '-' + item2.name + '/' + item3.id + '-' + item3.name
                          })
                          item2.children = [...item2.thirdLevelArchivesList]
                        }
                      })
                      item.children = [...item.secondLevelArchivesList]
                    }
                  })
                  localStorage.setItem('unitInfo123', JSON.stringify(unit123Res))
                }
              })
              getUnitTree12().then(unit12Res => {
                if (unit12Res) {
                  unit12Res.forEach(item => {
                    item.newKey = item.id + '-' + item.name
                    if (item.secondLevelArchivesList) {
                      item.secondLevelArchivesList.forEach(item2 => {
                        item2.newKey = item.id + '-' + item.name + '/' + item2.id + '-' + item2.name
                      })
                      item.children = [...item.secondLevelArchivesList]
                    }
                  })
                  localStorage.setItem('unitInfo12', JSON.stringify(unit12Res))
                }
              })
              getUnitTree23().then(unit23Res => {
                if (unit23Res) {
                  unit23Res.forEach(item => {
                    item.newKey = item.id + '-' + item.name
                    if (item.thirdLevelArchivesList) {
                      item.thirdLevelArchivesList.forEach(item2 => {
                        item2.newKey = item.id + '-' + item.name + '/' + item2.id + '-' + item2.name
                      })
                      item.children = [...item.thirdLevelArchivesList]
                    }
                  })
                  localStorage.setItem('unitInfo23', JSON.stringify(unit23Res))
                }
              })
            } else {
              this.btnLoading = false
              this.$message.error(loginRes.message)
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .login{
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    .login-left{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: url('~@/assets/image/login-bg.png') no-repeat left top;
      background-size: auto 100%;
    }
    .login-right{
      position: relative;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      .login-right-title{
        font-size: 28px;
        letter-spacing: 5px;
        color: #000;
      }
      .login-btn{
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-color: #175094;
        font-size: 16px;
      }
      .login-qrcode{
        position: absolute;
        right: 10px;
        bottom: 10px;
        display: flex;
        >div{
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }
    }
  }
</style>
