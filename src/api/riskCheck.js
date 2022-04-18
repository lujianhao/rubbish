import axios from '@/utils/axios'

// 维护风险排查标准-同步排查周期
export function riskCheckStandardSync(data) {
    return axios({ url: '/SystemBasicData/d_createTroubleshootingCycle', method: 'get', params: data })
}

// 维护风险排查标准-查询
export function riskCheckStandardSearch(data) {
    return axios({ url: '/maintainRiskStandards/queryRiskChecklistByThirdId', method: 'get', params: data })
}

// 维护风险排查标准-新增
export function riskCheckStandardAdd(data) {
    return axios({ url: '/maintainRiskStandards/addRiskCheckList', method: 'put', data })
}

// 维护风险排查标准-编辑
export function riskCheckStandardEdit(data) {
    return axios({ url: '/maintainRiskStandards/editRiskCheckList', method: 'post', data })
}

// 维护风险排查标准-删除
export function riskCheckStandardDelete(data) {
    return axios({ url: '/maintainRiskStandards/deleteRiskCheckList', method: 'post', data })
}

// 维护风险排查标准-子表1-查询
export function riskCheckStandardSearch1(data) {
    return axios({ url: '/maintainRiskStandards/queryCycleByCheckListId', method: 'get', params: data })
}

// 维护风险排查标准-子表1-编辑
export function riskCheckStandardEdit1(data) {
    return axios({ url: '/maintainRiskStandards/editCheckCycleSetting', method: 'post', data })
}

// 查询风险排查记录-查询
export function riskCheckRecordSearch(data) {
    return axios({ url: '/maintainRiskStandards/queryRiskInvestigationList', method: 'get', params: data })
}

// 查询风险排查记录-子表1-查询
export function riskCheckRecordSearch1(data) {
    return axios({ url: '/maintainRiskStandards/queryRiskInvestigationDetails', method: 'get', params: data })
}

// 查询风险排查记录-子表2-查询
export function riskCheckRecordSearch2(data) {
    return axios({ url: '/maintainRiskStandards/querySecurityHazardsByRiskId', method: 'get', params: data })
}

// 查询风险排查历史-查询
export function riskCheckHistorySearch(data) {
    return axios({ url: '/maintainRiskStandards/queryHistoryWorkOrderByRiskId', method: 'get', params: data })
}

// 查询风险排查历史-子表1-查询
export function riskCheckHistorySearch1(data) {
    return axios({ url: '/maintainRiskStandards/queryHistoryDetailsByRiskId', method: 'get', params: data })
}

// 风险排查情况统计-公司月统计-查询
export function riskCheckStatisticsSearch1(data) {
    return axios({ url: '/maintainRiskStandards/queryMonthlyCompanyRiskInvestigation', method: 'get', params: data })
}

// 风险排查情况统计-分厂月统计-查询
export function riskCheckStatisticsSearch2(data) {
    return axios({ url: '/maintainRiskStandards/queryMonthlyBranchRiskInvestigation', method: 'get', params: data })
}

// 风险排查情况统计-车间月统计-查询
export function riskCheckStatisticsSearch3(data) {
    return axios({ url: '/maintainRiskStandards/queryMonthlyWorkshopRiskInvestigation', method: 'get', params: data })
}

// 风险排查情况统计-公司周统计-查询
export function riskCheckStatisticsSearch4(data) {
    return axios({ url: '/maintainRiskStandards/queryWeeklyCompanyRiskInvestigation', method: 'get', params: data })
}

// 风险排查情况统计-分厂周统计-查询
export function riskCheckStatisticsSearch5(data) {
    return axios({ url: '/maintainRiskStandards/queryWeeklyBranchRiskInvestigation', method: 'get', params: data })
}

// 风险排查情况统计-车间周统计-查询
export function riskCheckStatisticsSearch6(data) {
    return axios({ url: '/maintainRiskStandards/queryWeeklyWorkshopRiskInvestigation', method: 'get', params: data })
}

// 风险排查情况统计-子表1-查询
export function riskCheckStatisticsSearchSearch1(data) {
    return axios({ url: '/maintainRiskStandards/queryRiskScreeningClassificationStatistics', method: 'get', params: data })
}

// 风险排查情况统计-子表234-查询
export function riskCheckStatisticsSearchSearch234(data) {
    return axios({ url: '/maintainRiskStandards/queryRiskInvestigationDetailsByStatus', method: 'get', params: data })
}
