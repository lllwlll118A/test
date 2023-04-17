<!--
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2022-07-21 10:11:45
 * @LastEditTime: 2022-09-28 10:24:37
 * @Description: TO DO
-->
<template>
	<div class="app-container">
		<el-form :model="queryParams" ref="queryForm" :inline="true">
			<el-form-item prop="formKey">
				<el-select filterable v-model="queryParams.formKey" placeholder="请选择审批类型" clearable size="small">
					<el-option
						v-for="dict in formList"
						:key="dict.formKey"
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
			<el-table-column label="编号" align="center" prop="formDataId" />
			<el-table-column label="审批类型" align="center" prop="formName" />
			<el-table-column label="审批标题" align="center" prop="summary" />
			<el-table-column label="是否已读" align="center" key="readFlag">
				<template slot-scope="scope">
					<el-tag type="success" v-if="scope.row.readFlag == 'Y'">已读</el-tag>
					<el-tag type="info" v-if="scope.row.readFlag == 'N'">未读</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="抄送时间" align="center" prop="copyTime" width="95" />
			<el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
				<template slot-scope="scope">
					<el-button size="mini" type="text" @click="toApproval(scope.row)">查看</el-button>
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
import { copyToMeTasks, updateCopyTask } from '@/api/OA/workflowTask'
import { queryWorkflowFormListByUser } from '@/api/system/workflowForm'

import pageMixin from '@/mixin/pagination'

export default {
	name: 'OAcopyToMe',
	mixins: [pageMixin],
	dicts: ['process_form_type'],
	data() {
		return {
			queryParams: {
				urlPageParam: true,
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
		queryPageReq: copyToMeTasks,
		toApproval(row) {
			updateCopyTask({ id: row.id }).then((r) => {})
			this.$router.push({
				name: 'approval',
				query: {
					id: row.formDataId,
				},
			})
		},
	},
}
</script>




