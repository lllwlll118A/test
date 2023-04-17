/*
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2021-05-12 16:49:04
 * @LastEditTime: 2021-06-28 11:02:24
 * @Description: TO DO
 */
import request from '@/utils/request'

// 查询部门列表
export function getOrganizationTree() {
    return request({
        url: 'organization/getOrganizationTree',
        method: 'post'
    })
}


// 新增机构
export function addOrganization(data) {
    return request({
        url: 'organization/createOrganization',
        method: 'post',
        data: data
    })
}

// 修改机构
export function updateOrganization(data) {
    return request({
        url: 'organization/updateOrganization',
        method: 'post',
        data: data
    })
}

// 删除菜单
export function delOrganization(data) {
    return request({
        url: 'organization/deleteOrganization',
        method: 'post',
        data,
        postTransformRequest: true
    })
}

// 查询部门详细
export function getOrganization(orgId) {
    return request({
        url: 'organization/getOrganizationDetailsByPk/' + orgId,
        method: 'get'
    })
}

//根据机构id获取用户
export function listUsersByOrgId(query) {
    return request({
        url: 'organization/listUsersByOrgId',
        method: 'get',
        params: query
    })
}