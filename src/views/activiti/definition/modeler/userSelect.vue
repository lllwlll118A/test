<!--
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2022-07-08 15:20:08
 * @LastEditTime: 2022-07-08 15:22:02
 * @Description: TO DO
-->
<template>
	<span class="select-user-btn" @click="fn">{{ msg }}</span>
</template>

<script>
export default {
	name: 'userSelect',
	props: {},
	data() {
		return {
			msg: '新按钮',
		}
	},
	computed: {},
	created() {},
	mounted() {},
	watch: {},
	methods: {
		fn() {
			console.log('aaa')
		},
	},
	components: {},
}
</script>

<style scoped lang="less">
</style>
