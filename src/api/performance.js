import axios from '@/utils/axios'

// 绩效管理评价标准维护-查询
export function performanceManageSearch(data) {
    return axios({ url: '/performanceEvaluation/queryCriteria', method: 'get', params: data })
}

// 绩效管理评价标准维护-新增
export function performanceManageAdd(data) {
    return axios({ url: '/performanceEvaluation/addCriteria', method: 'put', data })
}

// 绩效管理评价标准维护-编辑
export function performanceManageEdit(data) {
    return axios({ url: '/performanceEvaluation/updateCriteria', method: 'post', data })
}

// 绩效管理评价标准维护-删除
export function performanceManageDelete(data) {
    return axios({ url: '/performanceEvaluation/deleteCriteria', method: 'delete', params: data })
}

// 维护绩效评价评分-查询
export function performanceMaintainSearch(data) {
    return axios({ url: '/performanceEvaluation/queryMonthlyStatistic', method: 'get', params: data })
}

// 维护绩效评价评分-提交
export function performanceMaintainSubmit(data) {
    return axios({ url: '/performanceEvaluation/submitMonthlyStatistics', method: 'post', data })
}

// 维护绩效评价评分-子表1编辑
export function performanceMaintainEdit1(data) {
    return axios({ url: '/performanceEvaluation/updateScoring', method: 'post', data })
}

// 查询绩效评价评分-查询
export function performanceSearchSearch(data) {
    return axios({ url: '/performanceEvaluation/getPerformanceManagementList', method: 'get', params: data })
}

// 查询绩效评价评分-子表1查询
export function performanceSearchSearch1(data) {
    return axios({ url: '/performanceEvaluation/getPerformanceManagementEvaluationScorePage', method: 'get', params: data })
}
