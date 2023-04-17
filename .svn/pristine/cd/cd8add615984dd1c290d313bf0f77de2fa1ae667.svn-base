<!--
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2022-09-19 10:00:30
 * @LastEditTime: 2022-09-27 17:46:39
 * @Description: TO DO
-->
<template>
	<el-timeline style="padding-top: 30px; background: #f5f7fa">
		<el-timeline-item
			v-for="item in listData"
			:hide-timestamp="true"
			:key="item.id"
			:timestamp="item.approvalTime"
			:type="item.approvalType ? TYPES[item.approvalType].type : ''"
			:icon="item.approvalType ? TYPES[item.approvalType].icon : ''"
			placement="top"
		>
			<div class="approval-item">
				<p>
					<span>{{ item.userTaskName }}</span>
					<span class="time">{{ item.approvalTime }}</span>
				</p>
				<h4 class="user-name">
					<!-- {{ item.approverName }} -->
					{{ item.roleName }}

					<template v-if="item.approvalType">
						（{{ getDictNameByValue(item.approvalType, $store.state.bizDict.workFlow.approvalType) }}）
					</template>
				</h4>
				<!-- <p class="user-task-name">{{ item.userTaskName }}</p> -->
				<p class="approval-opinion" v-if="item.opinion">{{ item.opinion }}</p>

				<template v-if="item.workflowCopyTasks && item.workflowCopyTasks.length > 0">
					<ul class="copy-task-wrap">
						<li :key="copyTask.id" v-for="(copyTask, i) in item.workflowCopyTasks">
							{{ i + 1 }}.
							<span> {{ copyTask.userName }}</span>
							<span style="color: #67c23a" v-if="copyTask.readFlag == 'Y'">
								已读 <span class="time">{{ copyTask.readTime }}</span>
							</span>
							<span style="color: #909399" v-if="copyTask.readFlag == 'N'">未读</span>
						</li>
					</ul>
				</template>
			</div>
		</el-timeline-item>
	</el-timeline>
</template>

<script>
import { getDictNameByValue } from '@/utils/ruoyi'

const TYPES = {
	1: {
		type: 'success',
		icon: 'el-icon-check',
	},
	2: {
		type: 'danger',
		icon: 'el-icon-close',
	},
	3: {
		type: 'warning',
		icon: 'el-icon-refresh-left',
	},
	4: {
		type: 'primary',
		icon: 'el-icon-more',
	},
	5: {
		type: '',
		icon: '',
	},
	6: {
		type: '',
		icon: '',
	},
}

export default {
	name: 'ApprovalList',
	props: {
		listData: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			TYPES,
			approvalList: [],
		}
	},
	computed: {},
	created() {},
	mounted() {},
	watch: {},
	methods: {
		getDictNameByValue,
	},
	components: {},
}
</script>

<style scoped lang="scss">
.approval-item {
	margin-right: 30px;
	h4,
	p {
		margin: 0;
		line-height: 1.5em;
	}
	.user-name {
		margin: 5px 0;
		font-weight: bold;
		font-size: 16px;
		color: #333;
	}
	.user-task-name {
		margin: 5px 0;
	}
	.approval-opinion {
		padding: 10px;
		border-radius: 5px;
		background: #e7e5eb;
	}
	.time {
		color: #909399;
		line-height: 1.5em;
		font-size: 13px;
		display: inline-block;
		margin-left: 10px;
	}
	.copy-task-wrap {
		list-style: none;
		padding: 10px;
		border-radius: 5px;
		background: #dee3ee;
		span {
			margin-right: 5px;
		}
	}
}
</style>
