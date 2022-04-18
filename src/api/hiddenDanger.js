import axios from '@/utils/axios'

// 查询安全隐患记录-查询
export function hiddenDangerSearch(data) {
    return axios({ url: '/hazardManagement/querySecurityHazards', method: 'get', params: data })
}

// 安全隐患情况统计-公司月统计-查询
export function hiddenDangerStatisticsSearch1(data) {
    return axios({ url: '/hazardManagement/queryMonthlyCompanyHiddenStatistics', method: 'get', params: data })
}

// 安全隐患情况统计-分厂月统计-查询
export function hiddenDangerStatisticsSearch2(data) {
    return axios({ url: '/hazardManagement/queryMonthlyBranchHiddenStatistics', method: 'get', params: data })
}

// 安全隐患情况统计-车间月统计-查询
export function hiddenDangerStatisticsSearch3(data) {
    return axios({ url: '/hazardManagement/queryMonthlyWorkshopHiddenStatistics', method: 'get', params: data })
}

// 安全隐患情况统计-公司周统计-查询
export function hiddenDangerStatisticsSearch4(data) {
    return axios({ url: '/hazardManagement/queryWeeklyCompanyHiddenStatistics', method: 'get', params: data })
}

// 安全隐患情况统计-分厂周统计-查询
export function hiddenDangerStatisticsSearch5(data) {
    return axios({ url: '/hazardManagement/queryWeeklyBranchHiddenStatistics', method: 'get', params: data })
}

// 安全隐患情况统计-车间周统计-查询
export function hiddenDangerStatisticsSearch6(data) {
    return axios({ url: '/hazardManagement/queryWeeklyWorkshopHiddenStatistics', method: 'get', params: data })
}

// 安全隐患情况统计-子表1-查询
export function hiddenDangerStatisticsSearchSearch1(data) {
    return axios({ url: '/hazardManagement/queryHiddenClassificationStatistics', method: 'get', params: data })
}

// 安全隐患情况统计-子表23-查询
export function hiddenDangerStatisticsSearchSearch23(data) {
    return axios({ url: '/hazardManagement/queryVariousSecurityHazardsList', method: 'get', params: data })
}
