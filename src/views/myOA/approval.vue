<!--
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2022-07-21 14:42:06
 * @LastEditTime: 2022-09-28 11:39:01
 * @Description: 用户审批页面
-->
<template>
	<div class="app-container" v-loading="loading">
		<el-link class="print-button" :underline="false" icon="el-icon-printer" v-print="printObj">打印</el-link>

		<section class="base-info">
			<h3>{{ summary }}</h3>
			<p>
				发起时间：<span> {{ createTime }}</span>
			</p>
			<p v-if="status == 2" style="color: #409eff">
				当前审批节点：<span> {{ currentTaskName }}</span>
			</p>

			<p class="approval-pass" v-if="status == 3">审批通过</p>
			<p class="approval-reject" v-if="status == 4">已拒绝</p>
			<p class="approval-undo" v-if="status == 5">已撤销</p>

			<div
				class="approval-tag"
				:class="{
					pass: status == 3,
					reject: status == 4,
					undo: status == 5,
				}"
				v-if="status && status != 2"
			>
				<div class="inner-wrap">
					<div class="inner">
						<p>宏鹏审批</p>
						<span v-if="status == 3">已通过</span>
						<span v-if="status == 4">已拒绝</span>
						<span v-if="status == 5">已撤销</span>
						<p>wqfinfac.com</p>
					</div>
				</div>
			</div>
		</section>

		<el-divider />

		<form-parser
			readonly
			v-if="formJson"
			:startUserDeptId="startUserDeptId"
			:approvalParam="approvalParam"
			:form-conf="formJson"
			:renderBtn="false"
			ref="formParser"
		>
			<!-- 1-草稿 2-审批中 3-审批通过 4-审批拒绝 5-已撤销', -->
			<el-form v-if="isApproval">
				<el-form-item label="审批意见" exclude="true">
					<el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="opinion" />
				</el-form-item>
				<footer style="margin-left: 140px">
					<el-button type="primary" @click="submit('agree')"> 同意 </el-button>
					<el-button type="danger" @click="submit('refuse')"> 拒绝 </el-button>
					<el-button v-if="status == '2'" @click="transferTask()"> 转交</el-button>
				</footer>
			</el-form>
		</form-parser>

		<section style="display: none">
			<approval-print
				:pData="{
					createTime,
					summary,
					status,
					formJson,
					files,
				}"
				id="printArea"
			/>
		</section>
		<el-dialog :visible.sync="transferVisible" title="转交任务" append-to-body>
			<el-form :model="transferForm" ref="transferForm" :rules="transferFormRules">
				<el-form-item label="转交给" prop="userId">
					<el-select filterable v-model="transferForm.userId">
						<el-option
							v-for="item in transferUserList"
							:key="item.userId"
							:label="item.nickName"
							:value="item.userId"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="审批意见" prop="approvalOpinion">
					<el-input type="textarea" v-model="transferForm.approvalOpinion" maxlength="500"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="transferVisible = false">取 消</el-button>
				<el-button size="small" type="primary" @click="turnTask()">保 存</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { getDictNameByValue } from '@/utils/ruoyi'
import BpmnViewer from '@/components/BpmnViewer'
import FormParser from '@/components/parser'
import { queryWorkflowFormData } from '@/api/system/workflowForm'
import { completeApprovalTask, turnTask } from '@/api/OA/workflowTask'
import { staffList } from '@/api/system/user'
import print from '@/directive/print'
import ApprovalPrint from './approvalPrint.vue'
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
}

