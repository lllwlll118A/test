<!--
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2022-07-26 10:08:58
 * @LastEditTime: 2022-08-05 14:57:32
 * @Description: TO DO
-->
<template>
	<el-dialog title="可见范围" :visible.sync="open" width="700px" append-to-body>
		<div style="display: flex; justify-content: center">
			<el-transfer
				v-if="open"
				filterable
				:filter-method="filterMethod"
				filter-placeholder="请输入"
				v-model="ids"
				:props="{
					key: 'userId',
					label: 'nickName',
				}"
				:data="userList"
			/>
		</div>

		<span slot="footer" class="dialog-footer">
			<el-button size="small" @click="open = false">取 消</el-button>
			<el-button size="small" type="primary" @click="submit">保 存</el-button>
		</span>
	</el-dialog>
</template>

<script>
import { listUser } from '@/api/system/user'
import { queryWorkflowFormUsers, updateWorkflowFormUser } from '@/api/system/workflowForm'

export default {
	name: 'userSelect',
	data() {
		return {
			userList: [],
			ids: [],
			open: false,
			filterMethod(query, item) {
				return item.nickName.indexOf(query) > -1
			},
		}
	},
	created() {
		listUser({ pageSize: 9999 }).then(({ data }) => {
			this.userList = data.list
		})
	},
	methods: {
		submit() {
			updateWorkflowFormUser({
				formId: this.formId,
				userIds: this.ids,
			}).then(({ data }) => {
				this.$message.success('操作成功')
				this.open = false
				this.$emit('succ')
			})
		},
		init(formId) {
			this.ids = []
			this.formId = formId
			this.open = true
			queryWorkflowFormUsers({ formId }).then(({ data }) => {
				this.ids = data.reduce((pre, cur) => pre.concat(cur.userId), [])
			})
		},
	},
}
</script>

<style scoped lang="scss">
</style>
