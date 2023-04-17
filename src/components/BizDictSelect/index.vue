<!--
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2021-05-20 09:39:10
 * @LastEditTime: 2022-08-22 10:00:30
 * @Description: 数据字典 el-select 二次封装， 字典名称属性：dictType
-->
<template>
	<el-select
		:disabled="disabled"
		v-model="selValue"
		@change="onChange"
		:placeholder="placeholder"
		:clearable="clearable"
        size="small"
	>
		<el-option v-for="item in bizDict" :key="item.dictValue" :label="item.dictName" :value="item.dictValue" />
	</el-select>
</template>

<script>
export default {
	model: {
		//自定义双向绑定的prop和事件
		prop: 'bar',
		event: 'foo',
	},
	props: {
		bar: String || Number, //要在props里面声明双向绑定指定的prop
		checked: Boolean,
		dictType: {
			type: String,
			required: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		placeholder: {
			type: String,
			default: '请选择',
		},
		clearable: {
			type: Boolean,
			default: true,
		},
	},
	computed: {
		bizDict() {
			return this.$store.getters['bizDict/getStateByNode'](this.dictType)
		},
	},
	data() {
		return {
			selValue: this.bar, //父组件初始赋值
		}
	},
	created() {},
	methods: {
		onChange(v) {
			this.$emit('foo', v)
		},
	},
	watch: {
		bar(v) {
			this.selValue = this.bar //实时更新
		},
	},
}
</script>

<style scoped lang="scss">
</style>
