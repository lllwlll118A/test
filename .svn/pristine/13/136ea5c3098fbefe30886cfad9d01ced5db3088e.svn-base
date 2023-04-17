<!--
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2022-07-20 16:16:18
 * @LastEditTime: 2022-08-31 17:13:29
 * @Description: 发起审批菜单页面
-->
<template>
	<div class="app-container">
		<div v-for="dict in dict.type.process_form_type" :key="dict.value">
			<template v-if="listFilter(dict.value).length > 0">
				<el-divider content-position="left">{{ dict.label }}</el-divider>
				<section class="approval-row">
					<div
						class="approval-item"
						@click="toStartApproval(item)"
						:style="{
							'background-color': `${item.formIconColor}`,
						}"
						v-for="item in listFilter(dict.value)"
						:key="item.id"
					>
						<svg-icon slot="prefix" :icon-class="item.formIcon" class="form-icon" />
						<p>{{ item.formName }}</p>

						<el-tooltip effect="dark" content="查看提交数据" placement="right">
							<svg-icon @click.stop="toData(item.formKey)" class="see-more" icon-class="chart" />
						</el-tooltip>
					</div>
				</section>
			</template>
		</div>
	</div>
</template>

<script>
import { queryWorkflowFormListByUser } from '@/api/system/workflowForm'
export default {
	name: 'OAapproval',
	dicts: ['process_form_type'],
	data() {
		return {
			list: [],
		}
	},
	created() {},
	mounted() {
		// 查询用户所有可见的审批类型
		queryWorkflowFormListByUser({}).then((r) => {
			this.list = r.data
		})
	},
	methods: {
		// 给审批列表按照类型分类
		listFilter(type) {
			return this.list.filter((e) => {
				return e.processFormType == type
			})
		},
		//  发起流程
		toStartApproval(item) {
			this.$router.push({
				name: 'addApproval',
				query: {
					id: item.id,
				},
			})
		},
		// 查看审批数据
		toData(formKey) {
			this.$router.push({
				name: 'OAmyStart',
				query: {
					formKey,
				},
			})
		},
	},
}
</script>

<style scoped lang="scss">
.approval-row {
	display: flex;
	flex-wrap: wrap;
}
.approval-item {
	flex: 0 0 120px;
	padding: 20px;
	margin: 10px 40px 10px 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;
	cursor: pointer;
	background: #e4e4e4;
	border-radius: 20px;
	text-align: center;
	box-shadow: 5px 5px 10px #999;
	&:hover {
		transform: scale(1.1);
		transition: 0.2s;
		.see-more {
			display: block;
		}
	}
	p {
		white-space: nowrap;
		margin-bottom: 0;
		color: #333;
		color: #fff;
	}
	.form-icon {
		height: 50px;
		width: 50px;
		color: #fff;
	}
	.see-more {
		display: none;
		font-size: 16px;
		color: #fff;
		position: absolute;
		right: 10px;
		top: 10px;
	}
}
</style>
