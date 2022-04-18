import axios from '@/utils/axios'

// 填写22660周报-查询
export function weeklyWriteSearch(data) {
    return axios({ url: '/fillWeekLy/getWeeklyReportDetails', method: 'get', params: data })
}

// 填写22660周报-编辑
export function weeklyWriteEdit(data) {
    return axios({ url: '/fillWeekLy/editWeeklyReportDetails', method: 'post', data })
}

// 填写22660周报-提交
export function weeklyWriteSubmit(data) {
    return axios({ url: '/fillWeekLy/submitWeeklyReportDetails', method: 'post', data })
}

// 填写22660周报-子表-查询
export function weeklyWriteSearchAll(data) {
    return axios({ url: '/fillWeekLy/getChildTablePage', method: 'get', params: data })
}

// 填写22660周报-子表-编辑
export function weeklyWriteEditAll(param, data) {
    return axios({ url: `/fillWeekLy/editChildTable?params=${param}`, method: 'post', data })
}

// 22660周报汇总-查询
export function weeklyCollectSearch(data) {
    return axios({ url: '/summaryWeekLy/getReportSummary', method: 'get', params: data })
}

// 22660周报汇总-编辑
export function weeklyCollectEdit(data) {
    return axios({ url: '/summaryWeekLy/editReportSummary', method: 'post', data })
}

// 22660周报汇总-提交
export function weeklyCollectSubmit(data) {
    return axios({ url: '/summaryWeekLy/submitReportSummary', method: 'post', data })
}

// 22660周报汇总-子表-查询
export function weeklyCollectSearchAll(data) {
    return axios({ url: '/summaryWeekLy/getChildTablePage', method: 'get', params: data })
}

// 查询22660周报-查询
export function weeklySearchSearch(data) {
    return axios({ url: '/summaryWeekLy/getSubmittedReportSummary', method: 'get', params: data })
}
