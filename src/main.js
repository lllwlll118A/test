/*
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2022-06-23 16:46:07
 * @LastEditTime: 2022-12-21 10:51:02
 * @Description: TO DO
 */
import Vue from 'vue'

import 'babel-polyfill';
import Cookies from 'js-cookie'
import Element from 'element-ui'
import echarts from 'echarts'
import './assets/styles/element-variables.scss'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css
import App from './App'
import store from './store'
import router from './router'
import permission from './directive/permission'
import debounce from './directive/debounce' //按钮防抖
import dragScroll from './directive/dragScroll' //按钮防抖
import plugins from './plugins' // plugins
import './assets/icons' // icon
import './permission' // permission control
import { getDicts } from "@/api/system/dict/data";
import { getConfigKey } from "@/api/system/config";
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, download, handleTree } from "@/utils/ruoyi";
import Pagination from "@/components/Pagination";
// 自定义表格工具扩展
import RightToolbar from "@/components/RightToolbar"
// 字典数据组件
import DictData from '@/components/DictData'
// 字典标签组件
import DictTag from '@/components/DictTag'
// 字典下拉组件
import DictSelect from '@/components/DictSelect'
// 代码高亮插件
// import hljs from 'highlight.js'
// import 'highlight.js/styles/github-gist.css'

//可视乎组件
import dataV from '@jiaminghi/data-view'
// 全局方法挂载
Vue.prototype.getDicts = getDicts
Vue.prototype.getConfigKey = getConfigKey
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree
Vue.prototype.toPage = function (name, query, closeTag) {
    if (closeTag) this.closeCurrentTag()
    this.$router.push({
        name,
        query
    })
}
Vue.prototype.closeCurrentTag = function () {
    this.bus.$emit('closeCurrentTag')
}
Vue.prototype.msgSuccess = function (msg) {
    this.$message({ showClose: true, message: msg, type: "success" });
}

Vue.prototype.msgError = function (msg) {
    this.$message({ showClose: true, message: msg, type: "error" });
}

Vue.prototype.msgInfo = function (msg) {
    this.$message.info(msg);
}

// 全局组件挂载
Vue.component('DictSelect', DictSelect)
Vue.component('DictTag', DictTag)
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)

Vue.use(permission)
Vue.use(debounce)
Vue.use(dragScroll)
Vue.use(dataV)
import { vuePlugin } from "./highlight";
import "highlight.js/styles/atom-one-dark-reasonable.css";
Vue.use(vuePlugin);
Vue.use(plugins)
DictData.install()

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
    size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.config.productionTip = false

import bpmnProcess from 'bpmn-process-designer'
Vue.use(bpmnProcess)
Vue.prototype.bus = new Vue()
window.globalVue = new Vue({
    el: '#app',
    router,
    store,
    echarts,
    render: h => h(App)
})
