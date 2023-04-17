<template>
	<div class="app-container">
		<el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="70px">
			<el-form-item label="表单名称" prop="formName">
				<el-input
					v-model="queryParams.formName"
					placeholder="请输入表单名称"
					clearable
					size="small"
					@keyup.enter.native="getDataList(1)"
				/>
			</el-form-item>
			<el-form-item label="表单类型" prop="processFormType">
				<dict-select clearable v-model="queryParams.processFormType" :options="dict.type.process_form_type" />
			</el-form-item>
			<el-form-item>
				<el-button type="cyan" icon="el-icon-search" size="mini" @click="getDataList(1)">搜索</el-button>
				<el-button
					type="primary"
					icon="el-icon-plus"
					size="mini"
					@click="handleAdd"
					v-hasPermi="['system:form:add']"
					>新增</el-button
				>
			</el-form-item>
		</el-form>

		<!-- <el-row :gutter="10" class="mb8">
			<right-toolbar :showSearch.sync="showSearch" @queryTable="getDataList(1)"></right-toolbar>
		</el-row> -->

		<el-table v-loading="loading" border :data="dataList">
			<el-table-column label="表单Key" align="center" prop="formKey" />
			<el-table-column label="表单名称" align="center" prop="formName" />
			<el-table-column label="表单描述" align="center" prop="formDesc" />
			<el-table-column label="表单类型" align="center" prop="processFormType">
				<template slot-scope="scope">
					<dict-tag :options="dict.type.process_form_type" :value="scope.row.processFormType" />
				</template>
			</el-table-column>
			<el-table-column label="创建人" align="center" prop="createBy" />
			<el-table-column label="创建时间" align="center" prop="createTime" />
			<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
				<template slot-scope="scope">
					<el-button
						size="mini"
						type="text"
						icon="el-icon-edit"
						@click="handleUpdate(scope.row)"
						v-hasPermi="['system:form:edit']"
						>修改</el-button
					>
					<el-button
						size="mini"
						type="text"
						icon="el-icon-delete"
						@click="handleDelete(scope.row)"
						v-hasPermi="['system:form:remove']"
						>删除</el-button
					>
					<el-button icon="el-icon-user" size="mini" type="text" @click="selectUsers(scope.row)"
						>可见范围</el-button
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

		<!-- 添加或修改自定义表单对话框 -->
		<el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
			<el-form ref="form" :model="form" :rules="rules" label-width="113px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="表单名称" prop="formName">
							<el-input v-model="form.formName" placeholder="请输入表单名称" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="表单Key" prop="formKey">
							<el-input v-model="form.formKey" placeholder="请输入表单Key，该值必须保证唯一性" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="表单描述" prop="formDesc">
					<el-input v-model="form.formDesc" type="textarea" placeholder="请简述该表单的用途，便于管理" />
				</el-form-item>
				<el-form-item label="表单JSON" prop="formJson">
					<el-input
						v-model="form.formJson"
						:rows="10"
						type="textarea"
						placeholder="请输入表单构建的JSON内容"
					/>
				</el-form-item>
				<el-form-item label="流程表单类型" prop="processFormType">
					<dict-select
						v-model="form.processFormType"
						:options="dict.type.process_form_type"
						placeholder="请选择流程表单类型"
						clearable
					/>
				</el-form-item>
				<el-form-item label="表单图标" prop="formIcon">
					<el-popover placement="top-start" width="600" trigger="click" @show="$refs['iconSelect'].reset()">
						<IconSelect ref="iconSelect" @selected="selected" />
						<el-input
							class="svg-input"
							slot="reference"
							v-model="form.formIcon"
							placeholder="点击选择图标"
							readonly
						>
							<svg-icon
								v-if="form.formIcon"
								slot="prefix"
								:icon-class="form.formIcon"
								class="el-input__icon"
								:style="{ height: '36px', width: '22px', color: form.formIconColor }"
							/>
							<i v-else slot="prefix" class="el-icon-search el-input__icon" />
						</el-input>
					</el-popover>
				</el-form-item>
				<el-form-item label="图标颜色" prop="formIconColor">
					<el-color-picker v-model="form.formIconColor" />
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submitForm">确 定</el-button>
				<el-button @click="cancel">取 消</el-button>
			</div>
		</el-dialog>

		<!-- 可见范围选择用户对话框 -->
		<user-select @succ="getDataList(1)" ref="userSelect" />
	</div>
