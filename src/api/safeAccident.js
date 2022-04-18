import axios from '@/utils/axios'

// 维护安全事故记录-查询
export function safeAccidentMaintainSearch(data) {
    return axios({ url: '/a_getAQSGData', method: 'get', params: data })
}

// 维护安全事故记录-新增、编辑、删除
export function safeAccidentMaintainOperate(data) {
    return axios({ url: '/b_editAQSGJL', method: 'post', data })
}
