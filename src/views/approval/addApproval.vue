<!--
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2022-06-16 14:41:18
 * @LastEditTime: 2022-12-22 11:25:28
 * @Description: 新增审批
-->
<template>
	<div class="app-container" v-loading="loading">
		<form-parser
			:key="key"
			:form-conf="formJson"
			@submit="sumbitForm"
			@newConf="getNewConf"
			v-if="formJson"
			ref="formParser"
		/>
	</div>
</template>

<script>
// 部门绑定的值
const DEPTID = 'wqjbUserDeptId'
import { addAndStartProcess, tempSaveWorkflowFormData, queryDraftWorkflowFormData } from '@/api/system/workflowForm'
import FormParser from '@/components/parser'
import FileUpload from '@/components/FileUpload'
import { mapState } from 'vuex'

export default {
	name: 'addApproval',
	components: {
		FormParser,
		FileUpload,
	},
	computed: mapState({
		depts: (state) => state.user.depts,
		userId: (state) => state.user.userId,
	}),
	data() {
		return {
			key: +new Date(),
			loading: true,
			formJson: null,
			// 参数对象，可以直接从详情接口获取的字段
			paramObj: {
				formKey: '',
				formName: '',
				processFormType: '',
				formId: '',
				id: '',
			},
			dialogVisible: false,
		}
	},
	created() {
		this.init()
	},
	methods: {
		getNewConf(conf) {
			console.log('接收到了：', conf)
			this.formJson = conf
			this.key = +new Date()
		},
		async init() {
			try {
				let { data } = await queryDraftWorkflowFormData({
					formId: this.$route.query.id,
					startUserId: this.userId,
				})
				this.loading = false
				// // 如果有暂存的数据取暂存数据，否则取json
				var json = data.formData
					? data.formData.replace(/[\\\/\b\f\n\r\t]/g, '')
					: data.formJson.replace(/[\\\/\b\f\n\r\t]/g, '')
				this.formJson = JSON.parse(json)
				this.formJson.formKey = data.formKey
				this.formJson.files = data.attachments //回显附件
				for (const key in this.paramObj) {
					this.paramObj[key] = data[key]
				}
			} catch (error) {
				console.log(error)
			}
		},
		async sumbitForm(form) {
			console.log(form)
			let temp = this.paramObj
			temp.attachments = form.attachments
			delete form.attachments
			temp.applyVars = form
			let json = this.$refs.formParser.getDefaultValJson()
			temp.formData = JSON.stringify(json)
			temp.startDeptId = form[DEPTID] || this.depts[0]?.deptId
			this.dialogVisible = false
			this.loading = true
			try {
				if (form.tempSave) {
					var { data } = await tempSaveWorkflowFormData(temp)
					this.loading = false
					this.$message.success('保存成功')
				} else {
					var { data } = await addAndStartProcess(temp)
					this.loading = false
					this.$message.success('提交成功')
					this.closeCurrentTag()
					this.toPage('approval', { id: data, isRead: 1 })
				}
			} catch (error) {
				console.log(error)
			}
		},
	},
}
</script>

<style scoped lang="scss">
.app-container {
	max-width: 800px;
	min-height: 500px;
}
::v-deep .search-form {
	.el-col:last-of-type {
		.el-form-item__content {
			text-align: right;
			color: #4b4a4a;
		}
	}
}
</style>
