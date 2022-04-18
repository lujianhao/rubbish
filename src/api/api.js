import axios from '@/utils/axios'

// 登录
export function login(data) {
    return axios({ url: '/safeUserProfile/login', method: 'post', data })
}

// 获取系统信息
export function getSystemInfo(data) {
    return axios({ url: '/PerMaintenance/j_getSystemNameAndTb', method: 'get', params: data })
}

// 获取用户信息
export function getUserInfo(data) {
    return axios({ url: '/safeUserProfile/getuser', method: 'get', params: data })
}

// 获取用户菜单信息
export function getUserMenuInfo(data) {
    return axios({ url: '/PerMaintenance/g_getQxlbByUserId', method: 'get', params: data })
}

// 获取当前菜单子表tab标签
export function getTabsList(data) {
    return axios({ url: '/public/getTableLabelList', method: 'get', params: data })
}

// 获取一二三级单位树状结构
export function getUnitTree123(data) {
    return axios({ url: '/public/getOneTwoThreeArchivesTree', method: 'get', params: data })
}

// 获取一二级单位树状结构
export function getUnitTree12(data) {
    return axios({ url: '/public/secondArchivesAll', method: 'get', params: data })
}

// 获取二三级单位树状结构
export function getUnitTree23(data) {
    return axios({ url: '/public/getSecondThirdArchivesTree', method: 'get', params: data })
}

// 获取二级单位下的所有三级单位
export function getUnit3(data) {
    return axios({ url: '/public/getThirdLevelArchivesBySecondName', method: 'get', params: data })
}

// 获取三级单位下所有人员
export function getUnit3Users(data) {
    return axios({ url: '/public/getUserProfilesByThirdLevelArchivesId', method: 'get', params: data })
}

// 获取三级单位下所有岗位
export function getUnit3Jobs(data) {
    return axios({ url: '/public/getThirdLevelJobsByArchivesId', method: 'get', params: data })
}

// 获取数据字典明细
export function getDictionaryDetails(data) {
    return axios({ url: '/public/getDataDictionaryDetails', method: 'get', params: data })
}

// 文件上传
export function uploadFile(data) {
    return axios({ url: '/public/upload', method: 'post', data })
}

// 文件上传-查询
export function uploadFileSearch(data) {
    return axios({ url: '/public/getUploadedFiles', method: 'get', params: data })
}

// 文件上传-删除
export function uploadFileDelete(param, data) {
    return axios({ url: `/public/deleteFileById?params=${param}`, method: 'post', data })
}

// 文件下载-单文件
export function downloadFileSingle(id) {
    return axios({ url: `/public/downloadFile/${id}`, method: 'post', responseType: 'blob' })
}

// 文件下载-多文件
export function downloadFileMore(id) {
    return axios({ url: `/public/downloadFileByTableId/${id}`, method: 'post', responseType: 'blob' })
}

// 数据模板下载
export function downloadTemplate() {
    return axios({ url: '/SystemBasicData/a_downDataTemplate', method: 'post', responseType: 'blob' })
}

// 数据模板上传
export function uploadTemplate(data) {
    return axios({ url: '/SystemBasicData/b_uploadTemplate', method: 'post', data })
}

// 修改密码
export function updatePassword(data) {
    return axios({ url: '/safeUserProfile/changePassword', method: 'post', data })
}

// 查询当前用户权限树结构
export function getTreeByUserId(data) {
    return axios({ url: '/a_getZZJGByUserId', method: 'get', params: data })
}

// 查询隐患处理列表默认数据
export function getHiddenDanger(data) {
    return axios({ url: '/b_getYHCLDataDefaultQueryInterface', method: 'get', params: data })
}

// 查询树形结构对应隐患处理列表
export function getHiddenDangerByTree(data) {
    return axios({ url: '/c_getYHCLLBDataByJGID', method: 'get', params: data })
}
