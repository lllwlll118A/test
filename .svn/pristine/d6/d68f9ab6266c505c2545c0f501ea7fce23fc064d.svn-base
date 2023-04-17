<script>
import { deepClone } from '@/utils/index'
import render from '@/components/render/render.js'
import FileUpload from '@/components/FileUpload'
import ApprovalList from '@/views/components/approvalList'
import { calcWorkDays } from '@/api/common'
import { queryApprovalOpinionAndPreview } from '@/api/system/workflowForm'
import { mapState } from 'vuex'

// 部门绑定的值
const DEPTID = 'wqjbUserDeptId'

/** 生成表单时 页面参数的字段名 */
const STARTDATE = 'startDate' //开始日期
const STARTAPM = 'startDateAPM' //结束日期
const ENDDATE = 'endDate' //开始日期上午下午
const ENDAPM = 'endDateAPM' //结束日期上午下午
const DAYSCOUNT = 'daysCount' //天数
const TAKEOFFTYPE = 'takeOffType' //请假类型

const ruleTrigger = {
	'el-input': 'blur',
	'el-input-number': 'blur',
	'el-select': 'change',
	'el-radio-group': 'change',
	'el-checkbox-group': 'change',
	'el-cascader': 'change',
	'el-time-picker': 'change',
	'el-date-picker': 'change',
	'el-rate': 'change',
}

const layouts = {
	colFormItem(h, scheme) {
		const config = scheme.__config__
		const listeners = buildListeners.call(this, scheme)

		let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null
		if (config.showLabel === false) labelWidth = '0'
		return (
			<el-col span={config.span}>
				<el-form-item
					label-width={labelWidth}
					prop={scheme.__vModel__}
					label={config.showLabel ? config.label : ''}
				>
					<render conf={scheme} on={listeners} />
				</el-form-item>
			</el-col>
		)
	},
	rowFormItem(h, scheme) {
		let child = renderChildren.apply(this, arguments)
		if (scheme.type === 'flex') {
			child = (
				<el-row type={scheme.type} justify={scheme.justify} align={scheme.align}>
					{child}
				</el-row>
			)
		}
		return (
			<el-col span={scheme.span}>
				<el-row gutter={scheme.gutter}>{child}</el-row>
			</el-col>
		)
	},
	tableList(h, scheme) {
		let child = renderItems.apply(this, arguments)

		if (scheme.type === 'flex') {
			child = (
				<el-row type={scheme.type} justify={scheme.justify} align={scheme.align}>
					<el-divider content-position="left">{scheme.titleText}</el-divider>
					{child}
					<div class="btn-row">
						<el-button
							type="text"
							onClick={() => {
								this.addTableListItem(scheme)
							}}
						>
							{scheme.buttonText}
						</el-button>
					</div>
				</el-row>
			)
		}
		return (
			<el-col span={scheme.span}>
				<el-divider content-position="left">{scheme.titleText}</el-divider>
				<el-row gutter={scheme.gutter}>{child}</el-row>
				<div class="btn-row">
					<el-button
						type="text"
						onClick={() => {
							this.addTableListItem(scheme)
						}}
					>
						{scheme.buttonText}
					</el-button>
				</div>
			</el-col>
		)
	},
}

function renderFrom(h) {
	let { formConfCopy } = this

	return (
		<el-row detailread={this.readonly} gutter={formConfCopy.gutter} class="form-parser-wrap">
			<el-form
				size={formConfCopy.size}
				label-position={formConfCopy.labelPosition}
				disabled={this.readonly || formConfCopy.disabled}
				label-width={`${formConfCopy.labelWidth}px`}
				ref={formConfCopy.formRef}
				// model不能直接赋值 https://github.com/vuejs/jsx/issues/49#issuecomment-472013664
				props={{ model: this[formConfCopy.formModel] }}
				rules={this[formConfCopy.formRules]}
			>
				{renderFormItem.call(this, h, formConfCopy.fields)}

				<el-col>
					<el-form-item label="附件上传">
						<file-upload v-model={this.formConfCopy.files} />
					</el-form-item>
				</el-col>

				<el-col v-show={this.approvalListData.length > 0}>
					<el-form-item label="审批流程">
						<approval-list listData={this.approvalListData} />
					</el-form-item>
				</el-col>

				{this.$slots.default}
				{this.renderBtn && formConfCopy.formBtns && formBtns.call(this, h)}
			</el-form>
		</el-row>
	)

	// 	<el-col>
	// 	<el-form-item label="选择部门" class="is-required">
	// 		<el-select
	// 			style="width: 100%"
	// 			v-model={this.startDeptId}
	// 			placeholder="请选择部门"
	// 			size="small"
	// 			clearable
	// 		>
	// 			{this.depts.map((dept) => {
	// 				return <el-option key={dept.deptId} label={dept.deptName} value={dept.deptId} />
	// 			})}
	// 		</el-select>
	// 	</el-form-item>
	// </el-col>
}

