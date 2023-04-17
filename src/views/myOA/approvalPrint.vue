<!--
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2022-08-29 14:48:17
 * @LastEditTime: 2023-01-13 16:42:01
 * @Description: 审批详情打印
-->
<template>
	<div class="wrapper">
		<div
			class="approval-tag"
			:class="{
				pass: pData.status == 3,
				reject: pData.status == 4,
				undo: pData.status == 5,
			}"
			v-if="pData.status && pData.status != 2"
		>
			<div class="inner-wrap">
				<div class="inner">
					<p>宏鹏审批</p>
					<span v-if="pData.status == 3">已通过</span>
					<span v-if="pData.status == 4">已拒绝</span>
					<span v-if="pData.status == 5">已撤销</span>
					<p>wqfinfac.com</p>
				</div>
			</div>
		</div>

		<el-descriptions class="margin-top" :title="pData.summary" :column="1" border size="mini">
			<template slot="extra">创建时间：{{ pData.createTime }} </template>
			<el-descriptions-item :label="item.label" :key="item.label + i" v-for="(item, i) in desList">
				<div v-if="Array.isArray(item.value)">
					<p v-for="k in item.value" :key="k.label">{{ k.label }} : {{ k.value }}</p>
				</div>
				<span v-else> {{ item.value }} </span>
			</el-descriptions-item>
			<el-descriptions-item label="附件">
				<p v-for="(file, i) in pData.files" :key="file.fileId">{{ i + 1 }}. {{ file.fileName }}</p>
			</el-descriptions-item>
			<el-descriptions-item label="审批流程">
				<div class="approval-list-row" v-for="item in approvalList" :key="item.id">
					{{ item.userTaskName }}
					{{ item.approverName }}
					<template v-if="item.approvalType">
						（{{ getDictNameByValue(item.approvalType, $store.state.bizDict.workFlow.approvalType) }}）
					</template>
					<span class="timestamp"> {{ item.approvalTime }} </span>
					<p class="opinion" v-if="item.opinion">{{ item.opinion }}</p>
					<template v-if="item.workflowCopyTasks && item.workflowCopyTasks.length > 0">
						<ul class="copy-task-wrap">
							<li :key="copyTask.id" v-for="(copyTask, i) in item.workflowCopyTasks">
								{{ i + 1 }}.
								<span> {{ copyTask.userName }}</span>
								<span style="color: #67c23a" v-if="copyTask.readFlag == 'Y'">
									已读 <span class="time">{{ copyTask.readTime }}</span>
								</span>
								<span style="color: #909399; margin-left: 10px" v-if="copyTask.readFlag == 'N'"
									>未读</span
								>
							</li>
						</ul>
					</template>
				</div>
			</el-descriptions-item>
		</el-descriptions>

		<div class="print-footer">
			<span>打印时间：{{ parseTime(new Date()) }}</span>
			<span>打印人：{{ $store.state.user.nickName }}</span>
		</div>
	</div>
</template>

<script>
import { getDictNameByValue } from '@/utils/ruoyi'
function handleField(filed) {
	var label = filed.__config__.label
	var opts = filed.__slot__?.options //下拉选框
	var value
	if (opts && opts.length > 0) {
		let foo = opts.find((e) => {
			return e.value == filed.__config__.defaultValue
		})
		value = foo?.label
	} else {
		let val = filed.__config__.defaultValue
		value = val
	}
	return {
		label,
		value,
	}
}
export default {
	name: 'ApprovalPrint',
	data() {
		return {
			// 审批流程记录由事件总线传播到本组件
			approvalList: [],
		}
	},
	props: {
		pData: {
			tyep: Object,
			default: () => {},
		},
	},
	computed: {
		desList() {
			if (!this.pData?.formJson?.fields) return []
			var temp = []
			this.pData.formJson.fields.forEach((filed) => {
				var label = filed.__config__.label
				// 一般情况有label
				if (label) {
					let obj = handleField(filed)
					temp.push(obj)
				} else {
					//tablelist没有label
					var title = filed.titleText
					filed.__config__.items.forEach((item, i) => {
						var arr = []
						item.forEach((e) => {
							arr.push(handleField(e))
						})
						temp.push({
							label: `${title}-${i + 1}`,
							value: arr,
						})
					})
				}
			})
			return temp
		},
	},
	created() {
		this.bus.$on('shareApprovalData', (v) => {
			console.log('shareApprovalData', v)
			this.approvalList = v
		})
	},
	methods: { getDictNameByValue },
	beforeDestroy() {
		this.bus.$off('shareApprovalData')
	},
}
</script>

<style scoped lang="scss">
p,
li {
	margin: 0;
}
ul {
	margin-top: 5px;
}
.wrapper {
	position: relative;
}
.opinion {
	margin-top: 5px;
	text-indent: 20px;
}
.approval-list-row {
	margin-bottom: 15px;
	&:last-of-type {
		margin: 0;
	}
	.timestamp {
		float: right;
	}
}
::v-deep .el-descriptions-item__label {
	width: 25%;
}
::v-deep .el-descriptions-item__cell {
	border-color: #333 !important;
}
.print-footer {
	font-size: 14px;
	text-align: right;
	span {
		display: inline-block;
		margin: 10px;
	}
}

$pass: #67c23a;
$undo: #e49723;
$reject: #eb1616;
.approval-tag {
	position: absolute;
	z-index: 1;
	right: 20px;
	top: 60px;
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
</style>
