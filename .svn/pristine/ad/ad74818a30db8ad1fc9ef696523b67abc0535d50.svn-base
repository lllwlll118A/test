<!--
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2022-07-21 10:11:45
 * @LastEditTime: 2022-09-22 10:37:56
 * @Description: TO DO
-->
<template>
	<div class="app-container">
		<el-form :model="queryParams" ref="queryForm" :inline="true">
			<el-form-item prop="formKey">
				<el-select filterable v-model="queryParams.formKey" placeholder="请选择审批类型" clearable size="small">
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
					filterable
					placeholder="请选择表单类型"
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
					<el-button size="mini" type="text" @click="toApproval(scope.row)">查看</el-button>
					<el-button size="mini" type="text" @click="undo(scope.row)" v-if="scope.row.status == 2"
						>撤销</el-button
					>
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
import { myStartTasks, completeApprovalTask } from '@/api/OA/workflowTask'
import { queryWorkflowFormListByUser } from '@/api/system/workflowForm'
import pageMixin from '@/mixin/pagination'

export default {
	name: 'OAmyStart',
	mixins: [pageMixin],
	dicts: ['process_form_type'],
	data() {
		return {
			queryParams: {
				urlPageParam: true,
				formKey: '',
				processFormType: '',
			},
			formList: [],
			exportFields: {},
			exportDataList: [],
			exportLoading: null,
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
		queryPageReq: myStartTasks,
		toApproval(row) {
			this.toPage('approval', { id: row.id, taskId: row.taskId, isRead: 1 })
		},
		undo(row) {
			this.$confirm(`确认撤销编号为${row.id}的审批流程？`, `提示`)
				.then((_) => {
					completeApprovalTask({
						id: row.id,
						choose: 'cancel',
					}).then((r) => {
						this.$message.success('撤销成功')
						this.getDataList(1)
					})
				})
				.catch((_) => {})
		},
		beforeGetDataList() {
			let formKey = this.$route.query.formKey
			if (formKey) {
				this.queryParams.formKey = formKey
				this.$router.replace({
					name: 'OAmyStart',
				})
			}
		},
	},
}
</script>

<style scoped lang="scss">
</style>
