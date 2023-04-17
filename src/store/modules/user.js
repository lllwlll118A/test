import { login, logout, getInfo, platformLogin } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
    state: {
        token: getToken(),
        name: '',
        nickName: '',
        userId: '',
        avatar: '',
        roles: [],
        depts: [],
        permissions: []
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_NICK_NAME: (state, nickName) => {
            state.nickName = nickName
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_PERMISSIONS: (state, permissions) => {
            state.permissions = permissions
        },
        SET_DEPTS: (state, depts) => {
            state.depts = depts
        },
        SET_USERID: (state, userId) => {
            state.userId = userId
        },
    },

    actions: {
        // 登录
        Login({ commit }, userInfo) {
            const username = userInfo.username.trim()
            const password = userInfo.password
            const code = userInfo.code
            const uuid = userInfo.uuid
            console.log('userInfo', userInfo)
            return new Promise((resolve, reject) => {
                login(username, password, code, uuid).then(res => {
                    setToken(res.token)
                    commit('SET_TOKEN', res.token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        //统一登录 自动登录
        PlatformLogin({ commit }, token) {
            console.log("自动登录:",token)
            return new Promise((resolve, reject) => {
                platformLogin({ token }).then(res => {
                    console.log("login:", res)
                    setToken(res.data) //cookie setToken
                    commit('SET_TOKEN', res.data) //vuex 存 token
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo(state.token).then(res => {
                    console.log("res:", res)
                    const user = res.user
                    const avatar = user.avatar == "" ? require("@/assets/images/profile.jpg") : process.env.VUE_APP_BASE_API + user.avatar;
                    if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                        commit('SET_ROLES', res.roles)
                        commit('SET_PERMISSIONS', res.permissions)
                    } else {
                        commit('SET_ROLES', ['ROLE_DEFAULT'])
                    }
                    commit('SET_NAME', user.userName)
                    commit('SET_USERID', user.userId)
                    commit('SET_NICK_NAME', user.nickName)
                    let depts = []
                    user.depts.forEach(e => {
                        depts.push({
                            deptId: e.deptId,
                            deptName: e.deptName
                        })
                    })
                    commit('SET_DEPTS', depts)
                    commit('SET_AVATAR', avatar)
                    resolve(res)
                }).catch(error => {
                    console.log('get info error:', error)
                    reject(error)
                })
            })
        },

        // 退出系统
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    commit('SET_PERMISSIONS', [])
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        }
    }
}

export default user
