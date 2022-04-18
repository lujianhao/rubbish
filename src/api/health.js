import axios from '@/utils/axios'

// 维护职工健康档案-子表1-查询
export function healthMaintainSearch1(data) {
    return axios({ url: '/a_getEmployeeHealth', method: 'get', params: data })
}

// 维护职工健康档案-子表1-新增、编辑、删除
export function healthMaintainOperate1(data) {
    return axios({ url: '/c_editEmpHealth', method: 'post', data })
}

// 维护职工健康档案-子表2-查询
export function healthMaintainSearch2(data) {
    return axios({ url: '/b_getEmployeeCertificate', method: 'get', params: data })
}

// 维护职工健康档案-子表2-新增、编辑、删除
export function healthMaintainOperate2(data) {
    return axios({ url: '/d_editEmpCer', method: 'post', data })
}
