import axios from '@/utils/axios'

// 维护特种设备档案-查询
export function specialEquipmentMaintainSearch(data) {
    return axios({ url: '/b_getTZSBDataByEjdwId', method: 'get', params: data })
}

// 维护特种设备档案-新增、编辑、删除
export function specialEquipmentMaintainOperate(data) {
    return axios({ url: '/d_editTZSBData', method: 'post', data })
}

// 维护特种设备档案-子表-查询
export function specialEquipmentMaintainSearch1(data) {
    return axios({ url: '/c_getTZSBJDDataByTZSBId', method: 'post', data })
}

// 维护特种设备档案-子表-新增、编辑、删除
export function specialEquipmentMaintainOperate1(data) {
    return axios({ url: '/e_editTZSBJDJL', method: 'post', data })
}
