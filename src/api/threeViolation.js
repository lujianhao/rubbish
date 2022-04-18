import axios from '@/utils/axios'

// 获取当前登录用户所属分厂人员
export function threeViolationNowUsers(data) {
    return axios({ url: '/public/queryThirdArchivesBySecondId', method: 'get', params: data })
}

// 提交三违记录-查询
export function threeViolationSubmitSearch(data) {
    return axios({ url: '/submitThreeViolation/queryRecordByName', method: 'get', params: data })
}

// 提交三违记录-新增
export function threeViolationSubmitAdd(data) {
    return axios({ url: '/submitThreeViolation/addViolationRecord', method: 'put', data })
}

// 提交三违记录-编辑
export function threeViolationSubmitEdit(data) {
    return axios({ url: '/submitThreeViolation/editViolationRecord', method: 'post', data })
}
// 提交三违记录-提交
export function threeViolationSubmitSubmit(data) {
    return axios({ url: '/submitThreeViolation/submitViolationRecord', method: 'post', data })
}

// 提交三违记录-删除
export function threeViolationSubmitDelete(data) {
    return axios({ url: '/submitThreeViolation/deleteHandlingRecord', method: 'delete', data })
}

// 填写违章经过-查询
export function ViolationProcessWriteSearch(data) {
    return axios({ url: '/submitThreeViolation/getWriteViolationList', method: 'get', params: data })
}

// 填写违章经过-提交
export function ViolationProcessWriteSubmit(data) {
    return axios({ url: '/submitThreeViolation/submitWriteViolationList', method: 'post', data })
}

// 填写违章经过-编辑
export function ViolationProcessWriteEdit(data) {
    return axios({ url: '/submitThreeViolation/editWriteViolationList', method: 'post', data })
}

// 反馈安全补课关-查询
export function safeFeedbackSearch(data) {
    return axios({ url: '/submitThreeViolation/getViolationListByStatus', method: 'get', params: data })
}

// 反馈安全补课关-编辑
export function safeFeedbackEdit(data) {
    return axios({ url: '/submitThreeViolation/editViolationListByStatus', method: 'post', data })
}

// 反馈安全补课关-提交
export function safeFeedbackSubmit(data) {
    return axios({ url: '/submitThreeViolation/submitViolationListReflectionBySecurity', method: 'post', data })
}

// 反馈反思检查关-查询
export function checkFeedbackSearch(data) {
    return axios({ url: '/submitThreeViolation/getRecordByFullName', method: 'get', params: data })
}

// 反馈反思检查关-编辑
export function checkFeedbackEdit(data) {
    return axios({ url: '/submitThreeViolation/reflectionEditViolation', method: 'post', data })
}

// 反馈反思检查关-提交
export function checkFeedbackSubmit(data) {
    return axios({ url: '/submitThreeViolation/submitViolationListReflection', method: 'post', data })
}

// 反馈领导谈话关-查询
export function leaderTalkFeedbackSearch(data) {
    return axios({ url: '/submitThreeViolation/getViolationByLeader', method: 'get', params: data })
}

// 反馈领导谈话关-编辑
export function leaderTalkFeedbackEdit(data) {
    return axios({ url: '/submitThreeViolation/editViolationListByLeader', method: 'post', data })
}

// 反馈家属协管关-查询
export function familyFeedbackSearch(data) {
    return axios({ url: '/submitThreeViolation/getFamilyAssistance', method: 'get', params: data })
}

// 反馈家属协管关-提交
export function familyFeedbackSubmit(data) {
    return axios({ url: '/submitThreeViolation/submitFamilyAssistance', method: 'post', data })
}

// 反馈家属协管关-编辑
export function familyFeedbackEdit(data) {
    return axios({ url: '/submitThreeViolation/editViolationListByFamily', method: 'post', data })
}

// 查询过关记录-查询
export function passRecordCheckSearch(data) {
    return axios({ url: '/submitThreeViolation/getClearanceRecord', method: 'get', params: data })
}

// 关闭过关记录-查询
export function closePassRecordSearch(data) {
    return axios({ url: '/submitThreeViolation/getRecordByViolator', method: 'get', params: data })
}

// 关闭过关记录-提交
export function closePassRecordSubmit(data) {
    return axios({ url: '/submitThreeViolation/submitCloseRecord', method: 'post', data })
}
