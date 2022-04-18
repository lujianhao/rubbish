import axios from '@/utils/axios'

// 重大风险点设置-查询
export function riskPointSetSearch(data) {
    return axios({ url: '/riskPointSetUp/getRiskPointInformationList', method: 'get', params: data })
}

// 重大风险点设置-新增
export function riskPointSetAdd(data) {
    return axios({ url: '/riskPointSetUp/addRiskPointInformation', method: 'put', data })
}

// 重大风险点设置-编辑
export function riskPointSetEdit(data) {
    return axios({ url: '/riskPointSetUp/editRiskPointInformation', method: 'post', data })
}

// 重大风险点设置-删除
export function riskPointSetDelete(data) {
    return axios({ url: '/riskPointSetUp/deleteRiskPointInformation', method: 'delete', params: data })
}

// 重大风险点设置-从表1（检查项目）2（周期设置）-查询
export function riskPointSetSearch12(data) {
    return axios({ url: '/riskPointSetUp/getChildList', method: 'get', params: data })
}

// 重大风险点设置-从表1（检查项目）-新增
export function riskPointSetAdd1(data) {
    return axios({ url: '/riskPointSetUp/addRiskPointDetails', method: 'put', data })
}

// 重大风险点设置-从表1（检查项目）-编辑
export function riskPointSetEdit1(data) {
    return axios({ url: '/riskPointSetUp/editRiskPointDetailsList', method: 'post', data })
}

// 重大风险点设置-从表1（检查项目）-删除
export function riskPointSetDelete1(data) {
    return axios({ url: '/riskPointSetUp/deleteRiskPointDetails', method: 'delete', params: data })
}

// 重大风险点设置-从表2（周期设置）-新增
export function riskPointSetAdd2(data) {
    return axios({ url: '/riskPointSetUp/addRiskPointCheckCycle', method: 'put', data })
}

// 重大风险点设置-从表2（周期设置）-编辑
export function riskPointSetEdit2(data) {
    return axios({ url: '/riskPointSetUp/editRiskPointCheckCycle', method: 'post', data })
}

// 重大风险点设置-从表2（周期设置）-删除
export function riskPointSetDelete2(data) {
    return axios({ url: '/riskPointSetUp', method: 'delete', params: data })
}

// 重大风险点检查-查询
export function riskPointCheckSearch(data) {
    return axios({ url: '/riskPointCheck/queryRiskPointTaskList', method: 'get', params: data })
}

// 重大风险点检查-编辑
export function riskPointCheckEdit(data) {
    return axios({ url: '/riskPointCheck/editRiskPointTaskList', method: 'post', data })
}

// 重大风险点检查-提交
export function riskPointCheckSubmit(data) {
    return axios({ url: '/riskPointCheck/inputRiskPointTaskList', method: 'post', data })
}

// 重大风险点检查-从表1（检查明细）-查询
export function riskPointCheckSearch1(data) {
    return axios({ url: '/riskPointCheck/getRiskPointOrderDetailsByTaskId', method: 'get', params: data })
}

// 重大风险点检查-从表1（检查明细）-编辑
export function riskPointCheckEdit1(data) {
    return axios({ url: '/riskPointCheck/editRiskOrderDetails', method: 'post', data })
}

// 重大风险点检查-从表1（检查明细）-全部正常
export function riskPointCheckNormal1(data) {
    return axios({ url: '/riskPointCheck/setAllOrderDetailsListSafeByTaskId', method: 'post', data })
}

// 重大风险点查询-查询
export function riskPointSearchSearch(data) {
    return axios({ url: '/riskPointQuery/getAllRiskPointInformation', method: 'get', params: data })
}

// 重大风险点查询-从表1（检查单）-查询
export function riskPointSearchSearch1(data) {
    return axios({ url: '/riskPointQuery/getTaskListsByInformation', method: 'get', params: data })
}

// 重大风险点查询-从表1（检查单）-明细
export function riskPointSearchSearchDetails1(data) {
    return axios({ url: '/riskPointQuery/getRiskPointOrderDetailsByTaskId', method: 'get', params: data })
}

// 风险点检查单查询-查询
export function riskPointListSearchSearch(data) {
    return axios({ url: '/riskPointQuery/queryTaskListsByPeopleTimeStatus', method: 'get', params: data })
}