export default {
	name: 'approval',
	directives: {
		print,
	},
	components: {
		FormParser,
		BpmnViewer,
		ApprovalPrint,
	},
	computed: {
		// 判断是否显示审批按钮
		isApproval() {
			return !!this.taskId
		},
	},
	data() {
		return {
			taskId: '',
			id: '',
			transferVisible: false,
			transferForm: { approvalOpinion: '', userId: '', taskId: '' },
			transferFormRules: {
				userId: [{ required: true, trigger: 'change', message: '请选择任务接收人' }],
				approvalOpinion: [{ required: true, trigger: 'change', message: '请输入审批意见' }],
			},
			transferUserList: [],
			summary: '',
			status: '',
			createTime: '',
			currentTaskName: '',
			loading: true,
			formJson: null,
			files: [],
			opinion: '',
			TYPES,
			approvalParam: {},
			startUserDeptId: '', //发起人部门id，审批详情查询审批流程要用
			printObj: {
				id: 'printArea',
				popTitle: '打印时间',
				beforeOpenCallback(vue) {
					vue.printLoading = true
					console.log('打开之前')
				},
				openCallback(vue) {
					vue.printLoading = false
					console.log('执行了打印')
				},
				closeCallback(vue) {
					console.log('关闭了打印工具')
				},
			},
		}
	},
	created() {
		this.taskId = this.$route.query.taskId
		this.id = this.$route.query.id
		let activityId = this.$route.query.activityId

		queryWorkflowFormData({
			id: this.$route.query.id,
			activityId,
		})
			.then(({ data }) => {
				this.loading = false
				let json = data.formData.replace(/[\\\/\b\f\n\r\t]/g, '')
				this.startUserDeptId = data.startDeptId
				this.formJson = JSON.parse(json)
				this.formJson.files = data.attachments //回显附件
				this.files = data.attachments
				this.createTime = data.createTime
				this.currentTaskName = data.currentTaskName
				this.summary = data.summary
				this.status = data.status
				this.approvalParam = {
					id: data.id,
					status: data.status,
					processInstanceId: data.processInstanceId,
				}
				for (const key in this.paramObj) {
					this.paramObj[key] = data[key]
				}
				// 接口返回有taskId才赋值，没有就取链接的
				if (data.taskId) this.taskId = data.taskId
			})
			.catch((err) => {
				this.loading = false
			})
	},
	methods: {
		getDictNameByValue,
		submit(choose) {
			if (choose == 'refuse' && !this.opinion) {
				this.$message.warning('请输入审批意见')
				return
			}
			this.loading = true
			completeApprovalTask({
				id: this.$route.query.id,
				taskId: this.$route.query.taskId,
				choose,
				approvalOpinion: this.opinion,
			})
				.then((r) => {
					this.$message.success('审批已提交')
					this.closeCurrentTag()
					this.loading = false
				})
				.catch((err) => {
					this.loading = false
				})
		},
		onPrint() {
			console.log('print')
			this.printObj = {}
		},
		listTransferUser() {
			let curUserId = this.$store.state.user.userId
			console.log('curUserId:', curUserId)
			staffList({}).then((res) => {
				this.transferUserList = res.data.filter((itm) => {
					return itm.userId != curUserId
				})
			})
		},
		transferTask() {
			this.transferForm = { approvalOpinion: '', userId: '', taskId: '' }
			this.transferVisible = true
			this.listTransferUser()
		},
		turnTask() {
			this.transferForm.taskId = this.taskId
			this.transferForm.id = this.id
			this.$refs['transferForm'].validate((valid) => {
				if (!valid) return false
				turnTask(this.transferForm).then((res) => {
					if (res.code == 200) {
						this.$message.success('转交成功')
						this.transferVisible = false
						this.toPage('首页', {}, true)
					}
				})
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.app-container {
	position: relative;
	max-width: 800px;
	.print-button {
		position: absolute;
		z-index: 1;
		right: 20px;
	}
}
h3 {
	margin: 0;
	font-weight: bold;
}
.base-info {
	position: relative;
	font-size: 14px;
	margin-bottom: 20px;
	p {
		margin: 10px 0;
	}
}

$pass: #67c23a;
$undo: #e49723;
$reject: #eb1616;
.approval-pass {
	color: $pass;
}
.approval-undo {
	color: $undo;
}
.approval-reject {
	color: $reject;
}

.approval-tag {
	position: absolute;
	z-index: 1;
	right: 20px;
	bottom: -70px;
}

$tagColor: #333;
.approval-tag {
	opacity: 0.5;
	width: 100px;
	height: 100px;
	padding: 11px;
	border: 4px solid $tagColor;
	border-radius: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	transform: rotate(-30deg);
	&.pass,
	&.pass .inner-wrap {
		border-color: $pass;
	}
	&.pass .inner {
		color: $pass;
	}
	&.undo,
	&.undo .inner-wrap {
		border-color: $undo;
	}
	&.undo .inner {
		color: $undo;
	}
	&.reject,
	&.reject .inner-wrap {
		border-color: $reject;
	}
	&.reject .inner {
		color: $reject;
	}
	.inner-wrap {
		border: 2px solid $tagColor;
		border-radius: 100px;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.inner {
		color: $tagColor;
		background: #fff;
		span {
			display: block;
			font-weight: bold;
			font-size: 22px;
		}
		p {
			margin: 0;
			white-space: nowrap;
			font-size: 12px;
			transform: scale(0.7);
		}
	}
}

// 打印样式
@page {
	size: A4 portrait; /*  */
	// margin: 3.7cm 2.6cm 3.5cm; /* 国家标准公文页边距 GB/T 9704-2012 */
	margin: 1.8cm 1.3cm 3.5cm;
}
</style>

