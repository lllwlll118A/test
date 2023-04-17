<!--
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2019-08-20 09:36:28
 * @LastEditTime: 2021-07-08 09:48:03
 * @Description: 统一登录 过渡页面
 -->
<template>
	<div
		class="wrapper"
		element-loading-background="rgba(0, 0, 0, 0.8)"
		element-loading-text="正在登录，请稍等..."
		v-loading="loading"
	></div>
</template>

<script>

export default {
	props: {},
	data() {
		return {
			loading: true,
		}
	},
	created() {
		this.$store
			.dispatch('PlatformLogin', this.$route.query.token)
			.then(() => {
				this.$router.push({ path: '/' })
			})
			.catch(() => {
				this.msgInfo('登录失败，请联系管理员')
			})
	},
	watch: {},
	methods: {},
	components: {},
}
</script>

<style scoped lang="scss">
.wrapper {
	height: 100%;
	width: 100%;
}
</style>
