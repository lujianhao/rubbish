import axios from '@/utils/axios'

// 获取履职标准下拉框列表
export function resumptionSetSelect(data) {
    return axios({ url: '/workperform/getAddLabelList', method: 'get', params: data })
}

// 设置干部履职标准-查询
export function resumptionSetSearch(data) {
    return axios({ url: '/workperform/getCompleteDutyStandardList', method: 'get', params: data })
}

// 设置干部履职标准-新增
export function resumptionSetAdd(data) {
    return axios({ url: '/workperform/addCompleteDutyStandard', method: 'put', data })
}

// 设置干部履职标准-编辑
export function resumptionSetEdit(data) {
    return axios({ url: '/workperform/editCompleteDutyStandard', method: 'post', data })
}

// 设置干部履职标准-删除
export function resumptionSetDelete(data) {
    return axios({ url: '/workperform/deleteCompleteDutyStandard', method: 'delete', params: data })
}

// 设置干部履职标准-从表1（履职内容）2（人员列表）-查询
export function resumptionSetSearch12(data) {
    return axios({ url: '/workperform/getChildList', method: 'get', params: data })
}

// 设置干部履职标准-从表1（履职内容）-新增
export function resumptionSetAdd1(data) {
    return axios({ url: '/workperform/addAddContentToDuty', method: 'post', data })
}

// 设置干部履职标准-从表1（履职内容）-编辑
export function resumptionSetEdit1(data) {
    return axios({ url: '/workperform/editContentToDuty', method: 'post', data })
}

// 设置干部履职标准-从表1（履职内容）2（人员列表）-删除
export function resumptionSetDelete12(data) {
    return axios({ url: '/workperform/deleteCompleteDutyChildTable', method: 'delete', params: data })
}

// 设置干部履职标准-用户弹窗-三级单位
export function resumptionSetUnit3(data) {
    return axios({ url: '/workperform/getThirdLevelArchivesByDutyId', method: 'get', params: data })
}

// 设置干部履职标准-用户弹窗-三级单位-人员
export function resumptionSetUnit3Users(data) {
    return axios({ url: '/workperform/getNoAddUserProfileToDuty', method: 'get', params: data })
}

// 设置干部履职标准-从表2（人员列表）-新增
export function resumptionSetAdd2(data) {
    return axios({ url: '/workperform/addAddUserProfileToDuty', method: 'post', data })
}

// 提交履职报告-查询
export function resumptionSubmitSearch(data) {
    return axios({ url: '/submitperformance/getNoSubmittedWorkReport', method: 'get', params: data })
}

// 提交履职报告-编辑
export function resumptionSubmitEdit(data) {
    return axios({ url: '/submitperformance/updateWorkDutyReport', method: 'post', data })
}

// 提交履职报告-提交
export function resumptionSubmitSubmit(data) {
    return axios({ url: '/submitperformance/submitWorkDutyReport', method: 'post', data })
}

// 提交履职报告-文件上传-查询
export function resumptionSubmitFileSearch(data) {
    return axios({ url: '/submitperformance/getFileListByReportId', method: 'get', params: data })
}

// 提交履职报告-从表1评分明细-查询
export function resumptionSubmitSearch1(data) {
    return axios({ url: '/submitperformance/getWorkDetailsByReportId', method: 'get', params: data })
}

// 提交履职报告-从表1评分明细-编辑
export function resumptionSubmitEdit1(data) {
    return axios({ url: '/submitperformance/editWorkDetailsList', method: 'post', data })
}

// 查询履职报告-查询
export function resumptionSearchSearch(data) {
    return axios({ url: '/queryPerformance/getWorkReport', method: 'get', params: data })
}

// 查询履职报告-从表1评分明细-查询
export function resumptionSearchSearch1(data) {
    return axios({ url: '/queryPerformance/getWorkDetailsSubmitByReportId', method: 'get', params: data })
}
