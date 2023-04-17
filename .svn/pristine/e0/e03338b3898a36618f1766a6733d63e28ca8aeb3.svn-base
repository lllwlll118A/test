/*
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2021-05-08 15:54:16
 * @LastEditTime: 2021-05-19 09:45:11
 * @Description: TO DO
 */
import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/ruoyi";

// 查询所有角色
export function selectRole(query) {
  return request({
    url: 'sys/role/select',
    method: 'get',
    params: query
  })
}

// 查询角色列表
export function listRole(query) {
  return request({
    url: 'sys/role/list',
    method: 'get',
    params: query
  })
}


// 查询角色详细
export function getRole(roleId) {
  return request({
    url: 'sys/role/info/' + praseStrEmpty(roleId),
    method: 'get'
  })
}

// 删除角色
export function delRole(userIds) {
  return request({
    url: 'sys/role/delete',
    method: 'post',
    data: JSON.stringify(userIds)
  })
}

// 新增角色
export function addRole(data) {
  return request({
    url: 'sys/role/save',
    method: 'post',
    data: data
  })
}

// 修改角色
export function updateRole(data) {
  return request({
    url: 'sys/role/update',
    method: 'post',
    data: data
  })
}
