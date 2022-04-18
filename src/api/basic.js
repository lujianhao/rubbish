import axios from '@/utils/axios'

// 维护模块分类-查询
export function moduleSearch(data) {
    return axios({ url: '/PerMaintenance/getQxflByName', method: 'get', params: data })
}

// 维护模块分类-新增
export function moduleAdd(data) {
    return axios({ url: '/PerMaintenance/a_insertQxfl', method: 'post', data })
}

// 维护模块分类-编辑
export function moduleEdit(data) {
    return axios({ url: '/PerMaintenance/b_updateQxfl', method: 'post', data })
}

// 维护模块分类-删除
export function moduleDelete(data) {
    return axios({ url: '/PerMaintenance/c_deleteQxfl', method: 'get', params: data })
}

// 维护模块分类-子表1-查询
export function moduleSearch1(data) {
    return axios({ url: '/PerMaintenance/getQxlbByQxflId', method: 'get', params: data })
}

// 维护模块分类-子表1-新增查询
export function moduleAddSearch1(data) {
    return axios({ url: '/PerMaintenance/i_getUnassignedQxlb', method: 'get', params: data })
}

// 维护模块分类-子表1-新增
export function moduleAdd1(data) {
    return axios({ url: '/PerMaintenance/e_insertQxlb', method: 'post', data })
}

// 维护模块分类-子表1-新增
export function moduleEdit1(data) {
    return axios({ url: '/PerMaintenance/f_updateQxlb', method: 'post', data })
}

// 维护分厂信息-查询
export function branchSearch(data) {
    return axios({ url: '/maintainSecondViolations/querySecondArchives', method: 'get', params: data })
}

// 维护分厂信息-新增
export function branchAdd(data) {
    return axios({ url: '/maintainSecondViolations/addSecondArchives', method: 'put', data })
}

// 维护分厂信息-编辑
export function branchEdit(data) {
    return axios({ url: '/maintainSecondViolations/editSecondArchives', method: 'post', data })
}

// 维护分厂信息-删除
export function branchDelete(data) {
    return axios({ url: '/maintainSecondViolations/deleteSecondArchives', method: 'delete', params: data })
}

// 维护分厂信息-子表1-查询
export function branchSearch1(data) {
    return axios({ url: '/maintainThirdLevelArchives/queryThirdLevelArchives', method: 'get', params: data })
}

// 维护分厂信息-子表1-新增
export function branchAdd1(data) {
    return axios({ url: '/maintainThirdLevelArchives/addThirdLevelArchives', method: 'put', data })
}

// 维护分厂信息-子表1-编辑
export function branchEdit1(data) {
    return axios({ url: '/maintainThirdLevelArchives/editThirdLevelArchives', method: 'post', data })
}

// 维护分厂信息-子表1-删除
export function branchDelete1(data) {
    return axios({ url: '/maintainThirdLevelArchives/deleteThirdLevelArchives', method: 'delete', params: data })
}

// 维护车间信息-子表1-查询
export function workshopSearch1(data) {
    return axios({ url: '/maintainSystemRole/queryTeamFileByThirdId', method: 'get', params: data })
}

// 维护车间信息-子表1-新增
export function workshopAdd1(data) {
    return axios({ url: '/maintainSystemRole/addTeamFile', method: 'put', data })
}

// 维护车间信息-子表1-编辑
export function workshopEdit1(data) {
    return axios({ url: '/maintainSystemRole/editTeamFile', method: 'post', data })
}

// 维护车间信息-子表1-删除
export function workshopDelete1(data) {
    return axios({ url: '/maintainSystemRole/deleteTeamFile', method: 'delete', params: data })
}

// 维护车间信息-子表2-查询新增列表
export function workshopSearchAdd(data) {
    return axios({ url: '/maintainSystemRole/queryPermissionByThirdId', method: 'get', params: data })
}

// 维护车间信息-子表2-查询
export function workshopSearch2(data) {
    return axios({ url: '/safeUserProfile/queryUserByThirdId', method: 'get', params: data })
}

