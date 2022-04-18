import axios from '@/utils/axios'

// 维护防护设施档案-查询
export function protectionFileSearch(data) {
    return axios({ url: '/maintainProtectEquipment/queryFacilitySafetyProtection', method: 'get', params: data })
}

// 维护防护设施档案-新增
export function protectionFileAdd(data) {
    return axios({ url: '/maintainProtectEquipment/addFacilitySafetyProtection', method: 'put', data })
}

// 维护防护设施档案-编辑
export function protectionFileEdit(data) {
    return axios({ url: '/maintainProtectEquipment/editFacilitySafetyProtection', method: 'post', data })
}

// 维护防护设施档案-删除
export function protectionFileDelete(data) {
    return axios({ url: '/maintainProtectEquipment/deleteFacilitySafetyProtection', method: 'delete', params: data })
}

// 维护防护设施档案-子表1-查询
export function protectionFileSearch1(data) {
    return axios({ url: '/maintainProtectEquipment/queryFacilityInspectionDetails', method: 'get', params: data })
}

// 维护模块分类-子表1-新增
export function protectionFileAdd1(data) {
    return axios({ url: '/maintainProtectEquipment/addFacilityInspectionDetails', method: 'put', data })
}

// 维护防护设施档案-子表1-编辑
export function protectionFileEdit1(data) {
    return axios({ url: '/maintainProtectEquipment/editFacilityInspectionDetails', method: 'post', data })
}

// 维护防护设施档案-子表1-删除
export function protectionFileDelete1(data) {
    return axios({ url: '/maintainProtectEquipment/deleteFacilityInspectionDetails', method: 'delete', params: data })
}

// 维护防护设施档案-子表2-查询
export function protectionFileSearch2(data) {
    return axios({ url: '/maintainProtectEquipment/queryFacilityInspectionPost', method: 'get', params: data })
}

// 维护模块分类-子表2-新增
export function protectionFileAdd2(data) {
    return axios({ url: '/maintainProtectEquipment/addFacilityInspectionPost', method: 'put', data })
}

// 维护防护设施档案-子表2-编辑
export function protectionFileEdit2(data) {
    return axios({ url: '/maintainProtectEquipment/editFacilityInspectionPost', method: 'post', data })
}

// 维护防护设施档案-子表2-删除
export function protectionFileDelete2(data) {
    return axios({ url: '/maintainProtectEquipment/deleteFacilityInspectionPost', method: 'delete', params: data })
}

// 维护防护设施档案-子表2-岗位查询
export function protectionFilePostSearch(data) {
    return axios({ url: '/maintainThirdLevelArchives/queryThirdLevelJobsByArchivesId', method: 'get', params: data })
}
// 查询设施检查记录-查询
export function facilityCheckRecordSearch(data) {
    return axios({ url: '/maintainProtectEquipment/queryFacilityInspectionRecord', method: 'get', params: data })
}

// 查询设施检查记录-子表1-查询
export function facilityCheckRecordSearch1(data) {
    return axios({ url: '/maintainProtectEquipment/queryFacilityInspectionOrderDetails', method: 'get', params: data })
}

// 查询设施检查记录-子表2-查询
export function facilityCheckRecordSearch2(data) {
    return axios({ url: '/maintainProtectEquipment/querySecurityHazardsByRecordId', method: 'get', params: data })
}

