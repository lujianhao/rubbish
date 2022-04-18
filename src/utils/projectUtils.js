// 将二进制数据文件转换为可下载地址
export function fileTypeChange (res, name){
    const blob = new Blob([res])
    const blobUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = blobUrl
    link.download = name
    link.click()
}

// 获取系统当前时间
export function getNowDate () {
    const nowTime = new Date()
    const nowYear = nowTime.getFullYear()
    const nowMonth = (nowTime.getMonth() + 1) < 10 ? '0' + (nowTime.getMonth() + 1) : nowTime.getMonth() + 1
    const nowDate = nowTime.getDate() < 10 ? '0' + nowTime.getDate() : nowTime.getDate()
    const nowHour = nowTime.getHours() < 10 ? '0' + nowTime.getHours() : nowTime.getHours()
    const nowMinutes = nowTime.getMinutes() < 10 ? '0' + nowTime.getMinutes() : nowTime.getMinutes()
    const nowSeconds = nowTime.getSeconds() < 10 ? '0' + nowTime.getSeconds() : nowTime.getSeconds()
    // const nowDay = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][nowTime.getDay()]
    return nowYear + '年' + nowMonth + '月' + nowDate + '日' + ' ' + nowHour + ':' + nowMinutes + ':' + nowSeconds
}

// 操作成功查询数据
export function operateSuccess (that, res, type) {
    if (typeof res === 'string' && res.indexOf('成功') !== -1) {
        that.$message.success(res)
        if (type === 'top') {
            that.searchTopData()
        } else {
            that.searchBottomTableData()
        }
    } else {
        that.$message.info(res.message)
    }
}