// 维护车间信息-子表2-新增
export function workshopAdd2(data) {
    return axios({ url: '/safeUserProfile/addUser', method: 'put', data })
}

// 维护车间信息-子表2-编辑
export function workshopEdit2(data) {
    return axios({ url: '/safeUserProfile/editUser', method: 'post', data })
}

// 维护车间信息-子表2-删除
export function workshopDelete2(data) {
    return axios({ url: '/safeUserProfile/deleteUser', method: 'delete', params: data })
}

// 维护车间信息-子表2-重置
export function workshopReset(data) {
    return axios({ url: '/safeUserProfile/resetPassword', method: 'post', data })
}

// 维护车间信息-子表2-移动单位
export function workshopRemove(data) {
    return axios({ url: '/safeUserProfile/moveUnit', method: 'post', data })
}

// 维护车间信息-子表3-查询
export function workshopSearch3(data) {
    return axios({ url: '/maintainThirdLevelArchives/queryOrganizationByThirdId', method: 'get', params: data })
}

// 维护车间信息-子表3-新增
export function workshopAdd3(data) {
    return axios({ url: '/maintainThirdLevelArchives/addOrganization', method: 'put', data })
}

// 维护车间信息-子表3-删除
export function workshopDelete3(data) {
    return axios({ url: '/maintainThirdLevelArchives/deleteOrganization', method: 'delete', params: data })
}

// 维护车间信息-子表4-查询
export function workshopSearch4(data) {
    return axios({ url: '/maintainThirdLevelArchives/queryThirdLevelJobsByArchivesId', method: 'get', params: data })
}

// 维护车间信息-子表4-新增
export function workshopAdd4(data) {
    return axios({ url: '/maintainThirdLevelArchives/addThirdLevelJob', method: 'put', data })
}

// 维护车间信息-子表4-编辑
export function workshopEdit4(data) {
    return axios({ url: '/maintainThirdLevelArchives/editThirdLevelJob', method: 'post', data })
}

// 维护车间信息-子表4-删除
export function workshopDelete4(data) {
    return axios({ url: '/maintainThirdLevelArchives/deleteThirdLevelJob', method: 'delete', params: data })
}

// 维护车间信息-子表5-查询
export function workshopSearch5(data) {
    return axios({ url: '/maintainThirdLevelArchives/queryPositionByThirdId', method: 'get', params: data })
}

// 维护车间信息-子表5-新增
export function workshopAdd5(data) {
    return axios({ url: '/maintainThirdLevelArchives/addPosition', method: 'put', data })
}

// 维护车间信息-子表5-编辑
export function workshopEdit5(data) {
    return axios({ url: '/maintainThirdLevelArchives/editPosition', method: 'post', data })
}

// 维护车间信息-子表5-删除
export function workshopDelete5(data) {
    return axios({ url: '/maintainThirdLevelArchives/deletePosition', method: 'delete', params: data })
}

// 维护角色信息-查询
export function roleSearch(data) {
    return axios({ url: '/maintainSystemRole/querySystemRole', method: 'get', params: data })
}

// 维护角色信息-新增
export function roleAdd(data) {
    return axios({ url: '/maintainSystemRole/addSystemRole', method: 'put', data })
}

// 维护角色信息-编辑
export function roleEdit(data) {
    return axios({ url: '/maintainSystemRole/editSystemRole', method: 'post', data })
}

// 维护角色信息-删除
export function roleDelete(data) {
    return axios({ url: '/maintainSystemRole/deleteSystemRole', method: 'delete', params: data })
}

// 维护角色信息-子表1-查询
export function roleSearch1(data) {
    return axios({ url: '/maintainSystemRole/queryTypeNameByRoleId', method: 'get', params: data })
}

// 维护角色信息-子表1-查询新增列表
export function roleSearchAdd1(data) {
    return axios({ url: '/maintainSystemRole/queryPermissionByRoleId', method: 'get', params: data })
}

// 维护角色信息-子表1-新增
export function roleAdd1(data) {
    return axios({ url: '/maintainSystemRole/addPermissions', method: 'put', data })
}

