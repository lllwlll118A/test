/*
 * @Author: hanq
 * @LastEditors: hanq
 * @Date: 2022-09-01 11:17:28
 * @LastEditTime: 2022-09-19 17:56:40
 * @Description: TO DO
 */
import request from '@/utils/request'

// 查询操作日志列表
export function list(query) {
  return request({
    url: '/monitor/operlog/list',
    method: 'get',
    params: query
  })
}

// 删除操作日志
export function delOperlog(operId) {
  return request({
    url: '/monitor/operlog/' + operId,
    method: 'delete'
  })
}

// 清空操作日志
export function cleanOperlog() {
  return request({
    url: '/monitor/operlog/clean',
    method: 'delete'
  })
}

// 导出操作日志
export function exportOperlog(query) {
  return request({
    url: '/monitor/operlog/export',
    method: 'post',
    data: query,
    responseType:'arraybuffer'
  })
}