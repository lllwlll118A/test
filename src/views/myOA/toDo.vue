<!--
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2022-07-21 10:11:45
 * @LastEditTime: 2022-09-28 10:32:15
 * @Description: TO DO
-->
<template>
	<div class="app-container">
		<el-form :model="queryParams" ref="queryForm" :inline="true">
			<el-form-item prop="formKey">
				<el-select v-model="queryParams.formKey" placeholder="请选择审批类型" clearable filterable size="small">
					<el-option
						v-for="(dict, i) in formList"
						:key="dict.formKey + i"
						:label="dict.formName"
						:value="dict.formKey"
					/>
				</el-select>
			</el-form-item>
			<el-form-item prop="processFormType">
				<dict-select
					placeholder="请选择表单类型"
					filterable
					clearable
					v-model="queryParams.processFormType"
					:options="dict.type.process_form_type"
				/>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" size="small" @click="getDataList(1)">搜索</el-button>
			</el-form-item>
		</el-form>
		<el-table border v-loading="loading" :data="dataList">
			<el-table-column label="编号" align="center" prop="id" />
			<el-table-column label="审批类型" align="center" prop="formName" />
			<el-table-column label="发起人" align="center" prop="startUserName" />
			<el-table-column label="审批标题" align="center" prop="summary" />
			<el-table-column label="当前审批节点" align="center" prop="currentTaskName" />
			<el-table-column label="状态" align="center" key="status" width="120">
				<template slot-scope="scope">
					<template v-for="(item, i) in $store.state.bizDict.workFlow.status">
						<el-tag
							:disable-transitions="true"
							:type="item.tag"
							:key="item.dictValue + i"
							v-if="scope.row.status == item.dictValue"
							>{{ item.dictName }}</el-tag
						>
					</template>
				</template>
			</el-table-column>
			<el-table-column label="发起时间" align="center" width="95" prop="startTime" />
			<el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
				<template slot-scope="scope">
					<el-button size="mini" type="text" @click="toApproval(scope.row)">审批</el-button>
					<el-button size="mini" type="text" @click="toApproval(scope.row, 'isRead')">查看</el-button>
				</template>
			</el-table-column>
		</el-table>

		<pagination
			v-show="total > 0"
			:total="total"
			:page.sync="queryParams.pageNum"
			:limit.sync="queryParams.pageSize"
			@pagination="getDataList"
		/>
	</div>
</template>

<script>
import { waitHandleTasks } from '@/api/OA/workflowTask'
import { queryWorkflowFormListByUser } from '@/api/system/workflowForm'

import pageMixin from '@/mixin/pagination'

export default {
	name: 'OAtoDo',
	mixins: [pageMixin],
	dicts: ['process_form_type'],
	data() {
		return {
			queryParams: {
				urlPageParam: true,
				processFormType: null,
			},
			formList: [],
		}
	},
	created() {
		queryWorkflowFormListByUser().then(({ data }) => {
			this.formList = data.map((e) => {
				return {
					formKey: e.formKey,
					formName: e.formName,
				}
			})
		})
	},
	methods: {
		queryPageReq: waitHandleTasks,
		toApproval(row, isRead) {
			let temp = isRead ? {} : { taskId: row.taskId }
			this.$router.push({
				name: 'approval',
				query: {
					id: row.id,
					...temp,
				},
			})
		},
	},
}
</script>

<style scoped lang="scss">
</style>