function formBtns(h) {
	return (
		<el-col>
			<el-form-item>
				<el-button onClick={this.approvalListPreview}>预览审批流程</el-button>
				<el-button onClick={(event) => this.submitForm(event, 1)}>暂存</el-button>
				<el-button type="primary" onClick={this.submitForm}>
					提交
				</el-button>
				{true ? '' : <el-button onClick={this.resetForm}>重置</el-button>}
			</el-form-item>
		</el-col>
	)
}

function renderFormItem(h, elementList) {
	return elementList.map((scheme, index) => {
		const config = scheme.__config__
		const layout = layouts[config.layout]

		if (layout) {
			return layout.call(this, h, scheme, index)
		}
		throw new Error(`没有与${config.layout}匹配的layout`)
	})
}

function renderChildren(h, scheme) {
	const config = scheme.__config__
	if (!Array.isArray(config.children)) return null
	return renderFormItem.call(this, h, config.children)
}

function renderItems(h, scheme) {
	console.log(scheme)
	return scheme.__config__.items.map((item, i) => {
		let temp = renderFormItem.call(this, h, item)
		return (
			<div>
				<p class="table-list-item-title">{`${scheme.titleText}-${i + 1}`}</p>
				{scheme.__config__.items.length > 1 ? (
					<span
						class="del-btn"
						onClick={() => {
							this.delTableListItem(scheme, i)
						}}
					>
						删除
					</span>
				) : (
					''
				)}

				{temp}
			</div>
		)
	})
}

function setValue(event, config, scheme) {
	this.$set(config, 'defaultValue', event)
	this.$set(this[this.formConf.formModel], scheme.__vModel__, event)
}

function buildListeners(scheme) {
	const config = scheme.__config__
	// const methods = this.formConf.__methods__ || {}
	const methods = this.formConfCopy.__methods__ || {}
	const listeners = {}

	// 给__methods__中的方法绑定this和event
	Object.keys(methods).forEach((key) => {
		listeners[key] = (event) => methods[key].call(this, event)
	})
	// 响应 render.js 中的 vModel $emit('input', val)
	listeners.input = (event) => setValue.call(this, event, config, scheme)

	return listeners
}

