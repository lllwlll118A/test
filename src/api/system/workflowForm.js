/*
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2022-06-16 09:50:51
 * @LastEditTime: 2022-09-28 11:35:15
 * @Description: TO DO
 */
import request from '@/utils/request'

// 查询自定义表单列表
export function workflowFormList(data) {
    return request({
        url: '/workflowForm/queryWorkflowFormListPage',
        method: 'post',
        data
    })
}

// 新增自定义表单
export function addWorkflowForm(data) {
    return request({
        url: '/workflowForm/insert',
        method: 'post',
        data
    })
}

// 修改自定义表单
export function updateWorkflowForm(data) {
    return request({
        url: '/workflowForm/update',
        method: 'post',
        data
    })
}

// 根据formdata表的主键ID查询自定义表单详细
export function queryWorkflowFormData(data) {
    console.log(data)
    return request({
        url: '/workflowFormData/queryWorkflowFormData',
        method: 'post',
        data
    })
}

// 查询自定义表单详细
export function getWorkflowForm(query) {
    return request({
        url: '/workflowForm/queryWorkflowForm',
        method: 'get',
        params: query
    })
}

// 删除自定义表单
export function delWorkflowForm(id) {
    return request({
        url: '/workflowForm/delete',
        method: 'post',
        data: {
            id
        }
    })
}



// 根据用户查询全部有效的流程表单
export function queryWorkflowFormListByUser(data) {
    return request({
        url: '/workflowForm/queryWorkflowFormListByUser',
        method: 'post',
        data: data
    })
}

// 新增并发起流程
export function addAndStartProcess(data) {
    return request({
        url: '/workflowFormData/addAndStartProcess',
        method: 'post',
        data
    })
}

// 查询流程表单用户权限
export function queryWorkflowFormUsers(query) {
    return request({
        url: '/workflowForm/queryWorkflowFormUsers',
        method: 'get',
        params: query
    })
}

// 查询自定义表单详细
export function updateWorkflowFormUser(data) {
    return request({
        url: '/workflowForm/updateWorkflowFormUser',
        method: 'post',
        data
    })
}

// 根据参数查询审批意见和预审批流程
export function queryApprovalOpinionAndPreview(data) {
    return request({
        url: '/workflowFormData/queryApprovalOpinionAndPreview',
        method: 'post',
        data
    })
}
// 临时保存审批流程表单数据
export function tempSaveWorkflowFormData(data) {
    return request({
        url: '/workflowFormData/tempSaveWorkflowFormData',
        method: 'post',
        data
    })
}
// 查询临时保存的审批流程表单数据
export function queryDraftWorkflowFormData(data) {
    return request({
        url: '/workflowFormData/queryDraftWorkflowFormData',
        method: 'post',
        data
    })
}