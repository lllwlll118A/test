/*
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2022-06-28 10:20:11
 * @LastEditTime: 2022-08-04 14:29:33
 * @Description: TO DO
 */
import request from '@/utils/request'

// 获取路由
export const getRouters = () => {
  return request({
    url: '/getRouters',
    method: 'get'
  })
}

//测试
// export const test = () => {
//   return request({
//     url: 'http://192.168.96.160/iot-admin',
//     method: 'get'
//   })
// }
