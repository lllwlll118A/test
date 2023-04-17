<!--
 * @Author: dsj
 * @LastEditors: dsj
 * @Date: 2022-07-20 10:56:51
 * @LastEditTime: 2022-07-27 17:33:42
 * @Description: TO DO
-->
<template>
	<div class="page-container">
		<bpmn-process @deploy="deployProcess" :diagramXML="xmlStr" />
	</div>
</template>

<script>
import { addDeploymentByString } from '@/api/activiti/definition'
import { listUser } from '@/api/system/user'
import { selectRole } from '@/api/system/role'
export default {
	name: 'workFlowDesinger',
	props: {},
	data() {
		return {
			allUsers: [],
			allRoles: [],
			xmlStr: '',
		}
	},
	beforeCreate() {
		listUser({}).then(({ data }) => {
			this.allUsers = data.list
		})
		selectRole({}).then(({ data }) => {
			this.allRoles = data
		})
	},
	methods: {
		deployProcess(obj) {
			this.$confirm('确认保存并部署模型, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then((r) => {
				let temp = {
					key: obj.key,
					name: obj.name,
					stringBPMN: obj.xml,
				}
				addDeploymentByString(temp).then((res) => {
					this.$message.success('部署成功')
					this.closeCurrentTag()
				})
			})
		},
	},
}
</script>

<style scoped lang="scss">
.page-container {
	height: calc(100vh - 84px);
	// width: 100;
	// height: 100vh;
}
</style>
