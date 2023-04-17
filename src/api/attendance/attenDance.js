/*
 * @Author: dsj
 * @LastEditors: hanq
 * @Date: 2022-07-21 10:36:58
 * @LastEditTime: 2022-09-19 17:05:38
 * @Description: TO DO
 */
import request from '@/utils/request'

// 代办任务
export function queryGroupAttendListPage(data) {
    return request({
        url: '/attend/queryGroupAttendListPage',
        method: 'post',
        data
    })
	
}

// 代办任务
export function exportGroupAttendList(data) {
    return request({
        url: '/attend/exportGroupAttendList',
        method: 'post',
        responseType: "arraybuffer",
        data
    })
}
