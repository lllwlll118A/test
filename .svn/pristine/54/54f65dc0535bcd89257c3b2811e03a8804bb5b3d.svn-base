<!--
 * @Author: dsj
 * @LastEditors: hanq
 * @Date: 2022-07-26 10:08:58
 * @LastEditTime: 2022-09-19 15:22:55
 * @Description: TO DO
-->
<template>
	<el-dialog title="考勤人员设置" :visible.sync="open" width="700px" append-to-body :close-on-click-modal="false">
		<div style="display: flex; justify-content: center">
			<el-transfer
				v-if="open"
				filterable
				:filter-method="filterMethod"
				filter-placeholder="请输入"
				v-model="ids"
				:titles="titles"
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
import { staffList } from '@/api/system/user'
import {saveAttendUsers} from '@/api/setting/attend'

export default {
	name: 'userSelect',
	data() {
		return {
			userList: [],
			titles:['可选人员','已选人员'],
			ids: [],
			open: false,
			attend:{},
			filterMethod(query, item) {
				return item.nickName.indexOf(query) > -1
			},
		}
	},
	created() {
		staffList({}).then(({ data }) => {
			this.userList = data
		})
	},
	methods: {
		submit() {
			let userNames = ""
			this.ids.forEach((item)=>{
				for(let i=0;i<this.userList.length;i++){
					if(this.userList[i].userId == item){
						userNames = userNames+this.userList[i].nickName+"、"
						break
					}
				}
			})
			
			if(userNames){
				userNames = userNames.substring(0,userNames.length-1)
			}else{
				this.$message.error("至少选择一个考勤人员")
				return
			}

			this.attend.attendUserSummary = userNames

			let arr = new Array()
			for (let i=0;i< this.ids.length;i++) {
				let obj = {}
				obj.userId = this.ids[i]
				obj.attendId = this.attend.id
				arr.push(obj)
			}
			this.attend.attendUsersList = arr

			saveAttendUsers(this.attend).then(res=>{
				if(res.code == 200){
					this.$message.success("设置成功")
					this.open = false
					this.$emit('succ')
				}else{
					this.$message.error(res.msg)
				}
			})

		},
		init(ids,attend) {
			this.attend = attend
			this.open = true
			if(ids){
				this.ids = new Array()
				ids.forEach((item)=>{
					for(let i=0;i<this.userList.length;i++){
						if(this.userList[i].userId == item){
							this.ids.push(this.userList[i].userId)
							break
						}
					}
				})
			}
		},
	},
}
</script>

<style scoped lang="scss">
</style>
