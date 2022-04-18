import axios from '@/utils/axios'

// 维护应急预案记录-查询
export function emergencyPlanSearch(data) {
    return axios({ url: '/maintainEmergencyPlan/queryEmergencyPlanFile', method: 'get', params: data })
}

// 维护应急预案记录-新增
export function emergencyPlanAdd(data) {
    return axios({ url: '/maintainEmergencyPlan/addEmergencyPlanFile', method: 'put', data })
}

// 维护应急预案记录-编辑
export function emergencyPlanEdit(data) {
    return axios({ url: '/maintainEmergencyPlan/editEmergencyPlanFile', method: 'post', data })
}

// 维护应急预案记录-删除
export function emergencyPlanDelete(data) {
    return axios({ url: '/maintainEmergencyPlan/deleteEmergencyPlanFile', method: 'delete', params: data })
}

// 执行情况-查询
export function executeSituationSearch1(data) {
    return axios({ url: '/maintainEmergencyPlan/queryEmergencyPlanImplementation', method: 'get', params: data })
}

// 执行情况-新增
export function executeSituationAdd1(data) {
    return axios({ url: '/maintainEmergencyPlan/addEmergencyPlanImplementation', method: 'put', data })
}

// 执行情况-编辑
export function executeSituationEdit1(data) {
    return axios({ url: '/maintainEmergencyPlan/editEmergencyPlanImplementation', method: 'post', data })
}

// 执行情况-删除
export function executeSituationDelete1(data) {
    return axios({ url: '/maintainEmergencyPlan/deleteEmergencyPlanImplementation', method: 'delete', params: data })
}
