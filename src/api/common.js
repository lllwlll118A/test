/*
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2022-08-01 16:47:18
 * @LastEditTime: 2022-08-31 10:30:13
 * @Description: TO DO
 */
import request from '@/utils/request'
// 上传文件
export function uploadFile(data) {
    return request({
        url: '/system/uploadFile',
        method: 'post',
        data
    })
}
// 下载文件
export function downloadFile(fileId) {
    return request({
        url: `/system/download/${fileId}`,
        method: 'post',
        data
    })
}

// 计算请假天数（工作日）
export function calcWorkDays(data) {
    return request({
        url: `/system/workCalendar/calcWorkDays`,
        method: 'post',
        data
    })
}


