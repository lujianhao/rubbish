import axios from '@/utils/axios'

// 设置专业评分标准-主表查询
export function majorInsceptionSetSearch(data) {
    return axios({ url: '/checkQuery/getProfessionTypes', method: 'get', params: data })
}

// 设置专业评分标准-主表新增
export function majorInsceptionSetAdd(data) {
    return axios({ url: '/checkSetUp/addProfessionType', method: 'put', data })
}

// 设置专业评分标准-主表编辑
export function majorInsceptionSetEdit(data) {
    return axios({ url: '/checkSetUp/editProfessionTypes', method: 'post', data })
}

// 设置专业评分标准-主表删除
export function majorInsceptionSetDelete(data) {
    return axios({ url: '/checkSetUp/deleteProfessionTypeByIds', method: 'delete', data })
}

// 设置专业评分标准-子表查询
export function majorInsceptionSetSearch1(data) {
    return axios({ url: '/checkQuery/getChildByModule', method: 'get', params: data })
}

// 设置专业评分标准-子表1（专业检查标准）删除
export function majorInsceptionDelete1(data) {
    return axios({ url: '/checkSetUp/deleteCheckListDetailsByIds', method: 'delete', data })
}

// 设置专业评分标准-子表2（被检查单位）删除
export function majorInsceptionDelete2(data) {
    return axios({ url: '/checkSetUp/deleteCheckInspectedUnitByIds', method: 'put', data })
}

// 设置专业评分标准-子表3（专业检查人员）删除
export function majorInsceptionDelete3(data) {
    return axios({ url: '/checkSetUp/deleteCheckPersonalsByIds', method: 'delete', data })
}

// 设置专业评分标准-子表1（专业检查标准）新增
export function majorInsceptionAdd1(data) {
    return axios({ url: '/checkSetUp/addCheckListDetail', method: 'put', data })
}

// 设置专业评分标准-子表2（被检查单位）新增
export function majorInsceptionAdd2(data) {
    return axios({ url: '/checkSetUp/addCheckInspectedUnit', method: 'put', data })
}

// 设置专业评分标准-子表3（专业检查人员）新增
export function majorInsceptionAdd3(data) {
    return axios({ url: '/checkSetUp/addCheckPersonal', method: 'put', data })
}

// 设置专业评分标准-子表1（专业检查标准）编辑
export function majorInsceptionSetEdit1(data) {
    return axios({ url: '/checkSetUp/editCheckListDetail', method: 'post', data })
}

// 提交专业检查结果-主表查询
export function majorInsceptionSubmitSearch(data) {
    return axios({ url: '/checkQuery/pageSelectTaskList', method: 'get', params: data })
}

// 提交专业检查结果-提交任务单
export function majorInsceptionSubmit(data) {
    return axios({ url: '/checkSetUp/submitTaskList', method: 'post', data })
}

// 查询检查单检查明细-子表查询
export function majorInsceptionSubmitSearch1(data) {
    return axios({ url: '/checkQuery/selectCheckDetail', method: 'get', params: data })
}

// 查询检查单检查明细-子表编辑
export function majorInsceptionSubmitEdit(data) {
    return axios({ url: '/checkSetUp/updateCheckDeails', method: 'post', data })
}

// 查询专业检查结果-主表查询
export function majorInsceptionSearch(data) {
    return axios({ url: '/checkQuery/findTaskListByTimeTypeStatus', method: 'get', params: data })
}

// 查询专业检查汇总-主表查询
export function majorInsceptionCollectSearch(data) {
    return axios({ url: '/checkQuery/findSummaryByTimeSubject', method: 'get', params: data })
}
