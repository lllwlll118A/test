/*
 * @Author: dsj
 * @LastEditors: hanq
 * @Date: 2022-06-28 10:20:11
 * @LastEditTime: 2022-09-19 17:32:06
 * @Description: TO DO
 */
import request from '@/utils/request'

// 查询字典数据列表
export function listData(query) {
    return request({
        url: '/system/dict/data/list',
        method: 'get',
        params: query
    })
}

// 查询字典数据详细
export function getData(dictCode) {
    return request({
        url: '/system/dict/data/' + dictCode,
        method: 'get'
    })
}

// 根据字典类型查询字典数据信息
export function getDicts(dictType) {
    return request({
        url: '/system/dict/data/type/' + dictType,
        method: 'get'
    }).then(({ data }) => {
        console.log(data)
        if (dictType == 'process_form_type') {
            return Promise.resolve({
                data: data.filter(dict => {
                    return dict.status == 0
                })
            })
        } else {
            return Promise.resolve({ data })
        }
    })
}

// 新增字典数据
export function addData(data) {
    return request({
        url: '/system/dict/data',
        method: 'post',
        data: data
    })
}

// 修改字典数据
export function updateData(data) {
    return request({
        url: '/system/dict/data',
        method: 'put',
        data: data
    })
}

// 删除字典数据
export function delData(dictCode) {
    return request({
        url: '/system/dict/data/' + dictCode,
        method: 'delete'
    })
}

// 导出字典数据
export function exportData(query) {
    return request({
        url: '/system/dict/data/export',
        method: 'post',
        data: query,
        responseType:'arraybuffer'
    })
}
