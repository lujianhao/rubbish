import axios from '@/utils/axios'

// 维护安全检查记录-查询
export function safeCheckMaintainSearch(data) {
    return axios({ url: '/a_getAQJCData', method: 'get', params: data })
}

// 维护安全检查记录-新增、编辑、删除
export function safeCheckMaintainOperate(data) {
    return axios({ url: '/b_editAQJCJL', method: 'post', data })
}