export default {
	components: {
		render,
		FileUpload,
		ApprovalList,
	},
	computed: mapState({
		userId: (state) => state.user.userId,
		depts: (state) => state.user.depts,
	}),
	props: {
		formConf: {
			type: Object,
			required: true,
		},
		renderBtn: {
			type: Boolean,
			default: () => {
				return true
			},
		},
		readonly: {
			type: Boolean,
			default: () => {
				return false
			},
		},
		// 查询审批流程的参数
		approvalParam: {
			type: Object,
			default: () => {},
		},
	},
	data() {
		const data = {
			formConfCopy: this.cloneFormConf(),
			[this.formConf.formModel]: {},
			[this.formConf.formRules]: {},
			approvalListData: [], //展示审批流程数据list
			idGlobal: this.formConf.idGlobal,
		}
		this.initFormData(data.formConfCopy, data[this.formConf.formModel])
		this.buildRules(data.formConfCopy.fields, data[this.formConf.formRules])
		return data
	},
	methods: {
		// 处理类似实习生的用户属于多个部门的情况，添加一个部门选择下拉框
		cloneFormConf() {
			// 检查当前formConf 中是否已经添加了该field ,避免计算日期后刷新表单重复添加
			let f = this.formConf.fields.find((e) => {
				return e.__vModel__ == DEPTID
			})

			if (!this.readonly && this.$store.state.user.depts.length > 1 && !f) {
				// 给页面添加部门下拉选框
				let opts = []
				this.$store.state.user.depts.forEach((e) => {
					opts.push({
						label: e.deptName,
						value: e.deptId,
					})
				})

				let temp = deepClone(this.formConf)
				temp.fields = [
					{
						__config__: {
							label: '选择部门',
							layout: 'colFormItem',
							required: true,
							showLabel: true,
							tag: 'el-select',
							tagIcon: 'select',
							regList: [],
							renderKey: new Date().getTime(),
						},
						__slot__: {
							options: opts,
						},
						__vModel__: DEPTID,
						clearable: true,
						placeholder: '请选择发起审批所属部门',
					},
					...temp.fields,
				]

				return temp
			} else {
				return deepClone(this.formConf)
			}
		},
		initFormData(conf, formData) {
			console.log('initFormData', conf, formData)
			conf.__methods__ = conf.__methods__ || {}
			let componentList = conf.fields || conf

			// 请假的form在初始化数据时添加请假天数的绑定值
			let temp = []
			componentList.forEach((cur) => {
				console.log('cur', cur)
				temp.push(cur.__vModel__)
				const config = cur.__config__
				if (config.tag == 'tableList' && !config.items) {
					config.items = [config.children]
				}

				if (config.items?.length > 0) {
					config.items.forEach((children) => {
						this.initFormData(children, formData)
					})
				} else {
					if (cur.__vModel__) formData[cur.__vModel__] = config.defaultValue
				}
				// 给开始，结束日期组件绑定事件
				let arr = [STARTDATE, STARTAPM, ENDDATE, ENDAPM, TAKEOFFTYPE]
				if (arr.includes(cur.__vModel__)) {
					Object.assign(cur, { on: { change: 'calcDate' } })
				}
			})

			//定义方法
			if (temp.includes(STARTDATE) && temp.includes(ENDDATE)) {
				conf.__methods__.calcDate = () => {
					let {
						[TAKEOFFTYPE]: leaveKey,
						[STARTDATE]: startDate,
						[ENDDATE]: endDate,
						[STARTAPM]: startTime,
						[ENDAPM]: endTime,
					} = formData
					// 请假里的请假类型必须传,其他计算日期差的传formkey
					let f = true
					if (formData.hasOwnProperty(TAKEOFFTYPE)) f = !!leaveKey
					if (startDate && endDate && f) {
						calcWorkDays({
							leaveKey,
							startDate,
							endDate,
							startTime,
							endTime,
							formKey: conf.formKey,
						}).then(({ data }) => {
							// 回显请假时长
							conf.fields.forEach((item) => {
								if (item.__vModel__ == DAYSCOUNT) item.__config__.defaultValue = data
							})
							// ！待解决   附件和审批流程预览重新渲染后没了
							this.$emit('newConf', deepClone(conf))
						})
					}
				}
			}
		},
		buildRules(componentList, rules) {
			componentList.forEach((cur) => {
				const config = cur.__config__

				if (Array.isArray(config.regList)) {
					if (config.required) {
						const required = { required: config.required, message: cur.placeholder }
						if (Array.isArray(config.defaultValue)) {
							required.type = 'array'
							required.message = `请至少选择一个${config.label}`
						}
						required.message === undefined && (required.message = `${config.label}不能为空`)
						config.regList.push(required)
					}
					rules[cur.__vModel__] = config.regList.map((item) => {
						item.pattern && (item.pattern = eval(item.pattern))
						item.trigger = ruleTrigger && ruleTrigger[config.tag]
						return item
					})
				}
				// 处理明细表格
				if (config.tag == 'tableList') {
					if (config.items?.length > 0) {
						config.items.forEach((children) => {
							this.buildRules(children, rules)
						})
					}
				} else {
					if (config.children) this.buildRules(config.children, rules)
				}
			})
		},
		resetForm() {
			this.formConfCopy = deepClone(this.formConf)
			this.$refs[this.formConf.formRef].resetFields()
		},
		submitForm(event, f) {
			this.$refs[this.formConf.formRef].validate((valid) => {
				if (!valid) return false

				if (this.formData.hasOwnProperty(STARTDATE) && this.formData.hasOwnProperty(ENDDATE)) {
					if (new Date(this.formData[STARTDATE]).getTime() > new Date(this.formData[ENDDATE]).getTime())
						return this.$message.info('开始日期不得晚于结束日期')
				}

				// 触发sumit事件
				this.$emit('submit', {
					...this[this.formConf.formModel],
					attachments: this.formConfCopy.files,
					tempSave: f,
				})
			})
		},
		// 将表单数据放入 formConf
		getDefaultValJson() {
			let temp = deepClone(this.formConfCopy)
			temp.fields.forEach((e) => {
				e.__config__.defaultValue = this.formData[e.__vModel__]
			})
			return temp
		},
		// 计算日期差
		calcDate() {
			if (this.start_date && this.end_date) {
				calcWorkDays(this.start_date, this.end_date).then((r) => {
					console.log(r)
				})
			}
		},
		// 预览审批流程
		approvalListPreview() {
			this.$refs[this.formConf.formRef].validate((valid) => {
				if (!valid) return false
				queryApprovalOpinionAndPreview({
					//固定参数由组件组装，其余参数根据需要从外面传入
					...this.approvalParam,
					startUserId: this.userId,
					/* 预览审批流程的startDeptId参数是流程发起者的部门id
                       优先取从组建上传进来的deptId(查看页面), 新增页面没有这个属性， 只要取页面上选择的deptId 或者 发起人用户的第一个id
					 */
					startDeptId: this.$attrs?.startUserDeptId || this.formData[DEPTID] || this.depts[0].deptId,
					applyVars: this.formData,
					formKey: this.formConf.formKey,
				}).then(({ data }) => {
					this.approvalListData = data.workflowApprovalOpinions
					// 共享审批流程数据给打印组件
					this.bus.$emit('shareApprovalData', data.workflowApprovalOpinions)
				})
			})
		},
		// 添加明细表格
		addTableListItem(scheme) {
			let newConf = deepClone(this.formConfCopy) // 要更新的conf

			let comp = this.cloneComponent(deepClone(scheme))
			let temp = comp.__config__.children //要新增的conf

			newConf.fields.forEach((field, i) => {
				if (field.__config__.renderKey == scheme.__config__.renderKey) {
					field.__config__.items.push(temp)
					newConf.idGlobal = this.idGlobal
					return this.$emit('newConf', newConf)
				}
			})
		},
		// 删除明细表格
		delTableListItem(scheme, i) {
			let newConf = deepClone(this.formConfCopy) // 要更新的conf
			console.log(arguments)
			newConf.fields.forEach((field) => {
				if (field.__config__.renderKey == scheme.__config__.renderKey) {
					if (field.__config__.items.length > 1) {
						field.__config__.items.splice(i, 1)
					}
				}
			})
			this.$emit('newConf', newConf)
		},
		cloneComponent(origin) {
			const clone = deepClone(origin)
			console.log('clone', clone)
			const config = clone.__config__
			config.span = this.formConf.span // 生成代码时，会根据span做精简判断
			config.children.forEach((e) => {
				e.__config__.defaultValue = ''
			})
			this.createIdAndKey(clone)
			clone.placeholder !== undefined && (clone.placeholder += config.label)
			return clone
		},
		createIdAndKey(item) {
			const config = item.__config__
			config.formId = ++this.idGlobal
			config.renderKey = +new Date() // 改变renderKey后可以实现强制更新组件
			if (config.layout === 'colFormItem') {
				item.__vModel__ = `field${this.idGlobal}`
			} else if (config.layout === 'rowFormItem') {
				config.componentName = `row ${this.idGlobal}`
				!Array.isArray(config.children) && (config.children = [])
				delete config.label // rowFormItem无需配置label属性
			} else if (config.layout === 'tableList') {
				config.componentName = `tableList ${this.idGlobal}`
				!Array.isArray(config.children) && (config.children = [])
				delete config.label // rowFormItem无需配置label属性
			}
			if (Array.isArray(config.children)) {
				config.children = config.children.map((childItem) => this.createIdAndKey(childItem))
			}
			return item
		},
	},
	mounted() {
		if (this.readonly) this.approvalListPreview()
	},
	render(h) {
		return renderFrom.call(this, h)
	},
}
</script>

