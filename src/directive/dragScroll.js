/*
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2022-08-26 09:56:26
 * @LastEditTime: 2022-08-26 10:23:09
 * @Description: TO DO
 */
const install = function (Vue) {
    Vue.directive('dragScroll', {
        inserted(el) {
            el.onmousedown = function (ev) {
                const disX = ev.clientX
                const disY = ev.clientY
                const originalScrollLeft = el.scrollLeft
                const originalScrollTop = el.scrollTop
                const originalScrollBehavior = el.style['scroll-behavior']
                const originalPointerEvents = el.style['pointer-events']
                // auto: 默认值，表示滚动框立即滚动到指定位置。
                el.style['scroll-behavior'] = 'auto'
                el.style['cursor'] = 'grabbing'
                // 鼠标移动事件是监听的整个document，这样可以使鼠标能够在元素外部移动的时候也能实现拖动
                document.onmousemove = function (ev) {
                    ev.preventDefault()
                    // 计算拖拽的偏移距离
                    const distanceX = ev.clientX - disX
                    const distanceY = ev.clientY - disY

                    el.scrollTo(originalScrollLeft - distanceX, originalScrollTop - distanceY)
                    // console.log(originalScrollLeft - distanceX, originalScrollTop - distanceY)
                    // 在鼠标拖动的时候将点击事件屏蔽掉
                    el.style['pointer-events'] = 'none'
                    document.body.style['cursor'] = 'grabbing'
                }
                document.onmouseup = function () {
                    document.onmousemove = null
                    document.onmouseup = null
                    el.style['scroll-behavior'] = originalScrollBehavior
                    el.style['pointer-events'] = originalPointerEvents
                    el.style['cursor'] = 'grab'
                }
            }
        }
    })

}

if (window.Vue) {
    Vue.use(install); // eslint-disable-line
}

export default install