// 维护角色信息-子表1-删除
export function roleDelete1(data) {
    return axios({ url: '/maintainSystemRole/deletePermissions', method: 'delete', params: data })
}

// 维护角色信息-子表2-查询
export function roleSearch2(data) {
    return axios({ url: '/maintainSystemRole/queryUserByRoleId', method: 'get', params: data })
}

// 维护角色信息-子表2-查询新增列表
export function roleSearchAdd2(data) {
    return axios({ url: '/maintainSystemRole/queryUserNotInProfile', method: 'get', params: data })
}

// 维护角色信息-子表2-新增
export function roleAdd2(data) {
    return axios({ url: '/maintainSystemRole/addSystemRoleUser', method: 'put', data })
}

// 维护角色信息-子表2-删除
export function roleDelete2(data) {
    return axios({ url: '/maintainSystemRole/deleteSystemRoleUser', method: 'delete', params: data })
}

// 维护数据字典-查询
export function dictionariesSearch(data) {
    return axios({ url: '/maintainDataDictionary/queryDataDictionaryTypeByName', method: 'get', params: data })
}

// 维护数据字典-新增
export function dictionariesAdd(data) {
    return axios({ url: '/maintainDataDictionary/addDataDictionaryType', method: 'put', data })
}

// 维护数据字典-编辑
export function dictionariesEdit(data) {
    return axios({ url: '/maintainDataDictionary/editDataDictionaryType', method: 'post', data })
}

// 维护数据字典-删除
export function dictionariesDelete(data) {
    return axios({ url: '/maintainDataDictionary/deleteDataDictionaryType', method: 'delete', params: data })
}

// 维护数据字典-子表1-查询
export function dictionariesSearch1(data) {
    return axios({ url: '/maintainDataDictionary/queryDataDetailByTypeId', method: 'get', params: data })
}

// 维护数据字典-子表1-新增
export function dictionariesAdd1(data) {
    return axios({ url: '/maintainDataDictionary/addDataDictionaryDetail', method: 'put', data })
}

// 维护数据字典-子表1-编辑
export function dictionariesEdit1(data) {
    return axios({ url: '/maintainDataDictionary/editDataDictionaryDetail', method: 'post', data })
}

// 维护数据字典-子表1-删除
export function dictionariesDelete1(data) {
    return axios({ url: '/maintainDataDictionary/deleteDataDictionaryDetail', method: 'delete', params: data })
}

// 维护隐患分类-查询
export function hiddenDangerSearch(data) {
    return axios({ url: '/maintenanceHazardClassification/querySafetyHazardCategorieByNumber', method: 'get', params: data })
}

// 维护隐患分类-新增
export function hiddenDangerAdd(data) {
    return axios({ url: '/maintenanceHazardClassification/addSafetyHazardCategories', method: 'put', data })
}

// 维护隐患分类-编辑
export function hiddenDangerEdit(data) {
    return axios({ url: '/maintenanceHazardClassification/editSafetyHazardCategories', method: 'post', data })
}

// 维护隐患分类-删除
export function hiddenDangerDelete(data) {
    return axios({ url: '/maintenanceHazardClassification/deleteSafetyHazardCategories', method: 'delete', params: data })
}

// 维护隐患分类-子表1-查询
export function hiddenDangerSearch1(data) {
    return axios({ url: '/maintenanceHazardClassification/querySafetyHazardTypeByCategorieId', method: 'get', params: data })
}

// 维护隐患分类-子表1-新增
export function hiddenDangerAdd1(data) {
    return axios({ url: '/maintenanceHazardClassification/addSafetyHazardType', method: 'put', data })
}

// 维护隐患分类-子表1-编辑
export function hiddenDangerEdit1(data) {
    return axios({ url: '/maintenanceHazardClassification/editSafetyHazardType', method: 'post', data })
}

// 维护隐患分类-子表1-删除
export function hiddenDangerDelete1(data) {
    return axios({ url: '/maintenanceHazardClassification/deleteSafetyHazardType', method: 'delete', params: data })
}
