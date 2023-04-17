<!--
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2022-07-21 10:11:45
 * @LastEditTime: 2022-09-28 10:24:00
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
					placeholder="请选择表单类型"
					clearable
					filterable
					v-model="queryParams.processFormType"
					:options="dict.type.process_form_type"
				/>
			</el-form-item>

			<el-form-item>
				<el-date-picker
					size="small"
					v-model="queryParams.startDateBegin"
					value-format="yyyy-MM-dd"
					type="date"
					placeholder="发起时间左区间"
				/>
				~
				<el-date-picker
					size="small"
					v-model="queryParams.startDateEnd"
					value-format="yyyy-MM-dd"
					type="date"
					placeholder="发起时间右区间"
				/>
			</el-form-item>

			<el-form-item>
				<el-date-picker
					size="small"
					v-model="queryParams.endDateBegin"
					value-format="yyyy-MM-dd"
					type="date"
					placeholder="完成时间左区间"
				/>
				~
				<el-date-picker
					size="small"
					v-model="queryParams.endDateEnd"
					value-format="yyyy-MM-dd"
					type="date"
					placeholder="完成时间右区间"
				/>
			</el-form-item>

			<el-form-item prop="status">
				<biz-dict-select placeholder="审批状态" v-model="queryParams.status" dictType="workFlow.status" />
			</el-form-item>

			<el-form-item>
				<el-button type="primary" icon="el-icon-search" size="small" @click="getDataList(1)">搜索</el-button>
			</el-form-item>

			<el-form-item>
				<download-excel
					:name="exportFileName"
					:fetch="fetchData"
					:fields="exportFields"
					:before-generate="startDownload"
					:before-finish="finishDownload"
				>
					<!-- header="标题" -->
					<el-button type="primary" size="small" icon="el-icon-download">导出excel</el-button>
				</download-excel>
			</el-form-item>
		</el-form>

		<el-table border v-loading="loading" :data="dataList">
			<el-table-column label="编号" align="center" prop="id" width="65" />
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
			<el-table-column label="完成时间" align="center" width="95" prop="endTime" />
			<el-table-column
				label="操作"
				fixed="right"
				align="center"
				width="70"
				class-name="small-padding fixed-width"
			>
				<template slot-scope="scope">
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
import { exportStartTasks, getStartTasks, completeApprovalTask } from '@/api/OA/workflowTask'
import { queryWorkflowFormListByUser } from '@/api/system/workflowForm'
import pageMixin from '@/mixin/pagination'
import BizDictSelect from '@/components/BizDictSelect'
import downloadExcel from '@/components/JsonExcel'

export default {
	name: 'OAallTask',
	mixins: [pageMixin],
	dicts: ['process_form_type'],
	components: { downloadExcel, BizDictSelect },
	data() {
		return {
			queryParams: {
				urlPageParam: true,
			},
			formList: [],
			exportFields: {},
			exportDataList: [],
			exportLoading: null,
			exportFileName: 'data.xls',
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
		queryPageReq: getStartTasks,
		startDownload() {},
		finishDownload() {
			this.exportLoading.close()
		},
		async fetchData() {
			if (!this.queryParams.formKey) {
				this.$message.warning('请选择审批类型')
				return
			}
			// 重新查一下列表，组装表头
			let { data } = await this.queryPageReq(this.queryParams)
			this.dataList = data.list
			this.total = parseInt(data.totalCount)
			this.dataListHandle(data.list)

			// 拼文件名
			let obj = this.formList.find((e) => {
				return e.formKey == this.queryParams.formKey
			})
			this.exportFileName = `${obj.formName} ${this.parseTime(new Date().getTime())}`

			console.log('文件名：', this.exportFileName)

			this.exportLoading = this.$loading({
				text: '正在导出请稍等...',
				background: 'rgba(0, 0, 0, 0.7)',
			})

			try {
				var response = await exportStartTasks({
					formKey: this.queryParams.formKey,
					processFormType: this.queryParams.processFormType,
					urlPageParam: true,
					status: this.queryParams.status,
				})
			} catch (error) {}

			this.exportLoading.close()

			// 组装list数据
			let temp = []
			response.data.forEach((e) => {
				let bar = this.$store.state.bizDict.workFlow.status.find((dict) => {
					return dict.dictValue == e.status
				})
				let tempObj = {
					id: e.id,
					formName: e.formName,
					startUserName: e.startUserName,
					summary: e.summary,
					currentTaskName: e.currentTaskName,
					status: bar.dictName,
					startTime: e.startTime,
				}
				let form = JSON.parse(e.formData) //表单config
				// console.log(tempObj, form)
				form.fields.forEach((filed) => {
					let key = filed.__vModel__ //字段名
					let opts = filed.__slot__?.options //下拉选框
					if (opts && opts.length > 0) {
						let foo = opts.find((e) => {
							return e.value == filed.__config__.defaultValue
						})
						tempObj[key] = foo?.label
					} else {
						let val = filed.__config__.defaultValue
						tempObj[key] = val
					}
				})
				temp.push(tempObj)
			})

			console.log(temp)

			return temp
		},
		// 将表格数据转换成excel导出需要的数据格式
		dataListHandle(dataList) {
			// 组装表头
			let formData = JSON.parse(dataList[0].formData)
			let obj = {}
			formData.fields.forEach((e) => {
				// 避免上下午的label没有填值
				if (e.__vModel__ == 'startDateAPM' && !e.__config__.label) {
					obj['开始日期上下午'] = e.__vModel__
				} else if (e.__vModel__ == 'endDateAPM' && !e.__config__.label) {
					obj['结束日期上下午'] = e.__vModel__
				} else {
					obj[e.__config__.label] = e.__vModel__
				}
			})
			const tableHeader = {
				编号: 'id',
				审批类型: 'formName',
				发起人: 'startUserName',
				审批标题: 'summary',
				当前审批节点: 'currentTaskName',
				状态: 'status',
				发起时间: 'startTime',
			}
			this.exportFields = {
				...tableHeader,
				...obj,
			}
			console.log('组装表头:', this.exportFields)
		},
		toApproval(row, isRead) {
			this.$router.push({
				name: 'approval',
				query: {
					id: row.id,
				},
			})
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
	},
}
</script>

<style scoped lang="scss">
</style>
