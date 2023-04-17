<!--
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2022-07-27 15:39:56
 * @LastEditTime: 2022-07-28 14:17:52
 * @Description: TO DO
-->
<template>
	<section>
		<div class="bpmn-canvas" ref="canvas" />
	</section>
</template>

<script>
import BpmnModeler from 'bpmn-js/lib/Modeler'
export default {
	name: 'BpmnViewer',
	mounted() {
		this.init()
	},
	data() {
		return {
			// bpmn建模器
			bpmnModeler: null,
			container: null,
			canvas: null,
		}
	},
	methods: {
		init() {
			// 获取到属性ref为“canvas”的dom节点
			const canvas = this.$refs.canvas
			// 建模
			this.bpmnModeler = new BpmnModeler({
				container: canvas,
				height: '50vh',
				additionalModules: [
					{
						paletteProvider: ['value', ''], //禁用/清空左侧工具栏
						labelEditingProvider: ['value', ''], //禁用节点编辑
						contextPadProvider: ['value', ''], //禁用图形菜单
						bendpoints: ['value', {}], //禁用连线拖动
						zoomScroll: ['value', ''], //禁用滚动
						// moveCanvas: ['value', ''], //禁用拖动整个流程图
						move: ['value', ''], //禁用单个图形拖动
					},
				],
			})
		},
		createNewDiagram(xml) {
			try {
				this.bpmnModeler.importXML(xml).then((r) => {
					this.bpmnModeler.get('canvas').zoom('fit-viewport', 'auto')
				})
			} catch (err) {
				console.log('导入失败:', err)
			}
		},
		success() {
			console.log('创建成功!')
		},
	},
}
</script>

<style scoped>
.bpmn-canvas {
	border: 1px solid #bdbcbc;
	background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMTBoNDBNMTAgMHY0ME0wIDIwaDQwTTIwIDB2NDBNMCAzMGg0ME0zMCAwdjQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlMGUwZTAiIG9wYWNpdHk9Ii4yIi8+PHBhdGggZD0iTTQwIDBIMHY0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+)
		repeat !important;
}
</style>

