/*
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2022-08-17 15:49:06
 * @LastEditTime: 2022-08-17 16:36:00
 * @Description: TO DO
 */

const install = function (Vue) {
    Vue.directive('debounce', {
        inserted(el, binding) {
            var loadingEl = document.createElement('i')
            loadingEl.classList.add('el-icon-loading')

            el.addEventListener('click', () => {
                if (!el.disabled) {
                    el.classList.add('is-loading')
                    el.insertBefore(loadingEl, el.childNodes[0])
                    el.disabled = true
                    setTimeout(() => {
                        el.disabled = false
                        el.removeChild(loadingEl)
                        el.classList.remove('is-loading')
                    }, 3 * 1000)
                }
            })
        }
    })
}

if (window.Vue) {
    Vue.use(install); // eslint-disable-line
}

export default install
