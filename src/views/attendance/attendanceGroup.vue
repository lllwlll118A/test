<!--
 * @Author: hanq
 * @LastEditors: hanq
 * @Date: 2022-09-01 14:13:55
 * @LastEditTime: 2022-09-19 16:10:20
 * @Description: TO DO
-->
<template>
	<div class="app-container">
		<el-form :inline="true">
			<el-form-item>
				<el-button type="primary" icon="el-icon-plus" size="small" @click="add()">新增考勤组</el-button>
			</el-form-item>
		</el-form>

		<el-table border v-loading="loading" :data="dataList">
			<el-table-column label="名称" align="center" prop="attendName" />
			<el-table-column label="考勤人员" align="center" prop="attendUserSummary" />
			<el-table-column label="考勤时间" align="center" prop="attendTimeSummary" />
			<el-table-column label="考勤方式" align="center" prop="attendTypeSummary">
				<template slot-scope="scope">
					<div v-html="scope.row.attendTypeSummary">
					</div>
				</template>
			</el-table-column>
			<el-table-column label="特殊考勤日期" align="center" prop="attendSpecialSummary" />
			<el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
				<template slot-scope="scope">
					<el-button size="mini" type="text" @click="edit(scope.row)">修改</el-button>
					<el-button size="mini" type="text" @click="setting(scope.row)">设置</el-button>
					<el-button size="mini" type="text" @click="del(scope.row.id)">删除</el-button>
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
		<el-dialog title="考勤组" :visible.sync="dialogVisible" width="350px" append-to-body>
			<el-form ref="attendGroupForm" :model="attend" :rules="rules">
				<el-form-item label="考勤组名称" prop="attendName">
					<el-input maxlength="30" v-model="attend.attendName"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			<el-button size="small" @click="dialogVisible = false">取 消</el-button>
			<el-button size="small" type="primary" @click="saveAndJumpSetting">保 存</el-button>
		</span>
		</el-dialog>
	</div>
	
</template>
<script>
import pageMixin from '@/mixin/pagination'
import {attendGroupList,saveOrUpdateAttendGroup,deleteAttendGroup} from '@/api/setting/attend'
export default { 
    name:"attendanceGroup",
    mixins: [pageMixin],
    data(){
        return{
			dialogVisible:false,
			attend:{
				attendName:""
			},
			rules:{
				attendName:[{ required: true, message: '考勤组名称不能为空', trigger: 'blur' }]
			}
        }
    },
    created(){

    },
    methods:{
        edit(data){
			this.dialogVisible = true
			this.attend = data
        },
		setting(data){
			this.$router.push({path:'/attendanceGroup/detail',query:{id:data.id}})
		},
        add(){

			this.dialogVisible = true
			this.attend.attendName = ""
        },
		saveAndJumpSetting(){
			this.$refs['attendGroupForm'].validate(validate=>{
				if(!validate){
					return
				}
				saveOrUpdateAttendGroup(this.attend).then(res=>{
					this.dialogVisible = false
					this.$router.push({path:'/attendanceGroup/detail',query:{id:res.data.id}})
				})
			})
			
		},
        del(id){
			this.$confirm("确认删除当前考勤组？").then(()=>{
				deleteAttendGroup(id).then(res=>{
					if(res.code == 200){
						this.$message.success("删除成功")
						this.getDataList(1)
					}
				})
			})
		},
        queryPageReq:attendGroupList
    }

}
</script>
<style scoped lang="scss">
</style>