</template>

<script>
import {
	workflowFormList,
	addWorkflowForm,
	getWorkflowForm,
	updateWorkflowForm,
	delWorkflowForm,
} from '@/api/system/workflowForm'
import IconSelect from '@/components/IconSelect'
import UserSelect from './userSelect'
import pageMixin from '@/mixin/pagination'

export default {
	name: 'Form',
	components: { IconSelect, UserSelect },
	dicts: ['process_form_type'],
	mixins: [pageMixin],
	data() {
		return {
			// 显示搜索条件
			showSearch: true,
			// 弹出层标题
			title: '',
			// 是否显示弹出层
			open: false,
			// 查询参数
			queryParams: {
				formName: null,
				processFormType: null,
				urlPageParam: true,
			},
			// 表单参数
			form: {},
			// 表单校验
			rules: {
				formName: [{ required: true, message: '表单名称不能为空', trigger: 'blur' }],
				formDesc: [{ required: true, message: '表单描述不能为空', trigger: 'blur' }],
				formKey: [{ required: true, message: '表单Key不能为空', trigger: 'blur' }],
				formJson: [{ required: true, message: '表单JSON不能为空', trigger: 'blur' }],
				processFormType: [{ required: true, message: '流程表单类型不能为空', trigger: 'blur' }],
			},
		}
	},
	created() {},
	methods: {
		queryPageReq: workflowFormList,
		selectUsers(row) {
			this.$refs.userSelect.init(row.id)
		},
		// 选择图标
		selected(name) {
			this.form.formIcon = name
		},
		// 取消按钮
		cancel() {
			this.open = false
			this.reset()
		},
		// 表单重置
		reset() {
			this.form = {
				id: null,
				formDesc: null,
				formIcon: null,
				formIconColor: null,
				formJson: null,
				formKey: null,
				formName: null,
				processFormType: '',
			}
			this.resetForm('form')
		},
		/** 搜索按钮操作 */
		handleQuery() {
			this.queryParams.pageNum = 1
			this.getDataList(1)
		},
		/** 新增按钮操作 */
		handleAdd() {
			this.reset()
			this.open = true
			this.title = '添加自定义表单'
		},
		// /** 修改按钮操作 */
		handleUpdate(row) {
			this.reset()
			const id = row.id || this.ids
			getWorkflowForm({ id }).then((response) => {
				this.form = response.data
				this.open = true
				this.title = '修改自定义表单'
			})
		},
		/** 提交按钮 */
		submitForm() {
			this.$refs['form'].validate((valid) => {
				if (valid) {
					if (this.form.id != null) {
						updateWorkflowForm(this.form).then((response) => {
							this.msgSuccess('修改成功')
							this.open = false
							this.getDataList(1)
						})
					} else {
						addWorkflowForm(this.form).then((response) => {
							this.msgSuccess('新增成功')
							this.open = false
							this.getDataList(1)
						})
					}
				}
			})
		},
		/** 删除按钮操作 */
		handleDelete(row) {
			this.$confirm(`是否确认删除表单名为 “${row.formName}” 的数据项?`, '警告', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(function () {
					return delWorkflowForm(row.id)
				})
				.then(() => {
					this.getDataList(1)
					this.msgSuccess('删除成功')
				})
		},
	},
}
</script>

<style lang="scss" scoped>
::v-deep .svg-input.el-input--prefix {
	.el-input__prefix {
		left: 10px;
	}
	.el-input__inner {
		padding-left: 40px;
	}
}
</style>
