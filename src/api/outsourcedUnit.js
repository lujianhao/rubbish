import axios from '@/utils/axios'

// 提交外委准入申请-查询
export function outsourcedUnitSubmitSearch(data) {
    return axios({ url: '/submitOutsourced/getOutsourcedAdmissions', method: 'get', params: data })
}

// 提交外委准入申请-新增
export function outsourcedUnitSubmitAdd(data) {
    return axios({ url: '/submitOutsourced/addOutsourcedAdmission', method: 'put', data })
}

// 提交外委准入申请-编辑
export function outsourcedUnitSubmitEdit(data) {
    return axios({ url: '/submitOutsourced/editOutsourcedAdmission', method: 'post', data })
}

// 提交外委准入申请-删除
export function outsourcedUnitSubmitDelete(data) {
    return axios({ url: '/submitOutsourced/deleteOutsourcedAdmissionById', method: 'delete', data })
}

// 提交外委准入申请-提交
export function outsourcedUnitSubmitSubmit(data) {
    return axios({ url: '/submitOutsourced/submitOutsourcedAdmissionById', method: 'post', data })
}

// 安环部审核外委准入申请-查询
export function outsourcedUnitAnhuanSearch(data) {
    return axios({ url: '/applyOutsourced/securityQueryApproval', method: 'get', params: data })
}

// 安环部审核外委准入申请-审批
export function outsourcedUnitAnhuanApprover(data) {
    return axios({ url: '/applyOutsourced/departmentAdmissionApplication', method: 'post', data })
}

// 保卫部审核外委准入申请-查询
export function outsourcedUnitBaoweiSearch(data) {
    return axios({ url: '/applyOutsourced/defendQueryApproval', method: 'get', params: data })
}

// 保卫部审核外委准入申请-审批
export function outsourcedUnitBaoweiApprover(data) {
    return axios({ url: '/applyOutsourced/securityDepartmentAdmissionApplication', method: 'post', data })
}

// 上传-获取审批通过的单据
export function outsourcedUnitUploadSearch(data) {
    return axios({ url: '/uploadMaterialOrConfirm/getApprovalList', method: 'get', params: data })
}

// 上传-确认准入申请
export function outsourcedUnitConfirm(data) {
    return axios({ url: '/uploadMaterialOrConfirm/confirmById', method: 'post', data })
}

// 外委单位过程管理-主表查询
export function outsourcedUnitProcessSearch(data) {
    return axios({ url: '/managerOutsourced/queryConstructionRecords', method: 'get', params: data })
}

// 外委单位过程管理-主表编辑
export function outsourcedUnitProcessEdit(data) {
    return axios({ url: '/managerOutsourced/editConstructionRecords', method: 'post', data })
}

// 外委单位过程管理-子表查询
export function outsourcedUnitProcessChildSearch(data) {
    return axios({ url: '/managerOutsourced/getChildTablePage', method: 'get', params: data })
}

// 外委单位过程管理-子表1新增
export function outsourcedUnitProcessAdd1(data) {
    return axios({ url: '/queryOutsourced/addEducationTrain', method: 'put', data })
}

// 外委单位过程管理-子表2新增
export function outsourcedUnitProcessAdd2(data) {
    return axios({ url: '/queryOutsourced/addHazardRecord', method: 'put', data })
}

// 外委单位过程管理-子表3新增
export function outsourcedUnitProcessAdd3(data) {
    return axios({ url: '/queryOutsourced/addInspectionRecord', method: 'put', data })
}

// 外委单位过程管理-子表4新增
export function outsourcedUnitProcessAdd4(data) {
    return axios({ url: '/queryOutsourced/addRectificationRecord', method: 'put', data })
}

// 外委单位过程管理-子表编辑
export function outsourcedUnitProcessChildEdit(param, data) {
    return axios({ url: `/managerOutsourced/editChildTable?params=${param}`, method: 'post', data })
}

// 外委单位过程管理-子表删除
export function outsourcedUnitProcessChildDelete(param, data) {
    return axios({ url: `/managerOutsourced/deleteChildByIds?params=${param}`, method: 'delete', data })
}

// 查询外委单位档案列表-主表查询
export function outsourcedUnitFileManageSearch(data) {
    return axios({ url: '/queryOutsourced/queryFileList', method: 'get', params: data })
}

// 查询外委单位档案列表-主表编辑
export function outsourcedUnitFileManageEdit(data) {
    return axios({ url: '/queryOutsourced/editFileLists', method: 'post', data })
}

// 查询外委单位档案列表-子表查询
export function outsourcedUnitFileManageChildSearch(data) {
    return axios({ url: '/queryOutsourced/queryConstructionRecords', method: 'get', params: data })
}

// 查询外委单位档案列表-子表查询
export function outsourcedUnitFileManageChildEdit(data) {
    return axios({ url: '/queryOutsourced/editRecordList', method: 'post', data })
}

// 查询外委工作过程-子表查询
export function outsourcedUnitProcessSearchSearch(data) {
    return axios({ url: '/evaluationOutsourced/queryEvaluationRecord', method: 'get', params: data })
}

// 外委单位工作评估-查询
export function outsourcedUnitAssessSearch(data) {
    return axios({ url: '/evaluationOutsourced/queryConstructionRecords', method: 'get', params: data })
}

// 外委单位工作评估-子表查询
export function outsourcedUnitAssessSearch1(data) {
    return axios({ url: '/evaluationOutsourced/queryEvaluationRecord', method: 'get', params: data })
}

// 外委单位工作评估-子表新增
export function outsourcedUnitAssessAdd1(data) {
    return axios({ url: '/evaluationOutsourced/addEvaluationRecord', method: 'put', data })
}

// 外委单位工作评估-子表编辑
export function outsourcedUnitAssessEdit1(data) {
    return axios({ url: '/evaluationOutsourced/updateEvaluationRecord', method: 'post', data })
}

// 外委单位工作评估-子表删除
export function outsourcedUnitAssessDelete1(data) {
    return axios({ url: '/evaluationOutsourced/deleteEvaluationRecord', method: 'post', data })
}

// 外委单位工作评估-子表提交
export function outsourcedUnitAssessSubmit1(data) {
    return axios({ url: '/evaluationOutsourced/submitEvaluationRecord', method: 'post', data })
}