<style lang="scss">
$font-color: #606266;
$bg-color: #f5f7fa;

[detailread='true'] .image-selector-wrapper {
	pointer-events: none; //鼠标永远为未选中
}

[detailread='true'].form-parser-wrap {
	// 隐藏明细表格的删除和新增按钮
	.del-btn,
	.btn-row {
		display: none;
	}
}

[detailread='true'] .el-form-item:not([exclude='true']) {
	.el-form-item__label:before {
		content: '' !important;
		color: transparent !important;
	}
	.el-form-item__content,
	table {
		background: $bg-color;

		%readonly {
			background: $bg-color;
			cursor: text;
			color: $font-color;
			border: none;
		}

		// .el-button {
		// 	@extend %readonly;
		// }

		.el-cascader {
			@extend %readonly;
			&.cust-cascader {
				::-webkit-input-placeholder {
					color: $font-color !important;
				}
			}
		}

		.el-select {
			@extend %readonly;
		}

		.el-input {
			input {
				@extend %readonly;
			}

			.el-input__suffix,
			.el-input-group__append {
				display: none;
			}

			::-webkit-input-placeholder {
				/* WebKit browsers */
				color: transparent;
			}
		}

		.el-textarea {
			.el-textarea__inner {
				@extend %readonly;
			}

			::-webkit-input-placeholder {
				/* WebKit browsers */
				color: transparent;
			}
		}

		.el-date-editor {
			input {
				padding-left: 15px;
			}

			.el-input__prefix {
				display: none;
			}
		}

		.el-radio-group {
			background: $bg-color;
			pointer-events: none; //鼠标永远为未选中

			.el-radio + .el-radio {
				margin-left: 0;
			}

			label > span:first-of-type {
				display: none;
			}

			label[class~='is-checked'] {
				.el-radio__label {
					padding-left: 15px;
					color: $font-color;
					cursor: default;
				}
			}

			label:not([class~='is-checked']) {
				display: none;
			}
		}

		.el-checkbox-group {
			pointer-events: none; //鼠标永远为未选中

			.el-checkbox__label {
				color: $font-color;
			}
		}

		.el-tree {
			pointer-events: none; //鼠标永远为未选中
		}

		.el-form-item__error {
			//隐藏错误提示
			display: none;
		}

		.upload-file {
			padding: 0 10px;
		}
		// 只读时隐藏上传组件的删除和上传按钮
		.upload-file-uploader,
		.el-link--danger {
			display: none;
		}
		.upload-file-uploader.hide {
			display: block;
			visibility: hidden;
			margin: 0;
		}
	}
}

