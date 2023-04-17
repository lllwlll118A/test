/*
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2022-06-28 10:20:11
 * @LastEditTime: 2022-11-17 17:11:59
 * @Description: TO DO
 */
import request from '@/utils/request'

// 登录方法
export function login(username, password, code, uuid) {
    const data = {
        username,
        password,
        code,
        uuid
    }
    return request({
        url: '/login',
        method: 'post',
        data: data
    })
}

// 单点登录 - 默认登录
export const platformLogin = (data) => {
    return request({
        url: '/platformLogin',
        method: 'post',
        headers: {
            isToken: false
        },
        data,
    })
}

// 获取用户详细信息
export function getInfo() {
    return request({
        url: '/getInfo',
        method: 'get'
    })
}

// 退出方法
export function logout() {
    return request({
        url: '/logout',
        method: 'post'
    })
}

// 获取验证码
export function getCodeImg() {
    return request({
        url: '/captcha.jpg',
        method: 'get',
        headers: {
            isToken: false
        }
    })
}
