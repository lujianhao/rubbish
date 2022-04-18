import axios from '@/utils/axios'

// 维护安全培训记录-查询
export function safetyTrainingSearch(data) {
    return axios({ url: '/maintainSafetyTrain/querySafetyTrainingRecords', method: 'get', params: data })
}

// 维护安全培训记录-新增
export function safetyTrainingAdd(data) {
    return axios({ url: '/maintainSafetyTrain/addSafetyTrainingRecords', method: 'put', data })
}

// 维护安全培训记录-编辑
export function safetyTrainingEdit(data) {
    return axios({ url: '/maintainSafetyTrain/editSafetyTrainingRecords', method: 'post', data })
}

// 维护安全培训记录-删除
export function safetyTrainingDelete(data) {
    return axios({ url: '/maintainSafetyTrain/deleteSafetyTrainingRecords', method: 'delete', params: data })
}
