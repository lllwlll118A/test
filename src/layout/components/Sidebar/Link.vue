<!--
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2022-06-16 09:50:51
 * @LastEditTime: 2022-06-16 15:23:58
 * @Description: TO DO
-->
<template>
	<component :is="type" v-bind="linkProps(to)">
		<slot />
	</component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
	props: {
		to: {
			type: String,
			required: true,
		},
	},
	computed: {
		isExternal() {
			return isExternal(this.to)
		},
		type() {
			if (this.isExternal) {
				return 'a'
			}
			return 'router-link'
		},
	},
	methods: {
		linkProps(to) {
			if (this.isExternal) {
				return {
					href: to,
					target: '_blank',
					rel: 'noopener',
				}
			}
			return {
				to: to,
			}
		},
	},
}
</script>
