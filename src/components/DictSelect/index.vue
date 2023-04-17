<!--
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2022-08-10 17:43:11
 * @LastEditTime: 2022-08-22 10:02:37
 * @Description: TO DO
-->
<template>
	<el-select
		@change="onChange"
		size="small"
		v-model="selected"
		:placeholder="placeholder"
		:clearable="clearable"
		:filterable="filterable"
		style="width: 240px"
	>
		<el-option v-for="dict in options" :key="dict.value" :label="dict.label" :value="dict.value" />
	</el-select>
</template>

<script>
export default {
	name: 'DictSelect',
	model: {
		prop: 'foo',
		event: 'bar',
	},
	props: {
		foo: '',
		placeholder: {
			type: String,
			default: '请选择',
		},
		filterable: {
			type: Boolean,
			default: () => {
				return false
			},
		},
		clearable: {
			type: Boolean,
			default: () => {
				return false
			},
		},
		options: {
			type: Array,
			required: true,
			default: () => {
				return []
			},
		},
	},
	data() {
		return {
			selected: '',
		}
	},
	methods: {
		onChange(v) {
			this.$emit('bar', v)
		},
	},
	watch: {
		foo: {
			handler(v) {
				this.selected = v
			},
			immediate: true,
		},
	},
}
</script>