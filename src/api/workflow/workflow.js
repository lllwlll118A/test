/*
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2022-06-16 16:38:49
 * @LastEditTime: 2022-08-03 17:27:00
 * @Description: TO DO
 */
import request from '@/utils/request'

// 查询请假列表
export function listWork(data) {
    // 参数为空不传给后台
    let data1 = JSON.parse(JSON.stringify(data))
    for (const key in data1.content) {
        let e = data1.content[key]
        if (e == "" || e == null || e == undefined) delete data1.content[key]
    }
    return request({
        url: '/workflow/list',
        method: 'post',
        data: data1
    })
}


// 新增流程
export function addWork(data) {
    return request({
        url: '/workflow/add',
        method: 'post',
        data: data
    })
}

// 修改流程
export function editWork(data) {
    return request({
        url: '/workflow/edit',
        method: 'post',
        data: data,
    })
}

// 删除流程
export function removeWork(data) {
    return request({
        url: '/workflow/remove',
        method: 'post',
        data: data
    })
}

// 查看流程图
export function approvalProcessPic(data) {
    return request({
        url: '/activitiHistory/approvalProcessPic',
        method: 'post',
        data: data,
        responseType: "blob",
    })
}
