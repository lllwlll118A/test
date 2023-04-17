/*
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2022-06-23 16:46:07
 * @LastEditTime: 2022-07-28 14:36:25
 * @Description: TO DO
 */
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)