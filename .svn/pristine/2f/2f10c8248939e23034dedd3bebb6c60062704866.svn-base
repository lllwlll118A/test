/*
 * @Author: dsj
 * @LastEditors: hanq
 * @Date: 2022-06-28 16:50:53
 * @LastEditTime: 2022-09-19 17:44:59
 * @Description: TO DO
 */
import request from '@/utils/request'

// 查询字典类型列表
export function listType(query) {
  console.log(query)
  return request({
    url: '/system/dict/type/list',
    method: 'get',
    params: query
  })
}

// 查询字典类型详细
export function getType(dictId) {
  return request({
    url: '/system/dict/type/' + dictId,
    method: 'get'
  })
}

// 新增字典类型
export function addType(data) {
  return request({
    url: '/system/dict/type',
    method: 'post',
    data: data
  })
}

// 修改字典类型
export function updateType(data) {
  return request({
    url: '/system/dict/type',
    method: 'put',
    data: data
  })
}

// 删除字典类型
export function delType(dictId) {
  return request({
    url: '/system/dict/type/' + dictId,
    method: 'delete'
  })
}

// 清理参数缓存
export function clearCache() {
  return request({
    url: '/system/dict/type/clearCache',
    method: 'delete'
  })
}

// 导出字典类型
export function exportType(query) {
  return request({
    url: '/system/dict/type/export',
    method: 'post',
    data:query,
    responseType:'arraybuffer'
  })
}

// 获取字典选择框列表
export function optionselect() {
  return request({
    url: '/system/dict/type/optionselect',
    method: 'get'
  })
}