.form-parser-wrap {
	// 统一样式
	.el-col {
		width: 100%;
	}
	.el-form-item {
		.el-form-item__label {
			text-align: center;
			background-color: #f5f5f5;
			margin: 0;
			float: left;
			white-space: nowrap;
			box-sizing: border-box;
			padding: 0;
			padding-right: 10px;
			width: 130px !important;
			margin-right: 10px;
		}
		.el-form-item__content {
			margin: 0 !important;
			float: right;
			width: calc(100% - 140px);
		}
	}
	.table-list-item-title {
		font-size: 12px;
		color: #606266;
		text-align: center;
		margin: 5px 0 15px;
	}
	.btn-row {
		display: flex;
		justify-content: center;
		margin-bottom: 22px;
	}
	.del-btn {
		margin: -20px 0 0;
		cursor: pointer;
		color: #f56c6c;
		float: right;
	}
}

@media print {
	.el-form {
		.el-form-item {
			margin: 0px !important;
		}
		.el-form-item__label,
		.el-form-item__content {
			text-align: left;
			margin: 0;
			padding: 0;
			background: none;
			// border: 1px solid #ccc;
		}
		.el-form-item__label {
			text-indent: 10px;
		}
		.el-form-item__content {
			width: calc(100% - 130px);
		}
	}
}
</style>
